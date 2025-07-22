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
██              🎯 TS-LOGFAB LOGGER - MAIN BARREL FILE                       ██
██          ENTERPRISE-READY LOGGING FRAMEWORK WITH ENHANCED FEATURES       ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 MAIN LOGGER EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    logger,
    getLogger,
    resetLogger,
    getAnomalyDetectorInstance,
    startPerformanceTracking,
    endPerformanceTracking
} from './logger-factory.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR LOGGING EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type ILogDecoratorConfig,
    DEFAULT_LOG_CONFIG,
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError,
    logEnhancedDebug,
    type IEnhancedLogContext,
    logDebug,
    logErrorsOnly,
    logPerformance,
    logSilent,
    log
} from './decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ADAPTIVE LOGGING EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    createHybridLogger,
    createDevelopmentLogger,
    createProductionLogger,
    getCurrentLoggingFormat,
    isStructuredLoggingEnabled
} from './AdaptiveLogging/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CORRELATION CONTEXT EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type ICorrelationContext,
    type ICallChainInfo,
    type IContextCreationOptions,
    type IContextRunOptions,
    type IContextDebugInfo,
    getCurrentCorrelationContext,
    createCorrelationContext,
    runWithCorrelationContext,
    getOrCreateCorrelationContext,
    getCorrelationId,
    getWorkflowId,
    addCorrelationMetadata,
    clearAllCorrelationContexts,
    getCorrelationDebugInfo
} from './correlation-context/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SEMANTIC DETECTION EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type ISemanticContext,
    type OperationType,
    type DomainType,
    type ComplexityLevel,
    type CostLevel,
    type IPatternConfig,
    detectSemanticContext,
    DEFAULT_PATTERN_CONFIG,
    createCustomPatternConfig
} from './semantic-detector/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ANOMALY DETECTION EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type IAnomalyDetection,
    type AnomalyType,
    type AnomalySeverity,
    type AnomalyDetector,
    type IAnomalyConfig,
    createAnomalyDetector,
    createPerformanceMetric
} from './anomaly-detector/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE MONITORING EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type IPerformanceSession,
    type IPerformanceResult,
    type IPerformanceMonitorConfig,
    type IPerformanceStatsSummary,
    PerformanceMonitor,
    createPerformanceMonitor,
    getGlobalPerformanceMonitor,
    createPerformanceSnapshot
} from './performance/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SHARED TYPES EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
    type ILogContext,
    type IPerformanceMetrics
} from './types.ts'