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
██                🎯 ADAPTIVE LOGGING - UNIFIED TYPE DEFINITIONS              ██
██                         ENVIRONMENT-ADAPTIVE LOGGING TYPES                ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 ENVIRONMENT & FORMAT TYPES
// ═══════════════════════════════════════════════════════════════════════════════

import { type LoggingFormat } from '@/env.ts'
import { ICorrelationContext } from '@/logger/correlation-context/index.ts'
import { ISemanticContext } from '@/logger/semantic-detector.ts'

/**
 * 🌍 **Environment Types**
 * 
 * Different environments require different log formats
 */
export type EnvironmentType = 'development' | 'staging' | 'production' | 'test'

/**
 * 📝 **Log Format Types**
 * 
 * - human: Human-readable format with colors and visual elements
 * - json: Structured JSON for machine processing
 * - hybrid: Combination based on environment
 */
export type LogFormatType = 'human' | 'json' | 'hybrid'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 FORMAT-SWITCHER TYPES (from format-switcher.ts)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 📊 **Formatted Log Entry**
 * 
 * Complete log entry with all formatting applied
 */
export interface IFormattedLogEntry {
    readonly timestamp: string
    readonly level: string
    readonly message: string
    readonly context: {
        readonly method: string
        readonly class?: string
        readonly file: string
        readonly line?: number
    }
    readonly correlation?: ICorrelationContext
    readonly semantic?: ISemanticContext
    readonly performance?: {
        readonly duration: number
        readonly memory: number
    }
    readonly metadata?: Record<string, unknown>
    readonly raw: {
        readonly args: readonly unknown[]
        readonly result?: unknown
        readonly error?: Error
    }
}

/**
 * 📋 **Human-Readable Log Output**
 * 
 * Formatted string ready for console display
 */
export interface IHumanLogOutput {
    readonly formatted: string
    readonly colorCode: string
    readonly symbols: string
    readonly layout: 'single-line' | 'multi-line' | 'table'
}

/**
 * 📋 **JSON Log Output**
 * 
 * Structured object ready for JSON serialization
 */
export interface IJsonLogOutput {
    readonly timestamp: string
    readonly level: string
    readonly msg: string
    readonly method: string
    readonly class?: string
    readonly file: string
    readonly line?: number
    readonly correlationId?: string
    readonly workflowId?: string
    readonly requestId?: string
    readonly operation?: string
    readonly domain?: string
    readonly complexity?: string
    readonly duration?: number
    readonly memory?: number
    readonly args?: readonly unknown[]
    readonly result?: unknown
    readonly error?: string
    readonly stack?: string
    readonly metadata?: Record<string, unknown>
}

/**
 * ⚙️ **Format Configuration**
 * 
 * Controls how logs are formatted in different environments
 */
export interface IFormatConfig {
    readonly environment: EnvironmentType
    readonly format: LogFormatType
    readonly humanOptions: {
        readonly useColors: boolean
        readonly useSymbols: boolean
        readonly layout: 'single-line' | 'multi-line' | 'table'
        readonly includeStackTrace: boolean
        readonly maxArgsLength: number
        readonly timestampFormat: 'iso' | 'relative' | 'time-only'
    }
    readonly jsonOptions: {
        readonly includeStackTrace: boolean
        readonly includeArgs: boolean
        readonly includeResult: boolean
        readonly flattenMetadata: boolean
        readonly customFields: Record<string, string>
    }
    readonly hybrid: {
        readonly developmentFormat: LogFormatType
        readonly productionFormat: LogFormatType
        readonly errorAlwaysJson: boolean
        readonly performanceThreshold: number // ms - log as JSON if slower
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 HYBRID LOGGER TYPES (from hybrid-logger.ts)
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