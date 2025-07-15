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
// 🎯 ENHANCED DECORATOR TABLE WITH ALL NEW FEATURES
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { createDecoratorTable } from './basic-table-creators.ts'
import { 
    createCorrelationContextTable, 
    createSemanticContextTable, 
    createPerformanceIndicatorsTable, 
    createAnomalyWarningsTable 
} from './enhanced-context-tables.ts'
import { 
    type IEnhancedTableContext, 
    type IEnhancedTableConfig, 
    DEFAULT_ENHANCED_TABLE_CONFIG 
} from './types.ts'

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