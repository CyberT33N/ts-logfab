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
██            🎯 ADAPTIVE LOGGING - LOGGER FACTORY & SINGLETON               ██
██                    HYBRID LOGGER MANAGEMENT & CREATION                    ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 LOGGER FACTORY AND SINGLETON MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

import { readFileSync } from 'fs'
import { join } from 'path'
import { pino } from 'pino'
import pretty from 'pino-pretty'
import { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'
import { PackageJson } from 'zod-package-json'
import { resolveLoggingFormat, getLoggingConfig, type LoggingFormat } from '@/env.ts'
import { createEnterprisePrettyConfig } from '@/prettifiers/index.ts'
import { type IStructuredLogEntry, type IHybridLoggerConfig } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE TYPE DEFINITIONS & ZOD SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Base Logger Information Interface**
 * 
 * Enterprise-grade type definition for logger base information
 * Used for consistent logger metadata across all instances
 */
export interface IBaseLoggerInfo {
    /** Service/Package name (branded type for type safety) */
    readonly name: string
    /** Package author information */
    readonly author?: string | Record<string, unknown> | undefined
    /** Semantic version (branded type) */
    readonly version: string
    /** Runtime environment (branded type) */
    readonly environment?: string | undefined
    /** Node.js version (branded type) */
    readonly nodeVersion: string
    /** Operating system platform */
    readonly platform: string
    /** Configured logging format */
    readonly loggingFormat: Exclude<LoggingFormat, 'auto'>
    /** Whether structured data logging is enabled */
    readonly structuredData: boolean
}

/**
 * 🎯 **Base Logger Information Schema**
 * 
 * Zod schema for runtime validation of base logger information
 * Implements enterprise-grade validation with comprehensive error handling
 */
const baseLoggerInfoSchema = z.object({
    name: z.string().min(1).describe('Service/Package name'),
    author: z.union([
        z.string(),
        z.record(z.unknown()),
        z.undefined()
    ]).optional().describe('Package author information'),
    version: z.string().regex(/^\d+\.\d+\.\d+/, 'Must be valid semantic version').describe('Semantic version'),
    environment: z.string().optional().describe('Runtime environment'),
    nodeVersion: z.string().regex(/^v?\d+\.\d+\.\d+/, 'Must be valid Node.js version').describe('Node.js version'),
    platform: z.string().min(1).describe('Operating system platform'),
    loggingFormat: z.enum(['human', 'machine']).describe('Configured logging format'),
    structuredData: z.boolean().describe('Whether structured data logging is enabled')
}).strict()

/**
 * 🎯 **Raw Log Entry Schema**
 * 
 * Schema for validating incoming log entries before transformation
 */
const rawLogEntrySchema = z.object({
    level: z.union([z.string(), z.number()]).optional(),
    msg: z.unknown().optional(),
    hostname: z.string().optional(),
    data: z.record(z.unknown()).optional(),
    performance: z.object({
        method: z.string().optional(),
        duration: z.number().optional(),
        memoryUsage: z.number().optional(),
        success: z.boolean().optional(),
        anomalies: z.array(z.unknown()).readonly().optional()
    }).optional(),
    anomaly: z.object({
        type: z.string().optional(),
        severity: z.string().optional(),
        confidence: z.number().optional(),
        method: z.string().optional(),
        current: z.number().optional(),
        expected: z.number().optional(),
        deviation: z.number().optional()
    }).optional(),
    context: z.object({
        correlationId: z.string().optional(),
        requestId: z.string().optional(),
        workflowId: z.string().optional(),
        operationId: z.string().optional(),
        userId: z.string().optional()
    }).optional(),
    metadata: z.record(z.unknown()).optional()
}).passthrough() // Allow additional properties

/**
 * 🎯 **Structured Log Entry Schema**
 * 
 * Enterprise-grade schema for structured log entries
 * Ensures data consistency and type safety at runtime
 */
const structuredLogEntrySchema = z.object({
    timestamp: z.string().datetime().describe('ISO 8601 timestamp'),
    level: z.string().min(1).describe('Log level'),
    message: z.string().describe('Log message'),
    service: z.string().min(1).describe('Service name'),
    version: z.string().regex(/^\d+\.\d+\.\d+/, 'Must be valid semantic version').describe('Service version'),
    environment: z.string().describe('Runtime environment'),
    nodeVersion: z.string().regex(/^v?\d+\.\d+\.\d+/, 'Must be valid Node.js version').describe('Node.js version'),
    platform: z.string().min(1).describe('Operating system platform'),
    pid: z.number().int().positive().describe('Process ID'),
    hostname: z.string().describe('Hostname'),
    data: z.record(z.unknown()).optional().describe('Additional log data'),
    performance: z.object({
        method: z.string().optional(),
        duration: z.number().optional(),
        memoryUsage: z.number().optional(),
        success: z.boolean().optional(),
        anomalies: z.array(z.unknown()).readonly().optional()
    }).optional().describe('Performance metrics'),
    anomaly: z.object({
        type: z.string().optional(),
        severity: z.string().optional(),
        confidence: z.number().optional(),
        method: z.string().optional(),
        current: z.number().optional(),
        expected: z.number().optional(),
        deviation: z.number().optional()
    }).optional().describe('Anomaly detection data'),
    context: z.object({
        correlationId: z.string().optional(),
        requestId: z.string().optional(),
        workflowId: z.string().optional(),
        operationId: z.string().optional(),
        userId: z.string().optional()
    }).optional().describe('Context information'),
    metadata: z.record(z.unknown()).optional().describe('Additional metadata')
}).strict()

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SINGLETON LOGGER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Singleton Logger Cache**
 * 
 * Prevents EventEmitter memory leaks by reusing logger instances
 */
const loggerCache = new Map<string, pino.Logger>()

/**
 * 🎯 **Singleton Stream Cache**
 * 
 * Prevents EventEmitter memory leaks by reusing streams
 */
const streamCache = new Map<string, NodeJS.WritableStream>()

/**
 * 🎯 **Get or create cached stream**
 * 
 * Reuses existing streams to prevent EventEmitter memory leaks
 * 
 * @param format - Logging format type
 * 
 * @returns Cached or new writable stream
 */
function getCachedStream(format: Exclude<LoggingFormat, 'auto'>): NodeJS.WritableStream {
    const cacheKey = `stream-${format}`
    
    const cachedStream = streamCache.get(cacheKey)
    if (cachedStream) {
        return cachedStream
    }
    
    const stream = format === 'human' ? createHumanStream() : createMachineStream()
    streamCache.set(cacheKey, stream)
    return stream
}

/**
 * 🎯 **Generate logger cache key**
 * Creates unique cache key for logger configuration
 * 
 * @param config - Logger configuration
 * 
 * @returns Unique cache key string
 */
function generateLoggerCacheKey(config: ReadonlyDeep<IHybridLoggerConfig>): string {
    return `${config.format}-${config.name}-${config.level}-${String(config.enableStructuredData)}`
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 STREAM CREATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create human-readable stream (Development)**
 * Beautiful, colored output optimized for developer experience
 * 
 * @returns Pretty-formatted writable stream
 */
function createHumanStream(): NodeJS.WritableStream {
    const prettyConfig = createEnterprisePrettyConfig()
    return pretty({
        ...prettyConfig,
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname',
        destination: process.stdout
    })
}

/**
 * 🎯 **Create machine-readable stream (Production)**
 * JSON structured output optimized for log aggregation and ML processing
 * 
 * @returns Machine-readable writable stream
 */
function createMachineStream(): NodeJS.WritableStream {
    return process.stderr
}

/**
 * 🎯 **Transform log entry to structured format with Zod validation**
 * 
 * Enterprise-grade transformation with runtime validation and error handling
 * Ensures data integrity and type safety at runtime
 * 
 * @param logEntry - Raw log entry to transform
 * @param baseInfo - Base logger information
 * 
 * @returns Validated structured log entry
 *
 * @throws {Error} When validation fails
 */
function transformToStructuredEntry(
    logEntry: ReadonlyDeep<unknown>,
    baseInfo: ReadonlyDeep<IBaseLoggerInfo>
): IStructuredLogEntry {
    try {
        // Validate base info with Zod schema
        const validatedBaseInfo = baseLoggerInfoSchema.parse(baseInfo)
        
        // Parse and validate raw log entry
        const parsedLogEntry = rawLogEntrySchema.parse(logEntry)
        
        // Create structured entry
        const now = new Date().toISOString()
        
        // Safe level conversion (Pino delivers level as NUMBER, we need STRING)
        const safeLevelToString = (level: unknown): string => {
            const numberResult = z.number().safeParse(level)
            if (numberResult.success) {
                // Convert Pino numeric levels to string labels (using bracket notation for ESLint)
                const levelMap = {
                    [10]: 'trace',
                    [20]: 'debug', 
                    [30]: 'info',
                    [40]: 'warn',
                    [50]: 'error',
                    [60]: 'fatal'
                } as const
                return levelMap[numberResult.data as keyof typeof levelMap]
            }
            
            const stringResult = z.string().safeParse(level)
            if (stringResult.success) {
                return stringResult.data
            }
            
            return 'info' // fallback
        }
        
        // Safe string fallback (only for potentially undefined values)
        const safeStringFallback = (value: unknown, fallback: string): string => {
            const result = z.string().safeParse(value)
            return result.success ? result.data : fallback
        }
        
        // Safe message conversion (Pino msg should be string, but ensure it's safe)
        const safeMessage = (msg: unknown): string => {
            if (typeof msg === 'string') {
                return msg
            }
            if (typeof msg === 'undefined' || msg === null) {
                return ''
            }
            if (typeof msg === 'number' || typeof msg === 'boolean') {
                return String(msg)
            }
            // For objects, use JSON.stringify to avoid [object Object]
            return JSON.stringify(msg)
        }
        
        // Build structured log entry
        const structuredEntry: IStructuredLogEntry = {
            timestamp: now,
            level: safeLevelToString(parsedLogEntry.level),
            message: safeMessage(parsedLogEntry.msg),
            service: validatedBaseInfo.name,
            version: validatedBaseInfo.version,
            environment: validatedBaseInfo.environment ?? 'unknown',
            nodeVersion: validatedBaseInfo.nodeVersion,
            platform: validatedBaseInfo.platform,
            pid: process.pid,
            hostname: safeStringFallback(parsedLogEntry.hostname, 'unknown'),
            data: parsedLogEntry.data,
            performance: parsedLogEntry.performance,
            anomaly: parsedLogEntry.anomaly,
            context: parsedLogEntry.context,
            metadata: parsedLogEntry.metadata
        }
        
        // Validate final structured entry
        return structuredLogEntrySchema.parse(structuredEntry)
    } catch (error) {
        // Enterprise-grade error handling
        if (error instanceof z.ZodError) {
            // Log validation error details for debugging
            console.error('🚨 Structured log entry validation failed:', {
                errors: error.errors,
                receivedLogEntry: logEntry,
                receivedBaseInfo: baseInfo
            })
            
            // Return a minimal valid entry as fallback
            return structuredLogEntrySchema.parse({
                timestamp: new Date().toISOString(),
                level: 'error',
                message: 'Log validation failed',
                service: 'ts-logfab',
                nodeVersion: process.version,
                platform: process.platform,
                pid: process.pid
            })
        }
        
        // Re-throw unexpected errors
        throw error
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 HYBRID LOGGER FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create hybrid logger configuration**
 * 
 * Automatically detects environment and configures appropriate output format
 * 
 * @returns Hybrid logger configuration based on environment
 *
 * @example
 * ```typescript
 * const config = createHybridLoggerConfig();
 * console.log(`Format: ${config.format}`);
 * ```
 */
export function createHybridLoggerConfig(): IHybridLoggerConfig {
    const loggingConfig = getLoggingConfig()
    const isDevelopment = loggingConfig.nodeEnv === 'development'
    const isTest = loggingConfig.nodeEnv === 'test'
    
    return {
        format: loggingConfig.format,
        name: 'ts-logfab',
        level: isDevelopment ? 'debug' : (isTest ? 'debug' : 'info'),
        base: {},
        enableStructuredData: loggingConfig.isMachine,
        outputStream: loggingConfig.isMachine ? 'stderr' : 'stdout',
        enableColors: loggingConfig.isHuman,
        enablePrettyPrint: loggingConfig.isHuman
    }
}

/**
 * 🎯 **Create hybrid logger instance**
 * 
 * Creates environment-adaptive logger with appropriate output format
 * Uses singleton pattern to prevent EventEmitter memory leaks
 * @param config - Optional configuration overrides
 * 
 * @returns Configured pino logger instance
 *
 * @example
 * ```typescript
 * const logger = createHybridLogger({ level: 'debug' });
 * logger.info('Application started');
 * ```
 */
export function createHybridLogger(
    config: ReadonlyDeep<Partial<IHybridLoggerConfig>> = {}
): pino.Logger {
    const defaultConfig = createHybridLoggerConfig()
    const finalConfig: IHybridLoggerConfig = {
        ...defaultConfig,
        ...config
    }
    
    // Check if we already have a cached logger for this configuration
    const cacheKey = generateLoggerCacheKey(finalConfig)
    const cachedLogger = loggerCache.get(cacheKey)
    if (cachedLogger) {
        return cachedLogger
    }
    
    // Load package.json information
    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))
    
    // Create base logger information with proper typing
    const baseInfo: IBaseLoggerInfo = {
        name: packageJson.name,
        author: packageJson.author,
        version: packageJson.version,
        environment: process.env.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform,
        loggingFormat: finalConfig.format,
        structuredData: finalConfig.enableStructuredData
    }
    
    // Validate base info at creation time
    const validatedBaseInfo = baseLoggerInfoSchema.parse(baseInfo)
    
    // Create appropriate stream based on format (cached to prevent leaks)
    const stream = getCachedStream(finalConfig.format)
    
    // Create pino logger
    const logger = pino(
        {
            name: finalConfig.name,
            level: finalConfig.level,
            base: validatedBaseInfo
        },
        stream
    )
    
    // For machine format, add structured data transformation
    if (finalConfig.format === 'machine' && finalConfig.enableStructuredData) {
        // Override the logger methods to add structured transformation
        const originalInfo = logger.info.bind(logger)
        const originalWarn = logger.warn.bind(logger)
        const originalError = logger.error.bind(logger)
        const originalDebug = logger.debug.bind(logger)
        
        logger.info = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj, validatedBaseInfo)
                originalInfo(structured, msg, ...args)
                return
            }

            originalInfo(obj, msg, ...args)
        }
        
        logger.warn = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj, validatedBaseInfo)
                originalWarn(structured, msg, ...args)
                return
            }

            originalWarn(obj, msg, ...args)
        }
        
        logger.error = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj, validatedBaseInfo)
                originalError(structured, msg, ...args)
                return
            }

            originalError(obj, msg, ...args)
        }
        
        logger.debug = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj, validatedBaseInfo)
                originalDebug(structured, msg, ...args)
                return
            }

            originalDebug(obj, msg, ...args)
        }
    }
    
    // Log initialization message
    logger.info({
        hybridLogger: {
            initialized: true,
            format: finalConfig.format,
            structuredData: finalConfig.enableStructuredData,
            outputStream: finalConfig.outputStream,
            colors: finalConfig.enableColors,
            prettyPrint: finalConfig.enablePrettyPrint
        }
    }, `🎯 Hybrid Logger initialized (${finalConfig.format} format)`)
    
    // Cache the logger to prevent EventEmitter memory leaks
    loggerCache.set(cacheKey, logger)
    
    return logger
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONVENIENCE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create development logger (human format)**
 * 
 * @returns Development-optimized logger
 */
export function createDevelopmentLogger(): pino.Logger {
    return createHybridLogger({
        format: 'human',
        enableStructuredData: false,
        enableColors: true,
        enablePrettyPrint: true
    })
}

/**
 * 🎯 **Create production logger (machine format)**
 * 
 * @returns Production-optimized logger
 */
export function createProductionLogger(): pino.Logger {
    return createHybridLogger({
        format: 'machine',
        enableStructuredData: true,
        enableColors: false,
        enablePrettyPrint: false
    })
}

/**
 * 🎯 **Get current logging format**
 * 
 * @returns Current logging format
 */
export function getCurrentLoggingFormat(): Exclude<LoggingFormat, 'auto'> {
    return resolveLoggingFormat()
}

/**
 * 🎯 **Check if running in structured logging mode**
 * 
 * @returns True if structured logging is enabled
 */
export function isStructuredLoggingEnabled(): boolean {
    return resolveLoggingFormat() === 'machine'
} 