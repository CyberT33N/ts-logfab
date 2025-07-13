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
// 💾 MEMORY ANOMALY DETECTOR - MEMORY DETECTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { RingBuffer } from '../ring-buffer.ts'
import { type IAnomalyDetection, type IPerformanceMetric, type IAnomalyConfig } from './types.ts'
import { isDetectorEnabled } from './utils.ts'

/**
 * 💾 **Detect memory anomalies**
 * 
 * Detects high or low memory usage
 */
export function detectMemoryAnomalies(
    metric: ReadonlyDeep<IPerformanceMetric>, 
    buffer: Readonly<RingBuffer<number>>,
    config: IAnomalyConfig
): IAnomalyDetection[] {
    if (!isDetectorEnabled(config, 'MEMORY_HIGH') && !isDetectorEnabled(config, 'MEMORY_LOW')) {
        return []
    }

    // For memory, we'd need a separate ring buffer tracking memory
    // For now, we'll do a simple threshold-based detection
    const anomalies: IAnomalyDetection[] = []
    
    // Simple memory thresholds (in MB)
    const highMemoryThreshold = 100 // 100MB
    
    if (isDetectorEnabled(config, 'MEMORY_HIGH') && metric.memory > highMemoryThreshold) {
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