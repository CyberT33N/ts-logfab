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
import { AnomalyDetectionManager } from './anomaly-detection-manager.ts'
import { configurePerformanceMonitoring  } from './configuration-manager'
import type {ConfigurationResult} from './configuration-manager';
import { PerformanceHelpers, type IPerformanceHelpers } from './PerformanceHelpers.ts'
import { PerformanceMarksManager ,type  IPerformanceMarksResult } from './PerformanceMarksManager.ts'

import { PerformanceSnapshotManager } from './PerformanceSnapshotManager.ts'


import {
    StatisticsManager
 
 
} from './StatisticsManager.ts'
import type { IAnomalyDetectionResult } from './anomaly-detection-manager.ts'
import type { IPerformanceSnapshotResult } from './PerformanceSnapshotManager.ts'
import type { IPerformanceStatistics, IClearResult } from './StatisticsManager.ts'

// Re-export types for external use

/**
 * ⚡ **Manual Performance Service**
 *
 * @remarks
 * This comprehensive service serves as a unified facade and composition root for all manual
 * performance monitoring capabilities. It orchestrates specialized manager instances to provide
 * a complete performance analysis toolkit for enterprise applications.
 *
 * 🏗️ **Architecture Pattern:** Implements the Composition-Root pattern to manage dependencies
 * and provide a clean, unified API for all performance monitoring operations.
 *
 * 🎯 **Core Capabilities:**
 * - **Manual Performance Marks:** Precise timing with performance marks and measures
 * - **Performance Snapshots:** Comprehensive system state capture and analysis
 * - **Anomaly Detection:** Advanced statistical analysis for performance anomalies
 * - **Configuration Management:** Centralized performance monitoring configuration
 * - **Statistics & Analytics:** Historical data analysis and trend monitoring
 * - **Performance Helpers:** Standardized workload operations for testing
 *
 * ⚡ **Enterprise Features:**
 * - Unified logging across all performance operations
 * - Cross-manager data correlation and analysis
 * - Comprehensive performance baseline establishment
 * - Advanced anomaly detection with configurable thresholds
 * - Historical performance trend analysis
 *
 * @example
 * Comprehensive performance monitoring workflow:
 * ```typescript
 * const performanceService = new ManualPerformanceService();
 *
 * // 1. Configure performance monitoring (static method)
 * const config = ManualPerformanceService.configurePerformanceMonitoring();
 * console.log('Anomaly detection enabled:', config.updatedConfig.anomalyDetection.enabled);
 *
 * // 2. Execute operations with different tracking methods
 *
 * // Manual marks and measures
 * const marksResult = await performanceService.performWithManualMarks('dataProcessing', 50000);
 * console.log(`Marks: ${marksResult.performanceData.marks.length},
 * GC events: ${marksResult.performanceData.gcData.length}`);
 *
 * // Snapshot-based monitoring
 * const snapshotResult = await performanceService.performWithSnapshots('computation', 10000);
 * console.log(`Duration: ${snapshotResult.performanceDifference.duration}ms`);
 *
 * // Anomaly detection
 * const anomalyResult = await performanceService.performWithAnomalyDetection('criticalOperation', 25000);
 * console.log(`Anomalies detected: ${anomalyResult.trackingResult.anomalies.length}`);
 *
 * // 3. Analyze overall performance statistics
 * const stats = performanceService.getPerformanceStatistics();
 * console.log(`Total operations: ${stats.performanceLogCount}`);
 * console.log(`Baselines established: ${stats.allBaselines.size}`);
 *
 * // 4. Access detailed performance logs
 * const logs = performanceService.getPerformanceLog();
 * logs.forEach(log => {
 *   console.log(`${log.operation}: ${JSON.stringify(log.metrics)}`);
 * });
 *
 * // 5. Cleanup when needed
 * const clearResult = performanceService.clearAllPerformanceData();
 * console.log(`Cleared ${clearResult.clearedOperations.length} operations`);
 * ```
 *
 * @see {@link PerformanceMarksManager} for manual marks and measures
 * @see {@link PerformanceSnapshotManager} for snapshot-based monitoring
 * @see {@link AnomalyDetectionManager} for anomaly detection capabilities
 * @see {@link configurePerformanceMonitoring} for performance configuration
 * @see {@link StatisticsManager} for analytics and data management
 */
export class ManualPerformanceService {
    private readonly _performanceLog: {
        metrics: Record<string, unknown>
        operation: string
        timestamp: Date
    }[] = []

    private readonly _marksManager: PerformanceMarksManager

    private readonly _snapshotManager: PerformanceSnapshotManager

    private readonly _anomalyManager: AnomalyDetectionManager

    private readonly _statsManager: StatisticsManager

    private readonly _helpers: IPerformanceHelpers

    /**
     * 🏗️ Initializes the manual performance service with all specialized manager instances.
     *
     * @remarks
     * The constructor establishes the composition root by instantiating all specialized
     * performance managers and connecting them through a shared performance log for
     * cross-manager data correlation and unified analytics.
     *
     * 🎯 **Manager Initialization:**
     * - **Performance Helpers:** Standardized workload operations
     * - **Marks Manager:** Manual performance marks and measures tracking
     * - **Snapshot Manager:** System state capture and performance snapshots
     * - **Anomaly Manager:** Advanced anomaly detection and analysis
     * - **Statistics Manager:** Data analytics and historical trend analysis
     *
     * 📊 **Shared State:** All managers share a common performance log to enable
     * comprehensive cross-operation analysis and unified reporting.
     */
    public constructor() {
        this._helpers = new PerformanceHelpers()
        this._marksManager = new PerformanceMarksManager(this._performanceLog)
        this._snapshotManager = new PerformanceSnapshotManager(
            this._performanceLog, this._helpers
        )
        this._anomalyManager = new AnomalyDetectionManager(this._performanceLog)
        this._statsManager = new StatisticsManager(this._performanceLog)
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ STATIC CONFIGURATION METHODS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * ⚙️ Configures comprehensive performance monitoring with advanced anomaly detection.
     *
     * @remarks
     * This method applies enterprise-grade performance monitoring configuration including
     * sophisticated anomaly detection algorithms, baseline tracking, threshold management,
     * and comprehensive reporting capabilities.
     *
     * @returns Configuration result with previous and newly applied performance monitoring settings
     *
     * @see {@link configurePerformanceMonitoring} for configuration details
     */
    public static configurePerformanceMonitoring(): ConfigurationResult {
        return configurePerformanceMonitoring()
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ MANUAL PERFORMANCE MARKS AND MEASURES
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * ⚡ Executes an operation with comprehensive manual performance marks and measures tracking.
     *
     * @remarks
     * This method provides the most precise performance timing available by using manual
     * performance marks at operation boundaries and creating measures for duration calculation.
     * Also captures garbage collection events that occur during execution.
     *
     * 🎯 **Use Cases:**
     * - Precise timing analysis for performance optimization
     * - GC impact assessment on operation performance
     * - Detailed performance profiling for critical operations
     *
     * @param taskName - Unique identifier for the operation (used in performance mark names)
     * @param iterations - Number of computational iterations to perform
     *
     * @returns Promise resolving to comprehensive performance results with marks, measures, and GC data
     *
     * @see {@link PerformanceMarksManager.performWithManualMarks} for implementation details
     */
    public async performWithManualMarks(
        taskName: string, iterations: number
    ): Promise<IPerformanceMarksResult> {
        return await this._marksManager.performWithManualMarks(
            taskName, iterations
        )
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ PERFORMANCE SNAPSHOTS AND CALCULATIONS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 📊 Executes an operation with comprehensive performance snapshot analysis.
     *
     * @remarks
     * This method captures detailed system performance snapshots before and after operation
     * execution, calculating precise differences in CPU usage, memory consumption, and
     * execution timing for comprehensive performance analysis.
     *
     * 🎯 **Snapshot Analysis:**
     * - System performance state before and after execution
     * - Calculated differences in resource usage
     * - Memory, CPU, and timing delta analysis
     *
     * @param operationName - Unique identifier for the operation being monitored
     * @param workload - Workload parameter passed to the performance helper operation
     *
     * @returns Promise resolving to performance snapshot results with before/after states
     * and calculated performance differences
     *
     * @see {@link PerformanceSnapshotManager.performWithSnapshots} for implementation details
     */
    public async performWithSnapshots(
        operationName: string, workload: number
    ): Promise<IPerformanceSnapshotResult> {
        return await this._snapshotManager.performWithSnapshots(
            operationName, workload
        )
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ ENHANCED PERFORMANCE MONITORING WITH ANOMALY DETECTION
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 🛡️ Executes an operation with advanced anomaly detection and statistical analysis.
     *
     * @remarks
     * This method performs comprehensive performance monitoring with sophisticated anomaly
     * detection algorithms that analyze execution patterns against established baselines
     * and identify statistical outliers in performance metrics.
     *
     * 🛡️ **Anomaly Detection Features:**
     * - Statistical analysis against performance baselines
     * - Threshold violation detection for duration and memory
     * - Outlier identification using standard deviation analysis
     * - Performance trend analysis and deviation reporting
     *
     * @param methodName - Unique identifier for the operation being monitored
     * @param iterations - Number of computational iterations to perform
     *
     * @returns Promise resolving to anomaly detection results with execution data,
     * detected anomalies, and baseline comparison information
     *
     * @see {@link AnomalyDetectionManager.performWithAnomalyDetection} for implementation details
     */
    public async performWithAnomalyDetection(
        methodName: string, iterations: number
    ): Promise<IAnomalyDetectionResult> {
        return await this._anomalyManager.performWithAnomalyDetection(
            methodName, iterations
        )
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ ANALYTICS AND MANAGEMENT METHODS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 📈 Retrieves comprehensive performance statistics and analytics data.
     *
     * @remarks
     * This method provides detailed analytics including performance baselines, anomaly
     * statistics, operation counts, and historical performance trends across all
     * tracked operations.
     *
     * @returns Comprehensive performance statistics including baselines, anomaly data,
     * and operational metrics
     *
     * @see {@link StatisticsManager.getPerformanceStatistics} for statistics details
     */
    public getPerformanceStatistics(): IPerformanceStatistics {
        return this._statsManager.getPerformanceStatistics()
    }

    /**
     * 🧹 Clears all performance data including logs, baselines, and anomaly detection history.
     *
     * @remarks
     * This method performs a comprehensive cleanup of all performance monitoring data,
     * including operation logs, established baselines, and anomaly detection history.
     * Useful for resetting performance monitoring state or cleaning up test data.
     *
     * @returns Clear operation results with details of cleared data categories
     *
     * @see {@link StatisticsManager.clearAllPerformanceData} for cleanup details
     */
    public clearAllPerformanceData(): IClearResult {
        return this._statsManager.clearAllPerformanceData()
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚒️ HELPER METHODS FOR DIFFERENT OPERATION TYPES
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 📋 Retrieves the complete performance operation log for analysis and debugging.
     *
     * @remarks
     * This method provides read-only access to the comprehensive performance log that
     * captures all operations performed across all manager instances. Useful for
     * detailed analysis, debugging, and custom reporting.
     *
     * @returns Read-only array of all performance log entries with operation details,
     * metrics, and timestamps
     *
     * @see {@link StatisticsManager.getPerformanceLog} for log access details
     */
    public getPerformanceLog(): readonly {
        metrics: Record<string, unknown>
        operation: string
        timestamp: Date
    }[] {
        return this._statsManager.getPerformanceLog()
    }
}

export { type IAnomalyDetectionResult } from './anomaly-detection-manager.ts'
export { type ConfigurationResult } from './configuration-manager.ts'
export { type IPerformanceHelpers } from './PerformanceHelpers.ts'
export { type IPerformanceMarksResult } from './PerformanceMarksManager.ts'
export { type IPerformanceSnapshotResult } from './PerformanceSnapshotManager.ts'
export { type IClearResult, type IPerformanceStatistics } from './StatisticsManager.ts'
