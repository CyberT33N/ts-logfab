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
██                🎯 HYBRID LOGGER - ENVIRONMENT-ADAPTIVE LOGGING            ██
██                         HUMAN vs MACHINE OUTPUT FORMATS                   ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { readFileSync } from 'fs'
import { join } from 'path'
import { pino } from 'pino'
import pretty from 'pino-pretty'
import { ReadonlyDeep } from 'type-fest'
import { PackageJson } from 'zod-package-json'
import { resolveLoggingFormat, getLoggingConfig, type LoggingFormat } from '@/env.ts'
import { createEnterprisePrettyConfig } from '@/prettifiers/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 HYBRID LOGGER INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Structured Log Entry for Machine Processing**
 * 
 * Optimized for ML parsing and production monitoring
 */
export interface IStructuredLogEntry {
    readonly timestamp: string
    readonly level: string
    readonly message: string
    readonly service: string
    readonly version: string
    readonly environment: string
    readonly nodeVersion: string
    readonly platform: string
    readonly pid: number
    readonly hostname: string
    readonly data?: Record<string, unknown>
    readonly performance?: {
        readonly method?: string
        readonly duration?: number
        readonly memoryUsage?: number
        readonly success?: boolean
        readonly anomalies?: readonly unknown[]
    }
    readonly anomaly?: {
        readonly type?: string
        readonly severity?: string
        readonly confidence?: number
        readonly method?: string
        readonly current?: number
        readonly expected?: number
        readonly deviation?: number
    }
    readonly context?: {
        readonly correlationId?: string
        readonly requestId?: string
        readonly workflowId?: string
        readonly operationId?: string
        readonly userId?: string
    }
    readonly metadata?: Record<string, unknown>
}

/**
 * 🎯 **Hybrid Logger Configuration**
 */
export interface IHybridLoggerConfig {
    readonly format: Exclude<LoggingFormat, 'auto'>
    readonly name: string
    readonly level: string
    readonly base: Record<string, unknown>
    readonly enableStructuredData: boolean
    readonly outputStream: 'stdout' | 'stderr'
    readonly enableColors: boolean
    readonly enablePrettyPrint: boolean
}

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
 * 
 * Creates unique cache key for logger configuration
 */
function generateLoggerCacheKey(config: ReadonlyDeep<IHybridLoggerConfig>): string {
    return `${config.format}-${config.name}-${config.level}-${String(config.enableStructuredData)}`
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 STREAM CREATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create human-readable stream (Development)**
 * 
 * Beautiful, colored output optimized for developer experience
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
 * 
 * JSON structured output optimized for log aggregation and ML processing
 */
function createMachineStream(): NodeJS.WritableStream {
    return process.stderr
}

/**
 * 🎯 **Transform log entry to structured format**
 * 
 * Converts pino log entries to standardized structured format
 */
function transformToStructuredEntry(
    logEntry: ReadonlyDeep<Record<string, unknown>>,
    baseInfo: ReadonlyDeep<Record<string, unknown>>
): IStructuredLogEntry {
    const now = new Date().toISOString()
    
    // Safe string conversion function
    const safeString = (value: unknown, fallback: string): string => {
        if (typeof value === 'string') {return value}
        if (typeof value === 'number') {return value.toString()}
        if (typeof value === 'boolean') {return value.toString()}
        return fallback
    }
    
    return {
        timestamp: now,
        level: safeString(logEntry.level, 'info'),
        message: safeString(logEntry.msg, ''),
        service: safeString(baseInfo.name, 'unknown'),
        version: safeString(baseInfo.version, '0.0.0'),
        environment: safeString(baseInfo.environment, 'unknown'),
        nodeVersion: safeString(baseInfo.nodeVersion, process.version),
        platform: safeString(baseInfo.platform, process.platform),
        pid: process.pid,
        hostname: safeString(logEntry.hostname, 'unknown'),
        data: logEntry.data as Record<string, unknown>,
        performance: logEntry.performance as IStructuredLogEntry['performance'],
        anomaly: logEntry.anomaly as IStructuredLogEntry['anomaly'],
        context: logEntry.context as IStructuredLogEntry['context'],
        metadata: logEntry.metadata as Record<string, unknown>
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 HYBRID LOGGER FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create hybrid logger configuration**
 * 
 * Automatically detects environment and configures appropriate output format
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
    
    // Create base logger information
    const baseInfo = {
        name: packageJson.name,
        author: packageJson.author,
        version: packageJson.version,
        environment: process.env.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform,
        loggingFormat: finalConfig.format,
        structuredData: finalConfig.enableStructuredData
    }
    
    // Create appropriate stream based on format (cached to prevent leaks)
    const stream = getCachedStream(finalConfig.format)
    
    // Create pino logger
    const logger = pino(
        {
            name: finalConfig.name,
            level: finalConfig.level,
            base: baseInfo
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
                const structured = transformToStructuredEntry(obj as Record<string, unknown>, baseInfo)
                originalInfo(structured, msg, ...args); return
            }
            originalInfo(obj, msg, ...args)
        }
        
        logger.warn = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj as Record<string, unknown>, baseInfo)
                originalWarn(structured, msg, ...args); return
            }
            originalWarn(obj, msg, ...args)
        }
        
        logger.error = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj as Record<string, unknown>, baseInfo)
                originalError(structured, msg, ...args); return
            }
            originalError(obj, msg, ...args)
        }
        
        logger.debug = (obj: ReadonlyDeep<unknown>, msg?: string, ...args: ReadonlyDeep<unknown[]>): void => {
            if (typeof obj === 'object' && obj !== null) {
                const structured = transformToStructuredEntry(obj as Record<string, unknown>, baseInfo)
                originalDebug(structured, msg, ...args); return
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
 */
export function getCurrentLoggingFormat(): Exclude<LoggingFormat, 'auto'> {
    return resolveLoggingFormat()
}

/**
 * 🎯 **Check if running in structured logging mode**
 */
export function isStructuredLoggingEnabled(): boolean {
    return resolveLoggingFormat() === 'machine'
} 