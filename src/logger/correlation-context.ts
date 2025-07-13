/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🔗 CORRELATION CONTEXT - ENTERPRISE FUNCTION-BASED ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

import { AsyncLocalStorage } from 'async_hooks'
import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'

/**
 * 🎯 **Correlation Context Interface**
 * 
 * Provides automatic correlation tracking across async operations
 * - correlationId: Unique identifier for a logical operation
 * - workflowId: Identifies a sequence of related operations  
 * - requestId: HTTP request identifier (if applicable)
 * - parentId: Reference to parent operation (for nested calls)
 */
export interface ICorrelationContext {
    readonly correlationId: string
    readonly workflowId: string
    readonly requestId?: string
    readonly parentId?: string
    readonly startTime: number
    readonly depth: number
    metadata: Record<string, unknown>
}

/**
 * 🏗️ **Call Chain Information**
 * 
 * Extracted from Error stack trace for automatic context detection
 */
interface ICallChainInfo {
    readonly methodName: string
    readonly fileName: string
    readonly lineNumber?: number
    readonly className?: string
}

/**
 * 🎯 **Context Creation Options**
 */
export interface IContextCreationOptions {
    readonly parentContext?: ICorrelationContext
    readonly requestId?: string
    readonly metadata?: Record<string, unknown>
}

/**
 * 🔄 **Context Run Options**
 */
export interface IContextRunOptions {
    readonly requestId?: string
    readonly metadata?: Record<string, unknown>
}

/**
 * 📊 **Debug Information Interface**
 */
export interface IContextDebugInfo {
    readonly hasActiveContext: boolean
    readonly currentContext?: ICorrelationContext
    readonly contextDepth: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 ENTERPRISE CONTEXT STORAGE FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏭 **Context Storage Factory**
 * 
 * Singleton factory for managing AsyncLocalStorage instance
 * Enterprise pattern for dependency injection and testing
 */
class ContextStorageFactory {
    private static _instance: ContextStorageFactory | null = null
    private readonly _storage: AsyncLocalStorage<ICorrelationContext>

    private constructor() {
        this._storage = new AsyncLocalStorage<ICorrelationContext>()
    }

    // 🧪 For testing: allows storage replacement
    public static resetInstance(): void {
        ContextStorageFactory._instance = null
    }

    public static getInstance(): ContextStorageFactory {
        ContextStorageFactory._instance ??= new ContextStorageFactory()
        return ContextStorageFactory._instance
    }

    public getStorage(): AsyncLocalStorage<ICorrelationContext> {
        return this._storage
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 MODULE-LEVEL CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const MAX_CALL_STACK_DEPTH = 20
const MAX_WORKFLOW_DEPTH = 10

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 PRIVATE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔍 **Parse call stack for workflow detection**
 * Extracts method names and file information from Error stack
 */
function parseCallStack(): readonly ICallChainInfo[] {
    const stack = new Error().stack
    if (stack === undefined) {
        return []
    }

    const lines = stack.split('\n').slice(1) // Remove "Error" line
    const result: ICallChainInfo[] = []

    for (const line of lines.slice(0, MAX_CALL_STACK_DEPTH)) {
        const info = parseStackLine(line.trim())
        if (info !== null) {
            result.push(info)
        }
    }

    return result
}

/**
 * 🧩 **Parse individual stack trace line**
 * Extracts method name, file, and line number
 */
function parseStackLine(line: Readonly<string>): ICallChainInfo | null {
    // Common Node.js stack trace patterns:
    // at MethodName (file:///path/to/file.ts:123:45)
    // at Object.methodName (file:///path/to/file.ts:123:45)
    // at ClassName.methodName (file:///path/to/file.ts:123:45)
    
    const patterns = [
        /at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/, // Standard format
        /at\s+(.+?)\s+\((.+?)\)/, // Without line numbers
        /at\s+(.+?)$/ // Simple format
    ]

    for (const pattern of patterns) {
        const match = line.match(pattern)
        if (match !== null) {
            const [, methodInfo, fileName, lineNumber] = match
            
            // Parse method name and class
            const methodParts = methodInfo.split('.')
            const methodName = methodParts[methodParts.length - 1]
            const className = methodParts.length > 1 ? methodParts[methodParts.length - 2] : undefined

            return {
                methodName: methodName || 'anonymous',
                fileName: fileName || 'unknown',
                lineNumber: lineNumber ? parseInt(lineNumber, 10) : undefined,
                className
            }
        }
    }

    return null
}

/**
 * 🎯 **Generate workflow ID from call chain**
 * Creates deterministic ID based on method call sequence
 */
function generateWorkflowId(
    callChain: Readonly<readonly ICallChainInfo[]>, 
    parentContext?: ReadonlyDeep<ICorrelationContext>
): string {
    if (parentContext !== undefined && parentContext.depth < MAX_WORKFLOW_DEPTH) {
        // Continue parent workflow if depth allows
        return parentContext.workflowId
    }

    // Create new workflow ID based on call signature
    const signature = callChain
        .slice(0, 3) // Use first 3 stack frames
        .map(info => `${info.className ?? ''}${info.methodName}`)
        .join('->')
        .toLowerCase()
        .replace(/[^a-z0-9->]/g, '') // Clean non-alphanumeric chars

    if (signature.length > 0) {
        // Create hash-like ID from signature
        const hash = simpleHash(signature)
        return `wf-${hash}`
    }

    // Fallback to UUID if no meaningful signature
    return `wf-${randomUUID().slice(0, 8)}`
}

/**
 * 🔍 **Detect request ID from various sources**
 * Attempts to find HTTP request ID from common sources
 */
function detectRequestId(): string | undefined {
    // Check common HTTP header patterns in Node.js
    if (typeof process !== 'undefined') {
        // Check for common request ID environment variables
        const requestIdSources = [
            'REQUEST_ID',
            'X_REQUEST_ID', 
            'X_CORRELATION_ID',
            'TRACE_ID'
        ]

        for (const source of requestIdSources) {
            const value = process.env[source]
            if (value !== undefined && value.length > 0) {
                return value
            }
        }
    }

    // TODO: In future, could integrate with HTTP frameworks
    // to automatically extract request IDs from headers

    return undefined
}

/**
 * 🧮 **Simple hash function for deterministic IDs**
 * Creates consistent short hashes from strings
 */
function simpleHash(str: Readonly<string>): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).slice(0, 8)
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌟 PUBLIC API FUNCTIONS - ENTERPRISE FUNCTION-BASED ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🚀 **Create new correlation context**
 * Automatically generates all required IDs and detects call chain
 */
export function createCorrelationContext(options: ReadonlyDeep<IContextCreationOptions> = {}): ICorrelationContext {
    const { parentContext, requestId, metadata = {} } = options
    
    const callChain = parseCallStack()
    const workflowId = generateWorkflowId(callChain, parentContext)
    
    const context: ICorrelationContext = {
        correlationId: randomUUID(),
        workflowId,
        requestId: requestId ?? detectRequestId(),
        parentId: parentContext?.correlationId,
        startTime: Date.now(),
        depth: (parentContext?.depth ?? -1) + 1,
        metadata: {
            ...metadata,
            callChain: callChain.slice(0, 3), // Limit stored call chain
            createdAt: new Date().toISOString()
        }
    }

    return context
}

/**
 * 🎯 **Run operation with correlation context**
 * Automatically creates context if none exists
 */
export function runWithCorrelationContext<T>(
    contextOrOptions: ReadonlyDeep<ICorrelationContext | IContextRunOptions>,
    callback: () => T
): T {
    const storage = ContextStorageFactory.getInstance().getStorage()
    let context: ICorrelationContext

    if ('correlationId' in contextOrOptions) {
        context = contextOrOptions
    } else {
        const currentContext = getCurrentCorrelationContext()
        context = createCorrelationContext({
            parentContext: currentContext,
            ...contextOrOptions
        })
    }

    return storage.run(context, callback)
}

/**
 * 📖 **Get current correlation context**
 * Returns undefined if no context is active
 */
export function getCurrentCorrelationContext(): ICorrelationContext | undefined {
    const storage = ContextStorageFactory.getInstance().getStorage()
    return storage.getStore()
}

/**
 * 🔄 **Get or create correlation context**
 * Always returns a valid context (creates one if none exists)
 */
export function getOrCreateCorrelationContext(options: ReadonlyDeep<IContextRunOptions> = {}): ICorrelationContext {
    const current = getCurrentCorrelationContext()
    if (current !== undefined) {
        return current
    }

    return createCorrelationContext(options)
}

/**
 * 🆔 **Get correlation ID (shorthand)**
 * Returns a correlation ID, creating context if needed
 */
export function getCorrelationId(): string {
    const context = getOrCreateCorrelationContext()
    return context.correlationId
}

/**
 * 🎬 **Get workflow ID (shorthand)**
 * Returns a workflow ID, creating context if needed
 */
export function getWorkflowId(): string {
    const context = getOrCreateCorrelationContext()
    return context.workflowId
}

/**
 * 📊 **Add metadata to current context**
 * Merges metadata into existing context
 */
export function addCorrelationMetadata(metadata: Readonly<Record<string, unknown>>): void {
    const current = getCurrentCorrelationContext()
    if (current !== undefined) {
        Object.assign(current.metadata, metadata)
    }
}

/**
 * 🧹 **Clear all contexts (for testing)**
 * Clears all active contexts
 */
export function clearAllCorrelationContexts(): void {
    // Reset the storage factory for clean state
    ContextStorageFactory.resetInstance()
}

/**
 * 📊 **Get context information for debugging**
 * Returns current context state and statistics
 */
export function getCorrelationDebugInfo(): IContextDebugInfo {
    const current = getCurrentCorrelationContext()
    
    return {
        hasActiveContext: current !== undefined,
        currentContext: current,
        contextDepth: current?.depth ?? -1
    }
}

 