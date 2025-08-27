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

import {
    createPerformanceSnapshot,
    calculatePerformanceDifference
} from '@/logger/performance/utils'
import { toWritable } from '@/utils/data-utils'

import type { PerformanceHelpers } from './performance-helpers'

import type { ReadonlyDeep } from 'type-fest'

/**
 * 📊 Result structure for performance snapshot-based monitoring operations.
 *
 * @remarks
 * This interface encapsulates comprehensive results from snapshot-based performance
 * monitoring, including the actual operation result, calculated performance differences,
 * and detailed before/after system state snapshots for analysis.
 *
 * 🔄 **Snapshot Comparison Structure:**
 * - **Operation Result:** The actual result returned by the monitored operation
 * - **Performance Difference:** Calculated metrics showing resource usage changes
 * - **Snapshot Comparison:** Detailed before and after system state snapshots
 * @see {@link createPerformanceSnapshot} for snapshot creation utilities
 * @see {@link calculatePerformanceDifference} for performance calculation utilities
 */
export interface PerformanceSnapshotResult {
    /**
     * The result of the operation.
     */
    operationResult: unknown

    /**
     * The performance difference between the start and end snapshots.
     */
    performanceDifference: ReturnType<typeof calculatePerformanceDifference>

    /**
     * The comparison of the start and end snapshots.
     */
    snapshotComparison: {
        /**
         * The end snapshot.
         */
        end: ReturnType<typeof createPerformanceSnapshot>

        /**
         * The start snapshot.
         */
        start: ReturnType<typeof createPerformanceSnapshot>
    }
}

/**
 * 📊 Advanced manager for snapshot-based performance monitoring and system state analysis.
 *
 * @remarks
 * This manager class provides sophisticated performance monitoring capabilities through
 * system state snapshots, enabling precise before/after analysis of resource usage,
 * timing, and system performance characteristics.
 *
 * 🔄 **Snapshot-Based Monitoring:**
 * - **System State Capture:** Creates detailed snapshots of system performance state
 * - **Operation Execution:** Delegates to specialized performance helpers for various workload types
 * - **Performance Calculation:** Computes precise differences between snapshot states
 * - **Historical Logging:** Maintains comprehensive logs of all snapshot operations
 *
 * 📊 **Supported Operation Types:**
 * - **Data Processing:** Large dataset manipulation and processing operations
 * - **Computation:** CPU-intensive mathematical calculations and algorithms
 * - **I/O Simulation:** Variable-timing operations simulating database/network calls
 * - **Default Operations:** Baseline operations for performance comparison
 * @example
 * Basic usage for snapshot-based performance monitoring:
 * ```typescript
 * const performanceLog = [];
 * const helpers = new PerformanceHelpers();
 * const manager = new PerformanceSnapshotManager(performanceLog, helpers);
 *
 * // Monitor different operation types
 * const dataResult = await manager.performWithSnapshots('data-processing', 10000);
 * console.log(`Data processing took: ${dataResult.performanceDifference.duration}ms`);
 * console.log(`Memory delta: ${dataResult.performanceDifference.memoryUsage} bytes`);
 *
 * const computeResult = await manager.performWithSnapshots('computation', 5000);
 * console.log(`CPU delta: ${computeResult.performanceDifference.cpuUsage}%`);
 *
 * const ioResult = await manager.performWithSnapshots('io-simulation', 100);
 * console.log(`I/O operation result:`, ioResult.operationResult);
 *
 * // Access detailed snapshots for analysis
 * const snapshots = dataResult.snapshotComparison;
 * console.log('Start state:', snapshots.start);
 * console.log('End state:', snapshots.end);
 * ```
 * @see {@link PerformanceSnapshotResult} for return value structure
 * @see {@link PerformanceHelpers} for supported operation types
 * @see {@link createPerformanceSnapshot} for snapshot implementation
 */
export class PerformanceSnapshotManager {
    /**
     * The performance log to use for storing historical performance data.
     */
    readonly #performanceLog: {
        metrics: Record<string, unknown>
        operation: string
        timestamp: Date
    }[]

    /**
     * The performance helpers to use for executing different workload types during snapshot monitoring.
     */
    readonly #helpers: PerformanceHelpers

    /**
     * 🏗️ Initializes the performance snapshot manager with logging and operation helpers.
     *
     * @remarks
     * The manager requires both a performance log for historical tracking and a set of
     * performance helpers to execute various types of operations during snapshot monitoring.
     * @param performanceLog - Historical performance data used for trend analysis
     * and cross-operation correlation.
     * @param helpers - Performance helper operations for executing different workload types
     * during snapshot monitoring.
     */
    constructor(
        performanceLog: ReadonlyDeep<{
            readonly metrics: Record<string, unknown>
            readonly operation: string
            readonly timestamp: Readonly<Date>
        }[]>,
        helpers: Readonly<PerformanceHelpers>
    ) {
        this.#performanceLog = toWritable(performanceLog)
        this.#helpers = helpers
    }

    /**
     * 📊 Executes an operation with comprehensive snapshot-based performance monitoring.
     *
     * @remarks
     * This method performs sophisticated performance monitoring by capturing detailed system
     * state snapshots before and after operation execution, then calculating precise
     * performance differences for comprehensive analysis.
     *
     * 🔄 **Monitoring Process:**
     * 1. **Initial Snapshot:** Captures complete system performance state before execution
     * 2. **Operation Execution:** Delegates to appropriate helper based on operation name
     * 3. **Final Snapshot:** Captures system state after operation completion
     * 4. **Difference Calculation:** Computes precise performance deltas between snapshots
     * 5. **Logging:** Records operation metrics for historical analysis
     *
     * 📊 **Operation Type Routing:**
     * - **'data-processing':** Large dataset manipulation with checksum validation
     * - **'computation':** Complex mathematical calculations with nested loops
     * - **'io-simulation':** Variable-timing I/O operations simulation
     * - **Default:** Baseline operations for any other operation name
     * @param operationName - Type of operation to execute ('data-processing', 'computation',
     * 'io-simulation', or custom name for default operation).
     * @param workload - Workload parameter passed to the selected operation helper.
     * @returns Promise resolving to comprehensive snapshot monitoring results including
     * operation result, performance differences, and detailed snapshot comparison.
     * @example
     * Monitoring different operation types with snapshot analysis:
     * ```typescript
     * const manager = new PerformanceSnapshotManager([], helpers);
     *
     * // Monitor data processing with detailed analysis
     * const result = await manager.performWithSnapshots('data-processing', 50000);
     *
     * // Analyze performance impact
     * const perf = result.performanceDifference;
     * console.log(`Operation took: ${perf.duration}ms`);
     * console.log(`Memory impact: ${perf.memoryUsage} bytes`);
     * console.log(`CPU utilization change: ${perf.cpuUsage}%`);
     *
     * // Compare system states
     * const before = result.snapshotComparison.start;
     * const after = result.snapshotComparison.end;
     *
     * console.log('System state before:', {
     *   memory: before.memoryUsage,
     *   cpu: before.cpuUsage,
     *   timestamp: before.timestamp
     * });
     *
     * console.log('System state after:', {
     *   memory: after.memoryUsage,
     *   cpu: after.cpuUsage,
     *   timestamp: after.timestamp
     * });
     *
     * // Access operation-specific result
     * if (result.operationResult && typeof result.operationResult === 'object') {
     *   console.log('Operation result:', result.operationResult);
     * }
     * ```
     * @see {@link PerformanceSnapshotResult} for detailed return value structure
     * @see {@link PerformanceHelpers} for available operation implementations
     * @see {@link calculatePerformanceDifference} for performance calculation details
     */
    public async performWithSnapshots(
        operationName: string, workload: number
    ): Promise<PerformanceSnapshotResult> {
        // Take initial snapshot
        const startSnapshot = createPerformanceSnapshot()

        // Perform operation
        let operationResult: unknown

        switch (operationName) {
            case 'computation': {
                operationResult = await this.#helpers.performComplexComputation(workload)
                break
            }
            case 'data-processing': {
                operationResult = await this.#helpers.processLargeDataset(workload)
                break
            }
            case 'io-simulation': {
                operationResult = await this.#helpers.simulateIOOperations(workload)
                break
            }
            default: {
                operationResult = await this.#helpers.defaultOperation(workload)
            }
        }

        // Take final snapshot
        const endSnapshot = createPerformanceSnapshot()

        // Calculate performance difference
        const performanceDifference = calculatePerformanceDifference(startSnapshot, endSnapshot)

        this.#performanceLog.push({
            metrics: {
                cpuDelta: performanceDifference.cpuUsage,
                duration: performanceDifference.duration,
                memoryDelta: performanceDifference.memoryUsage,
                workload
            },
            operation: operationName,
            timestamp: new Date()
        })

        return {
            operationResult,
            performanceDifference,
            snapshotComparison: {
                end: endSnapshot,
                start: startSnapshot
            }
        }
    }
}
