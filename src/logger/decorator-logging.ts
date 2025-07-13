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
██              🎯 ENHANCED DECORATOR LOGGING - ENTERPRISE EDITION           ██
██          CORRELATION • SEMANTIC CONTEXT • ANOMALY DETECTION              ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'
import { toWritable } from '@/utils/data-utils.ts'
import { 
    getCurrentCorrelationContext, 
    createCorrelationContext, 
    type ICorrelationContext 
} from './correlation-context.ts'
import { createHybridLogger, getCurrentLoggingFormat, isStructuredLoggingEnabled } from './hybrid-logger.ts'
import { getLogger, startPerformanceTracking, endPerformanceTracking } from './logger-factory.ts'
import { detectSemanticContext, type ISemanticContext } from './semantic-detector.ts'
import { type ILogContext, type IPerformanceMetrics } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED LOGGING INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Log Context with Correlation and Semantic Data**
 */
export interface IEnhancedLogContext extends ILogContext {
    readonly correlation?: ICorrelationContext
    readonly semantic?: ISemanticContext
    readonly performance?: IPerformanceMetrics
    readonly anomalyDetection?: boolean
}

/**
 * 🎯 **Decorator Logging Configuration**
 */
export interface IDecoratorLoggingConfig {
    readonly enableCorrelation: boolean
    readonly enableSemanticDetection: boolean
    readonly enableAnomalyDetection: boolean
    readonly enablePerformanceTracking: boolean
    readonly useHybridLogger: boolean
    readonly logLevel: 'debug' | 'info' | 'warn' | 'error'
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_DECORATOR_CONFIG: IDecoratorLoggingConfig = {
    enableCorrelation: true,
    enableSemanticDetection: true,
    enableAnomalyDetection: true,
    enablePerformanceTracking: true,
    useHybridLogger: true,
    logLevel: 'info'
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED LOGGING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create enhanced context for decorator logging**
 * 
 * Automatically adds correlation and semantic context
 */
function createEnhancedContext(
    className: string,
    methodName: string,
    args: ReadonlyDeep<unknown[]>,
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): IEnhancedLogContext {
    const baseContext: ILogContext = {
        className,
        methodName,
        methodSignature: `${className}.${methodName}`,
        operationId: randomUUID(),
        args: Array.isArray(args) ? args.reduce<Record<string, unknown>>(
            (acc: Readonly<Record<string, unknown>>, arg: unknown, index: number) => {
                const mutableAcc = toWritable(acc)

                const key = `arg${String(index)}`
                mutableAcc[key] = arg
                
                return mutableAcc
            }, {}) : {}
    }

    // Add correlation context if enabled
    let correlation: ICorrelationContext | undefined
    if (config.enableCorrelation) {
        correlation = getCurrentCorrelationContext()
        correlation ??= createCorrelationContext({
            requestId: randomUUID(),
            metadata: {
                className,
                methodName,
                origin: 'decorator'
            }
        })
    }

    // Add semantic context if enabled
    let semantic: ISemanticContext | undefined
    if (config.enableSemanticDetection) {
        semantic = detectSemanticContext(methodName, args)
    }

    return {
        ...baseContext,
        correlation,
        semantic,
        anomalyDetection: config.enableAnomalyDetection
    }
}

/**
 * 🎯 **Creates a contextual prefix for enhanced decorator-based logging**
 */
export function createEnhancedDecoratorPrefix(
    className: string,
    methodName: string,
    context: ReadonlyDeep<IEnhancedLogContext>
): string {
    const parts = [className, methodName]
    
    // Add semantic context indicators
    if (context.semantic) {
        const semanticIcon = getSemanticIcon(context.semantic)
        parts.push(semanticIcon)
    }
    
    // Add correlation info in structured format
    if (context.correlation && isStructuredLoggingEnabled()) {
        parts.push(`[${context.correlation.correlationId.slice(0, 8)}]`)
    }
    
    return parts.join('::')
}

/**
 * 🎯 **Get semantic context icon**
 */
function getSemanticIcon(semantic: ReadonlyDeep<ISemanticContext>): string {
    const domainIcons = {
        USER: '👤',
        ORDER: '📦', 
        PRODUCT: '🛍️',
        FINANCE: '💰',
        SYSTEM: '⚙️',
        AUTH: '🔐',
        NOTIFICATION: '🔔',
        ANALYTICS: '📊',
        INTEGRATION: '🔗',
        GENERAL: '📄'
    }
    
    const operationIcons = {
        read: '📖',
        WRITE: '✏️',
        UPDATE: '🔄',
        DELETE: '🗑️',
        COMPUTE: '🧮',
        VALIDATE: '✅',
        TRANSFORM: '🔄',
        SEARCH: '🔍',
        AGGREGATE: '📊',
        UNKNOWN: '❓'
    }
    
    const domainIcon = domainIcons[semantic.domain]
    const operationKey = semantic.operation.toLowerCase() as keyof typeof operationIcons
    const operationIcon = operationIcons[operationKey]
    
    return `${domainIcon || '📄'}${operationIcon || '❓'}`
}

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

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create decorator logging configuration**
 */
export function createDecoratorLoggingConfig(
    overrides: ReadonlyDeep<Partial<IDecoratorLoggingConfig>> = {}
): IDecoratorLoggingConfig {
    return {
        ...DEFAULT_DECORATOR_CONFIG,
        ...overrides
    }
}

/**
 * 🎯 **Get default decorator logging configuration**
 */
export function getDefaultDecoratorConfig(): IDecoratorLoggingConfig {
    return { ...DEFAULT_DECORATOR_CONFIG }
} 