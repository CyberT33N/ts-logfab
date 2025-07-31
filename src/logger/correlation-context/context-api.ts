/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██║                      ██
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
// 🌟 PUBLIC API FUNCTIONS - ENTERPRISE FUNCTION-BASED ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'
import { parseCallStack } from './stack-parser.ts'
import { ContextStorageFactory } from './storage-factory.ts'
import type { ICorrelationContext, IContextCreationOptions, IContextRunOptions, IContextDebugInfo } from './types.ts'
import { generateWorkflowId, detectRequestId } from './workflow-utils.ts'

/**
 * 🚀 **Create new correlation context**
 * 
 * Automatically generates all required IDs and detects call chain
 * 
 * @param options - Context creation options
 * 
 * @returns New correlation context instance
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
 * 
 * Automatically creates context if none exists
 * 
 * @param contextOrOptions - Correlation context or run options
 * @param callback - Function to execute with context
 * 
 * @returns Result of the callback function
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
 * 
 * Returns undefined if no context is active
 * 
 * @returns Current correlation context or undefined
 */
export function getCurrentCorrelationContext(): ICorrelationContext | undefined {
    const storage = ContextStorageFactory.getInstance().getStorage()
    return storage.getStore()
}

/**
 * 🔄 **Get or create correlation context**
 * 
 * Always returns a valid context (creates one if none exists)
 * 
 * @param options - Context run options
 * 
 * @returns Valid correlation context
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
 * 
 * Returns a correlation ID, creating context if needed
 * 
 * @returns Correlation ID string
 */
export function getCorrelationId(): string {
    const context = getOrCreateCorrelationContext()
    return context.correlationId
}

/**
 * 🎬 **Get workflow ID (shorthand)**
 * 
 * Returns a workflow ID, creating context if needed
 * 
 * @returns Workflow ID string
 */
export function getWorkflowId(): string {
    const context = getOrCreateCorrelationContext()
    return context.workflowId
}

/**
 * 📊 **Add metadata to current context**
 * 
 * Merges metadata into existing context
 * 
 * @param metadata - Metadata to add to current context
 */
export function addCorrelationMetadata(metadata: Readonly<Record<string, unknown>>): void {
    const current = getCurrentCorrelationContext()
    
    if (current !== undefined) {
        Object.assign(current.metadata, metadata)
    }
}

/**
 * 🧹 **Clear all contexts (for testing)**
 * 
 * Clears all active contexts
 */
export function clearAllCorrelationContexts(): void {
    // Reset the storage factory for clean state
    ContextStorageFactory.resetInstance()
}

/**
 * 📊 **Get context information for debugging**
 * 
 * Returns current context state and statistics
 * 
 * @returns Debug information about current context
 */
export function getCorrelationDebugInfo(): IContextDebugInfo {
    const current = getCurrentCorrelationContext()
    
    return {
        hasActiveContext: current !== undefined,
        currentContext: current,
        contextDepth: current?.depth ?? -1
    }
} 