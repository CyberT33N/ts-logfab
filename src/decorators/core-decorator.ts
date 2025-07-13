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
import {
    type ILogDecoratorConfig,
    type AnyMethod,
    DEFAULT_LOG_CONFIG
} from './types.ts'

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
 *     @log()
 *     async processData(data: string[]): Promise<ProcessedData> {
 *         // Your business logic here
 *         return processedResult
 *     }
 * 
 *     @log({ level: 'debug', includeArgs: false })
 *     private async internalMethod(): Promise<void> {
 *         // Internal processing
 *     }
 * 
 *     @log({ 
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
                `@log can only be applied to methods, but ${String(propertyKey)} is not a function`
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