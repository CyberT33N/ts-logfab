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
// 🎯 CORRELATION CONTEXT TYPES
// ═══════════════════════════════════════════════════════════════════════════════

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
export interface ICallChainInfo {
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