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
// 🎯 ENTERPRISE PERFORMANCE CONFIGURATION - MODERN STANDARD
// ═══════════════════════════════════════════════════════════════════════════════

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
        readonly trackingEnabled: boolean
        readonly minSampleSize: number
        readonly maxHistoryDays: number
    }
    
    /**
     * 🎚️ **Performance Thresholds Configuration**
     */
    readonly thresholds: {
        readonly slowMethodWarning: number // ms
        readonly slowMethodCritical: number // ms
        readonly memoryWarning: number // bytes
        readonly memoryCritical: number // bytes
        readonly cpuWarning: number // percentage
        readonly cpuCritical: number // percentage
    }
    
    /**
     * 📝 **Performance Reporting Configuration**
     */
    readonly reporting: {
        readonly logAnomalies: boolean
        readonly logBaselines: boolean
        readonly logThresholdViolations: boolean
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
                slowThreshold: 3.0,
                fastThreshold: 0.1,
                stdDevSensitivity: enterprisePerformanceConfig.anomalyDetection.thresholdMultiplier ?? 2.5,
                minSampleSize: enterprisePerformanceConfig.anomalyDetection.minSamples ?? 10
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
                ] as const satisfies readonly AnomalyType[]
            }
        }
        
        anomalyDetector = createAnomalyDetector(anomalyConfig)
    } else {
        anomalyDetector = undefined
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
 * 🎯 **Initialize Enterprise Performance Monitoring**
 * 
 * Call this once at application startup
 */
export function initializeEnterprisePerformanceMonitoring(): void {
    if (enterprisePerformanceConfig.anomalyDetection.enabled === true && !anomalyDetector) {
        configureEnterprisePerformanceMonitoring({}) // Use default config
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
        isEnabled: enterprisePerformanceConfig.anomalyDetection.enabled ?? false
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

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 LEGACY COMPATIBILITY FUNCTIONS (DEPRECATED)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * @deprecated Use configureEnterprisePerformanceMonitoring instead
 */
export const configureEnhancedPerformanceMonitoring = configureEnterprisePerformanceMonitoring

/**
 * @deprecated Use getEnterprisePerformanceConfiguration instead
 */
export const getEnhancedPerformanceConfiguration = getEnterprisePerformanceConfiguration

/**
 * @deprecated Use initializeEnterprisePerformanceMonitoring instead
 */
export const initializeEnhancedPerformanceMonitoring = initializeEnterprisePerformanceMonitoring

// Initialize enterprise performance monitoring on module load
initializeEnterprisePerformanceMonitoring() 