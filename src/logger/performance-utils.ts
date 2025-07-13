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
import { ReadonlyDeep } from 'type-fest'
import { 
    AnomalyDetector, 
    createAnomalyDetector, 
    createPerformanceMetric,
    type IAnomalyDetection,
    type IAnomalyConfig
} from './anomaly-detector.ts'
import { detectSemanticContext, type ISemanticContext } from './semantic-detector.ts'
import type { IPerformanceMetrics } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED PERFORMANCE CONFIGURATION WITH ANOMALY DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Performance Configuration**
 * 
 * Configuration for performance monitoring with anomaly detection
 */
export interface IEnhancedPerformanceConfig {
    readonly anomalyDetection: {
        readonly enabled: boolean
        readonly config?: ReadonlyDeep<Partial<IAnomalyConfig>>
    }
    readonly baseline: {
        readonly trackingEnabled: boolean
        readonly minSampleSize: number
        readonly maxHistoryDays: number
    }
    readonly thresholds: {
        readonly slowMethodWarning: number // ms
        readonly slowMethodCritical: number // ms
        readonly memoryWarning: number // bytes
        readonly memoryCritical: number // bytes
        readonly cpuWarning: number // percentage
        readonly cpuCritical: number // percentage
    }
    readonly reporting: {
        readonly logAnomalies: boolean
        readonly logBaselines: boolean
        readonly logThresholdViolations: boolean
    }
}

/**
 * 🎯 **Performance Baseline Data**
 * 
 * Baseline performance metrics for a specific method
 */
export interface IPerformanceBaseline {
    readonly method: string
    readonly averageDuration: number
    readonly medianDuration: number
    readonly p95Duration: number
    readonly averageMemory: number
    readonly sampleSize: number
    readonly lastUpdated: number
    readonly semantic?: ISemanticContext
}

/**
 * 🎯 **Enhanced Performance Snapshot**
 * 
 * Extended performance snapshot with anomaly detection results
 */
export interface IEnhancedPerformanceSnapshot extends IPerformanceMetrics {
    readonly anomalies?: readonly IAnomalyDetection[]
    readonly baseline?: IPerformanceBaseline
    readonly thresholdViolations?: readonly string[]
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 GLOBAL INSTANCES & STATE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Default Enhanced Performance Configuration**
 */
const DEFAULT_ENHANCED_CONFIG: IEnhancedPerformanceConfig = {
    anomalyDetection: {
        enabled: true,
        config: {
            performance: {
                slowThreshold: 3.0,
                fastThreshold: 0.1,
                stdDevSensitivity: 2.5,
                minSampleSize: 10
            },
            memory: {
                highThreshold: 2.0,
                lowThreshold: 0.1,
                stdDevSensitivity: 2.0
            },
            frequency: {
                highThreshold: 100,
                lowThreshold: 1,
                timeWindow: 60000 // 1 minute
            },
            error: {
                spikeThreshold: 0.1,
                consecutiveErrors: 3
            },
            global: {
                confidenceThreshold: 0.7,
                maxAnomaliesPerSecond: 10,
                enabledDetectors: [
                    'PERFORMANCE_SLOW',
                    'PERFORMANCE_FAST',
                    'MEMORY_HIGH',
                    'STATISTICAL_OUTLIER'
                ]
            }
        }
    },
    baseline: {
        trackingEnabled: true,
        minSampleSize: 20,
        maxHistoryDays: 30
    },
    thresholds: {
        slowMethodWarning: 1000, // 1 second
        slowMethodCritical: 5000, // 5 seconds
        memoryWarning: 50 * 1024 * 1024, // 50MB
        memoryCritical: 100 * 1024 * 1024, // 100MB
        cpuWarning: 80, // 80%
        cpuCritical: 95 // 95%
    },
    reporting: {
        logAnomalies: true,
        logBaselines: false,
        logThresholdViolations: true
    }
} as const

/**
 * 🎯 **Global Enhanced Performance State**
 */
let enhancedPerformanceConfig: IEnhancedPerformanceConfig = DEFAULT_ENHANCED_CONFIG
let anomalyDetector: AnomalyDetector | undefined
const performanceBaselines = new Map<string, IPerformanceBaseline>()

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
// 🎯 ENHANCED PERFORMANCE CONFIGURATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Configure Enhanced Performance Monitoring**
 * 
 * @param config - The enhanced performance configuration
 */
export function configureEnhancedPerformanceMonitoring(
    config: ReadonlyDeep<Partial<IEnhancedPerformanceConfig>>
): void {
    enhancedPerformanceConfig = {
        ...DEFAULT_ENHANCED_CONFIG,
        ...config,
        anomalyDetection: {
            ...DEFAULT_ENHANCED_CONFIG.anomalyDetection,
            ...config.anomalyDetection
        },
        baseline: {
            ...DEFAULT_ENHANCED_CONFIG.baseline,
            ...config.baseline
        },
        thresholds: {
            ...DEFAULT_ENHANCED_CONFIG.thresholds,
            ...config.thresholds
        },
        reporting: {
            ...DEFAULT_ENHANCED_CONFIG.reporting,
            ...config.reporting
        }
    }

    // Initialize or reconfigure anomaly detector
    if (enhancedPerformanceConfig.anomalyDetection.enabled) {
        anomalyDetector = createAnomalyDetector(enhancedPerformanceConfig.anomalyDetection.config)
    } else {
        anomalyDetector = undefined
    }
}

/**
 * 🎯 **Get Current Enhanced Performance Configuration**
 * 
 * @returns The current configuration
 */
export function getEnhancedPerformanceConfiguration(): ReadonlyDeep<IEnhancedPerformanceConfig> {
    return enhancedPerformanceConfig
}

/**
 * 🎯 **Initialize Enhanced Performance Monitoring**
 * 
 * Call this once at application startup
 */
export function initializeEnhancedPerformanceMonitoring(): void {
    if (enhancedPerformanceConfig.anomalyDetection.enabled && !anomalyDetector) {
        anomalyDetector = createAnomalyDetector(enhancedPerformanceConfig.anomalyDetection.config)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED PERFORMANCE TRACKING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Track Method Performance with Anomaly Detection**
 * 
 * @param method - The method name
 * @param duration - The execution duration in milliseconds
 * @param memoryDelta - The memory usage delta in bytes
 * @param success - Whether the method execution was successful
 * @param semantic - Optional semantic context
 * @returns Anomaly detection results and updated baseline
 */
export function trackMethodPerformance(
    method: string,
    duration: number,
    memoryDelta = 0,
    success = true,
    semanticContext?: ISemanticContext
): {
    readonly anomalies: readonly IAnomalyDetection[]
    readonly baseline?: IPerformanceBaseline
    readonly thresholdViolations: readonly string[]
} {
    let anomalies: readonly IAnomalyDetection[] = []
    let baseline: IPerformanceBaseline | undefined
    const thresholdViolations: string[] = []
    const finalSemanticContext = semanticContext ?? detectSemanticContext(method, [])

    // Check threshold violations
    if (duration > enhancedPerformanceConfig.thresholds.slowMethodCritical) {
        thresholdViolations.push(`CRITICAL: Method execution time ${duration.toFixed(2)}ms exceeds critical threshold`)
    } else if (duration > enhancedPerformanceConfig.thresholds.slowMethodWarning) {
        thresholdViolations.push(`WARNING: Method execution time ${duration.toFixed(2)}ms exceeds warning threshold`)
    }

    if (memoryDelta > enhancedPerformanceConfig.thresholds.memoryCritical) {
        const memoryMB = (memoryDelta / 1024 / 1024).toFixed(2)
        thresholdViolations.push(`CRITICAL: Memory usage ${memoryMB}MB exceeds critical threshold`)
    } else if (memoryDelta > enhancedPerformanceConfig.thresholds.memoryWarning) {
        const memoryMB = (memoryDelta / 1024 / 1024).toFixed(2)
        thresholdViolations.push(`WARNING: Memory usage ${memoryMB}MB exceeds warning threshold`)
    }

    // Anomaly detection
    if (anomalyDetector && enhancedPerformanceConfig.anomalyDetection.enabled) {
        const metric = createPerformanceMetric(method, duration, memoryDelta, success, finalSemanticContext)
        anomalies = anomalyDetector.addMetricAndDetect(metric)
    }

    // Baseline tracking
    if (enhancedPerformanceConfig.baseline.trackingEnabled) {
        baseline = updatePerformanceBaseline(method, duration, memoryDelta, finalSemanticContext)
    }

    // Logging
    if (enhancedPerformanceConfig.reporting.logAnomalies && anomalies.length > 0) {
        console.warn(`🚨 Performance anomalies detected for ${method}:`, anomalies)
    }

    if (enhancedPerformanceConfig.reporting.logThresholdViolations && thresholdViolations.length > 0) {
        console.warn(`⚠️ Performance threshold violations for ${method}:`, thresholdViolations)
    }

    if (enhancedPerformanceConfig.reporting.logBaselines && baseline) {
        console.info(`📊 Performance baseline updated for ${method}:`, baseline)
    }

    return {
        anomalies,
        baseline,
        thresholdViolations
    }
}

/**
 * 🎯 **Update Performance Baseline for a Method**
 * 
 * @param method - The method name
 * @param duration - The execution duration
 * @param memory - The memory usage
 * @param semantic - Optional semantic context
 * @returns Updated baseline
 */
function updatePerformanceBaseline(
    method: string,
    duration: number,
    memory: number,
    semantic?: ISemanticContext
): IPerformanceBaseline {
    const existing = performanceBaselines.get(method)
    const timestamp = Date.now()
    const validMemoryDelta = Math.max(0, memory) // Ensure memory delta is not negative for averaging

    if (!existing) {
        const newBaseline: IPerformanceBaseline = {
            method,
            averageDuration: duration,
            medianDuration: duration,
            p95Duration: duration,
            averageMemory: validMemoryDelta,
            sampleSize: 1,
            lastUpdated: timestamp,
            semantic
        }
        performanceBaselines.set(method, newBaseline)
        return newBaseline
    }

    // Simple incremental update (for performance)
    const newSampleSize = existing.sampleSize + 1
    const alpha = 1 / newSampleSize // Simple moving average factor

    const updatedBaseline: IPerformanceBaseline = {
        method,
        averageDuration: existing.averageDuration + alpha * (duration - existing.averageDuration),
        medianDuration: existing.medianDuration, // Keep existing for now (complex to update incrementally)
        p95Duration: Math.max(existing.p95Duration, duration), // Simplified P95 approximation
        averageMemory: existing.averageMemory + alpha * (validMemoryDelta - existing.averageMemory),
        sampleSize: newSampleSize,
        lastUpdated: timestamp,
        semantic: semantic ?? existing.semantic
    }

    performanceBaselines.set(method, updatedBaseline)
    return updatedBaseline
}

/**
 * 🎯 **Get Performance Baseline for a Method**
 * 
 * @param method - The method name
 * @returns The baseline data or undefined
 */
export function getPerformanceBaseline(method: string): IPerformanceBaseline | undefined {
    return performanceBaselines.get(method)
}

/**
 * 🎯 **Get All Performance Baselines**
 * 
 * @returns Map of all baseline data
 */
export function getAllPerformanceBaselines(): ReadonlyMap<string, IPerformanceBaseline> {
    return new Map(performanceBaselines)
}

/**
 * 🎯 **Clear Performance Baselines**
 * 
 * @param olderThanDays - Optional: only clear baselines older than specified days
 */
export function clearPerformanceBaselines(olderThanDays?: number): void {
    if (olderThanDays !== undefined && olderThanDays > 0 && !Number.isNaN(olderThanDays)) {
        const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000)
        for (const [method, baseline] of performanceBaselines.entries()) {
            if (baseline.lastUpdated < cutoffTime) {
                performanceBaselines.delete(method)
            }
        }
    } else {
        performanceBaselines.clear()
    }
}

/**
 * 🎯 **Get Anomaly Detection Statistics**
 * 
 * @returns Current anomaly detector statistics
 */
export function getAnomalyDetectionStatistics(): {
    readonly trackedMethods: readonly string[]
    readonly totalMethods: number
    readonly isEnabled: boolean
    } {
    if (!anomalyDetector) {
        return {
            trackedMethods: [],
            totalMethods: 0,
            isEnabled: false
        }
    }

    const trackedMethods = anomalyDetector.getTrackedMethods()
    return {
        trackedMethods,
        totalMethods: trackedMethods.length,
        isEnabled: enhancedPerformanceConfig.anomalyDetection.enabled
    }
}

/**
 * 🎯 **Clear All Anomaly Detection Data**
 */
export function clearAnomalyDetectionData(): void {
    anomalyDetector?.clearAll()
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 EXISTING PERFORMANCE UTILITIES (ENHANCED)
// ═══════════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED PERFORMANCE TRACKING WITH AUTOMATIC INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

// Initialize enhanced performance monitoring on module load
initializeEnhancedPerformanceMonitoring() 