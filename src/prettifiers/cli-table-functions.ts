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
// 🎯 PROFESSIONAL CLI-TABLE3 CONFIGURATION WITH LEVEL-BASED STYLING
// ═══════════════════════════════════════════════════════════════════════════════

// eslint-disable-next-line @typescript-eslint/naming-convention
import CliTable from 'cli-table3'
import type { ReadonlyDeep } from 'type-fest'
import { TERMINAL_COLORS } from './colors.ts'
import { analyzeArgumentType } from './type-analysis.ts'
import { analyzeResultValue, getMetadataIcon, intelligentTruncate } from './utility-functions.ts'

// 🎯 ENTERPRISE TYPE-ASSERTION für cli-table3 (keine offizielle @types verfügbar)
type CliTableConstructor = new (options?: Record<string, unknown>) => {
    push(...rows: readonly unknown[]): void
    toString(): string
}
const CLI_TABLE_TYPED = CliTable as CliTableConstructor

// Re-export CliTable for convenience
export { CliTable }

/**
 * 🎯 Creates level-specific table configuration for CLI-Table3
 */
export function createTableConfig(level: string): {
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
export function applyTableColors(tableOutput: string, borderColor: (text: string) => string): string {
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
export function createDecoratorTable(
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
export function createResultAnalyticsTable(resultValue: unknown): string {
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
 * 🎯 Creates professional analytics table with CLI-Table3
 */
export function createAnalyticsTable(data: readonly (readonly [string, string, string, string])[]): string {
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
export function createMetadataTable(entries: readonly (readonly [string, string])[]): string {
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
export function createArgumentsTable(argEntries: readonly (readonly [string, unknown])[]): string {
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