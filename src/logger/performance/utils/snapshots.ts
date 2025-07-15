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
// 🎯 PERFORMANCE SNAPSHOTS & DIFFERENCE CALCULATION
// ═══════════════════════════════════════════════════════════════════════════════

import { performance } from 'perf_hooks'
import type { ReadonlyDeep } from 'type-fest'
import type { IPerformanceMetrics } from '../../types.ts'
import type { IEnhancedPerformanceSnapshot } from '../types.ts'

/**
 * 🎯 Creates enhanced performance metrics snapshot with anomaly detection
 * @returns The enhanced performance metrics snapshot
 */
export function createEnhancedPerformanceSnapshot(): IEnhancedPerformanceSnapshot {
    const baseSnapshot = createPerformanceSnapshot()
    
    return {
        ...baseSnapshot,
        anomalies: [], // Will be populated by specific tracking calls
        thresholdViolations: []
    }
}

/**
 * 🎯 Creates performance metrics snapshot with advanced perf_hooks data
 * @returns The performance metrics snapshot
 */
export function createPerformanceSnapshot(): IPerformanceMetrics {
    return {
        startTime: performance.now(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        gcPerformance: [],
        markEntries: [],
        measureEntries: [],
        resourceTimings: []
    }
}

/**
 * 🎯 Calculates performance metrics difference between two snapshots
 * @param start - The start performance snapshot
 * @param end - The end performance snapshot
 * @returns The performance metrics difference
 */
export function calculatePerformanceDifference(
    start: ReadonlyDeep<IPerformanceMetrics>, 
    end: ReadonlyDeep<IPerformanceMetrics>
): IPerformanceMetrics {
    const startTime = start.startTime
    const endTime = end.startTime
    
    // Calculate CPU usage difference
    const cpuDiff = start.cpuUsage && end.cpuUsage ? {
        user: end.cpuUsage.user - start.cpuUsage.user,
        system: end.cpuUsage.system - start.cpuUsage.system
    } : undefined
    
    // Calculate memory usage difference
    const memoryDiff = start.memoryUsage && end.memoryUsage ? {
        rss: end.memoryUsage.rss - start.memoryUsage.rss,
        heapTotal: end.memoryUsage.heapTotal - start.memoryUsage.heapTotal,
        heapUsed: end.memoryUsage.heapUsed - start.memoryUsage.heapUsed,
        external: end.memoryUsage.external - start.memoryUsage.external,
        arrayBuffers: end.memoryUsage.arrayBuffers - start.memoryUsage.arrayBuffers
    } : undefined
    
    return {
        startTime,
        duration: endTime - startTime,
        memoryUsage: memoryDiff,
        cpuUsage: cpuDiff,
        gcPerformance: end.gcPerformance ? [...end.gcPerformance] : [],
        markEntries: end.markEntries ? [...end.markEntries] : [],
        measureEntries: end.measureEntries ? [...end.measureEntries] : [],
        resourceTimings: end.resourceTimings ? [...end.resourceTimings] : []
    }
} 