/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *██              🎯 TS-LOGFAB LOGGER - MAIN BARREL FILE                       ██
 *██          ENTERPRISE-READY LOGGING FRAMEWORK WITH ENHANCED FEATURES       ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 MAIN LOGGER EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    createDevelopmentLogger,
    createHybridLogger,
    createProductionLogger,
    getCurrentLoggingFormat,
    isStructuredLoggingEnabled
} from './adaptive-logging'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ENHANCED DECORATOR LOGGING EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    type AnomalyDetector,
    type AnomalySeverity,
    type AnomalyType,
    createAnomalyDetector,
    createPerformanceMetric,
    type IAnomalyConfig,
    type IAnomalyDetection
} from './anomaly-detector'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ADAPTIVE LOGGING EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    addCorrelationMetadata,
    clearAllCorrelationContexts,
    createCorrelationContext,
    getCorrelationDebugInfo,
    getCorrelationId,
    getCurrentCorrelationContext,
    getOrCreateCorrelationContext,
    getWorkflowId,
    type ICallChainInfo,
    type IContextCreationOptions,
    type IContextDebugInfo,
    type IContextRunOptions,
    type ICorrelationContext,
    runWithCorrelationContext
} from './correlation-context'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 CORRELATION CONTEXT EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    DEFAULT_LOG_CONFIG,
    type IEnhancedLogContext,
    type ILogDecoratorConfig,
    log,
    logDebug,
    logEnhancedDebug,
    logEnhancedMethodError,
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logErrorsOnly,
    logPerformance,
    logSilent
} from './decorators'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 SEMANTIC DETECTION EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    endPerformanceTracking,
    getAnomalyDetectorInstance,
    getLogger,
    logger,
    resetLogger,
    startPerformanceTracking
} from './logger-factory'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ANOMALY DETECTION EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    createPerformanceMonitor,
    createPerformanceSnapshot,
    getGlobalPerformanceMonitor,
    type IPerformanceMonitorConfig,
    type IPerformanceResult,
    type IPerformanceSession,
    type IPerformanceStatsSummary,
    PerformanceMonitor
} from './performance'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 PERFORMANCE MONITORING EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    type ComplexityLevel,
    type CostLevel,
    createCustomPatternConfig,
    DEFAULT_PATTERN_CONFIG,
    detectSemanticContext,
    type DomainType,
    type IPatternConfig,
    type ISemanticContext,
    type OperationType
} from './semantic-detector'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 SHARED TYPES EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export {
    type ILogContext,
    type IPerformanceMetrics
} from './types'
