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
██                    🎯 ENTERPRISE-GRADE PERFORMANCE MONITORING             ██
██                         POWERED BY NODE.JS PERF_HOOKS                     ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { performance, PerformanceObserver } from 'perf_hooks'
import type { IPerformanceMetrics } from './types.ts'
import { ReadonlyDeep } from 'type-fest'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE OBSERVER FOR ENTERPRISE-GRADE MONITORING
// ═══════════════════════════════════════════════════════════════════════════════

let performanceData: {
    gcEntries: PerformanceEntry[]
    markEntries: PerformanceEntry[]
    measureEntries: PerformanceEntry[]
    resourceEntries: PerformanceEntry[]
} = {
    gcEntries: [],
    markEntries: [],
    measureEntries: [],
    resourceEntries: []
}

// 🎯 PERFORMANCE OBSERVER - MONITORS ALL PERFORMANCE ENTRIES
const performanceObserver = new PerformanceObserver((list: Readonly<PerformanceObserverEntryList>) => {
    const entries = list.getEntries()
    
    entries.forEach((entry: Readonly<PerformanceEntry>) => {
        switch (entry.entryType) {
        case 'gc':
        case 'mark':
        case 'measure':
        case 'resource':
        case 'function':
        case 'dns':
        case 'http2':
        case 'http':
        case 'net':
        case 'node':
            // Handle all known performance entry types
            if (entry.entryType === 'gc') {
                performanceData.gcEntries.push(entry)
                // Keep only last 10 GC entries to prevent memory leak
                if (performanceData.gcEntries.length > 10) {
                    performanceData.gcEntries.shift()
                }
            } else if (entry.entryType === 'mark') {
                performanceData.markEntries.push(entry)
                // Keep only last 20 mark entries
                if (performanceData.markEntries.length > 20) {
                    performanceData.markEntries.shift()
                }
            } else if (entry.entryType === 'measure') {
                performanceData.measureEntries.push(entry)
                // Keep only last 20 measure entries
                if (performanceData.measureEntries.length > 20) {
                    performanceData.measureEntries.shift()
                }
            } else if (entry.entryType === 'resource') {
                performanceData.resourceEntries.push(entry)
                // Keep only last 50 resource entries
                if (performanceData.resourceEntries.length > 50) {
                    performanceData.resourceEntries.shift()
                }
            }
            break
        default:
            // Handle other entry types that might be added in the future
            break
        }
    })
})

// 🚀 START PERFORMANCE MONITORING
try {
    performanceObserver.observe({ entryTypes: ['gc', 'mark', 'measure', 'resource'] })
} catch {
    // Fallback for environments where some entry types are not supported
    console.warn('⚠️  Some performance monitoring features are not available in this environment')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Creates performance metrics snapshot with advanced perf_hooks data
 * @returns The performance metrics snapshot
 */
export function createPerformanceSnapshot(): IPerformanceMetrics {
    return {
        startTime: performance.now(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        gcPerformance: [...performanceData.gcEntries],
        markEntries: [...performanceData.markEntries],
        measureEntries: [...performanceData.measureEntries],
        resourceTimings: [...performanceData.resourceEntries]
    }
}

/**
 * 🎯 Creates a performance mark for method execution tracking
 * @param markName - The name of the performance mark
 */
export function createPerformanceMark(markName: string): void {
    performance.mark(markName)
}

/**
 * 🎯 Creates a performance measure between two marks
 * @param measureName - The name of the performance measure
 * @param startMark - The start mark name
 * @param endMark - The end mark name
 */
export function createPerformanceMeasure(
    measureName: string, 
    startMark: string, 
    endMark: string
): void {
    performance.measure(measureName, startMark, endMark)
}

/**
 * 🎯 Gets the latest GC performance data
 * @returns The latest GC performance entries
 */
export function getGCPerformanceData(): PerformanceEntry[] {
    return [...performanceData.gcEntries]
}

/**
 * 🎯 Gets the latest performance marks
 * @returns The latest performance mark entries
 */
export function getPerformanceMarks(): PerformanceEntry[] {
    return [...performanceData.markEntries]
}

/**
 * 🎯 Gets the latest performance measures
 * @returns The latest performance measure entries
 */
export function getPerformanceMeasures(): PerformanceEntry[] {
    return [...performanceData.measureEntries]
}

/**
 * 🎯 Clears all performance data
 */
export function clearPerformanceData(): void {
    performanceData = {
        gcEntries: [],
        markEntries: [],
        measureEntries: [],
        resourceEntries: []
    }
    
    // Clear performance timeline
    performance.clearMarks()
    performance.clearMeasures()
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