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
// 🎯 ENHANCED PERFORMANCE CONFIGURATION WITH ANOMALY DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { 
    AnomalyDetector, 
    createAnomalyDetector
} from '../../anomaly-detector/index.ts'
import type { ISemanticContext } from '../../semantic-detector.ts'
import type { IEnhancedPerformanceConfig, IPerformanceBaseline } from '../types.ts'

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

/**
 * 🎯 **Update Performance Baseline for a Method**
 * 
 * @param method - The method name
 * @param duration - The execution duration
 * @param memory - The memory usage
 * @param semantic - Optional semantic context
 * @returns Updated baseline
 */
export function updatePerformanceBaseline(
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

/**
 * 🎯 **Get Global Anomaly Detector Instance**
 * 
 * @returns The current anomaly detector instance
 */
export function getGlobalAnomalyDetector(): AnomalyDetector | undefined {
    return anomalyDetector
}

// Initialize enhanced performance monitoring on module load
initializeEnhancedPerformanceMonitoring() 