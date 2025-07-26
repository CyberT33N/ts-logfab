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
// 🐌 PERFORMANCE ANOMALY DETECTOR - PERFORMANCE DETECTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { RingBuffer } from '../ring-buffer.ts'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig } from './types.ts'
import { calculateSeverity, calculateConfidence, isDetectorEnabled } from './utils.ts'

/**
 * 🐌 **Detect performance anomalies**
 * 
 * Detects slow or unusually fast executions
 *
 * @param metric - Performance metric to analyze
 * @param buffer - Ring buffer with historical performance data
 * @param config - Anomaly detection configuration
 *
 * @returns Array of detected performance anomalies
 */
export function detectPerformanceAnomalies(
    metric: ReadonlyDeep<IPerformanceMetric>, 
    buffer: Readonly<RingBuffer<number>>,
    config: IAnomalyConfig
): IAnomalyDetection[] {
    if (!isDetectorEnabled(config, 'PERFORMANCE_SLOW') && !isDetectorEnabled(config, 'PERFORMANCE_FAST')) {
        return []
    }

    const stats = buffer.calculateStats()
    const anomalies: IAnomalyDetection[] = []
    
    // Detect slow performance
    if (isDetectorEnabled(config, 'PERFORMANCE_SLOW')) {
        const slowThreshold = stats.average * config.performance.slowThreshold
        const stdDevs = (metric.duration - stats.average) / Math.max(stats.standardDeviation, 1)
        
        if (metric.duration > slowThreshold && 
            stdDevs > config.performance.stdDevSensitivity) {
            anomalies.push({
                type: 'PERFORMANCE_SLOW',
                severity: calculateSeverity(stdDevs),
                confidence: calculateConfidence(stdDevs, 'performance'),
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
    if (isDetectorEnabled(config, 'PERFORMANCE_FAST')) {
        const fastThreshold = stats.average * config.performance.fastThreshold
        const stdDevs = Math.abs((metric.duration - stats.average) / Math.max(stats.standardDeviation, 1))
        
        if (metric.duration < fastThreshold && 
            stdDevs > config.performance.stdDevSensitivity) {
            anomalies.push({
                type: 'PERFORMANCE_FAST',
                severity: 'LOW', // Fast is usually good news
                confidence: calculateConfidence(stdDevs, 'performance'),
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