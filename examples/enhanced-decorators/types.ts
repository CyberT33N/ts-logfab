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
██                    🎯 ENHANCED DECORATORS TYPES INDEX                     ██
██              CENTRAL TYPE DEFINITIONS AND RE-EXPORTS                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATORS TYPES INDEX
// ═══════════════════════════════════════════════════════════════════════════════

// 🚀 Re-export relevant types and decorators for convenience
export type {
    ILogDecoratorConfig,
    IMethodSignature,
    ICorrelationContext,
    ISemanticContext,
    IAnomalyDetection
} from '@/decorators/index.ts'

export type {
    IEnhancedDecoratorConfig
} from '@/logger/decorators/index.ts'

export {
    log,
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
} from '@/decorators/index.ts'

// ✨ Re-export enhanced decorator implementation from the alternative path
export {
    log as enhancedLog,
    performanceLog,
    debugLog as enhancedDebugLog,
    errorLog
} from '@/logger/decorators/index.ts'

// 🛠️ Re-export utility functions
export { createEnhancedConfig, getEnhancedLoggingStatus } from '@/logger/decorators/index.ts'

// 🎯 Re-export core module types
export type {
    IImplementationMetrics,
    IPerformanceComparison,
    IComparisonResult,
    IFeatureMatrix,
    IRecommendations,
    IEnhancedDecoratorsSummary,
    IEnhancedDecoratorsStatistics
} from './core/index.ts' 