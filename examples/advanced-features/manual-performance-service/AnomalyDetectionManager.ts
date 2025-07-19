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

// ==== Imports ====
import { ReadonlyDeep } from 'type-fest'
import {
    trackMethodPerformance,
    getPerformanceBaseline
} from '@/logger/performance/utils/index.ts'
import { toWritable } from '@/utils/data-utils.ts'

/**
 * 📊 Represents the comprehensive result of performance anomaly detection analysis.
 * 
 * @remarks
 * This interface encapsulates all relevant data from a performance monitoring session,
 * including the raw execution result, detailed tracking metrics, and baseline comparisons
 * for anomaly detection purposes.
 * 
 * @see {@link trackMethodPerformance} for tracking implementation details
 * @see {@link getPerformanceBaseline} for baseline comparison functionality
 */
export interface IAnomalyDetectionResult {
    executionResult: number
    trackingResult: ReturnType<typeof trackMethodPerformance>
    performanceBaseline: ReturnType<typeof getPerformanceBaseline>
}

/**
 * ⚙️ Advanced performance monitoring manager with integrated anomaly detection capabilities.
 * 
 * @remarks
 * This manager class provides comprehensive performance monitoring for operations while
 * maintaining historical performance logs and detecting anomalies in execution patterns.
 * 
 * 🛡️ **Anomaly Detection:** Automatically identifies performance deviations from established
 * baselines using statistical analysis and threshold monitoring.
 * 
 * 📊 **Metrics Collection:** Captures detailed execution metrics including duration, memory
 * usage, and threshold violations for comprehensive performance analysis.
 * 
 * @example
 * Basic usage for performance monitoring with anomaly detection:
 * ```typescript
 * const performanceLog = [];
 * const manager = new AnomalyDetectionManager(performanceLog);
 * 
 * const result = await manager.performWithAnomalyDetection('testOperation', 10000);
 * console.log(`Execution result: ${result.executionResult}`);
 * console.log(`Anomalies detected: ${result.trackingResult.anomalies.length}`);
 * ```
 * 
 * @see {@link IAnomalyDetectionResult} for return value structure
 * @see {@link trackMethodPerformance} for underlying tracking mechanism
 */
export class AnomalyDetectionManager {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Readonly<Date>
    }[]

    /**
     * 🏗️ Initializes the anomaly detection manager with historical performance data.
     * 
     * @param performanceLog - Historical performance data used for baseline calculations
     * and anomaly detection. This log provides context for identifying performance deviations.
     */
    public constructor(performanceLog: ReadonlyDeep<{
        readonly operation: string
        readonly metrics: Record<string, unknown>
        readonly timestamp: Readonly<Date>
    }[]>) {
        this._performanceLog = toWritable(performanceLog)
    }

    /**
     * ⚙️ Executes a performance-intensive operation with comprehensive anomaly detection monitoring.
     * 
     * @remarks
     * This method performs a computational operation while simultaneously monitoring performance
     * metrics, detecting anomalies, and comparing results against established baselines.
     * 
     * 🛡️ **Anomaly Detection:** The method automatically injects variable delays to potentially
     * trigger anomalies and test the detection system's sensitivity.
     * 
     * 📊 **Metrics Captured:**
     * - Execution duration and memory consumption
     * - Anomaly detection results and threshold violations
     * - Baseline comparison data for historical context
     * 
     * @param methodName - Unique identifier for the operation being monitored
     * @param iterations - Number of computational iterations to perform (affects execution time)
     * 
     * @returns Promise resolving to comprehensive anomaly detection results including execution
     * result, tracking metrics, and baseline comparison data
     * 
     * @example
     * Monitoring a specific operation with anomaly detection:
     * ```typescript
     * const result = await manager.performWithAnomalyDetection('dataProcessing', 50000);
     * 
     * if (result.trackingResult.anomalies.length > 0) {
     *   console.log('Performance anomalies detected:', result.trackingResult.anomalies);
     * }
     * 
     * if (result.performanceBaseline) {
     *   console.log('Performance vs baseline:', result.performanceBaseline);
     * }
     * ```
     * 
     * @see {@link IAnomalyDetectionResult} for detailed return value structure
     * @see {@link trackMethodPerformance} for anomaly detection implementation
     */
    public async performWithAnomalyDetection(methodName: string, iterations: number): Promise<IAnomalyDetectionResult> {
        const startTime = performance.now()
        const startMemory = process.memoryUsage().heapUsed
        
        // Perform operation
        let result = 0
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
            
            // Variable delay to potentially trigger anomalies
            if (i % 5000 === 0) {
                const delay = Math.random() > 0.7 ? 10 : 1
                await this._delay(delay)
            }
        }
        
        const endTime = performance.now()
        const endMemory = process.memoryUsage().heapUsed
        
        const duration = endTime - startTime
        const memoryDelta = endMemory - startMemory
        
        // Track method performance with anomaly detection
        const trackingResult = trackMethodPerformance(
            methodName,
            duration,
            memoryDelta,
            true // success
        )
        
        // Get performance baseline
        const performanceBaseline = getPerformanceBaseline(methodName)
        
        this._performanceLog.push({
            operation: methodName,
            metrics: {
                iterations,
                duration,
                memoryDelta,
                anomaliesDetected: trackingResult.anomalies.length,
                thresholdViolations: trackingResult.thresholdViolations.length,
                baselineExists: Boolean(performanceBaseline)
            },
            timestamp: new Date()
        })
        
        return {
            executionResult: result,
            trackingResult,
            performanceBaseline
        }
    }

    /**
     * ⏱️ Creates an asynchronous delay for testing and anomaly simulation purposes.
     * 
     * @param ms - Delay duration in milliseconds
     * @returns Promise that resolves after the specified delay
     */
    private async _delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
} 