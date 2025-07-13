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
// 🔗 CORRELATION CONTEXT - INTERNAL BARREL FILE
// ═══════════════════════════════════════════════════════════════════════════════

// Re-export types
export type {
    ICorrelationContext,
    ICallChainInfo,
    IContextCreationOptions,
    IContextRunOptions,
    IContextDebugInfo
} from './types.ts'

// Re-export constants
export {
    MAX_CALL_STACK_DEPTH,
    MAX_WORKFLOW_DEPTH
} from './constants.ts'

// Re-export storage factory
export { ContextStorageFactory } from './storage-factory.ts'

// Re-export stack parser functions
export {
    parseCallStack,
    parseStackLine
} from './stack-parser.ts'

// Re-export workflow utilities
export {
    generateWorkflowId,
    detectRequestId,
    simpleHash
} from './workflow-utils.ts'

// Re-export all public API functions
export {
    createCorrelationContext,
    runWithCorrelationContext,
    getCurrentCorrelationContext,
    getOrCreateCorrelationContext,
    getCorrelationId,
    getWorkflowId,
    addCorrelationMetadata,
    clearAllCorrelationContexts,
    getCorrelationDebugInfo
} from './context-api.ts' 