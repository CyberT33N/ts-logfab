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

// Re-export all types and interfaces
export type { ILogContext, IPerformanceMetrics } from './types.ts'

// Re-export logger instance
export { logger } from './logger-factory.ts'

// Re-export all Enhanced decorator logging functions and types
export {
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError,
    logEnhancedMethodDebug,
    createDecoratorLoggingConfig,
    getDefaultDecoratorConfig,
    type IEnhancedLogContext,
    type IDecoratorLoggingConfig
} from './decorator-logging.ts'

// Re-export performance utilities
export { createPerformanceSnapshot } from './performance-utils.ts'

// Re-export logging utilities
export { extractLogRelevantArgs, extractResultMetadata } from './logging-utils.ts'