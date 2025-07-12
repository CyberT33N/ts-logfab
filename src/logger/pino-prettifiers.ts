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
// eslint-disable-next-line @typescript-eslint/naming-convention
import CliTable from 'cli-table3'
import lodash from 'lodash'
import type { PrettyOptions } from 'pino-pretty'
import { configure } from 'safe-stable-stringify'
import terminalLink from 'terminal-link'
import type { ReadonlyDeep } from 'type-fest'
import { PackageJson } from 'zod-package-json'
import env, { Environment } from '@/env.ts'

// 🎯 LODASH UTILITY IMPORTS - ENTERPRISE GRADE TYPE CHECKING

// 🎯 ENTERPRISE TYPE-ASSERTION für cli-table3 (keine offizielle @types verfügbar)
type CliTableConstructor = new (options?: Record<string, unknown>) => {
    push(...rows: readonly unknown[]): void
    toString(): string
}
const CLI_TABLE_TYPED = CliTable as CliTableConstructor

// 🎯 ENTERPRISE SAFE-STABLE-STRINGIFY CONFIGURATION
const stringify = configure({
    circularValue: '[Circular]',
    deterministic: true,
    bigint: true,
    maximumDepth: 10,
    maximumBreadth: 100,
    strict: false
})

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
function createTableConfig(level: string): {
    chars: Record<string, string>;
    style: Record<string, unknown>;
    colWidths: number[];
    borderColor: (text: string) => string;
} {
    // 🎨 DYNAMIC BORDER COLOR - LEVEL-SPECIFIC COLORS
    const getLevelColor = (level: string): (text: string) => string => {
        const levelConfig = {
            'INFO': TERMINAL_COLORS.success,
            'WARN': TERMINAL_COLORS.warning, 
            'ERROR': TERMINAL_COLORS.error,
            'DEBUG': TERMINAL_COLORS.blue,
            'TRACE': TERMINAL_COLORS.error,
            'FATAL': TERMINAL_COLORS.critical
        } as const
        
        const levelKey = level as keyof typeof levelConfig
        if (levelKey in levelConfig) {
            return levelConfig[levelKey]
        }
        return TERMINAL_COLORS.primary
    }
    
    const borderColor = getLevelColor(level)
    
    return {
        // 🎯 PROFESSIONAL UNICODE BORDERS - HONEYWELL STYLE
        /* eslint-disable @typescript-eslint/naming-convention */
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
        /* eslint-enable @typescript-eslint/naming-convention */
        colWidths: [13, 60, 20], // Label, Content, Type columns
        // 🎯 STORE BORDER COLOR FOR LATER USE
        borderColor: borderColor
    }
}

/**
 * 🎯 Applies level-specific colors to CLI-Table3 output
 */
function applyTableColors(tableOutput: string, borderColor: (text: string) => string): string {
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
    methodVisibility: { readonly visibility: string; readonly icon: string },
    decoratorHeader: string,
    logObj: ReadonlyDeep<Record<string, unknown>>
): string {
    const config = createTableConfig(level)

    const table = new CLI_TABLE_TYPED({
        chars: config.chars,
        style: config.style,
        colWidths: config.colWidths
    })
     
    
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
            TERMINAL_COLORS.success(
                typeof logObj.methodSignature === 'string' 
                    ? logObj.methodSignature 
                    : method
            ),
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
        const types = logObj.argumentTypes as readonly string[]
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
    return applyTableColors(tableOutput, config.borderColor)
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
    /* eslint-disable @typescript-eslint/naming-convention */
    const table = new CLI_TABLE_TYPED({
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
    })
    /* eslint-enable @typescript-eslint/naming-convention */
    
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
function createAnalyticsTable(data: readonly (readonly [string, string, string, string])[]): string {
    /* eslint-disable @typescript-eslint/naming-convention */
    const table = new CLI_TABLE_TYPED({
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
        colAligns: ['left', 'right', 'center', 'left']
    })
    /* eslint-enable @typescript-eslint/naming-convention */
    
    // Add title row that spans all columns
    table.push([{ colSpan: 4, content: TERMINAL_COLORS.icon('⚡') + ' ' + 'PERFORMANCE ANALYTICS', hAlign: 'center' }])
    
    // Add data rows
    data.forEach(row => {
        table.push([...row])
    })
    
    const tableOutput = table.toString()
    return applyTableColors(tableOutput, TERMINAL_COLORS.border)
}

/**
 * 🎯 Creates professional metadata table with CLI-Table3
 */
function createMetadataTable(entries: readonly (readonly [string, string])[]): string {
    /* eslint-disable @typescript-eslint/naming-convention */
    const table = new CLI_TABLE_TYPED({
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
    })
    /* eslint-enable @typescript-eslint/naming-convention */
    
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
function createArgumentsTable(argEntries: readonly (readonly [string, unknown])[]): string {
    /* eslint-disable @typescript-eslint/naming-convention */
    const table = new CLI_TABLE_TYPED({
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
        colAligns: ['left', 'center', 'left']
    })
    /* eslint-enable @typescript-eslint/naming-convention */
    
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
// 🎯 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'] as const
    if (bytes === 0) {return '0 B'}
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const value = Math.round(bytes / Math.pow(1024, i) * 100) / 100
    return `${value.toString()} ${sizes[i] ?? 'B'}`
}

function formatDuration(ms: number): string {
    const roundedMs = Math.round(ms)
    const roundedSeconds = Math.round(ms / 1000 * 100) / 100
    const roundedMinutes = Math.round(ms / 60000 * 100) / 100
    
    if (ms < 1000) {return `${roundedMs.toString()}ms`}
    if (ms < 60000) {return `${roundedSeconds.toString()}s`}
    return `${roundedMinutes.toString()}m`
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
    
    return iconMap[key as keyof typeof iconMap]
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DYNAMIC APP METADATA EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════════

interface IAppMetadata {
    name: PackageJson['name'];
    version: PackageJson['version'];
    author: PackageJson['author'];
    environment: Environment['NODE_ENV'];
}

function getAppMetadata(): IAppMetadata {
    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
     
    // 🎯 Professional package.json validation with zod-package-json
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))
        
    return {
        name: packageJson.name,
        version: packageJson.version,
        author:  packageJson.author,
        environment: env.NODE_ENV
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 TYPE ANALYSIS FOR ARGUMENTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 ENTERPRISE-GRADE ARGUMENT TYPE ANALYSIS - LODASH POWERED
 */
function analyzeArgumentType(value: unknown): { type: string; icon: string; displayValue: string } {
    if (value === null) {
        return { 
            type: 'null', 
            icon: '⚪', 
            displayValue: 'null'
        }
    }

    if (value === undefined) {
        return { 
            type: 'undefined', 
            icon: '⚫', 
            displayValue: 'undefined' }
    }
    
    // 🎯 LODASH UTILITY FUNCTIONS - ENTERPRISE GRADE TYPE CHECKING
    if (lodash.isString(value)) {
        const truncated = value.length > 25 ? value.slice(0, 22) + '...' : value
        return { type: 'string', icon: '📝', displayValue: `"${truncated}"` }
    }
    
    if (lodash.isNumber(value)) {
        const stringified = stringify(value)
        return { type: 'number', icon: '🔢', displayValue: stringified }
    }
    
    if (lodash.isBoolean(value)) {
        const stringified = stringify(value)
        return { type: 'boolean', icon: '☑️', displayValue: stringified }
    }
    
    if (lodash.isFunction(value)) {
        return { type: 'function', icon: '⚡', displayValue: '[Function]' }
    }
    
    if (typeof value === 'bigint') {
        const stringified = stringify(value)
        return { type: 'bigint', icon: '🔢', displayValue: stringified ?? '0n' }
    }
    
    if (lodash.isSymbol(value)) {
        return { type: 'symbol', icon: '🔣', displayValue: '[Symbol]' }
    }
    
    if (lodash.isArray(value)) {
        const arrayLength = value.length.toString()
        return { type: 'array', icon: '📋', displayValue: `[Array(${arrayLength})]` }
    }
    
    if (lodash.isPlainObject(value)) {
        return { type: 'object', icon: '📦', displayValue: '[Object]' }
    }
    
    // Default fallback
    const stringified = stringify(value)
    return { type: 'unknown', icon: '❓', displayValue: stringified }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 METHOD VISIBILITY DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 METHOD VISIBILITY DETECTION
 */
function getMethodVisibility(methodName: string): { visibility: string; icon: string } {
    if (methodName.startsWith('_')) {
        return { visibility: 'private', icon: '🔒' }
    }
    
    if (methodName.startsWith('#')) {
        return { visibility: 'private', icon: '🔐' }
    }
    
    // Default to public
    return { visibility: 'public', icon: '🌐' }
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
    const msg = stringify(msgValue) ?? '[Message]'
    const prefix = typeof logObj.prefix === 'string' ? logObj.prefix : ''
    
    // Suppress unused warning: colors parameter is required for Pino compatibility
    void colors
    
    // 🎯 GET ACTUAL LEVEL FROM LOG OBJECT
    const rawLevel = Number(logObj.level)
    /* eslint-disable @typescript-eslint/naming-convention */
    const levelMap = {
        '10': 'TRACE',
        '20': 'DEBUG',
        '30': 'INFO',
        '40': 'WARN',
        '50': 'ERROR',
        '60': 'FATAL'
    } as const


    const actualLevel = levelMap[String(rawLevel) as keyof typeof levelMap]
    
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
    
    const levelInfo = levelConfig[actualLevel]
    
    if (prefix.length === 0) {
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
        const method = methodPart.split('(')[0]
        const appMeta = getAppMetadata()
        const methodInfo = getMethodVisibility(method)
        
        // 🏢 AWARD-WINNING HEADER WITH DECORATOR LOG PREFIX
        let result = '\n' + divider + '\n\n'
        
        // 🎯 DECORATOR LOG HEADER WITH DYNAMIC DATA - NOW INTEGRATED INTO TABLE
        const decoratorHeader = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)} ` +
                               `${TERMINAL_COLORS.muted(timeStr)} | ` +
                               `${TERMINAL_COLORS.text(appMeta.author)} ` +
                               `${TERMINAL_COLORS.accent(`${appMeta.name} v${appMeta.version}`)} ` +
                               TERMINAL_COLORS.muted(`[${appMeta.environment}]`)
        
        // 🎯 PROFESSIONAL TABLE CONSTRUCTION WITH CLI-TABLE3 - HEADER INTEGRATED
        const decoratorTable = createDecoratorTable(
            className || '', 
            method, 
            msg, 
            actualLevel, 
            methodInfo, 
            decoratorHeader, 
            logObj
        )
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
// 🎨 CUSTOM PRETTIFIERS - CLI-TABLE3 POWERED
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
        const analyticsData: (readonly [string, string, string, string])[] = []
        
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
            ] as const)
        }
        
        // 🧠 MEMORY with Formatting
        if (perfObj.memoryUsage !== null && typeof perfObj.memoryUsage === 'object') {
            const mem = perfObj.memoryUsage as Record<string, unknown>
            const heapBytes = Number(mem.heapUsed)
            const heapFormatted = formatBytes(heapBytes)
            const bar = createProgressBar(heapBytes, 100 * 1024 * 1024, 39)
            
            analyticsData.push([
                TERMINAL_COLORS.icon('🧠') + '  HEAP USED',
                TERMINAL_COLORS.text(heapFormatted),
                bar,
                'Memory Usage'
            ] as const)
        }

        // 🖥️ CPU with Styling
        if (perfObj.cpuUsage !== null && typeof perfObj.cpuUsage === 'object') {
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
                ] as const)
            }
        }
        
        if (analyticsData.length === 0) {
            return ''
        }
        
        // 🎯 OVERWRITE "performance:" LABEL AND ADD PROPER SPACING  
        const tableOutput = createAnalyticsTable(analyticsData)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 🔧 METADATA - PROFESSIONAL CLI-TABLE3
    metadata: (metadata: unknown): string => {
        if (typeof metadata !== 'object' || metadata === null) {return ''}
        
        const metaEntries = Object.entries(metadata as Record<string, unknown>)
        if (metaEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "metadata:" LABEL AND ADD PROPER SPACING
        const typedEntries: (readonly [string, string])[] = metaEntries.map(
            ([key, value]: readonly [string, unknown]) => [key, stringify(value)] as const
        )
        const tableOutput = createMetadataTable(typedEntries)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 📥 ARGUMENTS ANALYZER - PROFESSIONAL CLI-TABLE3 POWERED
    args: (args: unknown): string => {
        if (typeof args !== 'object' || args === null) {return ''}
        
        const argEntries = Object.entries(args as Record<string, unknown>)
        if (argEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "args:" LABEL AND ADD PROPER SPACING
        const typedEntries: (readonly [string, unknown])[] = argEntries.map(([key, value]) => [key, value] as const)
        const tableOutput = createArgumentsTable(typedEntries)
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
export function createEnterprisePrettyConfig(): 
    Parameters<typeof import('pino-pretty')>[0] {
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
    CliTable
}

/**
 * 🎯 Log Level Enhancer
 */
export function enhanceLogLevel(
    level: string, 
    message: string
): string {
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