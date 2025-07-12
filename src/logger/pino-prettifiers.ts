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
██                      🎨 AWARD-WINNING TERMINAL LOGGER                    ██
██                         ENTERPRISE-GRADE • TABLE-POWERED                 ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 AWARD-WINNING TERMINAL LOGGING ARCHITECTURE - CLI-TABLE3 POWERED DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

import { readFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'
import Table from 'cli-table3'
import type * as CliTable3 from 'cli-table3'
import type { PrettyOptions } from 'pino-pretty'
import terminalLink from 'terminal-link'
import type { ReadonlyDeep } from 'type-fest'
import env from '@/env.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 AWARD-WINNING UNIFIED COLOR PALETTE - TERMINAL HARMONY
// ═══════════════════════════════════════════════════════════════════════════════

const TERMINAL_COLORS = {
    // 🎯 ELEGANT MONOCHROME PALETTE - WHITE, YELLOW, BLACK, GRAY
    primary: chalk.hex('#FFFFFF'),        // Pure White
    secondary: chalk.hex('#CCCCCC'),      // Light Gray  
    accent: chalk.hex('#FFFF00'),         // Bright Yellow
    
    // 📊 STATUS PALETTE
    success: chalk.hex('#00DD00'),        // Bright Green
    warning: chalk.hex('#FFAA00'),        // Orange
    error: chalk.hex('#FF0000'),          // Bright Red
    critical: chalk.hex('#FF0044'),       // Critical Red
    
    // 🔧 UTILITY PALETTE
    text: chalk.hex('#FFFFFF'),           // Pure White Text
    muted: chalk.hex('#888888'),          // Medium Gray
    border: chalk.hex('#FFFFFF'),         // White Border (Default)
    errorBorder: chalk.hex('#FF0000'),    // RED Border for Errors
    background: chalk.hex('#000000'),     // Pure Black Background
    
    // 🎪 SPECIAL ELEMENTS
    highlight: chalk.hex('#FFFF00'),      // Bright Yellow Highlight
    timestamp: chalk.hex('#CCCCCC'),      // Light Gray Time
    icon: chalk.hex('#FFFF00'),           // Yellow Icons
    blue: chalk.hex('#00BBFF')            // Bright Blue for Debug
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PROFESSIONAL CLI-TABLE3 CONFIGURATION WITH LEVEL-BASED STYLING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Creates level-specific table configuration for CLI-Table3
 */
function createTableConfig(level: string): CliTable3.TableConstructorOptions & { _borderColor: any } {
    // 🎨 DYNAMIC BORDER COLOR - LEVEL-SPECIFIC COLORS
    const getLevelColor = (level: string) => {
        const levelConfig = {
            'INFO': TERMINAL_COLORS.success,
            'WARN': TERMINAL_COLORS.warning, 
            'ERROR': TERMINAL_COLORS.error,
            'DEBUG': TERMINAL_COLORS.blue,
            'TRACE': TERMINAL_COLORS.error,
            'FATAL': TERMINAL_COLORS.critical
        } as const
        
        return levelConfig[level as keyof typeof levelConfig] || TERMINAL_COLORS.primary
    }
    
    const borderColor = getLevelColor(level)
    
    return {
        // 🎯 PROFESSIONAL UNICODE BORDERS - HONEYWELL STYLE
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            // 🎨 CLEAR BORDER COLORS FOR CUSTOM COLORING
            head: [],
            border: []
        },
        colWidths: [13, 60, 20], // Label, Content, Type columns
        // 🎯 STORE BORDER COLOR FOR LATER USE
        _borderColor: borderColor
    }
}

/**
 * 🎯 Applies level-specific colors to CLI-Table3 output
 */
function applyTableColors(tableOutput: string, borderColor: any): string {
    // Apply border colors to table characters while preserving content colors
    return tableOutput
        .split('\n')
        .map(line => {
            // Color all border characters
            return line.replace(/[╔╗╚╝║╠╣╬╦╩═╤╧╟╢┼─│]/g, char => borderColor(char))
        })
        .join('\n')
}

/**
 * 🎯 Creates professional decorator table with CLI-Table3 and integrated header
 */
function createDecoratorTable(
    className: string, 
    method: string, 
    message: string, 
    level: string,
    methodVisibility: { visibility: string; icon: string },
    decoratorHeader: string,
    logObj: ReadonlyDeep<Record<string, unknown>>
): string {
    const config = createTableConfig(level)
    const table = new Table(config)
    
    // 🎯 INTEGRATED HEADER ROW - SPANS ALL COLUMNS
    table.push([
        { 
            colSpan: 3, 
            content: decoratorHeader, 
            hAlign: 'center' 
        }
    ])
    
    // 🎯 TABLE DATA WITH PROPER LABELS AND CONTENT
    const tableData = [
        [
            TERMINAL_COLORS.icon('🏛️ ') + ' CLASS',
            TERMINAL_COLORS.accent(className),
            TERMINAL_COLORS.muted('TypeScript Module')
        ],
        [
            getMethodLabel(methodVisibility.visibility),
            TERMINAL_COLORS.success(logObj.methodSignature || method),
            TERMINAL_COLORS.text(`${methodVisibility.visibility} Function`)
        ],
        [
            TERMINAL_COLORS.icon('🔬') + ' MESSAGE',
            TERMINAL_COLORS.text(message),
            ''
        ]
    ]
    

    
    // 🎯 ADD ARGUMENT TYPES ROW
    if (Array.isArray(logObj.argumentTypes)) {
        const types = logObj.argumentTypes as string[]
        const typesDisplay = types.map(type => TERMINAL_COLORS.accent(type)).join(', ')
        tableData.push([
            TERMINAL_COLORS.icon('📝') + ' ARG TYPES',
            typesDisplay,
            TERMINAL_COLORS.muted('Parameter Types')
        ])
    }
    
    // 🎯 ADD ARGUMENT COUNT ROW
    if (typeof logObj.argumentCount === 'number') {
        const count = logObj.argumentCount
        const countDisplay = TERMINAL_COLORS.success(count.toString())
        tableData.push([
            TERMINAL_COLORS.icon('🔢') + ' ARG COUNT',
            countDisplay,
            TERMINAL_COLORS.muted('Parameter Count')
        ])
    }
    
    table.push(...tableData)
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, config._borderColor)
}

/**
 * 🎯 Gets method label based on visibility
 */
function getMethodLabel(visibility: string): string {
    const labels = {
        'Private': TERMINAL_COLORS.icon('🔒') + ' PRIVATE',
        'Internal': TERMINAL_COLORS.icon('🔧') + ' INTRNL',
        'Public': TERMINAL_COLORS.icon('🌐') + ' METHOD'
    } as const
    
    return labels[visibility as keyof typeof labels] || labels.Public
}

/**
 * 🎯 Creates professional result analytics table with CLI-Table3
 */
function createResultAnalyticsTable(resultValue: unknown): string {
    const config = {
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            head: [],
            border: []
        },
        colWidths: [35, 58] // Key, Value (MATCHED TO MAIN TABLE TOTAL WIDTH)
    }
    
    const table = new Table(config)
    
    // 🎯 HEADER ROW
    table.push([
        { 
            colSpan: 2, 
            content: TERMINAL_COLORS.icon('🎯') + ' RESULT ANALYTICS', 
            hAlign: 'center' 
        }
    ])
    
    // 🎯 RESULT VALUE ROW - FULL RESULT DISPLAY WITH PROPER FORMATTING
    const resultDisplay = JSON.stringify(resultValue, null, 4)
    const truncatedResult = intelligentTruncate(resultDisplay, 50)
    
    table.push([
        TERMINAL_COLORS.icon('📦') + ' RESULT VALUE',
        TERMINAL_COLORS.text(truncatedResult)
    ])
    
    // 🎯 ANALYZE RESULT TYPE AND SIZE
    const resultAnalysis = analyzeResultValue(resultValue)
    
    table.push([
        TERMINAL_COLORS.icon('🔍') + ' TYPE',
        TERMINAL_COLORS.accent(resultAnalysis.type)
    ])
    
    if (resultAnalysis.size !== null) {
        table.push([
            TERMINAL_COLORS.icon('📏') + ' SIZE',
            TERMINAL_COLORS.text(resultAnalysis.size.toString())
        ])
    }
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, TERMINAL_COLORS.primary)
}

/**
 * 🎯 Analyzes result value and returns type information
 */
function analyzeResultValue(value: unknown): { 
    type: string; 
    size: number | null; 
} {
    if (value === null) {return { type: 'null', size: null }}
    if (value === undefined) {return { type: 'undefined', size: null }}
    
    const valueType = typeof value
    
    if (valueType === 'string') {
        return { 
            type: 'String', 
            size: (value as string).length
        }
    }
    
    if (valueType === 'number') {
        return { 
            type: 'Number', 
            size: null
        }
    }
    
    if (valueType === 'boolean') {
        return { 
            type: 'Boolean', 
            size: null
        }
    }
    
    if (Array.isArray(value)) {
        return { 
            type: 'Array', 
            size: value.length
        }
    }
    
    if (valueType === 'object') {
        const obj = value as Record<string, unknown>
        const keys = Object.keys(obj)
        return { 
            type: 'Object', 
            size: keys.length
        }
    }
    
    return { 
        type: valueType, 
        size: null
    }
}

/**
 * 🎯 Creates professional analytics table with CLI-Table3
 */
function createAnalyticsTable(data: [string, string, string, string][], title: string): string {
    const config = {
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            head: [],
            border: []
        },
        colWidths: [18, 12, 43, 20], // Icon+Label, Value, Progress, Description (MATCHED TO MAIN TABLE)
        colAligns: ['left', 'right', 'center', 'left'] as CliTable3.HorizontalAlignment[]
    }
    
    const table = new Table(config)
    
    // Add title row that spans all columns
    table.push([{ colSpan: 4, content: TERMINAL_COLORS.icon('⚡') + ' ' + title, hAlign: 'center' }])
    
    // Add data rows
    data.forEach(row => {
        table.push(row)
    })
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, TERMINAL_COLORS.border)
}

/**
 * 🎯 Creates professional metadata table with CLI-Table3
 */
function createMetadataTable(entries: [string, string][]): string {
    const config = {
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            head: [],
            border: []
        },
        colWidths: [35, 58] // Key, Value (MATCHED TO MAIN TABLE TOTAL WIDTH)
    }
    
    const table = new Table(config)
    
    // Add title row
    table.push([{ colSpan: 2, content: TERMINAL_COLORS.icon('🔧') + ' METADATA', hAlign: 'center' }])
    
    // Add metadata entries
    entries.forEach(([key, value]) => {
        table.push([
            getMetadataIcon(key) + '  ' + TERMINAL_COLORS.accent(key.toUpperCase()) + ':',
            TERMINAL_COLORS.text(value)
        ])
    })
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, TERMINAL_COLORS.border)
}

/**
 * 🎯 Creates professional arguments table with CLI-Table3
 */
function createArgumentsTable(argEntries: [string, unknown][]): string {
    const config = {
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            head: [],
            border: []
        },
        colWidths: [13, 14, 66], // #01 arg0, Type (10% größer als Spalte 1), Value (größte Spalte)
        colAligns: ['left', 'center', 'left'] as CliTable3.HorizontalAlignment[]
    }
    
    const table = new Table(config)
    
    // Add title row
    table.push([{ colSpan: 3, content: TERMINAL_COLORS.icon('📥') + ' ARGUMENTS ANALYZER', hAlign: 'center' }])
    
    // Add argument entries
    argEntries.forEach(([key, value], index) => {
        const analysis = analyzeArgumentType(value)
        table.push([
            TERMINAL_COLORS.muted(`#${String(index + 1).padStart(2, '0')}`) + ' ' + TERMINAL_COLORS.text(key),
            TERMINAL_COLORS.icon(analysis.icon) + ' ' + TERMINAL_COLORS.accent(`[${analysis.type}]`),
            TERMINAL_COLORS.success(analysis.displayValue)
        ])
    })
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, TERMINAL_COLORS.border)
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 INTELLIGENT TEXT TRUNCATION - PRESERVED FROM ORIGINAL
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Intelligently truncates text to fit within specified width
 */
function intelligentTruncate(text: string, maxWidth: number, ellipsis = '…'): string {
    if (text.length <= maxWidth) {
        return text
    }
    
    const ellipsisLength = ellipsis.length
    const availableWidth = maxWidth - ellipsisLength
    
    if (availableWidth <= 0) {
        return ellipsis.slice(0, maxWidth)
    }
    
    const truncated = text.slice(0, availableWidth)
    const lastSpaceIndex = truncated.lastIndexOf(' ')
    
    if (lastSpaceIndex > availableWidth * 0.7) {
        return truncated.slice(0, lastSpaceIndex) + ellipsis
    }
    
    return truncated + ellipsis
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 PINO-COMPATIBLE COLOR TYPES FOR FUNCTIONAL ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

type IColorFunction = (text: string) => string

interface IColors {
    cyan: IColorFunction
    blue: IColorFunction
    green: IColorFunction
    yellow: IColorFunction
    red: IColorFunction
    gray: IColorFunction
    white: IColorFunction
    magenta: IColorFunction
    bold: IColorFunction
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 AWARD-WINNING UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function safeStringify(value: unknown): string {
    if (value === null || value === undefined) {return ''}
    if (typeof value === 'string') {return value}
    return String(value)
}

function formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) {return '0 B'}
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const value = Math.round(bytes / Math.pow(1024, i) * 100) / 100
    return `${String(value)} ${sizes[i]}`
}

function formatDuration(ms: number): string {
    if (ms < 1000) {return `${String(Math.round(ms))}ms`}
    if (ms < 60000) {return `${String(Math.round(ms / 1000 * 100) / 100)}s`}
    return `${String(Math.round(ms / 60000 * 100) / 100)}m`
}

function createProgressBar(value: number, max: number, width = 15): string {
    const percentage = Math.max(0, Math.min(1, value / max))
    const filled = Math.round(width * percentage)
    const empty = width - filled
    
    const bar = '█'.repeat(filled) + '░'.repeat(empty)
    
    if (percentage > 0.8) {return TERMINAL_COLORS.error(bar)}
    if (percentage > 0.6) {return TERMINAL_COLORS.warning(bar)}
    return TERMINAL_COLORS.success(bar)
}

function createTerminalLink(text: string, url: string): string {
    return terminalLink(text, url, { fallback: () => text })
}

function getMetadataIcon(key: string): string {
    const iconMap = {
        focus: '🎯',
        operation: '⚙️',
        validation: '✅',
        mode: '🎚️'
    } as const
    
    return iconMap[key as keyof typeof iconMap] || '📋'
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DYNAMIC APP METADATA EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════════

function getAppMetadata(): { name: string; version: string; company: string; environment: string } {
    try {
        const currentDir = process.cwd()
        const packagePath = join(currentDir, 'package.json')
        const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'))
        
        return {
            name: packageJson.name || 'unknown-app',
            version: packageJson.version || '1.0.0',
            company: packageJson.author || 'unknown-author',
            environment: env.NODE_ENV === 'development' ? 'DEV' : env.NODE_ENV.toUpperCase()
        }
    } catch {
        return {
            name: 'app',
            version: '1.0.0', 
            company: 't33n Software',
            environment: 'DEV'
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 TYPE ANALYSIS FOR ARGUMENTS
// ═══════════════════════════════════════════════════════════════════════════════

function analyzeArgumentType(value: unknown): { type: string; icon: string; displayValue: string } {
    if (value === null) {return { type: 'null', icon: '⚪', displayValue: 'null' }}
    if (value === undefined) {return { type: 'undefined', icon: '⚫', displayValue: 'undefined' }}
    
    const type = typeof value
    
    switch (type) {
    case 'string': {
        const strVal = String(value)
        const truncated = strVal.length > 25 ? strVal.slice(0, 22) + '...' : strVal
        return { type: 'string', icon: '📝', displayValue: `"${truncated}"` }
    }
    case 'number':
        return { type: 'number', icon: '🔢', displayValue: String(value) }
    case 'boolean':
        return { type: 'boolean', icon: '☑️', displayValue: String(value) }
    case 'function':
        return { type: 'function', icon: '⚡', displayValue: '[Function]' }
    case 'object': {
        if (Array.isArray(value)) {
            return { type: 'array', icon: '📋', displayValue: `[Array(${value.length})]` }
        }
        try {
            const objStr = JSON.stringify(value)
            const truncated = objStr.length > 25 ? objStr.slice(0, 22) + '...' : objStr
            return { type: 'object', icon: '📦', displayValue: truncated }
        } catch {
            return { type: 'object', icon: '📦', displayValue: '[Object]' }
        }
    }
    default:
        return { type: 'unknown', icon: '❓', displayValue: String(value) }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 METHOD VISIBILITY DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

function getMethodVisibility(methodName: string): { visibility: string; icon: string } {
    if (methodName.startsWith('_') || methodName.startsWith('#')) {
        return { visibility: 'Private', icon: '🔒' }
    }
    if (methodName.startsWith('$')) {
        return { visibility: 'Internal', icon: '🔧' }
    }
    return { visibility: 'Public', icon: '🌐' }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 AWARD-WINNING MESSAGE FORMAT - PROFESSIONAL CLI-TABLE3 POWERED DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

export const createEnterpriseMessageFormat: PrettyOptions['messageFormat'] = (
    log: ReadonlyDeep<unknown>, 
    messageKey: string, 
    levelLabel: string, 
    { colors }: ReadonlyDeep<{ colors: IColors }>
) => {
    const logObj = log as ReadonlyDeep<Record<string, unknown>>
    const msgValue = logObj[messageKey]
    const msg = safeStringify(msgValue)
    const prefix = typeof logObj.prefix === 'string' ? logObj.prefix : ''
    
    // Suppress unused warning: colors parameter is required for Pino compatibility
    void colors
    
    // 🎯 GET ACTUAL LEVEL FROM LOG OBJECT
    const rawLevel = Number(logObj.level)
    const levelMap = {
        10: 'TRACE',
        20: 'DEBUG',
        30: 'INFO',
        40: 'WARN',
        50: 'ERROR',
        60: 'FATAL'
    } as const
    const actualLevel = levelMap[rawLevel as keyof typeof levelMap] || 'INFO'
    
    // Get current timestamp for inline display
    const now = new Date()
    const timeStr = now.toLocaleTimeString('de-DE', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    })
    
    // Award-winning level icons and colors
    const levelConfig = {
        'INFO': { icon: 'ℹ️ ', color: TERMINAL_COLORS.success },
        'WARN': { icon: '⚠️', color: TERMINAL_COLORS.warning }, 
        'ERROR': { icon: '🚨', color: TERMINAL_COLORS.error },
        'DEBUG': { icon: '🔬', color: TERMINAL_COLORS.blue },
        'TRACE': { icon: '🔍', color: TERMINAL_COLORS.error },
        'FATAL': { icon: '💀', color: TERMINAL_COLORS.critical }
    } as const
    
    const levelInfo = levelConfig[actualLevel] || 
                     { icon: 'ℹ️', color: TERMINAL_COLORS.primary }
    
    if (!prefix) {
        // 📝 AWARD-WINNING SINGLE-LINE LOG FORMAT (NO DIVIDER)
        const timeDisplay = TERMINAL_COLORS.muted(timeStr)
        const levelDisplay = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)}`
        const messageDisplay = TERMINAL_COLORS.text(msg)
        
        return `${levelDisplay} ${timeDisplay} | ${messageDisplay}`
    }
    
    // Enhanced divider with breathing space - ONLY FOR DECORATOR LOGS
    const divider = TERMINAL_COLORS.muted('──  '.repeat(24))
    
    // 🎯 PARSE PREFIX FOR AWARD-WINNING DECORATOR DISPLAY
    const parts = prefix.split('::')
    if (parts.length >= 2) {
        const [className, methodPart] = parts
        const method = methodPart.split('(')[0] || methodPart
        const appMeta = getAppMetadata()
        const methodInfo = getMethodVisibility(method)
        
        // 🏢 AWARD-WINNING HEADER WITH DECORATOR LOG PREFIX
        let result = '\n' + divider + '\n\n'
        
        // 🎯 DECORATOR LOG HEADER WITH DYNAMIC DATA - NOW INTEGRATED INTO TABLE
        const decoratorHeader = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)} ` +
                               `${TERMINAL_COLORS.muted(timeStr)} | ` +
                               `${TERMINAL_COLORS.text(appMeta.company)} ` +
                               `${TERMINAL_COLORS.accent(`${appMeta.name} v${appMeta.version}`)} ` +
                               TERMINAL_COLORS.muted(`[${appMeta.environment}]`)
        
        // 🎯 PROFESSIONAL TABLE CONSTRUCTION WITH CLI-TABLE3 - HEADER INTEGRATED
        const decoratorTable = createDecoratorTable(className, method, msg, actualLevel, methodInfo, decoratorHeader, logObj)
        result += decoratorTable + '\n'
        
        return result
    }
    
    // 🏷️ FALLBACK FOR SIMPLE PREFIX
    const levelDisplay = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)}`
    const timeDisplay = TERMINAL_COLORS.muted(timeStr)
    const borderColor = levelInfo.color
    
    return '\n' + divider + '\n\n' + 
           `${levelDisplay} ${timeDisplay} | ` +
           `${borderColor('╭─')} ` +
           `${TERMINAL_COLORS.highlight('🏷️')} ` +
           `${TERMINAL_COLORS.accent(prefix)} ` +
           `${borderColor('─╮')}\n` +
           `${borderColor('│')} ` +
           `${TERMINAL_COLORS.text(msg)} ` +
           `${borderColor('│')}\n` +
           borderColor('╰─────────────────────────────────────────╯')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 AWARD-WINNING CUSTOM PRETTIFIERS - CLI-TABLE3 POWERED
// ═══════════════════════════════════════════════════════════════════════════════

export const createEnterpriseCustomPrettifiers = (): PrettyOptions['customPrettifiers'] => ({
    // 🕰️ TIME STYLING - INTEGRATED INTO MESSAGE FORMAT
    time: (): string => '',
    
    // 🎨 LEVEL INDICATORS - INTEGRATED INTO MESSAGE FORMAT  
    level: (): string => '',
    
    // 📊 PERFORMANCE ANALYTICS - PROFESSIONAL CLI-TABLE3 POWERED
    performance: (perf: unknown): string => {
        if (typeof perf !== 'object' || perf === null) {return ''}
        
        const perfObj = perf as Record<string, unknown>
        const analyticsData: [string, string, string, string][] = []
        
        // ⏱️ DURATION with Progress Bars
        if (typeof perfObj.duration === 'number') {
            const duration = Number(perfObj.duration)
            const durationFormatted = formatDuration(duration)
            const bar = createProgressBar(duration, 5000, 39)
            
            analyticsData.push([
                TERMINAL_COLORS.icon('⏱️') + '   DURATION',
                TERMINAL_COLORS.text(durationFormatted),
                bar,
                'Response Time'
            ])
        }
        
        // 🧠 MEMORY with Formatting
        if (perfObj.memoryUsage) {
            const mem = perfObj.memoryUsage as Record<string, unknown>
            const heapBytes = Number(mem.heapUsed)
            const heapFormatted = formatBytes(heapBytes)
            const bar = createProgressBar(heapBytes, 100 * 1024 * 1024, 39)
            
            analyticsData.push([
                TERMINAL_COLORS.icon('🧠') + '  HEAP USED',
                TERMINAL_COLORS.text(heapFormatted),
                bar,
                'Memory Usage'
            ])
        }

        // 🖥️ CPU with Styling
        if (perfObj.cpuUsage) {
            const cpu = perfObj.cpuUsage as Record<string, unknown>
            if (typeof cpu.user === 'number') {
                const userMs = Number(cpu.user) / 1000
                const cpuFormatted = formatDuration(userMs)
                const bar = createProgressBar(userMs, 1000, 39)
                
                analyticsData.push([
                    TERMINAL_COLORS.icon('🖥️') + '   CPU USER',
                    TERMINAL_COLORS.text(cpuFormatted),
                    bar,
                    'CPU Time'
                ])
            }
        }
        
        if (analyticsData.length === 0) {return ''}
        
        // 🎯 OVERWRITE "performance:" LABEL AND ADD PROPER SPACING  
        const tableOutput = createAnalyticsTable(analyticsData, 'PERFORMANCE ANALYTICS')
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 🔧 METADATA - PROFESSIONAL CLI-TABLE3
    metadata: (metadata: unknown): string => {
        if (typeof metadata !== 'object' || metadata === null) {return ''}
        
        const metaEntries = Object.entries(metadata as Record<string, unknown>)
        if (metaEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "metadata:" LABEL AND ADD PROPER SPACING
        const tableOutput = createMetadataTable(metaEntries.map(([key, value]) => [key, String(value)]))
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 📥 ARGUMENTS ANALYZER - PROFESSIONAL CLI-TABLE3 POWERED
    args: (args: unknown): string => {
        if (typeof args !== 'object' || args === null) {return ''}
        
        const argEntries = Object.entries(args as Record<string, unknown>)
        if (argEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "args:" LABEL AND ADD PROPER SPACING
        const tableOutput = createArgumentsTable(argEntries)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 🎯 RESULT ANALYTICS - PROFESSIONAL CLI-TABLE3 POWERED
    result: (result: unknown): string => {
        if (result === null || result === undefined) {return ''}
        
        // 🎯 OVERWRITE "result:" LABEL AND ADD PROPER SPACING
        const tableOutput = createResultAnalyticsTable(result)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    }
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 AWARD-WINNING CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎨 Creates award-winning terminal logging configuration
 */
export function createEnterprisePrettyConfig(): Parameters<typeof import('pino-pretty')>[0] {
    return {
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        singleLine: false,
        hideObject: false,
        levelFirst: false,
        messageKey: 'msg',
        levelKey: 'level',
        timestampKey: 'time',
        
        // 🎯 FUNCTIONAL: Essential properties for clean logs
        ignore: 'pid,hostname,name,service,version,environment,nodeVersion,platform,prefix,className,methodName,argumentTypes,argumentCount',
        
        // 🌈 PROFESSIONAL COLOR SCHEME  
        customColors: 'info:blue,warn:yellow,error:red,debug:cyan,trace:magenta,fatal:brightRed',
        
        // 🎪 AWARD-WINNING CLI-TABLE3 POWERED DESIGN
        messageFormat: createEnterpriseMessageFormat,
        customPrettifiers: createEnterpriseCustomPrettifiers()
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🏢 EXPORTS - COMPLETE TOOLKIT
// ═══════════════════════════════════════════════════════════════════════════════

export {
    TERMINAL_COLORS,
    createProgressBar,
    createTerminalLink,
    formatBytes,
    formatDuration,
    chalk,
    intelligentTruncate,
    Table
}

/**
 * 🎯 Log Level Enhancer
 */
export function enhanceLogLevel(level: string, message: string): string {
    const enhancers = {
        fatal: () => chalk.bold.redBright(message),
        error: () => chalk.red(message),
        warn: () => chalk.yellow(message),
        info: () => chalk.blue(message),
        debug: () => chalk.cyan(message),
        trace: () => chalk.gray(message)
    } as const
    
    const enhancer = enhancers[level.toLowerCase() as keyof typeof enhancers]
    return enhancer ? enhancer() : message
} 