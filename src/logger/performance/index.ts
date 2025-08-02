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
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PERFORMANCE MONITORING - MAIN MODULE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Core Performance Monitor
// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 FACTORY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { PerformanceMonitor } from './core/index.ts'
import type { IPerformanceMonitorConfig } from './types.ts'

export { PerformanceMonitor } from './core/index.ts'

// All Types
export type {
    IPerformanceSession,
    IPerformanceResult,
    IPerformanceMonitorConfig,
    IPerformanceStatsSummary,
    IPerformanceBaseline,
    IEnhancedPerformanceSnapshot
} from './types.ts'

// Enterprise Performance Configuration
export type { IEnterprisePerformanceConfig } from './utils/enhanced-config.ts'

// Utils - Enterprise Performance Monitoring
export {
    configureEnterprisePerformanceMonitoring,
    getEnterprisePerformanceConfiguration,
    initializeEnterprisePerformanceMonitoring,
    updatePerformanceBaseline,
    getPerformanceBaseline,
    getAllPerformanceBaselines,
    clearPerformanceBaselines,
    getAnomalyDetectionStatistics,
    clearAnomalyDetectionData
} from './utils/enhanced-config.ts'

// Performance Utils
export {
    trackMethodPerformance,
    createEnhancedPerformanceSnapshot,
    createPerformanceSnapshot,
    calculatePerformanceDifference,
    createPerformanceMark,
    createPerformanceMeasure,
    getGCPerformanceData,
    getPerformanceMarks,
    getPerformanceMeasures,
    getResourceTimings,
    clearPerformanceData
} from './utils/index.ts'

/**
 * 🏭 **Create performance monitor instance**
 * 
 * Factory function for creating configured performance monitor
 */
export function createPerformanceMonitor(
    config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>> = {}
): PerformanceMonitor {
    return new PerformanceMonitor(config)
}

/**
 * 🌐 **Global performance monitor singleton**
 * 
 * Shared instance for use across the application
 */
let globalPerformanceMonitor: PerformanceMonitor | undefined

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
 * ⚙️ **Configure global performance monitor**
 * 
 * Updates the configuration of the global instance
 */
export function configureGlobalPerformanceMonitor(
    config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>>
): void {
    const monitor = getGlobalPerformanceMonitor()
    monitor.updateConfig(config)
}

/**
 * 🔄 **Reset global performance monitor**
 * 
 * Resets the global instance
 */
export function resetGlobalPerformanceMonitor(): void {
    globalPerformanceMonitor = undefined
} 