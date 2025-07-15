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
// 🎯 ENHANCED PERFORMANCE TRACKING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { 
    createPerformanceMetric,
    type IAnomalyDetection
} from '../../anomaly-detector/index.ts'
import { detectSemanticContext, type ISemanticContext } from '../../semantic-detector.ts'
import type { IPerformanceBaseline } from '../types.ts'
import { 
    getEnhancedPerformanceConfiguration,
    updatePerformanceBaseline,
    getGlobalAnomalyDetector
} from './enhanced-config.ts'

/**
 * 🎯 **Track Method Performance with Anomaly Detection**
 * 
 * @param method - The method name
 * @param duration - The execution duration in milliseconds
 * @param memoryDelta - The memory usage delta in bytes
 * @param success - Whether the method execution was successful
 * @param semantic - Optional semantic context
 * @returns Anomaly detection results and updated baseline
 */
export function trackMethodPerformance(
    method: string,
    duration: number,
    memoryDelta = 0,
    success = true,
    semanticContext?: ISemanticContext
): {
    readonly anomalies: readonly IAnomalyDetection[]
    readonly baseline?: IPerformanceBaseline
    readonly thresholdViolations: readonly string[]
} {
    let anomalies: readonly IAnomalyDetection[] = []
    let baseline: IPerformanceBaseline | undefined
    const thresholdViolations: string[] = []
    const finalSemanticContext = semanticContext ?? detectSemanticContext(method, [])
    const config = getEnhancedPerformanceConfiguration()

    // Check threshold violations
    if (duration > config.thresholds.slowMethodCritical) {
        thresholdViolations.push(`CRITICAL: Method execution time ${duration.toFixed(2)}ms exceeds critical threshold`)
    } else if (duration > config.thresholds.slowMethodWarning) {
        thresholdViolations.push(`WARNING: Method execution time ${duration.toFixed(2)}ms exceeds warning threshold`)
    }

    if (memoryDelta > config.thresholds.memoryCritical) {
        const memoryMB = (memoryDelta / 1024 / 1024).toFixed(2)
        thresholdViolations.push(`CRITICAL: Memory usage ${memoryMB}MB exceeds critical threshold`)
    } else if (memoryDelta > config.thresholds.memoryWarning) {
        const memoryMB = (memoryDelta / 1024 / 1024).toFixed(2)
        thresholdViolations.push(`WARNING: Memory usage ${memoryMB}MB exceeds warning threshold`)
    }

    // Anomaly detection
    const anomalyDetector = getGlobalAnomalyDetector()
    if (anomalyDetector && config.anomalyDetection.enabled) {
        const metric = createPerformanceMetric(method, duration, memoryDelta, success, finalSemanticContext)
        anomalies = anomalyDetector.addMetricAndDetect(metric)
    }

    // Baseline tracking
    if (config.baseline.trackingEnabled) {
        baseline = updatePerformanceBaseline(method, duration, memoryDelta, finalSemanticContext)
    }

    // Logging
    if (config.reporting.logAnomalies && anomalies.length > 0) {
        console.warn(`🚨 Performance anomalies detected for ${method}:`, anomalies)
    }

    if (config.reporting.logThresholdViolations && thresholdViolations.length > 0) {
        console.warn(`⚠️ Performance threshold violations for ${method}:`, thresholdViolations)
    }

    if (config.reporting.logBaselines && baseline) {
        console.info(`📊 Performance baseline updated for ${method}:`, baseline)
    }

    return {
        anomalies,
        baseline,
        thresholdViolations
    }
} 