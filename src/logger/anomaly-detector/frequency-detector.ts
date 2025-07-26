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
// 🔄 FREQUENCY ANOMALY DETECTOR - FREQUENCY DETECTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig } from './types.ts'
import { isDetectorEnabled } from './utils.ts'

/**
 * 🔄 **Detect frequency anomalies**
 * 
 * Detects unusual call frequency patterns
 *
 * @param metric - Performance metric to analyze
 * @param frequencyTracking - Map of method names to timestamp arrays
 * @param config - Anomaly detection configuration
 *
 * @returns Array of detected frequency anomalies
 */
export function detectFrequencyAnomalies(
    metric: ReadonlyDeep<IPerformanceMetric>,
    frequencyTracking: Readonly<Map<string, number[]>>,
    config: IAnomalyConfig
): IAnomalyDetection[] {
    if (!isDetectorEnabled(config, 'FREQUENCY_HIGH') && !isDetectorEnabled(config, 'FREQUENCY_LOW')) {
        return []
    }

    const frequencies = frequencyTracking.get(metric.method) ?? []
    const now = metric.timestamp
    const windowStart = now - config.frequency.timeWindow
    
    // Count calls in current time window
    const recentCalls = frequencies.filter(timestamp => timestamp >= windowStart).length
    const callsPerSecond = recentCalls / (config.frequency.timeWindow / 1000)
    
    const anomalies: IAnomalyDetection[] = []
    
    // High frequency detection
    if (isDetectorEnabled(config, 'FREQUENCY_HIGH') && 
        callsPerSecond > config.frequency.highThreshold) {
        anomalies.push({
            type: 'FREQUENCY_HIGH',
            severity: callsPerSecond > config.frequency.highThreshold * 2 ? 'HIGH' : 'MEDIUM',
            confidence: 0.9,
            current: callsPerSecond,
            expected: config.frequency.highThreshold / 2,
            deviation: callsPerSecond / config.frequency.highThreshold,
            threshold: config.frequency.highThreshold,
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