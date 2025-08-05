/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 PERFORMANCE MONITORING - MAIN MODULE EXPORTS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { PerformanceMonitor } from './core'

import type { IPerformanceMonitorConfig } from './types'
import type { ReadonlyDeep } from 'type-fest'

export { PerformanceMonitor } from './core'

// All Types
export type {
    IEnhancedPerformanceSnapshot,
    IPerformanceBaseline,
    IPerformanceMonitorConfig,
    IPerformanceResult,
    IPerformanceSession,
    IPerformanceStatsSummary
} from './types.ts'

// Performance Utils
export {
    calculatePerformanceDifference,
    clearPerformanceData,
    createEnhancedPerformanceSnapshot,
    createPerformanceMark,
    createPerformanceMeasure,
    createPerformanceSnapshot,
    getGCPerformanceData,
    getPerformanceMarks,
    getPerformanceMeasures,
    getResourceTimings,
    trackMethodPerformance
} from './utils'

// Enterprise Performance Configuration
export type { IEnterprisePerformanceConfig } from './utils/enhanced-config.ts'

// Utils - Enterprise Performance Monitoring
export {
    clearAnomalyDetectionData,
    clearPerformanceBaselines,
    configureEnterprisePerformanceMonitoring,
    getAllPerformanceBaselines,
    getAnomalyDetectionStatistics,
    getEnterprisePerformanceConfiguration,
    getPerformanceBaseline,
    initializeEnterprisePerformanceMonitoring,
    updatePerformanceBaseline
} from './utils/enhanced-config.ts'

/**
 * 🏭 **Create performance monitor instance**
 *
 * Factory function for creating configured performance monitor
 */
export function createPerformanceMonitor(config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>> = {}): PerformanceMonitor {
    return new PerformanceMonitor(config)
}

/**
 * 🌐 **Global performance monitor singleton**
 *
 * Shared instance for use across the application
 */
let globalPerformanceMonitor: PerformanceMonitor | undefined

/**
 * ⚙️ **Configure global performance monitor**
 *
 * Updates the configuration of the global instance
 */
export function configureGlobalPerformanceMonitor(config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>>): void {
    const monitor = getGlobalPerformanceMonitor()

    monitor.updateConfig(config)
}

/**
 * 🔗 **Get global performance monitor**
 *
 * Returns the global singleton instance
 */
export function getGlobalPerformanceMonitor(): PerformanceMonitor {
    globalPerformanceMonitor ??= new PerformanceMonitor()

    return globalPerformanceMonitor
}

/**
 * 🔄 **Reset global performance monitor**
 *
 * Resets the global instance
 */
export function resetGlobalPerformanceMonitor(): void {
    globalPerformanceMonitor = undefined
}
