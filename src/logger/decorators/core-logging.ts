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
██              🎯 CORE LOGGING FUNCTIONS - NO DECORATOR DEPENDENCIES        ██
██          ENTERPRISE-GRADE LOGGING WITH MODERN CONFIGURATION               ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { ReadonlyDeep } from 'type-fest'
import { type ILogDecoratorConfig, DEFAULT_LOG_CONFIG } from '@/decorators/types.ts'
import { 
    createHybridLogger, getCurrentLoggingFormat
} from '@/logger/adaptive-logging/index.ts'
import { startPerformanceTracking, endPerformanceTracking } from '../logger-factory.ts'
import { type IEnhancedLogContext  } from './types.ts'
import { createEnhancedContext, createEnhancedDecoratorPrefix } from './utils.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CORE LOGGING FUNCTIONS (NO DECORATOR DEPENDENCIES)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Method Start Logging**
 * 
 * Logs method execution start with full enterprise features
 * 
 * @param className - Class name for context
 * @param methodName - Method name for context  
 * @param args - Method arguments array
 * @param config - Enterprise logging configuration
 * 
 * @returns Enhanced log context for performance tracking
 */
export function logEnhancedMethodStart(
    className: string,
    methodName: string,
    args: readonly unknown[],
    config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG
): IEnhancedLogContext {
    const { environment, includePerformance, logStart, level } = config

    // Use Hybrid Logger for enterprise features
    const logger = environment?.forceFormat ? createHybridLogger({ 
        format: environment.forceFormat === 'auto' ? getCurrentLoggingFormat() : environment.forceFormat 
    }) : createHybridLogger()
    
    // Create enhanced logging context (Type-Safe with IEnhancedContextData)
    const enhancedContextData = createEnhancedContext(
        className,
        methodName,
        args,
        config
    )
    
    // Create enterprise prefix
    const prefix = createEnhancedDecoratorPrefix(
        className, 
        methodName, 
        config
    )
    
    // Start performance tracking if enabled
    let performanceContext: ReturnType<typeof startPerformanceTracking> | undefined
    
    if (includePerformance === true) {
        performanceContext = startPerformanceTracking(`${className}::${methodName}`)
    }
    
    // Log method start with enhanced context
    if (logStart !== false) {
        logger[level ?? 'info']({
            ...enhancedContextData,
            event: 'method_start',
            prefix,
            performanceContext: performanceContext ? {
                method: performanceContext.method,
                startTime: performanceContext.startTime
            } : undefined
        }, `${prefix} ⚡ Method execution started`)
    }
    
    // Return enterprise-grade typed result (NO TYPE CASTING NEEDED!)
    return {
        className,
        methodName,
        startTime: Date.now(),
        performanceContext,
        enhancedContext: enhancedContextData,
        prefix,
        methodSignature: enhancedContextData.methodSignature ?? `${className}.${methodName}`,
        operationId: enhancedContextData.operationId ?? '',
        args: enhancedContextData.args ?? {}
    }
}

/**
 * 🎯 **Enhanced Method Success Logging**
 * 
 * Logs successful method completion with enterprise metrics
 * 
 * @param startResult - Context from method start
 * @param result - Method return value
 * @param config - Enterprise logging configuration
 */
export function logEnhancedMethodSuccess(
    startResult: ReadonlyDeep<IEnhancedLogContext>,
    result: unknown,
    config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG
): void {
    const { environment, includePerformance, includeResult, logSuccess, level } = config
    const { startTime, performanceContext, prefix, enhancedContext } = startResult

    // Use Hybrid Logger for enterprise features  
    const logger = environment?.forceFormat ? createHybridLogger({ 
        format: environment.forceFormat === 'auto' ? getCurrentLoggingFormat() : environment.forceFormat 
    }) : createHybridLogger()
    
    // Calculate execution time
    const executionTime = Date.now() - startTime
    const executionTimeStr = executionTime.toFixed(2)
    
    // End performance tracking if enabled
    if (includePerformance === true && performanceContext !== undefined) {
        endPerformanceTracking(performanceContext, true, logger)
    }
    
    // Prepare result metadata
    const resultMetadata = includeResult === true ? {
        type: typeof result,
        isArray: Array.isArray(result),
        isPromise: result instanceof Promise,
        hasValue: result !== null && result !== undefined
    } : undefined
    
    // Log successful completion
    if (logSuccess !== false) {
        logger[level ?? 'info']({
            ...enhancedContext,
            event: 'method_success',
            executionTime,
            result: resultMetadata,
            prefix
        }, `${prefix} ✅ Method completed successfully (${executionTimeStr}ms)`)
    }
}

/**
 * 🎯 **Enhanced Method Error Logging**
 * 
 * Logs method errors with enterprise error tracking
 * 
 * @param startResult - Context from method start
 * @param errorObj - Error object or unknown error
 * @param config - Enterprise logging configuration
 */
export function logEnhancedMethodError(
    startResult: ReadonlyDeep<IEnhancedLogContext>,
    errorObj: unknown,
    config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG
): void {
    const { environment, includePerformance } = config
    const { startTime, performanceContext, prefix, enhancedContext } = startResult

    // Use Hybrid Logger for enterprise features
    const logger = environment?.forceFormat
        ? createHybridLogger({ 
            format: environment.forceFormat === 'auto' 
                ? getCurrentLoggingFormat() 
                : environment.forceFormat 
        })
        : createHybridLogger()
    
    // Calculate execution time
    const executionTime = Date.now() - startTime
    const executionTimeStr = executionTime.toFixed(2)
    
    // End performance tracking if enabled
    if (includePerformance === true && performanceContext !== undefined) {
        endPerformanceTracking(performanceContext, false, logger)
    }
    
    // Prepare error metadata
    const errorMetadata = {
        type: typeof errorObj,
        name: errorObj instanceof Error ? errorObj.name : 'Unknown',
        message: errorObj instanceof Error ? errorObj.message : String(errorObj),
        stack: errorObj instanceof Error ? errorObj.stack : undefined,
        isError: errorObj instanceof Error
    }
    
    // Log error with enhanced context
    logger.error({
        ...enhancedContext,
        event: 'method_error',
        executionTime,
        error: errorMetadata,
        prefix
    }, `${prefix} ❌ Method failed (${executionTimeStr}ms): ${errorMetadata.message}`)
}

/**
 * 🎯 **Enhanced Debug Logging**
 * 
 * Logs debug information with enterprise context
 * 
 * @param className - Class name for context
 * @param methodName - Method name for context
 * @param debugData - Debug data to log
 * @param config - Enterprise logging configuration
 */
export function logEnhancedDebug(
    className: string,
    methodName: string,
    debugData: ReadonlyDeep<Record<string, unknown>>,
    config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG
): void {
    const { environment, logDebug } = config

    // Only log if debug is enabled
    if (logDebug !== true) {
        return
    }
    
    // Use Hybrid Logger for enterprise features
    const logger = environment?.forceFormat
        ? createHybridLogger({ 
            format: environment.forceFormat === 'auto' 
                ? getCurrentLoggingFormat() 
                : environment.forceFormat 
        })
        : createHybridLogger()
    
    // Create enhanced logging context (Type-Safe with IEnhancedContextData)
    const enhancedContext = createEnhancedContext(
        className,
        methodName,
        [],
        config
    )
    
    // Create enterprise prefix
    const prefix = createEnhancedDecoratorPrefix(
        className,
        methodName,
        config
    )
    
    // Log debug information
    logger.debug({
        ...enhancedContext,
        event: 'debug_info',
        debugData,
        prefix
    }, `${prefix} 🔍 Debug information`)
} 