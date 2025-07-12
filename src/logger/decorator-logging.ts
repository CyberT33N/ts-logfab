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

// ==== Imports ====
import type { ReadonlyDeep } from 'type-fest'
import { logger } from './logger-factory.ts'
import type { ILogContext, IPerformanceMetrics } from './types.ts'

/**
 * 🎯 Creates a contextual prefix for decorator-based logging
 * @param className - The name of the class
 * @param methodName - The name of the method
 * @param args - The arguments of the method
 * @returns The contextual prefix
 */
export function createDecoratorPrefix(
    className: string,
    methodName: string,
    args?: Readonly<Record<string, unknown>>
): string {
    const parts = [className, methodName]
    
    if (args && Object.keys(args).length > 0) {
        const argStrings = Object.entries(args)
            .filter(([, value]: Readonly<[string, unknown]>) => 
                typeof value === 'string' || 
                typeof value === 'number' || 
                typeof value === 'boolean'
            )
            .map(([key, value]: Readonly<[string, unknown]>) => `${key}=${String(value)}`)
            .slice(0, 3) // Limit to 3 most relevant args
        
        if (argStrings.length > 0) {
            parts.push(`(${argStrings.join(', ')})`)
        }
    }
    
    return parts.join('::')
}

/**
 * 🎯 Logs method start with beautiful formatting
 * @param prefix - The prefix of the method
 * @param context - The context of the method
 * @param performance - The performance metrics of the method
 */
export function logMethodStart(
    prefix: string,
    context?: ReadonlyDeep<ILogContext>,
    performance?: ReadonlyDeep<IPerformanceMetrics>
): void {
    logger.info({
        prefix,
        ...context,
        performance,
        msg: '🚀 Method execution started'
    })
}

/**
 * 🎯 Logs method success with performance metrics
 * @param prefix - The prefix of the method
 * @param duration - The duration of the method
 * @param context - The context of the method
 * @param result - The result of the method
 */
export function logMethodSuccess(
    prefix: string,
    duration: number,
    context?: ReadonlyDeep<ILogContext>,
    result?: Readonly<{ type: string; size?: number }>
): void {
    logger.info({
        prefix,
        ...context,
        performance: { duration },
        result,
        msg: `✅ Method completed successfully (${String(duration)}ms)`
    })
}

/**
 * 🎯 Logs method error with detailed context
 * @param prefix - The prefix of the method
 * @param error - The error of the method
 * @param duration - The duration of the method
 * @param context - The context of the method
 */
export function logMethodError(
    prefix: string,
    error: Readonly<Error>,
    duration: number,
    context?: ReadonlyDeep<ILogContext>
): void {
    logger.error({
        prefix,
        ...context,
        performance: { duration },
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack
        },
        msg: `❌ Method execution failed (${String(duration)}ms)`
    })
}

/**
 * 🎯 Logs method debug information
 * @param prefix - The prefix of the method
 * @param message - The message of the method
 * @param data - The data of the method
 */
export function logMethodDebug(
    prefix: string,
    message: string,
    data?: Readonly<Record<string, unknown>>
): void {
    logger.debug({
        prefix,
        ...data,
        msg: `🔍 ${message}`
    })
} 