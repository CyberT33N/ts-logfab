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

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENTERPRISE LOGGER ARCHITECTURE - DECORATOR OPTIMIZED
// ═══════════════════════════════════════════════════════════════════════════════

import { readFileSync } from 'fs'
import { join } from 'path'
import { pino } from 'pino'
import pretty from 'pino-pretty'
import type { ReadonlyDeep } from 'type-fest'
import env from '@/env.ts'
import { createEnterprisePrettyConfig } from '@/logger/pino-prettifiers.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// ⚙️ ENTERPRISE PINO CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

interface IPackageJson {
    [key: string]: unknown
    version?: string
    name?: string
}

/**
 * 🎯 Validates if the object is a valid package.json file
 * @param obj - The object to validate
 * @returns True if the object is a valid package.json file, false otherwise
 */
const isValidPackageJson = (obj: unknown): obj is IPackageJson => {
    return typeof obj === 'object' && obj !== null
}

/**
 * 🎯 Creates an enterprise logger instance
 * @returns The logger instance
 */
const createEnterpriseLogger = (): pino.Logger => {
    const isDevelopment = env.NODE_ENV === 'development'
    const isTest = env.NODE_ENV === 'test'

    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
    const parsedPackage: unknown = JSON.parse(readFileSync(packagePath, 'utf-8'))
    const packageJson: IPackageJson = isValidPackageJson(parsedPackage) ? parsedPackage : { version: '1.0.0' }

    // 🎯 Create beautiful visual stream with enterprise styling
    const stream = pretty(createEnterprisePrettyConfig())
        
    return pino(
        {
            name: packageJson.name ?? 'unknown-app',
            level: isDevelopment ? 'debug' : (isTest ? 'debug' : 'info'),
            base: {
                author: packageJson.author ?? 'unknown-author',
                version: packageJson.version ?? '1.0.0',
                environment: env.NODE_ENV,
                nodeVersion: process.version,
                platform: process.platform
            }
        },
        stream
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export interface ILogContext {
    readonly className?: string
    readonly methodName?: string
    readonly methodSignature?: string
    readonly operationId?: string
    readonly requestId?: string
    readonly userId?: string
    readonly args?: Record<string, unknown>
    readonly metadata?: Record<string, unknown>
}

export interface IPerformanceMetrics {
    readonly startTime: number
    readonly duration?: number
    readonly memoryUsage?: NodeJS.MemoryUsage
    readonly cpuUsage?: NodeJS.CpuUsage
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE LOGGER INSTANCE
// ═══════════════════════════════════════════════════════════════════════════════

export const logger = createEnterpriseLogger()

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 DECORATOR-OPTIMIZED LOGGING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Creates a contextual prefix for decorator-based logging
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

/**
 * 🎯 Creates performance metrics snapshot
 */
export function createPerformanceSnapshot(): IPerformanceMetrics {
    return {
        startTime: Date.now(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 UTILITY FUNCTIONS FOR ENHANCED LOGGING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Extracts relevant arguments for logging (excludes large objects)
 */
export function extractLogRelevantArgs(args: readonly unknown[]): Record<string, unknown> {
    const relevantArgs: Record<string, unknown> = {}
    
    args.forEach((arg, index) => {
        if (arg === null || arg === undefined) {
            relevantArgs[`arg${String(index)}`] = arg
        } else if (typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean') {
            relevantArgs[`arg${String(index)}`] = arg
        } else if (typeof arg === 'object') {
            if (Array.isArray(arg)) {
                relevantArgs[`arg${String(index)}`] = { type: 'Array', length: arg.length }
            } else {
                relevantArgs[`arg${String(index)}`] = { type: 'Object', keys: Object.keys(arg).length }
            }
        } else {
            relevantArgs[`arg${String(index)}`] = { type: typeof arg }
        }
    })
    
    return relevantArgs
}

/**
 * 🎯 Determines result metadata for logging
 */
export function extractResultMetadata(result: unknown): { type: string; size?: number } {
    if (result === null || result === undefined) {
        return { type: typeof result }
    }
    
    if (Array.isArray(result)) {
        return { type: 'Array', size: result.length }
    }
    
    if (typeof result === 'object') {
        return { type: 'Object', size: Object.keys(result).length }
    }
    
    return { type: typeof result }
}