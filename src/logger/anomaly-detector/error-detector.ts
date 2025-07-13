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
// ❌ ERROR ANOMALY DETECTOR - ERROR DETECTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig } from './types.ts'
import { isDetectorEnabled } from './utils.ts'

/**
 * ❌ **Detect error anomalies**
 * 
 * Detects error spikes and patterns
 */
export function detectErrorAnomalies(
    metric: ReadonlyDeep<IPerformanceMetric>,
    errorCounts: Readonly<Map<string, number>>,
    config: IAnomalyConfig
): IAnomalyDetection[] {
    if (!isDetectorEnabled(config, 'ERROR_SPIKE')) {
        return []
    }

    const errorCount = errorCounts.get(metric.method) ?? 0
    const anomalies: IAnomalyDetection[] = []
    
    // Consecutive error detection
    if (errorCount >= config.error.consecutiveErrors) {
        anomalies.push({
            type: 'ERROR_SPIKE',
            severity: errorCount > config.error.consecutiveErrors * 2 ? 'CRITICAL' : 'HIGH',
            confidence: 0.95,
            current: errorCount,
            expected: 0,
            deviation: errorCount,
            threshold: config.error.consecutiveErrors,
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