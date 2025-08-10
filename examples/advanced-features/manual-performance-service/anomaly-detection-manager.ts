/*
 *█████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software *************************██
 *██                                                                         ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                    ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                    ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                    ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                    ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                    ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                    ██
 *██                                                                         ██
 *█████████████████████████████████████████████████████████████████████████████
 *█████████████████████████████████████████████████████████████████████████████
 */

// ==== Imports ====
import { memoryUsage } from 'node:process'
import { setTimeout } from 'node:timers/promises'

import { getPerformanceBaseline, trackMethodPerformance } from '@/logger/performance'
import { toWritable } from '@/utils/data-utils'

import type { ReadonlyDeep } from 'type-fest'

/**
 * 📊 Represents the comprehensive result of performance anomaly detection analysis.
 *2
 * @remarks
 * This interface encapsulates all relevant data from a performance monitoring session,
 * including the raw execution result, detailed tracking metrics, and baseline comparisons
 * for anomaly detection purposes.
 *
 * @see {@link trackMethodPerformance} for tracking implementation details
 * @see {@link getPerformanceBaseline} for baseline comparison functionality
 */
export interface AnomalyDetectionResult {
    executionResult: number
    performanceBaseline: ReturnType<typeof getPerformanceBaseline>
    trackingResult: ReturnType<typeof trackMethodPerformance>
}

/**
 * 📝 Properties for logging comprehensive performance metrics.
 *
 * @remarks
 * This interface defines the parameters required for logging detailed performance data
 * including execution metrics, anomaly detection results, and baseline comparison status.
 */
interface LogPerformanceMetricsProperties {
    readonly duration: number
    readonly iterations: number
    readonly memoryDelta: number
    readonly methodName: string
    readonly performanceBaseline: ReturnType<typeof getPerformanceBaseline>
    readonly trackingResult: ReturnType<typeof trackMethodPerformance>
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
 * @see {@link AnomalyDetectionResult} for return value structure
 * @see {@link trackMethodPerformance} for underlying tracking mechanism
 */
export class AnomalyDetectionManager {
    readonly #performanceLog: {
        metrics: Record<string, unknown>
        operation: string
        timestamp: Readonly<Date>
    }[]

    /**
     * 🏗️ Initializes the anomaly detection manager with historical performance data.
     *
     * @param performanceLog - Historical performance data used for baseline calculations
     * and anomaly detection. This log provides context for identifying performance deviations.
     */
    public constructor(performanceLog: ReadonlyDeep<{
        readonly metrics: Record<string, unknown>
        readonly operation: string
        readonly timestamp: Readonly<Date>
    }[]>) {
        this.#performanceLog = toWritable(performanceLog)
    }

    /**
     * � Calculates performance metrics by comparing start and end measurements.
     *
     * @remarks
     * This method computes the execution duration and memory consumption delta
     * by taking measurements at operation completion and comparing against start values.
     *
     * @param startTime - Initial time measurement when operation began
     * @param startMemory - Initial memory usage when operation began
     *
     * @returns bject containing calculated duration and memory delta metrics
     */
    static readonly #calculatePerformanceMetrics = (
        startTime: number, startMemory: number
    ): {
        duration: number
        memoryDelta: number
    } => {
        const endTime = performance.now()
        const endMemory = memoryUsage().heapUsed

        const duration = endTime - startTime
        const memoryDelta = endMemory - startMemory

        return {
            duration,
            memoryDelta
        }
    }

    /**
     * ⚙️ Executes the computational operation with variable delays for anomaly simulation.
     *
     * @remarks
     * This method performs mathematical calculations while introducing random delays
     * to potentially trigger performance anomalies for testing detection capabilities.
     *
     * @param iterations - Number of computational iterations to perform
     *
     * @returns Promise resolving to the computational result value
     */
    static readonly #executeComputationalOperation = async (iterations: number): Promise<number> => {
        const ANOMALY_CHECK_INTERVAL = 5000
        const ANOMALY_PROBABILITY = 0.7
        const ANOMALY_DELAY = 10

        let result = 0

        for (const index of Array.from({ length: iterations }).keys()) {
            result += Math.sqrt(index) * Math.sin(index) * Math.cos(index)

            // Variable delay to potentially trigger anomalies
            if (index % ANOMALY_CHECK_INTERVAL === 0) {
                // Performance/Load Testing:
                // eslint-disable-next-line sonarjs/pseudo-random -- Performance simulation only, not security-sensitive
                const delay = Math.random() > ANOMALY_PROBABILITY ? ANOMALY_DELAY : 1

                // Timing Control:
                // eslint-disable-next-line no-await-in-loop -- Intentional sequential timing for [specific purpose]
                await setTimeout(delay)
            }
        }

        return result
    }

    /**
     * � Initializes performance measurement by capturing current time and memory usage.
     *
     * @remarks
     * This method establishes the baseline metrics needed for performance monitoring
     * by recording precise timestamps and memory consumption at the start of operations.
     *
     * @returns Object containing start time and memory measurements for performance tracking
     */
    static readonly #initializePerformanceMeasurement = (): {
        startMemory: number
        startTime: number
    } => {
        const startTime = performance.now()
        const startMemory = memoryUsage().heapUsed

        return {
            startMemory,
            startTime
        }
    }

    /**
     * 🛡️ Retrieves performance tracking data and baseline comparisons for anomaly detection.
     *
     * @remarks
     * This method integrates with the performance monitoring system to track method
     * execution metrics and retrieve historical baseline data for anomaly comparison.
     *
     * @param methodName - Unique identifier for the operation being monitored
     * @param duration - Execution duration in milliseconds
     * @param memoryDelta - Memory consumption change in bytes
     *
     * @returns Object containing tracking results and performance baseline data
     */
    static readonly #retrievePerformanceData = (
        methodName: string,
        duration: number,
        memoryDelta: number
    ): {
        performanceBaseline: ReturnType<typeof getPerformanceBaseline>
        trackingResult: ReturnType<typeof trackMethodPerformance>
    } => {
        // Track method performance with anomaly detection
        const trackingResult = trackMethodPerformance(
            methodName,
            duration,
            memoryDelta,
            true
        )

        // Get performance baseline
        const performanceBaseline = getPerformanceBaseline(methodName)

        return {
            performanceBaseline,
            trackingResult
        }
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
     * @see {@link AnomalyDetectionResult} for detailed return value structure
     * @see {@link trackMethodPerformance} for anomaly detection implementation
     */
    public readonly performWithAnomalyDetection = async (
        methodName: string, iterations: number
    ): Promise<AnomalyDetectionResult> => {
        const { startTime, startMemory } = AnomalyDetectionManager.#initializePerformanceMeasurement()

        const executionResult = await AnomalyDetectionManager.#executeComputationalOperation(iterations)

        const { duration, memoryDelta } = AnomalyDetectionManager.#calculatePerformanceMetrics(
            startTime, startMemory
        )

        const { trackingResult, performanceBaseline } = AnomalyDetectionManager.#retrievePerformanceData(
            methodName,
            duration,
            memoryDelta
        )

        this.#logPerformanceMetrics({
            duration,
            iterations,
            memoryDelta,
            methodName,
            performanceBaseline,
            trackingResult
        })

        return {
            executionResult,
            performanceBaseline,
            trackingResult
        }
    }

    /**
     * 📝 Logs comprehensive performance metrics to the internal performance log.
     *
     * @remarks
     * This method records detailed performance data including execution metrics,
     * anomaly detection results, and baseline comparison status for historical tracking.
     *
     * @param methodName - Unique identifier for the operation being monitored
     * @param iterations - Number of computational iterations performed
     * @param duration - Execution duration in milliseconds
     * @param memoryDelta - Memory consumption change in bytes
     * @param trackingResult - Anomaly detection tracking results
     * @param performanceBaseline - Historical baseline data for comparison
     */
    readonly #logPerformanceMetrics = ({
        methodName,
        iterations,
        duration,
        memoryDelta,
        trackingResult,
        performanceBaseline
    }: LogPerformanceMetricsProperties): void => {
        this.#performanceLog.push({
            metrics: {
                anomaliesDetected: trackingResult.anomalies.length,
                baselineExists: Boolean(performanceBaseline),
                duration,
                iterations,
                memoryDelta,
                thresholdViolations: trackingResult.thresholdViolations.length
            },
            operation: methodName,
            timestamp: new Date()
        })
    }
}
