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
// 🎯 BARREL FILE - RE-EXPORTS ALL DECORATOR FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════════

// Export all types and interfaces
export type {
    IMethodSignature,
    ICorrelationContext,
    ISemanticContext,
    IAnomalyDetection,
    ILogDecoratorConfig,
    AsyncMethod,
    SyncMethod,
    AnyMethod
} from './types.ts'

export {
    DEFAULT_LOG_CONFIG
} from './types.ts'

// Export the main decorator function
export {
    log
} from './core-decorator.ts'

// Export all specialized decorators
export {
    logDebug,
    logPerformance,
    logSilent,
    logErrorsOnly,
    logWithCorrelation,
    logWithSemantics,
    logWithAnomalyDetection,
    logForProduction,
    logForDevelopment,
    logFinancialOperation,
    logUserOperation,
    logOrderOperation,
    logHighPerformance,
    logComprehensive
} from './specialized-decorators.ts'