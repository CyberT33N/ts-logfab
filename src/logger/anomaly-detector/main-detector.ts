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
// 🎛️ MAIN ANOMALY DETECTOR - MAIN DETECTOR CLASS
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { RingBuffer, type IRingBufferStats } from '../ring-buffer.ts'
import { DEFAULT_ANOMALY_CONFIG } from './config.ts'
import { detectErrorAnomalies } from './error-detector.ts'
import { detectFrequencyAnomalies } from './frequency-detector.ts'
import { detectMemoryAnomalies } from './memory-detector.ts'
import { detectPerformanceAnomalies } from './performance-detector.ts'
import { detectStatisticalOutliers } from './statistical-detector.ts'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig, type AnomalyType } from './types.ts'
import { 
    getOrCreateBuffer, 
    trackFrequency, 
    incrementErrorCount, 
    resetErrorCount, 
    filterAndRateLimit 
} from './utils.ts'

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
        }
    }

    /**
     * 📊 **Add performance metric and detect anomalies**
     * 
     * Main entry point for anomaly detection
     */
    public addMetricAndDetect(metric: ReadonlyDeep<IPerformanceMetric>): readonly IAnomalyDetection[] {
        // Get or create ring buffer for this method
        const buffer = getOrCreateBuffer(this._ringBuffers, metric.method)
        
        // Add the new metric
        buffer.push(metric.duration)
        
        // Track frequency
        trackFrequency(this._frequencyTracking, metric.method, metric.timestamp, this._config.frequency.timeWindow)
        
        // Track errors
        if (!metric.success) {
            incrementErrorCount(this._errorCounts, metric.method)
        } else {
            resetErrorCount(this._errorCounts, metric.method)
        }
        
        // Detect anomalies
        const anomalies: IAnomalyDetection[] = []
        
        // Only detect if we have enough samples
        if (buffer.getInfo().currentSize >= this._config.performance.minSampleSize) {
            // Performance anomalies
            anomalies.push(...detectPerformanceAnomalies(metric, buffer, this._config))
            
            // Memory anomalies  
            anomalies.push(...detectMemoryAnomalies(metric, buffer, this._config))
            
            // Frequency anomalies
            anomalies.push(...detectFrequencyAnomalies(metric, this._frequencyTracking, this._config))
            
            // Error anomalies
            anomalies.push(...detectErrorAnomalies(metric, this._errorCounts, this._config))
            
            // Statistical outliers
            anomalies.push(...detectStatisticalOutliers(metric, buffer, this._config))
        }
        
        // Filter by confidence and rate limiting
        return filterAndRateLimit(anomalies, this._config, this._lastAnomalyTime)
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
} 