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
 * 🎯 ENTERPRISE PERFORMANCE CONFIGURATION - MODERN STANDARD
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { ReadonlyDeep } from 'type-fest'

import { DEFAULT_LOG_CONFIG, type ILogDecoratorConfig } from '@/decorators/types.ts'
import {
    AnomalyDetector,
    createAnomalyDetector
} from '@/logger/anomaly-detector/index.ts'
import type { AnomalyType } from '@/logger/anomaly-detector/types.ts'
import type { IPerformanceBaseline } from '@/logger/performance/types.ts'
import type { ISemanticContext } from '@/logger/semantic-detector/index.ts'

/**
 * 🎯 **Enterprise Performance Configuration Interface**
 *
 * Modern performance configuration that extends the Enterprise Standard ILogDecoratorConfig
 */
export interface IEnterprisePerformanceConfig {

    /**
     * 🚨 **Anomaly Detection Configuration** - inherited from Enterprise Standard
     */
    readonly anomalyDetection: NonNullable<ILogDecoratorConfig['anomalyDetection']>

    /**
     * 📊 **Performance Baseline Configuration**
     */
    readonly baseline: {
        readonly maxHistoryDays: number
        readonly minSampleSize: number
        readonly trackingEnabled: boolean
    }

    /**
     * 📝 **Performance Reporting Configuration**
     */
    readonly reporting: {
        readonly logAnomalies: boolean
        readonly logBaselines: boolean
        readonly logThresholdViolations: boolean
    }

    /**
     * 🎚️ **Performance Thresholds Configuration**
     */
    readonly thresholds: {

        // Percentage
        readonly cpuCritical: number

        // Bytes
        readonly cpuWarning: number

        // Bytes
        readonly memoryCritical: number

        // Ms
        readonly memoryWarning: number

        // Ms
        readonly slowMethodCritical: number
        readonly slowMethodWarning: number // Percentage
    }
}

/**
 * 🎯 **Enterprise Performance Configuration - Default Values**
 *
 * Modern configuration based on Enterprise Standard with performance extensions
 */
const ENTERPRISE_PERFORMANCE_CONFIG: IEnterprisePerformanceConfig = {
    anomalyDetection: {
        ...DEFAULT_LOG_CONFIG.anomalyDetection,
        minSamples: 10,
        thresholdMultiplier: 2.5,
        enableCriticalAlerts: true,
        enableWarningAlerts: true
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
 * 🎯 **Global Enterprise Performance State**
 */
let enterprisePerformanceConfig: IEnterprisePerformanceConfig = ENTERPRISE_PERFORMANCE_CONFIG
let anomalyDetector: AnomalyDetector | undefined
const performanceBaselines = new Map<string, IPerformanceBaseline>()

/**
 * 🎯 **Clear All Anomaly Detection Data**
 */
export function clearAnomalyDetectionData(): void {
    anomalyDetector?.clearAll()
}

/**
 * 🎯 **Clear Performance Baselines**
 *
 * @param olderThanDays - Optional: only clear baselines older than specified days
 */
export function clearPerformanceBaselines(
    olderThanDays?: number
): void {
    if (olderThanDays !== undefined && olderThanDays > 0 && !Number.isNaN(
        olderThanDays
    )) {
        const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000)

        for (const [method, baseline] of performanceBaselines.entries()) {
            if (baseline.lastUpdated < cutoffTime) {
                performanceBaselines.delete(
                    method
                )
            }
        }
    }
    else {
        performanceBaselines.clear()
    }
}

/**
 * 🎯 **Configure Enterprise Performance Monitoring**
 *
 * @param config - The enterprise performance configuration
 */
export function configureEnterprisePerformanceMonitoring(
    config: ReadonlyDeep<Partial<IEnterprisePerformanceConfig>>
): void {
    enterprisePerformanceConfig = {
        ...ENTERPRISE_PERFORMANCE_CONFIG,
        ...config,
        anomalyDetection: {
            ...ENTERPRISE_PERFORMANCE_CONFIG.anomalyDetection,
            ...config.anomalyDetection
        },
        baseline: {
            ...ENTERPRISE_PERFORMANCE_CONFIG.baseline,
            ...config.baseline
        },
        thresholds: {
            ...ENTERPRISE_PERFORMANCE_CONFIG.thresholds,
            ...config.thresholds
        },
        reporting: {
            ...ENTERPRISE_PERFORMANCE_CONFIG.reporting,
            ...config.reporting
        }
    }

    // Initialize or reconfigure anomaly detector using Enterprise Standard
    if (enterprisePerformanceConfig.anomalyDetection.enabled === true) {
        // Convert Enterprise config to Anomaly Detector config format
        const anomalyConfig = {
            performance: {
                slowThreshold: 3,
                fastThreshold: 0.1,
                stdDevSensitivity: enterprisePerformanceConfig.anomalyDetection.thresholdMultiplier ?? 2.5,
                minSampleSize: enterprisePerformanceConfig.anomalyDetection.minSamples ?? 10
            },
            memory: {
                highThreshold: 2,
                lowThreshold: 0.1,
                stdDevSensitivity: 2
            },
            frequency: {
                highThreshold: 100,
                lowThreshold: 1,
                timeWindow: 60_000 // 1 minute
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
                ] as const satisfies readonly AnomalyType[]
            }
        }

        anomalyDetector = createAnomalyDetector(
            anomalyConfig
        )
    }
    else {
        anomalyDetector = undefined
    }
}

/**
 * 🎯 **Get All Performance Baselines**
 *
 * @returns Map of all baseline data
 */
export function getAllPerformanceBaselines(): ReadonlyMap<string, IPerformanceBaseline> {
    return new Map(
        performanceBaselines
    )
}

/**
 * 🎯 **Get Anomaly Detection Statistics**
 *
 * @returns Current anomaly detector statistics
 */
export function getAnomalyDetectionStatistics(): {
    readonly isEnabled: boolean
    readonly totalMethods: number
    readonly trackedMethods: readonly string[]
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
        isEnabled: enterprisePerformanceConfig.anomalyDetection.enabled ?? false
    }
}

/**
 * 🎯 **Get Current Enterprise Performance Configuration**
 *
 * @returns The current enterprise configuration
 */
export function getEnterprisePerformanceConfiguration(): ReadonlyDeep<IEnterprisePerformanceConfig> {
    return enterprisePerformanceConfig
}

/**
 * 🎯 **Get Global Anomaly Detector Instance**
 *
 * @returns The current anomaly detector instance
 */
export function getGlobalAnomalyDetector(): AnomalyDetector | undefined {
    return anomalyDetector
}

/**
 * 🎯 **Get Performance Baseline for a Method**
 *
 * @param method - The method name
 * @returns The baseline data or undefined
 */
export function getPerformanceBaseline(
    method: string
): IPerformanceBaseline | undefined {
    return performanceBaselines.get(
        method
    )
}

/**
 * 🎯 **Initialize Enterprise Performance Monitoring**
 *
 * Call this once at application startup
 */
export function initializeEnterprisePerformanceMonitoring(): void {
    if (enterprisePerformanceConfig.anomalyDetection.enabled === true && !anomalyDetector) {
        configureEnterprisePerformanceMonitoring(
            {}
        ) // Use default config
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
    const existing = performanceBaselines.get(
        method
    )
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

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔄 LEGACY COMPATIBILITY FUNCTIONS (DEPRECATED)
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Initialize enterprise performance monitoring on module load
initializeEnterprisePerformanceMonitoring()
