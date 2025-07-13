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
import type { IAnomalyDetection } from '../logger/anomaly-detector/index.ts'
import type { IPerformanceBaseline } from '../logger/performance-utils.ts'
import type { ISemanticContext } from '../logger/semantic-detector.ts'
import { 
    TERMINAL_COLORS, 
    PERFORMANCE_COLORS,
    ANOMALY_COLORS,
    CONTEXT_COLORS,
    getOperationColor,
    getPerformanceColor,
    getAnomalyColor,
    getSemanticColors
} from './colors.ts'
import { analyzeArgumentType } from './type-analysis.ts'
import { analyzeResultValue, getMetadataIcon, intelligentTruncate } from './utility-functions.ts'

// 🎯 TYPE-ASSERTION für cli-table3 (keine offizielle @types verfügbar)
type CliTableConstructor = new (options?: Record<string, unknown>) => {
    push(...rows: readonly unknown[]): void
    toString(): string
}

const CLI_TABLE_TYPED = CliTable as CliTableConstructor

// Re-export CliTable for convenience
export { CliTable }

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED TABLE OUTPUT INTERFACES & TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔗 **Enhanced Context Data for Tables**
 * 
 * Extended context information for enhanced table displays
 */
export interface IEnhancedTableContext {
    readonly correlationId?: string
    readonly workflowId?: string
    readonly requestId?: string
    readonly sessionId?: string
    readonly userId?: string
    readonly semantic?: ISemanticContext
    readonly performance?: {
        readonly duration: number
        readonly memoryDelta: number
        readonly baseline?: IPerformanceBaseline
    }
    readonly anomalies?: readonly IAnomalyDetection[]
    readonly thresholdViolations?: readonly string[]
}

/**
 * 🎯 **Enhanced Table Configuration**
 * 
 * Extended table configuration with semantic context support
 */
export interface IEnhancedTableConfig {
    readonly showCorrelationContext: boolean
    readonly showSemanticContext: boolean
    readonly showPerformanceIndicators: boolean
    readonly showAnomalyWarnings: boolean
    readonly compactMode: boolean
}

/**
 * 🎯 **Default Enhanced Table Configuration**
 */
export const DEFAULT_ENHANCED_TABLE_CONFIG: IEnhancedTableConfig = {
    showCorrelationContext: true,
    showSemanticContext: true,
    showPerformanceIndicators: true,
    showAnomalyWarnings: true,
    compactMode: false
} as const

/**
 * 🎨 DYNAMIC BORDER COLOR - LEVEL-SPECIFIC COLORS
 * @param level - The level of the log message
 * @returns The color function for the level
 */
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

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED CORRELATION CONTEXT TABLES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔗 **Creates Correlation Context Table**
 * 
 * @param context - The enhanced context data
 * @returns The correlation context table
 */
export function createCorrelationContextTable(context: IEnhancedTableContext): string {
    // Helper function to check if ID is valid
    const isValidId = (id: string | undefined): id is string => {
        return id !== undefined && id.trim() !== ''
    }

    const validIds = [
        context.correlationId,
        context.workflowId,
        context.requestId,
        context.sessionId,
        context.userId
    ].filter(isValidId)

    if (validIds.length === 0) {
        return ''
    }

    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value
    })

    // Header
    table.push([
        { 
            colSpan: 2, 
            content: CONTEXT_COLORS.correlationId('🔗 CORRELATION CONTEXT'), 
            hAlign: 'center' 
        }
    ])

    // Add context entries
    const contextEntries: (readonly [string, string, typeof CONTEXT_COLORS[keyof typeof CONTEXT_COLORS]])[] = []
    
    if (isValidId(context.correlationId)) {
        contextEntries.push(['CORRELATION ID', context.correlationId, CONTEXT_COLORS.correlationId] as const)
    }
    if (isValidId(context.workflowId)) {
        contextEntries.push(['WORKFLOW ID', context.workflowId, CONTEXT_COLORS.workflowId] as const)
    }
    if (isValidId(context.requestId)) {
        contextEntries.push(['REQUEST ID', context.requestId, CONTEXT_COLORS.requestId] as const)
    }
    if (isValidId(context.sessionId)) {
        contextEntries.push(['SESSION ID', context.sessionId, CONTEXT_COLORS.sessionId] as const)
    }
    if (isValidId(context.userId)) {
        contextEntries.push(['USER ID', context.userId, CONTEXT_COLORS.userId] as const)
    }

    for (const entry of contextEntries) {
        const [label, value, color] = entry
        table.push([
            TERMINAL_COLORS.icon('🔑') + ' ' + TERMINAL_COLORS.accent(label),
            color(intelligentTruncate(value, 50))
        ])
    }

    return applyTableColors(table.toString(), CONTEXT_COLORS.correlationId)
}

/**
 * 🏢 **Creates Semantic Context Table**
 * 
 * @param context - The enhanced context data
 * @returns The semantic context table
 */
export function createSemanticContextTable(context: IEnhancedTableContext): string {
    if (!context.semantic) {
        return ''
    }

    const { semantic } = context
    const colors = getSemanticColors(semantic)

    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value
    })

    // Header
    table.push([
        { 
            colSpan: 2, 
            content: colors.domain('🏢 SEMANTIC CONTEXT'), 
            hAlign: 'center' 
        }
    ])

    // Domain
    table.push([
        TERMINAL_COLORS.icon('🏢') + ' ' + TERMINAL_COLORS.accent('DOMAIN'),
        colors.domain(`${semantic.domain} Domain`)
    ])

    // Operation
    table.push([
        TERMINAL_COLORS.icon('⚡') + ' ' + TERMINAL_COLORS.accent('OPERATION'),
        colors.operation(`${semantic.operation} Operation`)
    ])

    // Complexity (always present as it's a required field)
    const complexityColor = semantic.complexity === 'HIGH' 
        ? PERFORMANCE_COLORS.CRITICAL 
        : semantic.complexity === 'MEDIUM' 
            ? PERFORMANCE_COLORS.SLOW 
            : PERFORMANCE_COLORS.FAST

    table.push([
        TERMINAL_COLORS.icon('🧮') + ' ' + TERMINAL_COLORS.accent('COMPLEXITY'),
        complexityColor(`${semantic.complexity} Complexity`)
    ])

    return applyTableColors(table.toString(), colors.domain)
}

/**
 * 🚀 **Creates Performance Indicators Table**
 * 
 * @param context - The enhanced context data
 * @returns The performance indicators table
 */
export function createPerformanceIndicatorsTable(context: IEnhancedTableContext): string {
    if (!context.performance) {
        return ''
    }

    const { performance } = context
    const performanceColor = getPerformanceColor(performance.duration)

    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value
    })

    // Header
    table.push([
        { 
            colSpan: 2, 
            content: performanceColor('🚀 PERFORMANCE INDICATORS'), 
            hAlign: 'center' 
        }
    ])

    // Duration
    table.push([
        TERMINAL_COLORS.icon('⏱️') + ' ' + TERMINAL_COLORS.accent('DURATION'),
        performanceColor(`${performance.duration.toFixed(2)}ms`)
    ])

    // Memory Delta
    if (performance.memoryDelta !== 0) {
        const memoryMB = (performance.memoryDelta / 1024 / 1024).toFixed(2)
        const memoryColor = performance.memoryDelta > 0 
            ? PERFORMANCE_COLORS.SLOW 
            : PERFORMANCE_COLORS.FAST

        table.push([
            TERMINAL_COLORS.icon('💾') + ' ' + TERMINAL_COLORS.accent('MEMORY DELTA'),
            memoryColor(`${memoryMB}MB`)
        ])
    }

    // Baseline Comparison
    if (performance.baseline) {
        const baseline = performance.baseline
        const comparisonRatio = performance.duration / baseline.averageDuration
        const comparisonColor = comparisonRatio > 1.5 
            ? PERFORMANCE_COLORS.CRITICAL 
            : comparisonRatio > 1.2 
                ? PERFORMANCE_COLORS.SLOW 
                : PERFORMANCE_COLORS.FAST

        const comparisonText = comparisonRatio > 1 
            ? `${(comparisonRatio * 100 - 100).toFixed(1)}% slower than baseline`
            : `${(100 - comparisonRatio * 100).toFixed(1)}% faster than baseline`

        table.push([
            TERMINAL_COLORS.icon('📊') + ' ' + TERMINAL_COLORS.accent('BASELINE'),
            comparisonColor(comparisonText)
        ])

        table.push([
            TERMINAL_COLORS.icon('🎯') + ' ' + TERMINAL_COLORS.accent('SAMPLES'),
            TERMINAL_COLORS.text(`${String(baseline.sampleSize)} samples`)
        ])
    }

    return applyTableColors(table.toString(), performanceColor)
}

/**
 * 🚨 **Creates Anomaly Warnings Table**
 * 
 * @param context - The enhanced context data
 * @returns The anomaly warnings table
 */
export function createAnomalyWarningsTable(context: IEnhancedTableContext): string {
    const hasAnomalies = Boolean(context.anomalies && context.anomalies.length > 0)
    const hasViolations = Boolean(context.thresholdViolations && context.thresholdViolations.length > 0)

    if (!hasAnomalies && !hasViolations) {
        return ''
    }

    const table = new CLI_TABLE_TYPED({
        chars: createTableChars(),
        style: createTableStyle(),
        colWidths: [35, 58] // Key, Value
    })

    // Header
    table.push([
        { 
            colSpan: 2, 
            content: ANOMALY_COLORS.CRITICAL('🚨 ANOMALY WARNINGS'), 
            hAlign: 'center' 
        }
    ])

    // Anomalies
    if (hasAnomalies && context.anomalies) {
        context.anomalies.forEach((anomaly, index) => {
            const severityColor = getAnomalyColor(anomaly.severity)
            const typeColor = getOperationColor(anomaly.type)

            table.push([
                TERMINAL_COLORS.icon('⚠️') + ' ' + TERMINAL_COLORS.accent(`ANOMALY #${String(index + 1)}`),
                severityColor(`[${anomaly.severity}] `) + typeColor(anomaly.type)
            ])

            table.push([
                TERMINAL_COLORS.icon('🎯') + ' ' + TERMINAL_COLORS.accent('CONFIDENCE'),
                TERMINAL_COLORS.text(`${String((anomaly.confidence * 100).toFixed(1))}%`)
            ])

            table.push([
                TERMINAL_COLORS.icon('📈') + ' ' + TERMINAL_COLORS.accent('DEVIATION'),
                TERMINAL_COLORS.text(`${String(anomaly.deviation.toFixed(2))}σ`)
            ])
        })
    }

    // Threshold Violations
    if (hasViolations && context.thresholdViolations) {
        context.thresholdViolations.forEach((violation, index) => {
            const severityColor = violation.includes('CRITICAL') 
                ? ANOMALY_COLORS.CRITICAL 
                : ANOMALY_COLORS.MEDIUM

            table.push([
                TERMINAL_COLORS.icon('🚫') + ' ' + TERMINAL_COLORS.accent(`VIOLATION #${String(index + 1)}`),
                severityColor(intelligentTruncate(violation, 45))
            ])
        })
    }

    return applyTableColors(table.toString(), ANOMALY_COLORS.CRITICAL)
}

/**
 * 🎯 PROFESSIONAL CLI-TABLE3 CONFIGURATION WITH LEVEL-BASED STYLING
 * @param level - The level of the log message
 * @returns The table configuration
 */
export function createTableConfig(level: string): {
    chars: Record<string, string>;
    style: Record<string, unknown>;
    colWidths: number[];
    borderColor: (text: string) => string;
} {
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
 * @param tableOutput - The table output to color
 * @param borderColor - The color function for the level
 * @returns The colored table output
 */
export function applyTableColors(
    tableOutput: string, 
    borderColor: (text: string) => string
): string {
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
 * 🎯 Gets method label based on visibility
 * @param visibility - The visibility of the method
 * @returns The method label
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
 * @param resultValue - The result value to analyze
 * @returns The result analytics table
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
 * @param entries - The metadata entries to display in the table
 * @returns The metadata table
 */
export function createMetadataTable(
    entries: readonly (readonly [string, string])[]
): string {
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
 * @param argEntries - The argument entries to display in the table
 * @returns The arguments table
 */
export function createArgumentsTable(
    argEntries: readonly (readonly [string, unknown])[]
): string {
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
// 🎯 ENHANCED DECORATOR TABLE WITH ALL NEW FEATURES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Creates Enhanced Decorator Table with all new features**
 * 
 * @param className - The class name
 * @param method - The method name
 * @param message - The log message
 * @param level - The log level
 * @param methodVisibility - Method visibility info
 * @param decoratorHeader - The decorator header
 * @param logObj - The log object
 * @param enhancedContext - Enhanced context data
 * @param config - Enhanced table configuration
 * @returns Combined enhanced table output
 */
export function createEnhancedDecoratorTable(
    className: string,
    method: string,
    message: string,
    level: string,
    methodVisibility: { readonly visibility: string; readonly icon: string },
    decoratorHeader: string,
    logObj: ReadonlyDeep<Record<string, unknown>>,
    enhancedContext?: IEnhancedTableContext,
    config: IEnhancedTableConfig = DEFAULT_ENHANCED_TABLE_CONFIG
): string {
    const tables: string[] = []

    // Main decorator table (always shown)
    tables.push(createDecoratorTable(
        className, 
        method, 
        message, 
        level, 
        methodVisibility, 
        decoratorHeader, 
        logObj
    ))

    if (enhancedContext) {
        // Correlation Context Table
        if (config.showCorrelationContext) {
            const correlationTable = createCorrelationContextTable(enhancedContext)
            if (correlationTable) {
                tables.push(correlationTable)
            }
        }

        // Semantic Context Table
        if (config.showSemanticContext) {
            const semanticTable = createSemanticContextTable(enhancedContext)
            if (semanticTable) {
                tables.push(semanticTable)
            }
        }

        // Performance Indicators Table
        if (config.showPerformanceIndicators) {
            const performanceTable = createPerformanceIndicatorsTable(enhancedContext)
            if (performanceTable) {
                tables.push(performanceTable)
            }
        }

        // Anomaly Warnings Table
        if (config.showAnomalyWarnings) {
            const anomalyTable = createAnomalyWarningsTable(enhancedContext)
            if (anomalyTable) {
                tables.push(anomalyTable)
            }
        }
    }

    return tables.join('\n\n')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 UTILITY FUNCTIONS FOR TABLE CREATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Creates standard table characters**
 * @returns Standard table character configuration
 */
function createTableChars(): Record<string, string> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
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
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * 🎯 **Creates standard table style**
 * @returns Standard table style configuration
 */
function createTableStyle(): Record<string, unknown> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
        'padding-left': 1,
        'padding-right': 1,
        head: [],
        border: []
    }
    /* eslint-enable @typescript-eslint/naming-convention */
} 