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
// 🎯 ENHANCED CORRELATION CONTEXT TABLES
// ═══════════════════════════════════════════════════════════════════════════════

import { 
    TERMINAL_COLORS, 
    PERFORMANCE_COLORS,
    ANOMALY_COLORS,
    CONTEXT_COLORS,
    getOperationColor,
    getPerformanceColor,
    getAnomalyColor,
    getSemanticColors
} from '@/prettifiers/colors.ts'
import { intelligentTruncate } from '@/prettifiers/utility-functions.ts'
import { CliTable, applyTableColors, createTableChars, createTableStyle } from './core-table-config.ts'
import type { IEnhancedTableContext } from './types.ts'

// 🎯 TYPE-ASSERTION für cli-table3 (keine offizielle @types verfügbar)
type CliTableConstructor = new (options?: Record<string, unknown>) => {
    push(...rows: readonly unknown[]): void
    toString(): string
}

const CLI_TABLE_TYPED = CliTable as CliTableConstructor

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