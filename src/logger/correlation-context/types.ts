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
 * 
 * @property correlationId - Unique identifier for a logical operation
 * @property workflowId - Identifies a sequence of related operations
 * @property requestId - HTTP request identifier (if applicable)
 * @property parentId - Reference to parent operation (for nested calls)
 * @property startTime - Timestamp when context was created
 * @property depth - Nesting depth of the context
 * @property metadata - Additional context metadata and information
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
 * 
 * @property methodName - Name of the method in the call chain
 * @property fileName - File path where the method is located
 * @property lineNumber - Line number in the file (if available)
 * @property className - Class name if the method belongs to a class
 */
export interface ICallChainInfo {
    readonly methodName: string
    readonly fileName: string
    readonly lineNumber?: number
    readonly className?: string
}

/**
 /**
 * 🎯 **Context Creation Options**
 * 
 * @property parentContext - Parent correlation context to inherit from
 * @property requestId - HTTP request identifier to associate
 * @property metadata - Additional metadata to include in context
 */
export interface IContextCreationOptions {
    readonly parentContext?: ICorrelationContext
    readonly requestId?: string
    readonly metadata?: Record<string, unknown>
}

/**
 * 🔄 **Context Run Options**
 * 
 * @property requestId - HTTP request identifier to associate
 * @property metadata - Additional metadata to include in context
 */
export interface IContextRunOptions {
    readonly requestId?: string
    readonly metadata?: Record<string, unknown>
}

/**
 * 📊 **Debug Information Interface**
 * 
 * @property hasActiveContext - Whether there is an active correlation context
 * @property currentContext - The current active correlation context (if any)
 * @property contextDepth - Current nesting depth of the context
 */
export interface IContextDebugInfo {
    readonly hasActiveContext: boolean
    readonly currentContext?: ICorrelationContext
    readonly contextDepth: number
} 