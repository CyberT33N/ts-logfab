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
██              🎯 DECORATOR IMPLEMENTATIONS MODULE                          ██
██          ACTUAL DECORATOR IMPLEMENTATIONS FOR LOGGING                    ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR - ULTIMATE INTELLIGENT LOGGING
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { formatLogEntry, autoConfigureFormat } from '@/logger/AdaptiveLogging/index.ts'
import { createCorrelationContext, runWithCorrelationContext } from '@/logger/correlation-context/index.ts'
import { getGlobalPerformanceMonitor, type IPerformanceSession } from '@/logger/performance/index.ts'
import { detectSemanticContext, type ISemanticContext } from '@/logger/semantic-detector/index.ts'
import { type IEnhancedDecoratorConfig, DEFAULT_ENHANCED_CONFIG } from './config.ts'

/**
 * 🚀 **Ultimate Enhanced Log Decorator**
 * 
 * Combines all intelligent logging features
 */
export function log(
    config: ReadonlyDeep<Partial<IEnhancedDecoratorConfig>> = {}
): (
    target: ReadonlyDeep<Record<string, unknown>>,
    propertyKey: string,
    descriptor: ReadonlyDeep<PropertyDescriptor>
) => PropertyDescriptor {
    const finalConfig = { ...DEFAULT_ENHANCED_CONFIG, ...config }

    return function(
        target: ReadonlyDeep<Record<string, unknown>>,
        propertyKey: string,
        descriptor: ReadonlyDeep<PropertyDescriptor>
    ): PropertyDescriptor {
        const originalMethod = descriptor.value as (...args: readonly unknown[]) => unknown
        const newDescriptor = { ...descriptor }

        newDescriptor.value = async function(
            this: ReadonlyDeep<Record<string, unknown>>, 
            ...args: readonly unknown[]
        ): Promise<unknown> {
            const methodName = `${target.constructor.name}.${propertyKey}`
            const performanceMonitor = getGlobalPerformanceMonitor()
            
            // Start performance session
            let session: IPerformanceSession | undefined
            if (finalConfig.enablePerformanceTracking) {
                session = performanceMonitor.startSession(
                    methodName,
                    args,
                    target.constructor.name
                )
            }

            // Semantic analysis
            let semantic: ISemanticContext | undefined
            if (finalConfig.enableSemanticAnalysis) {
                semantic = detectSemanticContext(methodName, args)
            }

            // Correlation context
            if (finalConfig.enableCorrelationTracking) {
                return runWithCorrelationContext(
                    createCorrelationContext(),
                    async() => {
                        return executeWithLogging(
                            this,
                            originalMethod,
                            args,
                            methodName,
                            finalConfig,
                            session,
                            semantic
                        )
                    }
                )
            } else {
                return executeWithLogging(
                    this,
                    originalMethod,
                    args,
                    methodName,
                    finalConfig,
                    session,
                    semantic
                )
            }
        }

        return newDescriptor
    }
}

/**
 * 📊 **Performance-Focused Log Decorator**
 * 
 * Ultra-sensitive performance monitoring
 */
export function performanceLog(
    config: ReadonlyDeep<Partial<IEnhancedDecoratorConfig>> = {}
): (
    target: ReadonlyDeep<Record<string, unknown>>,
    propertyKey: string,
    descriptor: ReadonlyDeep<PropertyDescriptor>
) => PropertyDescriptor {
    return log({
        ...config,
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        logLevel: 'debug',
        includeResult: true
    })
}

/**
 * 🔍 **Debug Log Decorator**
 * 
 * Detailed debugging information
 */
export function debugLog(
    config: ReadonlyDeep<Partial<IEnhancedDecoratorConfig>> = {}
): (
    target: ReadonlyDeep<Record<string, unknown>>,
    propertyKey: string,
    descriptor: ReadonlyDeep<PropertyDescriptor>
) => PropertyDescriptor {
    return log({
        ...config,
        logLevel: 'debug',
        includeStackTrace: true,
        includeArguments: true,
        includeResult: true
    })
}

/**
 * ❌ **Error Log Decorator**
 * 
 * Error-focused logging with full context
 */
export function errorLog(
    config: ReadonlyDeep<Partial<IEnhancedDecoratorConfig>> = {}
): (
    target: ReadonlyDeep<Record<string, unknown>>,
    propertyKey: string,
    descriptor: ReadonlyDeep<PropertyDescriptor>
) => PropertyDescriptor {
    return log({
        ...config,
        logLevel: 'error',
        includeStackTrace: true,
        includeArguments: true,
        enableAnomalyDetection: true
    })
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 PRIVATE IMPLEMENTATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎭 **Execute with logging helper function**
 * 
 * Standalone function for logging execution instead of prototype pollution
 */
async function executeWithLogging(
    context: ReadonlyDeep<Record<string, unknown>>,
    originalMethod: (...args: readonly unknown[]) => unknown,
    args: readonly unknown[],
    methodName: string,
    config: ReadonlyDeep<IEnhancedDecoratorConfig>,
    session?: IPerformanceSession,
    semantic?: ISemanticContext
): Promise<unknown> {
    const startTime = performance.now()
    const startMemory = process.memoryUsage().heapUsed
    let result: unknown
    let error: Error | undefined
    let success = true

    try {
        // Execute original method
        result = await originalMethod.apply(context, [...args])
    } catch (err) {
        error = err instanceof Error ? err : new Error(String(err))
        success = false
        throw err
    } finally {
        const endTime = performance.now()
        const endMemory = process.memoryUsage().heapUsed
        const duration = endTime - startTime
        const memoryDelta = (endMemory - startMemory) / (1024 * 1024) // Convert to MB

        // End performance session if enabled
        if (session !== undefined && config.enablePerformanceTracking) {
            const performanceMonitor = getGlobalPerformanceMonitor()
            performanceMonitor.endSession(
                session,
                success,
                error,
                result
            )
        }

        // Create and format log entry
        if (config.enableAutoFormatSwitching) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                level: success ? config.logLevel : 'error',
                message: success 
                    ? `Method ${methodName} completed successfully`
                    : `Method ${methodName} failed: ${error?.message ?? 'Unknown error'}`,
                context: {
                    method: methodName,
                    file: 'enhanced-decorator.ts',
                    class: methodName.split('.')[0]
                },
                performance: {
                    duration,
                    memory: memoryDelta
                },
                raw: {
                    args: config.includeArguments 
                        ? args.slice(0, config.maxArgumentsLength) 
                        : [],
                    result: config.includeResult ? result : undefined,
                    error
                },
                semantic
            }

            const formatConfig = autoConfigureFormat()
            const formattedOutput = formatLogEntry(logEntry, formatConfig)
            
            if ('formatted' in formattedOutput) {
                console.info(formattedOutput.formatted)
            } else {
                console.info(JSON.stringify(formattedOutput))
            }
        }
    }

    return result
} 