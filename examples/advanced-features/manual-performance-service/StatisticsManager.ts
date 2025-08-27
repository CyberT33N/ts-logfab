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
    getAllPerformanceBaselines,
    getAnomalyDetectionStatistics,
    clearPerformanceData,
    clearPerformanceBaselines,
    clearAnomalyDetectionData
} from '@/logger/performance/utils/index.ts'
import { toWritable } from '@/utils/data-utils.ts'

/**
 * 📈 Comprehensive performance statistics and analytics data structure.
 * 
 * @remarks
 * This interface encapsulates all available performance analytics including baseline
 * data, anomaly detection statistics, operation counts, and recent activity tracking.
 * Used for comprehensive performance monitoring dashboards and reporting.
 * 
 * 📊 **Statistics Categories:**
 * - **Performance Baselines:** Established performance benchmarks for all tracked methods
 * - **Anomaly Statistics:** Detection system status and anomaly tracking data
 * - **Operation Metrics:** Total count and recent activity from performance logs
 * - **Recent Activity:** Latest operations for trend analysis and debugging
 * 
 * @see {@link getAllPerformanceBaselines} for baseline data collection
 * @see {@link getAnomalyDetectionStatistics} for anomaly detection analytics
 */
export interface IPerformanceStatistics {
    allBaselines: ReturnType<typeof getAllPerformanceBaselines>
    anomalyStats: ReturnType<typeof getAnomalyDetectionStatistics>
    performanceLogCount: number
    recentOperations: { operation: string; timestamp: Date }[]
}

/**
 * 🧹 Result structure for comprehensive performance data cleanup operations.
 * 
 * @remarks
 * This interface provides detailed feedback about cleanup operations, including
 * what data was cleared and what remains in the system after cleanup completion.
 * Essential for verifying cleanup success and debugging cleanup issues.
 * 
 * 🧹 **Cleanup Tracking:**
 * - **Cleared Operations:** List of operation names that were removed from logs
 * - **Remaining Baselines:** Count of performance baselines that persist after cleanup
 * - **Remaining Anomaly Data:** Boolean indicating if anomaly detection data remains active
 * 
 * @see {@link clearPerformanceData} for performance data cleanup
 * @see {@link clearPerformanceBaselines} for baseline cleanup
 * @see {@link clearAnomalyDetectionData} for anomaly data cleanup
 */
export interface IClearResult {
    clearedOperations: string[]
    remainingBaselines: number
    remainingAnomalyData: boolean
}

/**
 * 📈 Advanced statistics manager for performance analytics, data management, and cleanup operations.
 * 
 * @remarks
 * This manager class provides comprehensive performance analytics capabilities including
 * statistical analysis, historical data management, and system cleanup operations.
 * Serves as the central hub for all performance data analysis and maintenance.
 * 
 * 📊 **Core Analytics Features:**
 * - **Performance Statistics:** Comprehensive analytics across all performance metrics
 * - **Baseline Management:** Access to established performance benchmarks
 * - **Anomaly Analytics:** Statistical analysis of detected performance anomalies
 * - **Historical Tracking:** Recent operation analysis and trend monitoring
 * 
 * 🧹 **Data Management Features:**
 * - **Comprehensive Cleanup:** Complete system data cleanup across all subsystems
 * - **Selective Clearing:** Targeted cleanup of specific data categories
 * - **Cleanup Verification:** Detailed reporting of cleanup results and remaining data
 * - **Log Management:** Direct access to raw performance log data
 * 
 * @example
 * Comprehensive performance analytics and data management:
 * ```typescript
 * const performanceLog = []; // Shared across all managers
 * const statsManager = new StatisticsManager(performanceLog);
 * 
 * // Get comprehensive performance analytics
 * const stats = statsManager.getPerformanceStatistics();
 * 
 * console.log('Performance Overview:');
 * console.log(`Total operations logged: ${stats.performanceLogCount}`);
 * console.log(`Performance baselines: ${stats.allBaselines.size}`);
 * console.log(`Anomaly detection enabled: ${stats.anomalyStats.isEnabled}`);
 * console.log(`Tracked methods: ${stats.anomalyStats.trackedMethods.length}`);
 * 
 * // Analyze recent activity
 * console.log('Recent Operations:');
 * stats.recentOperations.forEach(op => {
 *   console.log(`${op.operation} at ${op.timestamp.toISOString()}`);
 * });
 * 
 * // Access detailed baseline information
 * for (const [method, baseline] of stats.allBaselines.entries()) {
 *   console.log(`${method}: avg ${baseline.averageDuration}ms (${baseline.sampleSize} samples)`);
 * }
 * 
 * // Access raw performance log data
 * const rawLogs = statsManager.getPerformanceLog();
 * rawLogs.forEach(log => {
 *   console.log(`${log.operation}: ${JSON.stringify(log.metrics)}`);
 * });
 * 
 * // Perform comprehensive cleanup when needed
 * const cleanupResult = statsManager.clearAllPerformanceData();
 * console.log(`Cleared ${cleanupResult.clearedOperations.length} operations`);
 * console.log(`Remaining baselines: ${cleanupResult.remainingBaselines}`);
 * console.log(`Anomaly data remaining: ${cleanupResult.remainingAnomalyData}`);
 * ```
 * 
 * @see {@link IPerformanceStatistics} for statistics structure
 * @see {@link IClearResult} for cleanup result structure
 * @see {@link getAllPerformanceBaselines} for baseline management
 */
export class StatisticsManager {
    #performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[]

    /**
     * 🏗️ Initializes the statistics manager with historical performance data.
     * 
     * @remarks
     * The manager operates on a shared performance log that accumulates data from
     * all performance monitoring operations across different manager instances.
     * This shared state enables comprehensive cross-operational analytics.
     * 
     * @param performanceLog - Shared performance log data used for statistical
     * analysis and historical trend monitoring across all performance operations
     */
    public constructor(performanceLog: ReadonlyDeep<{
        readonly operation: string
        readonly metrics: Record<string, unknown>
        readonly timestamp: Readonly<Date>
    }[]>) {
        this.#performanceLog = toWritable(performanceLog)
    }

    /**
     * 📈 Retrieves comprehensive performance statistics and analytics data.
     * 
     * @remarks
     * This method aggregates performance data from multiple sources to provide
     * a complete overview of system performance including baselines, anomaly
     * detection status, operation counts, and recent activity analysis.
     * 
     * 📊 **Data Aggregation Sources:**
     * - **Performance Baselines:** All established benchmarks across tracked methods
     * - **Anomaly Detection:** Current detection system status and anomaly statistics
     * - **Operation Logs:** Total operation count and recent activity from internal log
     * - **Recent Operations:** Last 10 operations with timestamps for trend analysis
     * 
     * @returns Comprehensive performance statistics including baselines, anomaly data,
     * operation counts, and recent activity summary
     * 
     * @example
     * Analyzing comprehensive performance statistics:
     * ```typescript
     * const stats = manager.getPerformanceStatistics();
     * 
     * // Overview metrics
     * console.log(`Total operations: ${stats.performanceLogCount}`);
     * console.log(`Baselines established: ${stats.allBaselines.size}`);
     * 
     * // Anomaly detection status
     * console.log('Anomaly Detection Status:');
     * console.log(`- Enabled: ${stats.anomalyStats.isEnabled}`);
     * console.log(`- Tracked methods: ${stats.anomalyStats.trackedMethods.length}`);
     * console.log(`- Total anomalies: ${stats.anomalyStats.totalAnomalies}`);
     * 
     * // Recent activity analysis
     * console.log('Recent Operations:');
     * stats.recentOperations.forEach((op, index) => {
     *   console.log(`${index + 1}. ${op.operation} at ${op.timestamp.toLocaleString()}`);
     * });
     * 
     * // Baseline performance overview
     * console.log('Performance Baselines:');
     * for (const [method, baseline] of stats.allBaselines.entries()) {
     *   console.log(`${method}:`);
     *   console.log(`  Average: ${baseline.averageDuration.toFixed(2)}ms`);
     *   console.log(`  Samples: ${baseline.sampleSize}`);
     *   console.log(`  Updated: ${new Date(baseline.lastUpdated).toLocaleString()}`);
     * }
     * ```
     * 
     * @see {@link IPerformanceStatistics} for detailed return value structure
     * @see {@link getAllPerformanceBaselines} for baseline data source
     * @see {@link getAnomalyDetectionStatistics} for anomaly data source
     */
    public getPerformanceStatistics(): IPerformanceStatistics {
        const allBaselines = getAllPerformanceBaselines()
        const anomalyStats = getAnomalyDetectionStatistics()
        
        const recentOperations = this.#performanceLog
            .slice(-10)
            .map((entry: Readonly<{ operation: string; timestamp: Readonly<Date> }>) => ({
                operation: entry.operation,
                timestamp: entry.timestamp
            }))
        
        return {
            allBaselines,
            anomalyStats,
            performanceLogCount: this.#performanceLog.length,
            recentOperations
        }
    }

    /**
     * 🧹 Performs comprehensive cleanup of all performance monitoring data.
     * 
     * @remarks
     * This method executes a complete system cleanup, removing all performance data
     * from multiple subsystems including operation logs, performance baselines, and
     * anomaly detection history. Provides detailed feedback about cleanup results.
     * 
     * 🧹 **Cleanup Operations:**
     * 1. **Operation Log Capture:** Records all operation names before deletion
     * 2. **Performance Data Cleanup:** Clears all tracked performance metrics
     * 3. **Baseline Cleanup:** Removes all established performance benchmarks
     * 4. **Anomaly Data Cleanup:** Clears anomaly detection history and statistics
     * 5. **Internal Log Cleanup:** Empties the internal performance log array
     * 6. **Verification:** Checks remaining data to confirm cleanup success
     * 
     * ⚠️ **Important:** This is a destructive operation that cannot be undone.
     * All historical performance data, baselines, and anomaly detection history
     * will be permanently lost.
     * 
     * @returns Detailed cleanup results including cleared operation names,
     * remaining baseline count, and anomaly data status
     * 
     * @example
     * Performing comprehensive performance data cleanup:
     * ```typescript
     * // Before cleanup - check current state
     * const beforeStats = manager.getPerformanceStatistics();
     * console.log('Before cleanup:');
     * console.log(`Operations: ${beforeStats.performanceLogCount}`);
     * console.log(`Baselines: ${beforeStats.allBaselines.size}`);
     * console.log(`Anomaly tracking: ${beforeStats.anomalyStats.isEnabled}`);
     * 
     * // Perform cleanup
     * const cleanupResult = manager.clearAllPerformanceData();
     * 
     * // Analyze cleanup results
     * console.log('Cleanup Results:');
     * console.log(`Cleared operations: ${cleanupResult.clearedOperations.length}`);
     * cleanupResult.clearedOperations.forEach(op => {
     *   console.log(`- ${op}`);
     * });
     * 
     * console.log(`Remaining baselines: ${cleanupResult.remainingBaselines}`);
     * console.log(`Anomaly data remains: ${cleanupResult.remainingAnomalyData}`);
     * 
     * // Verify cleanup success
     * const afterStats = manager.getPerformanceStatistics();
     * console.log('After cleanup:');
     * console.log(`Operations: ${afterStats.performanceLogCount}`);
     * console.log(`Baselines: ${afterStats.allBaselines.size}`);
     * 
     * if (afterStats.performanceLogCount === 0 && afterStats.allBaselines.size === 0) {
     *   console.log('✅ Cleanup successful - all data cleared');
     * } else {
     *   console.log('⚠️ Some data remains after cleanup');
     * }
     * ```
     * 
     * @see {@link IClearResult} for detailed return value structure
     * @see {@link clearPerformanceData} for performance data cleanup
     * @see {@link clearPerformanceBaselines} for baseline cleanup
     * @see {@link clearAnomalyDetectionData} for anomaly data cleanup
     */
    public clearAllPerformanceData(): IClearResult {
        const clearedOperations = this.#performanceLog.map(
            (entry: Readonly<{ operation: string; timestamp: Readonly<Date> }>
            ) => entry.operation)
        
        // Clear all performance data
        clearPerformanceData()
        clearPerformanceBaselines()
        clearAnomalyDetectionData()
        
        // Clear internal log
        this.#performanceLog.splice(0, this.#performanceLog.length)
        
        // Check what remains
        const remainingBaselines = getAllPerformanceBaselines().size
        const anomalyStats = getAnomalyDetectionStatistics()
        
        return {
            clearedOperations,
            remainingBaselines,
            remainingAnomalyData: anomalyStats.isEnabled && anomalyStats.totalMethods > 0
        }
    }

    /**
     * 📋 Provides read-only access to the complete performance operation log.
     * 
     * @remarks
     * This method returns direct access to the comprehensive performance log that
     * captures all operations performed across all manager instances. Useful for
     * detailed analysis, custom reporting, and debugging performance issues.
     * 
     * 📊 **Log Data Structure:**
     * Each log entry contains operation name, detailed metrics object, and timestamp
     * for comprehensive analysis and correlation across different performance monitoring
     * approaches (marks, snapshots, anomaly detection).
     * 
     * @returns Read-only array of all performance log entries with complete
     * operation details, metrics, and timestamps
     * 
     * @example
     * Accessing and analyzing raw performance log data:
     * ```typescript
     * const performanceLogs = manager.getPerformanceLog();
     * 
     * console.log(`Total logged operations: ${performanceLogs.length}`);
     * 
     * // Analyze operations by type
     * const operationTypes = new Map<string, number>();
     * performanceLogs.forEach(log => {
     *   const count = operationTypes.get(log.operation) || 0;
     *   operationTypes.set(log.operation, count + 1);
     * });
     * 
     * console.log('Operations by type:');
     * for (const [operation, count] of operationTypes.entries()) {
     *   console.log(`${operation}: ${count} executions`);
     * }
     * 
     * // Analyze recent performance trends
     * const recentLogs = performanceLogs.slice(-5);
     * console.log('Recent operation details:');
     * recentLogs.forEach((log, index) => {
     *   console.log(`${index + 1}. ${log.operation} at ${log.timestamp.toISOString()}`);
     *   console.log(`   Metrics: ${JSON.stringify(log.metrics, null, 2)}`);
     * });
     * 
     * // Find operations with specific characteristics
     * const highDurationOps = performanceLogs.filter(log => 
     *   log.metrics.duration && (log.metrics.duration as number) > 1000
     * );
     * console.log(`Operations over 1000ms: ${highDurationOps.length}`);
     * ```
     * 
     * @see {@link IPerformanceStatistics.recentOperations} for summary of recent activity
     */
    public getPerformanceLog(): readonly {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[] {
        return this.#performanceLog
    }
} 
