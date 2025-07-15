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
// 🎯 TYPE DEFINITIONS FOR CLI-TABLE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import type { IAnomalyDetection } from '@/logger/anomaly-detector/index.ts'
import type { IPerformanceBaseline } from '@/logger/performance/types.ts'
import type { ISemanticContext } from '@/logger/semantic-detector/index.ts'

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