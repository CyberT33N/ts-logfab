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
// 🔄 ENVIRONMENT FORMAT SWITCHING - HYBRID LOGGING FORMATS
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep, WritableDeep } from 'type-fest'
import { ICorrelationContext } from './correlation-context.ts'
import { ISemanticContext } from './semantic-detector.ts'

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
// 📊 DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_FORMAT_CONFIG: IFormatConfig = {
    environment: 'development',
    format: 'hybrid',
    humanOptions: {
        useColors: true,
        useSymbols: true,
        layout: 'multi-line',
        includeStackTrace: false,
        maxArgsLength: 200,
        timestampFormat: 'time-only'
    },
    jsonOptions: {
        includeStackTrace: true,
        includeArgs: true,
        includeResult: false,
        flattenMetadata: true,
        customFields: {}
    },
    hybrid: {
        developmentFormat: 'human',
        productionFormat: 'json',
        errorAlwaysJson: true,
        performanceThreshold: 1000 // 1 second
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 ENVIRONMENT DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🌍 **Detect current environment**
 * Checks NODE_ENV and other environment indicators
 */
export function detectEnvironment(): EnvironmentType {
    const nodeEnv = process.env.NODE_ENV?.toLowerCase()
    
    // Check explicit environment settings
    if (nodeEnv === 'production' || nodeEnv === 'prod') {
        return 'production'
    }
    
    if (nodeEnv === 'staging' || nodeEnv === 'stage') {
        return 'staging'
    }
    
    if (nodeEnv === 'test' || nodeEnv === 'testing') {
        return 'test'
    }
    
    // Check for production cloud indicators
    if (hasProductionIndicators()) {
        return 'production'
    }
    
    // Default to development
    return 'development'
}

/**
 * 🔍 **Check for production cloud indicators**
 * Helper function to detect cloud production environments
 */
function hasProductionIndicators(): boolean {
    const nodeEnv = process.env.NODE_ENV
    const vercel = process.env.VERCEL
    const netlify = process.env.NETLIFY  
    const heroku = process.env.HEROKU
    const awsLambda = process.env.AWS_LAMBDA_FUNCTION_NAME
    
    return Boolean(
        nodeEnv === 'production' ||
        (vercel !== undefined && vercel !== '') ||
        (netlify !== undefined && netlify !== '') ||
        (heroku !== undefined && heroku !== '') ||
        (awsLambda !== undefined && awsLambda !== '')
    )
}

/**
 * 🎛️ **Auto-configure format based on environment**
 * Returns optimal configuration for detected environment
 */
export function autoConfigureFormat(
    overrides: ReadonlyDeep<Partial<IFormatConfig>> = {}
): IFormatConfig {
    const environment = detectEnvironment()
    
    let baseConfig: Partial<IFormatConfig>
    
    switch (environment) {
    case 'production': {
        baseConfig = {
            environment,
            format: 'json',
            humanOptions: {
                ...DEFAULT_FORMAT_CONFIG.humanOptions,
                useColors: false,
                includeStackTrace: false
            },
            jsonOptions: {
                ...DEFAULT_FORMAT_CONFIG.jsonOptions,
                includeArgs: false,
                includeResult: false
            }
        }
        break
    }
            
    case 'staging': {
        baseConfig = {
            environment,
            format: 'hybrid',
            hybrid: {
                ...DEFAULT_FORMAT_CONFIG.hybrid,
                developmentFormat: 'human',
                productionFormat: 'json',
                errorAlwaysJson: true
            }
        }
        break
    }
            
    case 'test': {
        baseConfig = {
            environment,
            format: 'json',
            humanOptions: {
                ...DEFAULT_FORMAT_CONFIG.humanOptions,
                useColors: false,
                useSymbols: false
            },
            jsonOptions: {
                ...DEFAULT_FORMAT_CONFIG.jsonOptions,
                includeStackTrace: false
            }
        }
        break
    }
            
    case 'development':
    default: {
        baseConfig = {
            environment,
            format: 'human',
            humanOptions: {
                ...DEFAULT_FORMAT_CONFIG.humanOptions,
                useColors: true,
                useSymbols: true,
                layout: 'multi-line'
            }
        }
        break
    }
    }
    
    return {
        ...DEFAULT_FORMAT_CONFIG,
        ...baseConfig,
        ...overrides
    } as IFormatConfig
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 FORMAT FACTORIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 👤 **Create human-readable log output**
 * Generates colored, formatted string for development
 */
export function createHumanOutput(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    config: ReadonlyDeep<IFormatConfig> = DEFAULT_FORMAT_CONFIG
): IHumanLogOutput {
    const { humanOptions } = config
    const timestamp = formatTimestamp(entry.timestamp, humanOptions.timestampFormat)
    
    // Determine color and symbol based on level
    const levelInfo = getLevelStyle(entry.level, humanOptions.useColors, humanOptions.useSymbols)
    
    // Format main message with explicit null checks
    const methodInfo = (entry.context.class !== undefined && entry.context.class !== '')
        ? `${entry.context.class}.${entry.context.method}`
        : entry.context.method
    
    const location = (entry.context.line !== undefined)
        ? `${entry.context.file}:${entry.context.line.toString()}`
        : entry.context.file
    
    // Build formatted string based on layout
    let formatted: string
    
    switch (humanOptions.layout) {
    case 'single-line': {
        formatted = `${timestamp} ${levelInfo.symbol} [${methodInfo}] ${entry.message}`
        if (entry.performance) {
            formatted += ` (${entry.performance.duration.toString()}ms)`
        }
        break
    }
            
    case 'table': {
        // Table format for complex data
        formatted = createTableFormat(entry, levelInfo, timestamp, methodInfo, location)
        break
    }
            
    case 'multi-line':
    default: {
        formatted = createMultiLineFormat(entry, levelInfo, timestamp, methodInfo, location, humanOptions)
        break
    }
    }
    
    return {
        formatted,
        colorCode: levelInfo.colorCode,
        symbols: levelInfo.symbol,
        layout: humanOptions.layout
    }
}

/**
 * 📊 **Create JSON log output**
 * Generates structured object for production logging
 */
export function createJsonOutput(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    config: ReadonlyDeep<IFormatConfig> = DEFAULT_FORMAT_CONFIG
): IJsonLogOutput {
    const { jsonOptions } = config
    
    // Build complete output object
    const output: Partial<IJsonLogOutput> = {
        timestamp: entry.timestamp,
        level: entry.level,
        msg: entry.message,
        method: entry.context.method,
        file: entry.context.file,
        ...createContextFields(entry),
        ...createCorrelationFields(entry),
        ...createSemanticFields(entry),
        ...createPerformanceFields(entry),
        ...createRawDataFields(entry, jsonOptions),
        ...createErrorFields(entry, jsonOptions),
        ...createMetadataFields(entry, jsonOptions),
        ...jsonOptions.customFields
    }
    
    return output as IJsonLogOutput
}

/**
 * 🏗️ **Create context fields**
 */
function createContextFields(entry: ReadonlyDeep<IFormattedLogEntry>): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.context.class !== undefined && entry.context.class !== '') {
        fields.class = entry.context.class
    }
    
    if (entry.context.line !== undefined && entry.context.line > 0) {
        fields.line = entry.context.line
    }
    
    return fields
}

/**
 * 🏗️ **Create correlation fields**
 */
function createCorrelationFields(entry: ReadonlyDeep<IFormattedLogEntry>): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.correlation) {
        fields.correlationId = entry.correlation.correlationId
        fields.workflowId = entry.correlation.workflowId
        
        if (entry.correlation.requestId !== undefined && entry.correlation.requestId !== '') {
            fields.requestId = entry.correlation.requestId
        }
    }
    
    return fields
}

/**
 * 🏗️ **Create semantic fields**
 */
function createSemanticFields(entry: ReadonlyDeep<IFormattedLogEntry>): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.semantic) {
        fields.operation = entry.semantic.operation
        fields.domain = entry.semantic.domain
        fields.complexity = entry.semantic.complexity
    }
    
    return fields
}

/**
 * 🏗️ **Create performance fields**
 */
function createPerformanceFields(entry: ReadonlyDeep<IFormattedLogEntry>): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.performance) {
        fields.duration = entry.performance.duration
        fields.memory = entry.performance.memory
    }
    
    return fields
}

/**
 * 🏗️ **Create raw data fields**
 */
function createRawDataFields(
    entry: ReadonlyDeep<IFormattedLogEntry>, 
    jsonOptions: ReadonlyDeep<IFormatConfig['jsonOptions']>
): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (jsonOptions.includeArgs && entry.raw.args.length > 0) {
        fields.args = entry.raw.args
    }
    
    if (jsonOptions.includeResult && entry.raw.result !== undefined) {
        fields.result = entry.raw.result
    }
    
    return fields
}

/**
 * 🏗️ **Create error fields**
 */
function createErrorFields(
    entry: ReadonlyDeep<IFormattedLogEntry>, 
    jsonOptions: ReadonlyDeep<IFormatConfig['jsonOptions']>
): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.raw.error) {
        fields.error = entry.raw.error.message
        
        if (jsonOptions.includeStackTrace && 
            entry.raw.error.stack !== undefined && 
            entry.raw.error.stack !== '') {
            fields.stack = entry.raw.error.stack
        }
    }
    
    return fields
}

/**
 * 🏗️ **Create metadata fields**
 */
function createMetadataFields(
    entry: ReadonlyDeep<IFormattedLogEntry>, 
    jsonOptions: ReadonlyDeep<IFormatConfig['jsonOptions']>
): Record<string, unknown> {
    if (!entry.metadata) {
        return {}
    }
    
    return jsonOptions.flattenMetadata ? entry.metadata : { metadata: entry.metadata }
}

/**
 * 🔄 **Main format switching function**
 * Decides format based on configuration and context
 */
export function formatLogEntry(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    config: ReadonlyDeep<IFormatConfig> = autoConfigureFormat()
): IHumanLogOutput | IJsonLogOutput {
    let formatType = config.format
    
    // Hybrid format logic
    if (config.format === 'hybrid') {
        const isError = entry.level === 'error' || Boolean(entry.raw.error)
        const isSlowOperation = Boolean(entry.performance?.duration) && 
            (entry.performance?.duration ?? 0) > config.hybrid.performanceThreshold
        
        if (isError && config.hybrid.errorAlwaysJson) {
            formatType = 'json'
        } else if (isSlowOperation) {
            formatType = 'json'
        } else if (config.environment === 'production') {
            formatType = config.hybrid.productionFormat
        } else {
            formatType = config.hybrid.developmentFormat
        }
    }
    
    // Generate output
    switch (formatType) {
    case 'human':
        return createHumanOutput(entry, config)
    case 'json':
        return createJsonOutput(entry, config)
    case 'hybrid':
        // Hybrid should have been resolved above, fallback to human
        return createHumanOutput(entry, config)
    default:
        return createHumanOutput(entry, config)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 PRIVATE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🕒 **Format timestamp based on configuration**
 */
function formatTimestamp(timestamp: string, format: 'iso' | 'relative' | 'time-only'): string {
    const date = new Date(timestamp)
    
    switch (format) {
    case 'iso':
        return date.toISOString()
    case 'relative': {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        if (diff < 1000) {return 'now'}
        if (diff < 60000) {return `${Math.floor(diff / 1000).toString()}s ago`}
        if (diff < 3600000) {return `${Math.floor(diff / 60000).toString()}m ago`}
        return `${Math.floor(diff / 3600000).toString()}h ago`
    }
    case 'time-only':
    default:
        return date.toTimeString().split(' ')[0] ?? ''
    }
}

/**
 * 🎨 **Get level styling information**
 */
function getLevelStyle(level: string, useColors: boolean, useSymbols: boolean): {
    symbol: string
    colorCode: string
} {
    const styles = {
        error: { symbol: '❌', color: '\x1b[31m' },   // Red
        warn: { symbol: '⚠️', color: '\x1b[33m' },    // Yellow
        info: { symbol: 'ℹ️', color: '\x1b[36m' },    // Cyan
        debug: { symbol: '🔍', color: '\x1b[90m' },   // Gray
        trace: { symbol: '🔬', color: '\x1b[90m' }    // Gray
    }
    
    const style = styles[level as keyof typeof styles]
    
    return {
        symbol: useSymbols ? style.symbol : level.toUpperCase(),
        colorCode: useColors ? style.color : ''
    }
}

/**
 * 📑 **Create multi-line format**
 */
function createMultiLineFormat(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    levelInfo: ReadonlyDeep<{ symbol: string; colorCode: string }>,
    timestamp: string,
    methodInfo: string,
    location: string,
    options: ReadonlyDeep<IFormatConfig['humanOptions']>
): string {
    const reset = options.useColors ? '\x1b[0m' : ''
    const lines: string[] = []
    
    // Header line
    lines.push(`${levelInfo.colorCode}${levelInfo.symbol} ${timestamp} [${methodInfo}]${reset}`)
    lines.push(`  📍 ${location}`)
    lines.push(`  💬 ${entry.message}`)
    
    // Correlation info
    if (entry.correlation) {
        lines.push(`  🔗 ${entry.correlation.correlationId}`)
    }
    
    // Semantic info
    if (entry.semantic) {
        const semanticLine = `  🎯 ${entry.semantic.operation} → ${entry.semantic.domain} (${entry.semantic.complexity})`
        lines.push(semanticLine)
    }
    
    // Performance info
    if (entry.performance) {
        const performanceLine = `  ⏱️  ${entry.performance.duration.toString()}ms |
         💾 ${entry.performance.memory.toString()}MB`
        lines.push(performanceLine)
    }
    
    // Arguments (truncated)
    if (entry.raw.args.length > 0) {
        const argsStr = JSON.stringify(entry.raw.args).substring(0, options.maxArgsLength)
        lines.push(`  📥 ${argsStr}${argsStr.length >= options.maxArgsLength ? '...' : ''}`)
    }
    
    // Error
    if (entry.raw.error) {
        lines.push(`  ❌ ${entry.raw.error.message}`)
        if (options.includeStackTrace && 
            entry.raw.error.stack !== undefined && 
            entry.raw.error.stack !== '') {
            lines.push(`     ${entry.raw.error.stack.replace(/\n/g, '\n     ')}`)
        }
    }
    
    return lines.join('\n')
}

/**
 * 📊 **Create table format**
 */
function createTableFormat(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    levelInfo: ReadonlyDeep<{ symbol: string; colorCode: string }>,
    timestamp: string,
    methodInfo: string,
    location: string
): string {
    // Simple table-like format
    const rows = [
        `┌─ ${levelInfo.symbol} ${entry.level.toUpperCase()} ${timestamp}`,
        `├─ Method: ${methodInfo}`,
        `├─ Location: ${location}`,
        `├─ Message: ${entry.message}`
    ]
    
    if (entry.correlation) {
        rows.push(`├─ Correlation: ${entry.correlation.correlationId}`)
    }
    
    if (entry.performance) {
        rows.push(`├─ Performance: ${entry.performance.duration.toString()}ms`)
    }
    
    rows.push('└─────────────────────')
    
    return rows.join('\n')
}

/**
 * 🎯 **Create format configuration factory**
 * Convenience function for creating custom configurations
 */
export function createFormatConfig(
    environment: EnvironmentType,
    overrides: ReadonlyDeep<Partial<IFormatConfig>> = {}
): IFormatConfig {
    return autoConfigureFormat({
        environment,
        ...overrides
    })
} 