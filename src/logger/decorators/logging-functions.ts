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
██              🎯 DECORATOR LOGGING FUNCTIONS MODULE                        ██
██          LOW-LEVEL LOGGING FUNCTIONS FOR DECORATOR LOGGING               ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { ReadonlyDeep } from 'type-fest'
import { createHybridLogger, getCurrentLoggingFormat, isStructuredLoggingEnabled } from '../hybrid-logger.ts'
import { getLogger, startPerformanceTracking, endPerformanceTracking } from '../logger-factory.ts'
import { type IDecoratorLoggingConfig, DEFAULT_DECORATOR_CONFIG } from './config.ts'
import { type IEnhancedLogContext } from './types.ts'
import { createEnhancedContext, createEnhancedDecoratorPrefix } from './utils.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED LOGGING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced method start logging with correlation and semantic context**
 */
export function logEnhancedMethodStart(
    className: string,
    methodName: string,
    args: ReadonlyDeep<unknown[]> = [],
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): { context: IEnhancedLogContext; performanceContext?: ReturnType<typeof startPerformanceTracking> } {
    const context = createEnhancedContext(className, methodName, args, config)
    const prefix = createEnhancedDecoratorPrefix(className, methodName, context)
    
    // Choose appropriate logger
    const logger = config.useHybridLogger ? createHybridLogger() : getLogger()
    
    // Start performance tracking if enabled
    let performanceContext: ReturnType<typeof startPerformanceTracking> | undefined
    if (config.enablePerformanceTracking) {
        performanceContext = startPerformanceTracking(`${className}.${methodName}`)
    }
    
    // Log method start with enhanced context
    logger.info({
        decorator: {
            phase: 'start',
            className,
            methodName,
            prefix
        },
        correlation: context.correlation,
        semantic: context.semantic,
        performance: performanceContext ? {
            startTime: performanceContext.startTime,
            method: performanceContext.method
        } : undefined,
        anomalyDetection: {
            enabled: config.enableAnomalyDetection,
            tracking: config.enablePerformanceTracking
        },
        environment: {
            loggingFormat: getCurrentLoggingFormat(),
            structuredLogging: isStructuredLoggingEnabled()
        },
        args: context.args
    }, `🚀 Enhanced Method: ${prefix} started`)
    
    return { context, performanceContext }
}

/**
 * 🎯 **Enhanced method success logging with anomaly detection**
 */
export function logEnhancedMethodSuccess(
    startResult: ReadonlyDeep<{ 
        readonly context: IEnhancedLogContext; 
        readonly performanceContext?: ReturnType<typeof startPerformanceTracking> 
    }>,
    result?: ReadonlyDeep<{ type: string; size?: number }>,
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): void {
    const { context, performanceContext } = startResult
    const prefix = createEnhancedDecoratorPrefix(context.className ?? '', context.methodName ?? '', context)
    
    // Choose appropriate logger
    const logger = config.useHybridLogger ? createHybridLogger() : getLogger()
    
    // End performance tracking and anomaly detection if enabled
    if (config.enablePerformanceTracking && performanceContext) {
        endPerformanceTracking(performanceContext, true, logger)
    }
    
    // Log success with enhanced context
    logger.info({
        decorator: {
            phase: 'success',
            className: context.className,
            methodName: context.methodName,
            prefix
        },
        correlation: context.correlation,
        semantic: context.semantic,
        result: result ? {
            type: result.type,
            size: result.size,
            complexity: context.semantic?.complexity
        } : undefined,
        performance: performanceContext ? {
            method: performanceContext.method,
            completed: true
        } : undefined
    }, `✅ Enhanced Method: ${prefix} completed successfully`)
}

/**
 * 🎯 **Enhanced method error logging with correlation and anomaly context**
 */
export function logEnhancedMethodError(
    startResult: ReadonlyDeep<{ 
        readonly context: IEnhancedLogContext; 
        readonly performanceContext?: ReturnType<typeof startPerformanceTracking> 
    }>,
    error: ReadonlyDeep<Error>,
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): void {
    const { context, performanceContext } = startResult
    const prefix = createEnhancedDecoratorPrefix(context.className ?? '', context.methodName ?? '', context)
    
    // Choose appropriate logger
    const logger = config.useHybridLogger ? createHybridLogger() : getLogger()
    
    // End performance tracking with error flag if enabled
    if (config.enablePerformanceTracking && performanceContext) {
        endPerformanceTracking(performanceContext, false, logger)
    }
    
    // Log error with enhanced context and potential anomaly information
    logger.error({
        decorator: {
            phase: 'error',
            className: context.className,
            methodName: context.methodName,
            prefix
        },
        correlation: context.correlation,
        semantic: context.semantic,
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
            type: 'method_execution_error'
        },
        performance: performanceContext ? {
            method: performanceContext.method,
            failed: true
        } : undefined,
        anomalyContext: {
            errorOccurred: true,
            potentialAnomaly: config.enableAnomalyDetection,
            semanticContext: context.semantic
        }
    }, `❌ Enhanced Method: ${prefix} failed with error: ${error.message}`)
}

/**
 * 🎯 **Enhanced debug logging with semantic context**
 */
export function logEnhancedMethodDebug(
    context: ReadonlyDeep<IEnhancedLogContext>,
    message: string,
    data?: ReadonlyDeep<Record<string, unknown>>,
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): void {
    const prefix = createEnhancedDecoratorPrefix(context.className ?? '', context.methodName ?? '', context)
    
    // Choose appropriate logger
    const logger = config.useHybridLogger ? createHybridLogger() : getLogger()
    
    logger.debug({
        decorator: {
            phase: 'debug',
            className: context.className,
            methodName: context.methodName,
            prefix
        },
        correlation: context.correlation,
        semantic: context.semantic,
        debug: {
            message,
            data,
            timestamp: Date.now()
        }
    }, `🔍 Enhanced Debug: ${prefix} - ${message}`)
} 