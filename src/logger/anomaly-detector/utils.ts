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
// 🔧 ANOMALY DETECTION UTILS - UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { RingBuffer } from '../ring-buffer.ts'
import { 
    type AnomalyType, type AnomalySeverity, type IAnomalyConfig, type IAnomalyDetection 
} from './types.ts'

/**
 * 📦 **Get or create ring buffer for method**
 * @param ringBuffers - Map of existing ring buffers
 * @param method - Method name to get buffer for
 * @returns Ring buffer for the specified method
 */
export function getOrCreateBuffer(
    ringBuffers: Readonly<Map<string, RingBuffer<number>>>,
    method: string
): RingBuffer<number> {
    let buffer = ringBuffers.get(method)

    if (!buffer) {
        buffer = new RingBuffer<number>(50) // 50 samples per method
        ringBuffers.set(method, buffer)
    }

    return buffer
}

/**
 * 🔄 **Track method call frequency**
 * @param frequencyTracking - Map of method frequency data
 * @param method - Method name
 * @param timestamp - Current timestamp
 * @param timeWindow - Time window for frequency tracking
 */
export function trackFrequency(
    frequencyTracking: Readonly<Map<string, number[]>>,
    method: string,
    timestamp: number,
    timeWindow: number
): void {
    const frequencies = frequencyTracking.get(method) ?? []
    frequencies.push(timestamp)
    
    // Keep only recent timestamps (within 2x time window)
    const cutoff = timestamp - (timeWindow * 2)
    const filtered = frequencies.filter(ts => ts >= cutoff)
    
    frequencyTracking.set(method, filtered)
}

/**
 * ❌ **Increment error count**
 * @param errorCounts - Map of method error counts
 * @param method - Method name
 */
export function incrementErrorCount(
    errorCounts: Readonly<Map<string, number>>,
    method: string
): void {
    const currentCount = errorCounts.get(method) ?? 0
    errorCounts.set(method, currentCount + 1)
}

/**
 * ✅ **Reset error count**
 * @param errorCounts - Map of method error counts
 * @param method - Method name
 */
export function resetErrorCount(
    errorCounts: Readonly<Map<string, number>>,
    method: string
): void {
    errorCounts.set(method, 0)
}

/**
 * ⚖️ **Calculate anomaly severity**
 * @param deviation - Standard deviation value
 * @returns Calculated severity level
 */
export function calculateSeverity(deviation: number): AnomalySeverity {
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
 * @param deviation - Standard deviation value
 * @param type - Type of anomaly detection
 * @returns Confidence score between 0 and 1
 */
export function calculateConfidence(deviation: number, type: 'performance' | 'memory' | 'frequency'): number {
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
 * @param config - Anomaly detection configuration
 * @param type - Anomaly type to check
 * @returns True if detector is enabled
 */
export function isDetectorEnabled(config: IAnomalyConfig, type: AnomalyType): boolean {
    return config.global.enabledDetectors.includes(type)
}

/**
 * 🚰 **Filter and rate limit anomalies**
 * 
 * @param anomalies - Array of detected anomalies
 * @param config - Anomaly detection configuration
 * @param lastAnomalyTime - Map tracking last anomaly times
 *
 * @returns Filtered array of anomalies
 *
 * @example
 * ```typescript
 * const filtered = filterAndRateLimit(anomalies, config, lastTime);
 * console.log(`${filtered.length} anomalies after filtering`);
 * ```
 */
export function filterAndRateLimit(
    anomalies: readonly IAnomalyDetection[],
    config: IAnomalyConfig,
    lastAnomalyTime: Readonly<Map<AnomalyType, number>>
): readonly IAnomalyDetection[] {
    // Filter by confidence threshold
    const filtered = anomalies.filter(anomaly => 
        anomaly.confidence >= config.global.confidenceThreshold
    )

    // Rate limiting
    const now = Date.now()
    const recentAnomalies: IAnomalyDetection[] = []
    
    for (const anomaly of filtered) {
        const lastTime = lastAnomalyTime.get(anomaly.type) ?? 0
        const timeSinceLastAnomaly = now - lastTime
        
        if (timeSinceLastAnomaly >= (1000 / config.global.maxAnomaliesPerSecond)) {
            recentAnomalies.push(anomaly)
            lastAnomalyTime.set(anomaly.type, now)
        }
    }
    
    return recentAnomalies
} 