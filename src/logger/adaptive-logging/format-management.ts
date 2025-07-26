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
██         🔄 ADAPTIVE LOGGING - FORMAT MANAGEMENT & SWITCHING               ██
██                    ENVIRONMENT-ADAPTIVE FORMAT LOGIC                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 FORMAT SWITCHING AND MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep, WritableDeep } from 'type-fest'
import { toWritable } from '@/utils/data-utils.ts'
import { detectEnvironment } from './environment-detection.ts'
import {
    type EnvironmentType,
    type IFormattedLogEntry,
    type IHumanLogOutput,
    type IJsonLogOutput,
    type IFormatConfig
} from './types.ts'

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
// 🎛️ AUTO-CONFIGURATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎛️ **Auto-configure format based on environment**
 * Returns optimal configuration for detected environment
 * 
 * @param overrides - Optional configuration overrides
 * 
 * @returns Optimized format configuration for current environment
 *
 * @example
 * ```typescript
 * const config = autoConfigureFormat({ format: 'hybrid' });
 * console.log(`Using ${config.format} format`);
 * ```
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
    }
}

/**
 * 🎯 **Create format configuration factory**
 * Convenience function for creating custom configurations
 * 
 * @param environment - Target environment type
 * @param overrides - Optional configuration overrides
 * 
 * @returns Custom format configuration
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

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 FORMAT FACTORIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 👤 **Create human-readable log output**
 * Generates colored, formatted string for development
 * 
 * @param entry - Formatted log entry to convert
 * @param config - Optional format configuration
 * 
 * @returns Human-readable log output with colors and formatting
 *
 * @example
 * ```typescript
 * const output = createHumanOutput(logEntry, config);
 * console.log(output.formatted);
 * ```
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
 * 
 * @param entry - Formatted log entry to convert
 * @param config - Optional format configuration
 * 
 * @returns Structured JSON log output
 */
export function createJsonOutput(
    entry: ReadonlyDeep<IFormattedLogEntry>,
    config: ReadonlyDeep<IFormatConfig> = DEFAULT_FORMAT_CONFIG
): IJsonLogOutput {
    const { jsonOptions } = config
    
    // Initialize required fields first - guarantees type safety
    const requiredFields: Pick<IJsonLogOutput, 'timestamp' | 'level' | 'msg' | 'method' | 'file'> = {
        timestamp: entry.timestamp,
        level: entry.level,
        msg: entry.message,
        method: entry.context.method,
        file: entry.context.file
    }
    
    // Build complete output object with all optional fields
    const output: IJsonLogOutput = {
        ...requiredFields,
        ...createContextFields(entry),
        ...createCorrelationFields(entry),
        ...createSemanticFields(entry),
        ...createPerformanceFields(entry),
        ...createRawDataFields(entry, jsonOptions),
        ...createErrorFields(entry, jsonOptions),
        ...createMetadataFields(entry, jsonOptions),
        ...jsonOptions.customFields
    }
    
    return output
}

/**
 * 🔄 **Main format switching function**
 * Decides format based on configuration and context
 * 
 * @param entry - Formatted log entry to process
 * @param config - Optional format configuration
 * 
 * @returns Either human or JSON formatted output based on configuration
 *
 * @example
 * ```typescript
 * const formatted = formatLogEntry(entry, config);
 * if ('formatted' in formatted) {
 *   console.log(formatted.formatted);
 * }
 * ```
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
// 🏗️ FIELD CREATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏗️ **Create context fields**
 * 
 * @param entry - Log entry containing context information
 * 
 * @returns Partial JSON output with context fields
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
 * 
 * @param entry - Log entry containing correlation information
 * 
 * @returns Partial JSON output with correlation fields
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
 * 
 * @param entry - Log entry containing semantic information
 * 
 * @returns Partial JSON output with semantic fields
 */
function createSemanticFields(entry: ReadonlyDeep<IFormattedLogEntry>): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
    
    if (entry.semantic !== undefined) {
        fields.operation = entry.semantic.operation
        fields.domain = entry.semantic.domain
        fields.complexity = entry.semantic.complexity
    }
    
    return fields
}

/**
 * 🏗️ **Create performance fields**
 * 
 * @param entry - Log entry containing performance information
 * 
 * @returns Partial JSON output with performance fields
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
 * 
 * @param entry - Log entry containing raw data
 * @param jsonOptions - JSON formatting options
 * 
 * @returns Partial JSON output with raw data fields
 */
function createRawDataFields(
    entry: ReadonlyDeep<IFormattedLogEntry>, 
    jsonOptions: ReadonlyDeep<IFormatConfig['jsonOptions']>
): Partial<IJsonLogOutput> {
    const fields: WritableDeep<Partial<IJsonLogOutput>> = {}
     
    if (jsonOptions.includeArgs && entry.raw.args.length > 0) {
        fields.args = toWritable(entry.raw.args)
    }
    
    if (jsonOptions.includeResult && entry.raw.result !== undefined) {
        fields.result = entry.raw.result
    }
    
    return fields
}

/**
 * 🏗️ **Create error fields**
 * 
 * @param entry - Log entry containing error information
 * @param jsonOptions - JSON formatting options
 * 
 * @returns Partial JSON output with error fields
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
 * 
 * @param entry - Log entry containing metadata
 * @param jsonOptions - JSON formatting options
 * 
 * @returns Metadata fields for JSON output
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

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 PRIVATE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🕒 **Format timestamp based on configuration**
 * 
 * @param timestamp - ISO timestamp string
 * @param format - Desired timestamp format
 * 
 * @returns Formatted timestamp string
 */
function formatTimestamp(timestamp: string, format: 'iso' | 'relative' | 'time-only'): string {
    const date = new Date(timestamp)
    
    switch (format) {
    case 'iso':
        return date.toISOString()
    case 'relative': {
        const now = new Date()
        const diff = now.getTime() - date.getTime()

        if (diff < 1000) {
            return 'now'
        }
        if (diff < 60000) {
            return `${Math.floor(diff / 1000).toString()}s ago`
        }
        if (diff < 3600000) {
            return `${Math.floor(diff / 60000).toString()}m ago`
        }
        
        return `${Math.floor(diff / 3600000).toString()}h ago`
    }
    case 'time-only':
    default:
        return date.toTimeString().split(' ')[0] ?? ''
    }
}

/**
 * 🎨 **Get level styling information**
 * 
 * @param level - Log level string
 * @param useColors - Whether to include color codes
 * @param useSymbols - Whether to include symbols
 * 
 * @returns Level styling information
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
 * 
 * @param entry - Log entry to format
 * @param levelInfo - Level styling information
 * @param timestamp - Formatted timestamp
 * @param methodInfo - Method information string
 * @param location - Location information string
 * @param options - Human formatting options
 * 
 * @returns Multi-line formatted string
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
    if (entry.semantic !== undefined) {
        const semanticLine = `
        🎯 ${String(entry.semantic.operation)} → ${String(entry.semantic.domain)} (${String(entry.semantic.complexity)})`
        lines.push(semanticLine)
    }
    
    // Performance info
    if (entry.performance) {
        // eslint-disable-next-line max-len
        const performanceLine = `  ⏱️  ${entry.performance.duration.toString()}ms | 💾 ${entry.performance.memory.toString()}MB`
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
 * 
 * @param entry - Log entry to format
 * @param levelInfo - Level styling information
 * @param timestamp - Formatted timestamp
 * @param methodInfo - Method information string
 * @param location - Location information string
 * 
 * @returns Table-formatted string
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