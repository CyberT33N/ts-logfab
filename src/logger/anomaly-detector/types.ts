/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██║                      ██
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
// 🚨 ANOMALY DETECTION TYPES - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type IRingBufferStats } from '@/logger/ring-buffer.ts'
import { type ISemanticContext } from '@/logger/semantic-detector/index.ts'
export type { IRingBufferStats }
export type { ISemanticContext }

/**
 * 🔍 **Anomaly Types**
 * 
 * Different types of anomalies that can be detected
 */
export type AnomalyType = 
    | 'PERFORMANCE_SLOW'
    | 'PERFORMANCE_FAST' 
    | 'MEMORY_HIGH'
    | 'MEMORY_LOW'
    | 'ERROR_SPIKE'
    | 'FREQUENCY_HIGH'
    | 'FREQUENCY_LOW'
    | 'PATTERN_DEVIATION'
    | 'STATISTICAL_OUTLIER'

/**
 * ⚠️ **Anomaly Severity Levels**
 */
export type AnomalySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

/**
 * 🎯 **Anomaly Detection Result**
 * 
 * Complete information about a detected anomaly
 */
export interface IAnomalyDetection {
    readonly type: AnomalyType
    readonly severity: AnomalySeverity
    readonly confidence: number // 0-1, how confident we are this is an anomaly
    readonly current: number
    readonly expected: number
    readonly deviation: number // how far from expected (in standard deviations)
    readonly threshold: number
    readonly context: {
        readonly method: string
        readonly semantic?: ISemanticContext
        readonly timestamp: number
        readonly sampleSize: number
    }
    readonly metadata: {
        readonly detectionMethod: string
        readonly historicalStats: IRingBufferStats
        readonly triggers: readonly string[]
    }
}

/**
 * ⚙️ **Anomaly Detection Configuration**
 * 
 * Configurable thresholds and settings for all anomaly detectors
 */
export interface IAnomalyConfig {
    readonly performance: {
        readonly slowThreshold: number // multiples of mean (e.g., 3x)
        readonly fastThreshold: number // multiples below mean (e.g., 0.1x)
        readonly stdDevSensitivity: number // standard deviations (e.g., 2.5)
        readonly minSampleSize: number // minimum samples before detection
    }
    readonly memory: {
        readonly highThreshold: number // multiples of mean
        readonly lowThreshold: number // multiples below mean
        readonly stdDevSensitivity: number
    }
    readonly frequency: {
        readonly highThreshold: number // calls per time window
        readonly lowThreshold: number // calls per time window  
        readonly timeWindow: number // ms
    }
    readonly error: {
        readonly spikeThreshold: number // error rate (0-1)
        readonly consecutiveErrors: number // consecutive errors to trigger
    }
    readonly global: {
        readonly confidenceThreshold: number // minimum confidence to report
        readonly maxAnomaliesPerSecond: number // rate limiting
        readonly enabledDetectors: readonly AnomalyType[]
    }
}

/**
 * 📈 **Performance Metrics**
 * 
 * Single performance measurement for a method call
 */
export interface IPerformanceMetric {
    readonly method: string
    readonly duration: number
    readonly memory: number
    readonly timestamp: number
    readonly success: boolean
    readonly semantic?: ISemanticContext
} 