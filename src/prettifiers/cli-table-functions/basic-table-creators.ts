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
// 🎯 BASIC TABLE CREATORS - STANDARD TABLE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { TERMINAL_COLORS } from '@/prettifiers/colors.ts'
import { analyzeArgumentType } from '@/prettifiers/type-analysis.ts'
import { analyzeResultValue, getMetadataIcon } from '@/prettifiers/utility-functions.ts'
import { 
    CliTable, createTableConfig, applyTableColors, 
    createTableChars, createTableStyle, getMethodLabel 
} from './core-table-config.ts'

// 🎯 TYPE-ASSERTION für cli-table3 (keine offizielle @types verfügbar)
type CliTableConstructor = new (options?: Record<string, unknown>) => {
    push(...rows: readonly unknown[]): void
    toString(): string
}

const CLI_TABLE_TYPED = CliTable as CliTableConstructor

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
        const types = logObj.argumentTypes
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
 * 🎯 Creates professional result analytics table with CLI-Table3
 * @param resultValue - The result value to analyze
 * @returns The result analytics table
 */
export function createResultAnalyticsTable(resultValue: unknown): string {
    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value (MATCHED TO MAIN TABLE TOTAL WIDTH)
    })

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
    
    table.push([
        TERMINAL_COLORS.icon('📦') + ' RESULT VALUE',
        TERMINAL_COLORS.text(resultDisplay)
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
 * @param data - The data to display in the table
 * @returns The analytics table
 */
export function createAnalyticsTable(
    data: readonly (readonly [string, string, string, string])[]
): string {
    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [18, 12, 43, 20], // Icon+Label, Value, Progress, Description (MATCHED TO MAIN TABLE)
        colAligns: ['left', 'right', 'center', 'left']
    })
     
    
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
 * @param entries - The metadata entries to display in the table
 * @returns The metadata table
 */
export function createMetadataTable(
    entries: readonly (readonly [string, string])[]
): string {
    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value (MATCHED TO MAIN TABLE TOTAL WIDTH)
    })
     
    
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
 * @param argEntries - The argument entries to display in the table
 * @returns The arguments table
 */
export function createArgumentsTable(
    argEntries: readonly (readonly [string, unknown])[]
): string {
    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [13, 14, 66], // #01 arg0, Type (10% größer als Spalte 1), Value (größte Spalte)
        colAligns: ['left', 'center', 'left']
    })
     
    
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