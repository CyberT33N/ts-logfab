/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== Imports ====
import { setTimeout } from 'node:timers/promises'
import { ReadonlyDeep } from 'type-fest'
import {
    createPerformanceMark,
    createPerformanceMeasure,
    getGCPerformanceData,
    getPerformanceMarks,
    getPerformanceMeasures
} from '@/logger/performance/utils/index.ts'
import { toWritable } from '@/utils/data-utils.ts'

/**
 * 📊 Result structure for manual performance marks and measurements operations.
 *
 * @remarks
 * This interface encapsulates the complete result of a performance-tracked operation,
 * including the computational result and comprehensive performance measurement data
 * collected through manual performance marks and measures.
 *
 * 🏁 **Performance Data Collection:**
 * - **Marks:** Start/end timing markers for operation boundaries
 * - **Measures:** Calculated durations between performance marks
 * - **GC Data:** Garbage collection events that occurred during execution
 *
 * @see {@link createPerformanceMark} for mark creation utilities
 * @see {@link createPerformanceMeasure} for measure calculation utilities
 * @see {@link getGCPerformanceData} for garbage collection monitoring
 */
export interface IPerformanceMarksResult {
    result: number
    performanceData: {
        marks: PerformanceEntry[]
        measures: PerformanceEntry[]
        gcData: PerformanceEntry[]
    }
}

/**
 * ⚡ Advanced manager for manual performance marks, measures, and comprehensive performance tracking.
 *
 * @remarks
 * This manager class provides sophisticated performance monitoring capabilities using manual
 * performance marks and measures, enabling precise timing analysis and performance data collection
 * for computational operations.
 *
 * 🎯 **Performance Tracking Features:**
 * - **Manual Marks:** Creates precise timing markers at operation start and end points
 * - **Duration Measures:** Calculates exact execution durations between marks
 * - **GC Monitoring:** Tracks garbage collection events during operation execution
 * - **Historical Logging:** Maintains comprehensive performance logs for trend analysis
 *
 * ⚡ **Use Cases:**
 * - Detailed performance profiling of computational operations
 * - Precise timing analysis for optimization efforts
 * - GC impact assessment on performance
 * - Performance regression detection through historical comparison
 *
 * @example
 * Basic usage for manual performance tracking:
 * ```typescript
 * const performanceLog = [];
 * const manager = new PerformanceMarksManager(performanceLog);
 *
 * const result = await manager.performWithManualMarks('dataProcessing', 100000);
 *
 * console.log(`Operation result: ${result.result}`);
 * console.log(`Performance marks created: ${result.performanceData.marks.length}`);
 * console.log(`Measures calculated: ${result.performanceData.measures.length}`);
 * console.log(`GC events during execution: ${result.performanceData.gcData.length}`);
 *
 * // Access specific performance measures
 * const durationMeasure = result.performanceData.measures.find(m => m.name.includes('duration'));
 * if (durationMeasure) {
 *   console.log(`Execution duration: ${durationMeasure.duration}ms`);
 * }
 * ```
 *
 * @see {@link IPerformanceMarksResult} for return value structure
 * @see {@link createPerformanceMark} for underlying mark creation
 * @see {@link createPerformanceMeasure} for measure calculation
 */
export class PerformanceMarksManager {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Readonly<Date>
    }[]

    /**
     * 🏗️ Initializes the performance marks manager with historical performance data.
     *
     * @remarks
     * The manager uses the provided historical performance log to maintain context
     * for performance trend analysis and baseline establishment.
     *
     * @param performanceLog - Historical performance data used for trend analysis
     * and performance comparison. This log accumulates data across multiple operations.
     */
    public constructor(
        performanceLog: ReadonlyDeep<{
            readonly operation: string
            readonly metrics: Record<string, unknown>
            readonly timestamp: Readonly<Date>
        }[]>
    ) {
        this._performanceLog = toWritable(
            performanceLog
        )
    }

    /**
     * ⚡ Executes a computational operation with comprehensive manual performance tracking.
     *
     * @remarks
     * This method performs a computational task while creating precise performance marks
     * at operation boundaries and collecting comprehensive performance measurement data
     * including garbage collection events.
     *
     * 🎯 **Performance Tracking Process:**
     * 1. **Start Mark:** Creates a performance mark before operation execution
     * 2. **Computation:** Executes the specified computational workload
     * 3. **End Mark:** Creates a performance mark after operation completion
     * 4. **Measure Creation:** Calculates duration between start and end marks
     * 5. **Data Collection:** Gathers all performance marks, measures, and GC data
     *
     * ⚡ **Computational Workload:** The operation performs mathematical calculations
     * with periodic delays to simulate realistic processing patterns and allow GC
     * events to occur naturally.
     *
     * @param taskName - Unique identifier for the operation (used in performance mark names)
     * @param iterations - Number of computational iterations to perform (affects execution time)
     *
     * @returns Promise resolving to comprehensive performance results including
     * computational result and detailed performance measurement data
     *
     * @example
     * Executing operation with detailed performance tracking:
     * ```typescript
     * const manager = new PerformanceMarksManager([]);
     *
     * // Track a data processing operation
     * const result = await manager.performWithManualMarks('dataProcessing', 50000);
     *
     * // Analyze performance marks
     * const startMark = result.performanceData.marks.find(m => m.name.includes('start'));
     * const endMark = result.performanceData.marks.find(m => m.name.includes('end'));
     *
     * if (startMark && endMark) {
     *   console.log(`Operation started at: ${startMark.startTime}`);
     *   console.log(`Operation ended at: ${endMark.startTime}`);
     * }
     *
     * // Check for GC impact
     * if (result.performanceData.gcData.length > 0) {
     *   console.log(`GC events occurred: ${result.performanceData.gcData.length}`);
     *   result.performanceData.gcData.forEach(gc => {
     *     console.log(`GC: ${gc.entryType} at ${gc.startTime}ms, duration: ${gc.duration}ms`);
     *   });
     * }
     * ```
     *
     * @see {@link IPerformanceMarksResult} for detailed return value structure
     * @see {@link createPerformanceMark} for mark creation implementation
     * @see {@link createPerformanceMeasure} for measure calculation
     */
    public async performWithManualMarks(
        taskName: string, iterations: number
    ): Promise<IPerformanceMarksResult> {
        const startMark = `${taskName}-start`
        const endMark = `${taskName}-end`
        const measureName = `${taskName}-duration`

        // Create performance marks
        createPerformanceMark(
            startMark
        )

        let result = 0

        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(
                i
            ) * Math.random()

            if (i % 10000 === 0) {
                await setTimeout(
                    1
                )
            }
        }

        createPerformanceMark(
            endMark
        )

        // Create performance measure
        createPerformanceMeasure(
            measureName, startMark, endMark
        )

        // Gather performance data
        const marks = getPerformanceMarks()
        const measures = getPerformanceMeasures()
        const gcData = getGCPerformanceData()

        this._performanceLog.push(
            {
                operation: taskName,
                metrics: {
                    result,
                    iterations,
                    marksCount: marks.length,
                    measuresCount: measures.length,
                    gcEventsCount: gcData.length
                },
                timestamp: new Date()
            }
        )

        return {
            result,
            performanceData: {
                marks,
                measures,
                gcData
            }
        }
    }
}
