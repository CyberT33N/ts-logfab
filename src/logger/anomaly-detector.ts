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
// 🚨 ANOMALY DETECTION - INTELLIGENT PERFORMANCE MONITORING
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { RingBuffer, type IRingBufferStats } from './ring-buffer.ts'
import { type ISemanticContext } from './semantic-detector.ts'

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

/**
 * 🎛️ **Anomaly Detector Class**
 * 
 * Main class for detecting anomalies using ring buffers and statistical analysis
 */
export class AnomalyDetector {
    private readonly _ringBuffers = new Map<string, RingBuffer<number>>()
    private readonly _errorCounts = new Map<string, number>()
    private readonly _frequencyTracking = new Map<string, number[]>()
    private readonly _lastAnomalyTime = new Map<AnomalyType, number>()
    private readonly _config: IAnomalyConfig

    public constructor(config: ReadonlyDeep<Partial<IAnomalyConfig>> = {}) {
        this._config = {
            ...DEFAULT_ANOMALY_CONFIG,
            ...config
        } as IAnomalyConfig
    }

    /**
     * 📊 **Add performance metric and detect anomalies**
     * 
     * Main entry point for anomaly detection
     */
    public addMetricAndDetect(metric: ReadonlyDeep<IPerformanceMetric>): readonly IAnomalyDetection[] {
        // Get or create ring buffer for this method
        const buffer = this._getOrCreateBuffer(metric.method)
        
        // Add the new metric
        buffer.push(metric.duration)
        
        // Track frequency
        this._trackFrequency(metric.method, metric.timestamp)
        
        // Track errors
        if (!metric.success) {
            this._incrementErrorCount(metric.method)
        } else {
            this._resetErrorCount(metric.method)
        }
        
        // Detect anomalies
        const anomalies: IAnomalyDetection[] = []
        
        // Only detect if we have enough samples
        if (buffer.getInfo().currentSize >= this._config.performance.minSampleSize) {
            // Performance anomalies
            anomalies.push(...this._detectPerformanceAnomalies(metric, buffer))
            
            // Memory anomalies  
            anomalies.push(...this._detectMemoryAnomalies(metric, buffer))
            
            // Frequency anomalies
            anomalies.push(...this._detectFrequencyAnomalies(metric))
            
            // Error anomalies
            anomalies.push(...this._detectErrorAnomalies(metric))
            
            // Statistical outliers
            anomalies.push(...this._detectStatisticalOutliers(metric, buffer))
        }
        
        // Filter by confidence and rate limiting
        return this._filterAndRateLimit(anomalies)
    }

    /**
     * 📈 **Get current statistics for a method**
     * 
     * Returns current performance statistics
     */
    public getMethodStats(method: string): IRingBufferStats | undefined {
        const buffer = this._ringBuffers.get(method)
        return buffer?.calculateStats()
    }

    /**
     * 🧹 **Clear all statistics**
     * 
     * Resets all tracking data
     */
    public clearAll(): void {
        this._ringBuffers.clear()
        this._errorCounts.clear()
        this._frequencyTracking.clear()
        this._lastAnomalyTime.clear()
    }

    /**
     * 📊 **Get all tracked methods**
     * 
     * Returns list of all methods being monitored
     */
    public getTrackedMethods(): readonly string[] {
        return Array.from(this._ringBuffers.keys())
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 PRIVATE DETECTION METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * 🐌 **Detect performance anomalies**
     * 
     * Detects slow or unusually fast executions
     */
    private _detectPerformanceAnomalies(
        metric: ReadonlyDeep<IPerformanceMetric>, 
        buffer: Readonly<RingBuffer<number>>
    ): IAnomalyDetection[] {
        if (!this._isDetectorEnabled('PERFORMANCE_SLOW') && !this._isDetectorEnabled('PERFORMANCE_FAST')) {
            return []
        }

        const stats = buffer.calculateStats()
        const anomalies: IAnomalyDetection[] = []
        
        // Detect slow performance
        if (this._isDetectorEnabled('PERFORMANCE_SLOW')) {
            const slowThreshold = stats.average * this._config.performance.slowThreshold
            const stdDevs = (metric.duration - stats.average) / Math.max(stats.standardDeviation, 1)
            
            if (metric.duration > slowThreshold && 
                stdDevs > this._config.performance.stdDevSensitivity) {
                anomalies.push({
                    type: 'PERFORMANCE_SLOW',
                    severity: this._calculateSeverity(stdDevs),
                    confidence: this._calculateConfidence(stdDevs, 'performance'),
                    current: metric.duration,
                    expected: stats.average,
                    deviation: stdDevs,
                    threshold: slowThreshold,
                    context: {
                        method: metric.method,
                        semantic: metric.semantic,
                        timestamp: metric.timestamp,
                        sampleSize: buffer.getInfo().currentSize
                    },
                    metadata: {
                        detectionMethod: 'threshold_and_stddev',
                        historicalStats: stats,
                        triggers: ['slow_threshold', 'std_dev_exceeded']
                    }
                })
            }
        }
        
        // Detect unusually fast performance (could indicate caching or shortcuts)
        if (this._isDetectorEnabled('PERFORMANCE_FAST')) {
            const fastThreshold = stats.average * this._config.performance.fastThreshold
            const stdDevs = Math.abs((metric.duration - stats.average) / Math.max(stats.standardDeviation, 1))
            
            if (metric.duration < fastThreshold && 
                stdDevs > this._config.performance.stdDevSensitivity) {
                anomalies.push({
                    type: 'PERFORMANCE_FAST',
                    severity: 'LOW', // Fast is usually good news
                    confidence: this._calculateConfidence(stdDevs, 'performance'),
                    current: metric.duration,
                    expected: stats.average,
                    deviation: -stdDevs,
                    threshold: fastThreshold,
                    context: {
                        method: metric.method,
                        semantic: metric.semantic,
                        timestamp: metric.timestamp,
                        sampleSize: buffer.getInfo().currentSize
                    },
                    metadata: {
                        detectionMethod: 'threshold_and_stddev',
                        historicalStats: stats,
                        triggers: ['fast_threshold', 'std_dev_exceeded']
                    }
                })
            }
        }
        
        return anomalies
    }

    /**
     * 💾 **Detect memory anomalies**
     * 
     * Detects high or low memory usage
     */
    private _detectMemoryAnomalies(
        metric: ReadonlyDeep<IPerformanceMetric>, 
        buffer: Readonly<RingBuffer<number>>
    ): IAnomalyDetection[] {
        if (!this._isDetectorEnabled('MEMORY_HIGH') && !this._isDetectorEnabled('MEMORY_LOW')) {
            return []
        }

        // For memory, we'd need a separate ring buffer tracking memory
        // For now, we'll do a simple threshold-based detection
        const anomalies: IAnomalyDetection[] = []
        
        // Simple memory thresholds (in MB)
        const highMemoryThreshold = 100 // 100MB
        
        if (this._isDetectorEnabled('MEMORY_HIGH') && metric.memory > highMemoryThreshold) {
            anomalies.push({
                type: 'MEMORY_HIGH',
                severity: metric.memory > 500 ? 'CRITICAL' : 'HIGH',
                confidence: 0.8,
                current: metric.memory,
                expected: 10, // Rough estimate
                deviation: (metric.memory - 10) / 10,
                threshold: highMemoryThreshold,
                context: {
                    method: metric.method,
                    semantic: metric.semantic,
                    timestamp: metric.timestamp,
                    sampleSize: buffer.getInfo().currentSize
                },
                metadata: {
                    detectionMethod: 'simple_threshold',
                    historicalStats: buffer.calculateStats(),
                    triggers: ['memory_threshold_exceeded']
                }
            })
        }
        
        return anomalies
    }

    /**
     * 🔄 **Detect frequency anomalies**
     * 
     * Detects unusual call frequency patterns
     */
    private _detectFrequencyAnomalies(metric: ReadonlyDeep<IPerformanceMetric>): IAnomalyDetection[] {
        if (!this._isDetectorEnabled('FREQUENCY_HIGH') && !this._isDetectorEnabled('FREQUENCY_LOW')) {
            return []
        }

        const frequencies = this._frequencyTracking.get(metric.method) ?? []
        const now = metric.timestamp
        const windowStart = now - this._config.frequency.timeWindow
        
        // Count calls in current time window
        const recentCalls = frequencies.filter(timestamp => timestamp >= windowStart).length
        const callsPerSecond = recentCalls / (this._config.frequency.timeWindow / 1000)
        
        const anomalies: IAnomalyDetection[] = []
        
        // High frequency detection
        if (this._isDetectorEnabled('FREQUENCY_HIGH') && 
            callsPerSecond > this._config.frequency.highThreshold) {
            anomalies.push({
                type: 'FREQUENCY_HIGH',
                severity: callsPerSecond > this._config.frequency.highThreshold * 2 ? 'HIGH' : 'MEDIUM',
                confidence: 0.9,
                current: callsPerSecond,
                expected: this._config.frequency.highThreshold / 2,
                deviation: callsPerSecond / this._config.frequency.highThreshold,
                threshold: this._config.frequency.highThreshold,
                context: {
                    method: metric.method,
                    semantic: metric.semantic,
                    timestamp: metric.timestamp,
                    sampleSize: frequencies.length
                },
                metadata: {
                    detectionMethod: 'frequency_window',
                    historicalStats: { 
                        average: 0, 
                        min: 0, 
                        max: 0, 
                        standardDeviation: 0, 
                        sampleCount: frequencies.length,
                        variance: 0
                    },
                    triggers: ['high_frequency_threshold']
                }
            })
        }
        
        return anomalies
    }

    /**
     * ❌ **Detect error anomalies**
     * 
     * Detects error spikes and patterns
     */
    private _detectErrorAnomalies(metric: ReadonlyDeep<IPerformanceMetric>): IAnomalyDetection[] {
        if (!this._isDetectorEnabled('ERROR_SPIKE')) {
            return []
        }

        const errorCount = this._errorCounts.get(metric.method) ?? 0
        const anomalies: IAnomalyDetection[] = []
        
        // Consecutive error detection
        if (errorCount >= this._config.error.consecutiveErrors) {
            anomalies.push({
                type: 'ERROR_SPIKE',
                severity: errorCount > this._config.error.consecutiveErrors * 2 ? 'CRITICAL' : 'HIGH',
                confidence: 0.95,
                current: errorCount,
                expected: 0,
                deviation: errorCount,
                threshold: this._config.error.consecutiveErrors,
                context: {
                    method: metric.method,
                    semantic: metric.semantic,
                    timestamp: metric.timestamp,
                    sampleSize: errorCount
                },
                metadata: {
                    detectionMethod: 'consecutive_errors',
                    historicalStats: { 
                        average: 0, 
                        min: 0, 
                        max: 0, 
                        standardDeviation: 0, 
                        sampleCount: errorCount,
                        variance: 0
                    },
                    triggers: ['consecutive_error_threshold']
                }
            })
        }
        
        return anomalies
    }

    /**
     * 📊 **Detect statistical outliers**
     * 
     * Detects statistical anomalies using advanced methods
     */
    private _detectStatisticalOutliers(
        metric: ReadonlyDeep<IPerformanceMetric>, 
        buffer: Readonly<RingBuffer<number>>
    ): IAnomalyDetection[] {
        if (!this._isDetectorEnabled('STATISTICAL_OUTLIER')) {
            return []
        }

        const anomalies: IAnomalyDetection[] = []
        const stats = buffer.calculateStats()
        
        // Z-score based detection
        if (stats.standardDeviation > 0) {
            const zScore = Math.abs((metric.duration - stats.average) / stats.standardDeviation)
            
            if (zScore > 3.0) { // 3-sigma rule
                anomalies.push({
                    type: 'STATISTICAL_OUTLIER',
                    severity: zScore > 4.0 ? 'HIGH' : 'MEDIUM',
                    confidence: Math.min(0.95, zScore / 4.0),
                    current: metric.duration,
                    expected: stats.average,
                    deviation: zScore,
                    threshold: stats.average + (3.0 * stats.standardDeviation),
                    context: {
                        method: metric.method,
                        semantic: metric.semantic,
                        timestamp: metric.timestamp,
                        sampleSize: buffer.getInfo().currentSize
                    },
                    metadata: {
                        detectionMethod: 'z_score',
                        historicalStats: stats,
                        triggers: ['three_sigma_rule']
                    }
                })
            }
        }
        
        return anomalies
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 PRIVATE UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * 📦 **Get or create ring buffer for method**
     */
    private _getOrCreateBuffer(method: string): RingBuffer<number> {
        let buffer = this._ringBuffers.get(method)
        if (!buffer) {
            buffer = new RingBuffer<number>(50) // 50 samples per method
            this._ringBuffers.set(method, buffer)
        }
        return buffer
    }

    /**
     * 🔄 **Track method call frequency**
     */
    private _trackFrequency(method: string, timestamp: number): void {
        const frequencies = this._frequencyTracking.get(method) ?? []
        frequencies.push(timestamp)
        
        // Keep only recent timestamps (within 2x time window)
        const cutoff = timestamp - (this._config.frequency.timeWindow * 2)
        const filtered = frequencies.filter(ts => ts >= cutoff)
        
        this._frequencyTracking.set(method, filtered)
    }

    /**
     * ❌ **Increment error count**
     */
    private _incrementErrorCount(method: string): void {
        const currentCount = this._errorCounts.get(method) ?? 0
        this._errorCounts.set(method, currentCount + 1)
    }

    /**
     * ✅ **Reset error count**
     */
    private _resetErrorCount(method: string): void {
        this._errorCounts.set(method, 0)
    }

    /**
     * ⚖️ **Calculate anomaly severity**
     */
    private _calculateSeverity(deviation: number): AnomalySeverity {
        if (deviation > 4.0) {
            return 'CRITICAL'
        }
        if (deviation > 3.0) {
            return 'HIGH'
        }
        if (deviation > 2.0) {
            return 'MEDIUM'
        }
        return 'LOW'
    }

    /**
     * 🎯 **Calculate confidence score**
     */
    private _calculateConfidence(deviation: number, type: 'performance' | 'memory' | 'frequency'): number {
        switch (type) {
        case 'performance': {
            return Math.min(0.95, Math.max(0.5, deviation / 4.0))
        }
        case 'memory': {
            return Math.min(0.9, Math.max(0.6, deviation / 3.0))
        }
        case 'frequency': {
            return Math.min(0.85, Math.max(0.7, deviation / 2.0))
        }
        default: {
            return 0.5
        }
        }
    }

    /**
     * 🔍 **Check if detector is enabled**
     */
    private _isDetectorEnabled(type: AnomalyType): boolean {
        return this._config.global.enabledDetectors.includes(type)
    }

    /**
     * 🚰 **Filter and rate limit anomalies**
     */
    private _filterAndRateLimit(anomalies: readonly IAnomalyDetection[]): readonly IAnomalyDetection[] {
        // Filter by confidence threshold
        const filtered = anomalies.filter(anomaly => 
            anomaly.confidence >= this._config.global.confidenceThreshold
        )

        // Rate limiting
        const now = Date.now()
        const recentAnomalies: IAnomalyDetection[] = []
        
        for (const anomaly of filtered) {
            const lastTime = this._lastAnomalyTime.get(anomaly.type) ?? 0
            const timeSinceLastAnomaly = now - lastTime
            
            if (timeSinceLastAnomaly >= (1000 / this._config.global.maxAnomaliesPerSecond)) {
                recentAnomalies.push(anomaly)
                this._lastAnomalyTime.set(anomaly.type, now)
            }
        }
        
        return recentAnomalies
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_ANOMALY_CONFIG: IAnomalyConfig = {
    performance: {
        slowThreshold: 3.0, // 3x average is considered slow
        fastThreshold: 0.1, // 0.1x average is unusually fast
        stdDevSensitivity: 2.5, // 2.5 standard deviations
        minSampleSize: 10 // need at least 10 samples
    },
    memory: {
        highThreshold: 2.0, // 2x average memory usage
        lowThreshold: 0.5, // 0.5x average memory usage
        stdDevSensitivity: 2.0
    },
    frequency: {
        highThreshold: 10, // 10 calls per time window
        lowThreshold: 0.1, // very low frequency
        timeWindow: 5000 // 5 second window
    },
    error: {
        spikeThreshold: 0.5, // 50% error rate
        consecutiveErrors: 3 // 3 consecutive errors
    },
    global: {
        confidenceThreshold: 0.7, // 70% confidence minimum
        maxAnomaliesPerSecond: 2, // max 2 anomalies per second
        enabledDetectors: [
            'PERFORMANCE_SLOW',
            'PERFORMANCE_FAST',
            'MEMORY_HIGH',
            'ERROR_SPIKE',
            'FREQUENCY_HIGH',
            'STATISTICAL_OUTLIER'
        ]
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 FACTORY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏭 **Create anomaly detector with configuration**
 */
export function createAnomalyDetector(
    config: ReadonlyDeep<Partial<IAnomalyConfig>> = {}
): AnomalyDetector {
    return new AnomalyDetector(config)
}

/**
 * 📊 **Create performance metric object**
 */
export function createPerformanceMetric(
    method: string,
    duration: number,
    memory = 0,
    success = true,
    semantic?: ISemanticContext
): IPerformanceMetric {
    return {
        method,
        duration,
        memory,
        timestamp: Date.now(),
        success,
        semantic
    }
} 