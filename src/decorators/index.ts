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

import type { ReadonlyDeep } from 'type-fest'
import {
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError,
    getDefaultDecoratorConfig,
    type IDecoratorLoggingConfig
} from '@/logger/decorator-logging.ts'
import {
    extractResultMetadata
} from '@/logger/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DECORATOR CONFIGURATION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Method Signature Configuration**
 * 
 * Defines the structure for manually overriding method signature information.
 */
export interface IMethodSignature {
    /**
     * 📝 Parameter names in order
     * @example ['name', 'email', 'age']
     */
    readonly parameterNames?: readonly string[]
    
    /**
     * 📝 Parameter types in order  
     * @example ['string', 'string', 'number']
     */
    readonly parameterTypes?: readonly string[]
    
    /**
     * ⚡ Is method async
     * @example true
     */
    readonly isAsync?: boolean
    
    /**
     * 📤 Return type
     * @example 'Promise<User>'
     */
    readonly returnType?: string
    
    /**
     * 🔧 Full signature override
     * @example 'async createUser(name: string, email: string, age: number): Promise<User>'
     */
    readonly fullSignature?: string
}

/**
 * 🔗 **Correlation Context Configuration**
 * 
 * Configuration for automatic correlation ID management and distributed tracing.
 */
export interface ICorrelationContext {
    /**
     * 📝 Enable automatic correlation context injection
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 🆔 Custom correlation ID override
     * @example 'user-session-123'
     */
    readonly correlationId?: string
    
    /**
     * 🔗 Custom workflow ID override
     * @example 'checkout-process'
     */
    readonly workflowId?: string
    
    /**
     * 📨 Custom request ID override
     * @example 'req-456'
     */
    readonly requestId?: string
    
    /**
     * 👤 Custom user ID override
     * @example 'user-789'
     */
    readonly userId?: string
    
    /**
     * 🔄 Inherit correlation context from parent
     * @default true
     */
    readonly inheritFromParent?: boolean
}

/**
 * 🎯 **Semantic Context Configuration**
 * 
 * Configuration for business domain and operation detection.
 */
export interface ISemanticContext {
    /**
     * 📝 Enable semantic context detection
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 🏢 Manual domain override
     * @example 'USER'
     */
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    
    /**
     * ⚙️ Manual operation override
     * @example 'WRITE'
     */
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    
    /**
     * 🎚️ Manual complexity override
     * @example 'HIGH'
     */
    readonly complexity?: 'LOW' | 'MEDIUM' | 'HIGH'
    
    /**
     * 🔑 Business key for tracking
     * @example 'order-12345'
     */
    readonly businessKey?: string
    
    /**
     * 🏷️ Custom tags for categorization
     * @example ['payment', 'critical']
     */
    readonly tags?: readonly string[]
}

/**
 * 🚨 **Anomaly Detection Configuration**
 * 
 * Configuration for performance anomaly monitoring.
 */
export interface IAnomalyDetection {
    /**
     * 📝 Enable anomaly detection for this method
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 📊 Custom baseline samples count override
     * @default 10
     */
    readonly minSamples?: number
    
    /**
     * 🎚️ Custom threshold multiplier override
     * @default 2.5
     */
    readonly thresholdMultiplier?: number
    
    /**
     * 🚨 Enable critical anomaly alerts
     * @default true
     */
    readonly enableCriticalAlerts?: boolean
    
    /**
     * ⚠️ Enable warning anomaly alerts
     * @default true
     */
    readonly enableWarningAlerts?: boolean
    
    /**
     * 📝 Custom method key for anomaly tracking
     * @example 'UserService::createUser'
     */
    readonly customMethodKey?: string
}

/**
 * 🎛️ Configuration interface for the Log decorator
 */
export interface ILogDecoratorConfig {
    /**
     * 📊 Log level for method execution tracking
     * @default 'info'
     */
    readonly level?: 'trace' | 'debug' | 'info' | 'warn' | 'error'
    
    /**
     * ⚡ Include performance metrics in logs
     * @default true
     */
    readonly includePerformance?: boolean
    
    /**
     * 📥 Include method arguments in logs (filtered for relevance)
     * @default true
     */
    readonly includeArgs?: boolean
    
    /**
     * 📤 Include return value metadata in logs
     * @default true
     */
    readonly includeResult?: boolean
    
    /**
     * 🔧 Custom context to include in all logs
     */
    readonly customContext?: ReadonlyDeep<Record<string, unknown>>
    
    /**
     * 🏷️ Custom prefix override (if not using automatic generation)
     */
    readonly customPrefix?: string
    
    /**
     * 🎚️ Log successful operations
     * @default true
     */
    readonly logSuccess?: boolean
    
    /**
     * 🎚️ Log method start
     * @default true
     */
    readonly logStart?: boolean
    
    /**
     * 🎚️ Log detailed debug information
     * @default false
     */
    readonly logDebug?: boolean
    
    /**
     * 🎯 **ENTERPRISE SIGNATURE CONFIG** - Manual method signature override
     */
    readonly methodSignature?: IMethodSignature
    
    // ==== 🚀 ENHANCED FEATURES (NEW) ====
    
    /**
     * 🔗 **CORRELATION CONTEXT CONFIG** - Automatic correlation ID management
     */
    readonly correlationContext?: ICorrelationContext
    
    /**
     * 🎯 **SEMANTIC CONTEXT CONFIG** - Business domain and operation detection
     */
    readonly semanticContext?: ISemanticContext
    
    /**
     * 🚨 **ANOMALY DETECTION CONFIG** - Performance anomaly monitoring
     */
    readonly anomalyDetection?: IAnomalyDetection
    
    /**
     * 🌍 **ENVIRONMENT CONFIG** - Environment-specific behavior
     */
    readonly environment?: {
        /**
         * 📝 Override auto-detected environment
         * @example 'production'
         */
        readonly forceEnvironment?: 'development' | 'staging' | 'production' | 'test'
        
        /**
         * 🎨 Override auto-detected logging format
         * @example 'machine'
         */
        readonly forceFormat?: 'human' | 'machine' | 'auto'
        
        /**
         * 🔇 Disable logging entirely in certain environments
         * @default []
         */
        readonly disableInEnvironments?: readonly ('development' | 'staging' | 'production' | 'test')[]
    }
}

/**
 * 🎯 Default configuration for the Log decorator
 */
const DEFAULT_LOG_CONFIG: Required<Omit<ILogDecoratorConfig, 'customContext' | 'customPrefix' | 'methodSignature'>> = {
    level: 'info',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    logSuccess: true,
    logStart: true,
    logDebug: false,
    correlationContext: {
        enabled: true,
        inheritFromParent: true
    },
    semanticContext: {
        enabled: true
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true
    },
    environment: {
        disableInEnvironments: []
    }
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 HELPER TYPES FOR PROPER METHOD TYPING
// ═══════════════════════════════════════════════════════════════════════════════

type AsyncMethod = (...args: readonly unknown[]) => Promise<unknown>
type SyncMethod = (...args: readonly unknown[]) => unknown
type AnyMethod = AsyncMethod | SyncMethod

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 ENHANCED CONFIGURATION ADAPTER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔄 **Configuration Adapter for Enhanced Logging**
 * 
 * Converts the legacy ILogDecoratorConfig to the new IDecoratorLoggingConfig
 * for backward compatibility while enabling enhanced features.
 */
function convertToEnhancedConfig(config: ReadonlyDeep<ILogDecoratorConfig>): IDecoratorLoggingConfig {
    const defaults = getDefaultDecoratorConfig()
    
    // Map trace level to debug since enhanced config doesn't support trace
    const mappedLogLevel = config.level === 'trace' ? 'debug' : config.level
    
    return {
        enableCorrelation: config.correlationContext?.enabled ?? defaults.enableCorrelation,
        enableSemanticDetection: config.semanticContext?.enabled ?? defaults.enableSemanticDetection,
        enableAnomalyDetection: config.anomalyDetection?.enabled ?? defaults.enableAnomalyDetection,
        enablePerformanceTracking: config.includePerformance ?? defaults.enablePerformanceTracking,
        useHybridLogger: true, // Always use hybrid logger for enhanced features
        logLevel: mappedLogLevel ?? defaults.logLevel
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ ENTERPRISE LOG DECORATOR IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **ENTERPRISE LOG DECORATOR**
 * 
 * Perfect TypeScript decorator for automatic method logging with:
 * - 🚀 **Automatic prefix generation** (ClassName::methodName)
 * - ⚡ **Performance metrics** (execution time, memory usage)
 * - 📊 **Argument logging** (smart filtering for relevance)
 * - 🎯 **Return value tracking** (type and size information)
 * - 🔧 **Error handling** (detailed stack traces and context)
 * - 🎨 **Beautiful formatting** (UTF-8 symbols and structured output)
 * - 🏢 **Enterprise-ready** (configurable, type-safe, reusable)
 * 
 * @param config - Optional configuration for decorator behavior
 * 
 * @example
 * ```typescript
 * class MyService {
 *     @Log()
 *     async processData(data: string[]): Promise<ProcessedData> {
 *         // Your business logic here
 *         return processedResult
 *     }
 * 
 *     @Log({ level: 'debug', includeArgs: false })
 *     private async internalMethod(): Promise<void> {
 *         // Internal processing
 *     }
 * 
 *     @Log({ 
 *         customContext: { module: 'data-processing' },
 *         logDebug: true 
 *     })
 *     async complexOperation(config: Config): Promise<Result> {
 *         // Complex business logic
 *         return result
 *     }
 * }
 * ```
 * 
 * **Log Output Examples:**
 * ```
 * 🚀 Method execution started
 * ┌─ 🏷️  MyService::processData(arg0=Array)
 * └─ 🚀 Method execution started
 * 
 * ✅ Method completed successfully (245ms)
 * ┌─ 🏷️  MyService::processData(arg0=Array)
 * └─ ✅ Method completed successfully (245ms)
 * ```
 */
export function log(config: ReadonlyDeep<ILogDecoratorConfig> = {}): MethodDecorator {
    return function <T>(
        target: object,
        propertyKey: string | symbol,
        descriptor: Readonly<TypedPropertyDescriptor<T>>
    ): TypedPropertyDescriptor<T> {
        // 🔧 Merge configuration with defaults
        const finalConfig = {
            ...DEFAULT_LOG_CONFIG,
            ...config
        }
        
        // 🎯 Get the original method with proper typing
        const originalMethod = descriptor.value as AnyMethod
        
        if (typeof originalMethod !== 'function') {
            throw new Error(
                `@Log can only be applied to methods, but ${String(propertyKey)} is not a function`
            )
        }
        
        // ✨ Create the enhanced method with logging
        const enhancedMethod = async function(
            this: object, 
            ...args: readonly unknown[]
        ): Promise<unknown> {
            // 🏗️ Setup logging context
            const className = this.constructor.name
            const methodName = String(propertyKey)
            
            // 🔄 Convert configuration to enhanced format
            const enhancedConfig = convertToEnhancedConfig(finalConfig)
            
            // 🚀 Enhanced method start logging
            const startResult = logEnhancedMethodStart(
                className, 
                methodName, 
                args, 
                enhancedConfig
            )
            
            try {
                // 🎯 Execute the original method
                const result = await originalMethod.apply(this, args as unknown[])
                
                // ✅ Enhanced success logging
                logEnhancedMethodSuccess(
                    startResult,
                    finalConfig.includeResult ? extractResultMetadata(result) : undefined,
                    enhancedConfig
                )
                
                return result
            } catch (error) {
                // 🚨 Ensure we have a proper Error object
                const errorObj = error instanceof Error 
                    ? error 
                    : new Error(String(error))
                
                // ❌ Enhanced error logging
                logEnhancedMethodError(startResult, errorObj, enhancedConfig)
                
                // 🔄 Re-throw the error to maintain normal error flow
                throw error
            }
        }
        
        // 🎯 Properly assign the enhanced method
        return {
            ...descriptor,
            value: enhancedMethod as T
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 SPECIALIZED DECORATOR VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔍 **DEBUG LOG DECORATOR**
 * Pre-configured for debug-level logging with detailed information and all Enhanced features
 */
export const logDebug = (): MethodDecorator => log({
    level: 'debug',
    logDebug: true,
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    // Enhanced Features for maximum debug information
    correlationContext: { enabled: true },
    semanticContext: { enabled: true },
    anomalyDetection: { enabled: true }
})

/**
 * ⚡ **PERFORMANCE LOG DECORATOR**
 * Focused on performance metrics and execution timing with Enhanced monitoring
 */
export const logPerformance = (): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: false,
    includeResult: true,
    logDebug: false,
    // Enhanced Features for performance monitoring
    correlationContext: { enabled: true },
    semanticContext: { enabled: false }, // Minimal semantic overhead for performance focus
    anomalyDetection: { 
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true,
        thresholdMultiplier: 2.0 // Stricter performance monitoring
    },
    customContext: { focus: 'performance' }
})

/**
 * 🔒 **SILENT LOG DECORATOR**
 * Minimal logging for sensitive operations with reduced Enhanced features
 */
export const logSilent = (): MethodDecorator => log({
    level: 'info',
    includeArgs: false,
    includeResult: false,
    logDebug: false,
    // Minimal Enhanced Features for silent operations
    correlationContext: { enabled: true }, // Keep correlation for tracing
    semanticContext: { enabled: false }, // Disable semantic analysis
    anomalyDetection: { enabled: false }, // Disable anomaly detection
    customContext: { mode: 'silent' }
})

/**
 * 🚨 **ERROR-ONLY LOG DECORATOR**
 * Only logs when methods fail with Enhanced error analysis
 */
export const logErrorsOnly = (): MethodDecorator => log({
    level: 'error',
    logStart: false,
    logSuccess: false,
    includeArgs: true,
    includeResult: false,
    logDebug: true,
    // Enhanced Features for error analysis
    correlationContext: { enabled: true },
    semanticContext: { enabled: true }, // Help categorize error types
    anomalyDetection: { 
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: false // Only critical for error-only mode
    }
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENHANCED DECORATOR VARIANTS (NEW)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔗 **CORRELATION LOG DECORATOR**
 * Automatic correlation context tracking with enhanced ID management
 */
export const logWithCorrelation = (options?: {
    readonly correlationId?: string
    readonly workflowId?: string
    readonly requestId?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    correlationContext: {
        enabled: true,
        inheritFromParent: true,
        ...options
    },
    customContext: { focus: 'correlation-tracking' }
})

/**
 * 🎯 **SEMANTIC LOG DECORATOR**
 * Business context and domain-specific logging
 */
export const logWithSemantics = (options?: {
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    readonly businessKey?: string
    readonly tags?: readonly string[]
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    semanticContext: {
        enabled: true,
        ...options
    },
    customContext: { focus: 'semantic-analysis' }
})

/**
 * 🚨 **ANOMALY DETECTION LOG DECORATOR**
 * Enhanced performance monitoring with anomaly detection
 */
export const logWithAnomalyDetection = (options?: {
    readonly minSamples?: number
    readonly thresholdMultiplier?: number
    readonly enableCriticalAlerts?: boolean
    readonly customMethodKey?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    anomalyDetection: {
        enabled: true,
        enableWarningAlerts: true,
        ...options
    },
    customContext: { focus: 'anomaly-monitoring' }
})

/**
 * 🌍 **PRODUCTION LOG DECORATOR**
 * Production-optimized logging with minimal output
 */
export const logForProduction = (): MethodDecorator => log({
    level: 'info',
    includeArgs: false,
    includeResult: false,
    logDebug: false,
    environment: {
        forceFormat: 'machine',
        disableInEnvironments: ['test']
    },
    correlationContext: { enabled: true },
    anomalyDetection: { enabled: true },
    customContext: { environment: 'production-optimized' }
})

/**
 * 🛠️ **DEVELOPMENT LOG DECORATOR**
 * Development-optimized logging with detailed output
 */
export const logForDevelopment = (): MethodDecorator => log({
    level: 'debug',
    includeArgs: true,
    includeResult: true,
    logDebug: true,
    environment: {
        forceFormat: 'human',
        forceEnvironment: 'development'
    },
    correlationContext: { enabled: true },
    semanticContext: { enabled: true },
    anomalyDetection: { enabled: false },
    customContext: { environment: 'development-verbose' }
})

/**
 * 💰 **FINANCIAL OPERATION LOG DECORATOR**
 * Specialized for financial domain operations
 */
export const logFinancialOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE'
    readonly businessKey?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: false, // Privacy for financial data
    includeResult: false, // Privacy for financial data
    correlationContext: {
        enabled: true,
        userId: options?.userId
    },
    semanticContext: {
        enabled: true,
        domain: 'FINANCE',
        operation: options?.operation ?? 'COMPUTE',
        businessKey: options?.businessKey,
        tags: ['financial', 'privacy-sensitive']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        thresholdMultiplier: 1.5 // Stricter for financial operations
    },
    customContext: { domain: 'financial', sensitivity: 'high' }
})

/**
 * 👤 **USER OPERATION LOG DECORATOR**
 * Specialized for user domain operations
 */
export const logUserOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'
    readonly userId?: string
    readonly includeUserData?: boolean
}): MethodDecorator => {
    const includeUserData = options?.includeUserData ?? false
    return log({
        level: 'info',
        includePerformance: true,
        includeArgs: includeUserData,
        includeResult: includeUserData,
        correlationContext: {
            enabled: true,
            userId: options?.userId
        },
        semanticContext: {
            enabled: true,
            domain: 'USER',
            operation: options?.operation ?? 'READ',
            tags: ['user-management']
        },
        anomalyDetection: { enabled: true },
        customContext: { domain: 'user', privacy: includeUserData ? 'normal' : 'enhanced' }
    })
}

/**
 * 📦 **ORDER OPERATION LOG DECORATOR**
 * Specialized for order/commerce domain operations
 */
export const logOrderOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'
    readonly orderId?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    correlationContext: {
        enabled: true,
        userId: options?.userId,
        workflowId: 'order-processing'
    },
    semanticContext: {
        enabled: true,
        domain: 'ORDER',
        operation: options?.operation ?? 'WRITE',
        businessKey: options?.orderId,
        tags: ['commerce', 'order-management']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true
    },
    customContext: { domain: 'commerce', workflow: 'order-processing' }
})

/**
 * ⚡ **HIGH-PERFORMANCE LOG DECORATOR**
 * Minimal logging for performance-critical operations
 */
export const logHighPerformance = (): MethodDecorator => log({
    level: 'warn', // Only log warnings and errors
    includeArgs: false,
    includeResult: false,
    logStart: false,
    logSuccess: false,
    logDebug: false,
    correlationContext: { enabled: true },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: false
    },
    customContext: { mode: 'high-performance', verbosity: 'minimal' }
})

/**
 * 🔍 **COMPREHENSIVE LOG DECORATOR**
 * Maximum logging with all enhanced features enabled
 */
export const logComprehensive = (options?: {
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    readonly userId?: string
    readonly businessKey?: string
}): MethodDecorator => log({
    level: 'debug',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    logDebug: true,
    correlationContext: {
        enabled: true,
        userId: options?.userId
    },
    semanticContext: {
        enabled: true,
        domain: options?.domain ?? 'GENERAL',
        operation: options?.operation ?? 'UNKNOWN',
        businessKey: options?.businessKey,
        tags: ['comprehensive-logging']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true
    },
    customContext: { mode: 'comprehensive', verbosity: 'maximum' }
})