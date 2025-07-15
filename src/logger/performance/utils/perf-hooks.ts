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
// 🎯 PERFORMANCE OBSERVER FOR ENTERPRISE-GRADE MONITORING
// ═══════════════════════════════════════════════════════════════════════════════

import { performance, PerformanceObserver } from 'perf_hooks'

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
 * 🎯 Gets the latest resource timings
 * @returns The latest resource timing entries
 */
export function getResourceTimings(): PerformanceEntry[] {
    return [...performanceData.resourceEntries]
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