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
// 📊 STATISTICAL ANOMALY DETECTOR - STATISTICAL OUTLIER DETECTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { RingBuffer } from '../ring-buffer.ts'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig } from './types.ts'
import { isDetectorEnabled } from './utils.ts'

/**
 * 📊 **Detect statistical outliers**
 * 
 * Detects statistical anomalies using advanced methods
 *
 * @param metric - Performance metric to analyze
 * @param buffer - Ring buffer with historical data
 * @param config - Anomaly detection configuration
 *
 * @returns Array of detected statistical outliers
 */
export function detectStatisticalOutliers(
    metric: ReadonlyDeep<IPerformanceMetric>, 
    buffer: Readonly<RingBuffer<number>>,
    config: IAnomalyConfig
): IAnomalyDetection[] {
    if (!isDetectorEnabled(config, 'STATISTICAL_OUTLIER')) {
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