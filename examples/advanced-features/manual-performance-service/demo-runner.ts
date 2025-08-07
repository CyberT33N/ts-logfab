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
import { logger } from '@/logger'

import { ManualPerformanceService } from '.'

/**
 * ⚡ **Demo Function for Manual Performance Service**
 *
 * @remarks
 * This comprehensive demonstration function showcases all capabilities of the Manual Performance
 * Service, including performance marks/measures, snapshot analysis, anomaly detection, and
 * statistical monitoring.
 *
 * 🔄 **Demo Scenarios:**
 * - Manual performance marks and measures with garbage collection tracking
 * - Performance snapshots and calculations across multiple operations
 * - Enhanced performance monitoring with configurable anomaly detection
 * - Statistical analysis and baseline management
 * - Performance data cleanup and verification
 *
 * 📊 **Testing Coverage:** The demo runs multiple iterations of various operations to build
 * performance baselines and intentionally trigger anomaly detection for comprehensive testing.
 *
 * @returns Promise that resolves when the entire demonstration is complete
 *
 * @example
 * Running the manual performance demonstration:
 * ```typescript
 * import { runManualPerformanceDemo } from './demo-runner.ts';
 *
 * async function main() {
 *   try {
 *     await runManualPerformanceDemo();
 *     console.log('Performance demo completed successfully');
 *   } catch (error) {
 *     console.error('Demo failed:', error);
 *   }
 * }
 * ```
 *
 * @see {@link ManualPerformanceService} for the service being demonstrated
 * @see {@link logger} for logging implementation used throughout the demo
 */
export const runManualPerformanceDemo = async (): Promise<void> => {
    logger.info('⚡ Starting Manual Performance Demo (Performance Utils)')

    const service = new ManualPerformanceService()

    try {
        await _testManualMarks(service)
        await _testSnapshots(service)
        _configurePerformanceMonitoring()
        await _runAnomalyDetectionLoops(service)
        _reportPerformanceStatistics(service)
        _clearPerformanceDataAndReport(service)
        _logFinalStatistics(service)
    } catch (error: unknown) {
        logger.error('❌ Manual Performance Demo failed:', { error })
        throw error
    }

    logger.info('🎉 Manual Performance Demo completed successfully!')
}

// Helper methods (module-private)
const _testManualMarks = async (service: ManualPerformanceService): Promise<void> => {
    // ⚡ Manual performance marks and measures
    logger.info('⚡ Testing Manual Performance Marks and Measures')

    const marksResult = await service.performWithManualMarks(
        'computation-task', 50_000
    )

    logger.info(
        '✅ Manual marks result:', {
            result: marksResult.result,
            marksCount: marksResult.performanceData.marks.length,
            measuresCount: marksResult.performanceData.measures.length,
            gcEventsCount: marksResult.performanceData.gcData.length
        }
    )
}

const _testSnapshots = async (service: ManualPerformanceService): Promise<void> => {
    // ⚡ Performance snapshots and calculations
    logger.info('⚡ Testing Performance Snapshots and Calculations')

    const operations = [
        'data-processing',
        'computation',
        'io-simulation'
    ]

    for (const operation of operations) {
        const snapshotResult = await service.performWithSnapshots(
            operation, 1000
        )

        logger.info(
            `✅ Snapshot result for ${operation}:`, {
                duration: snapshotResult.performanceDifference.duration,
                memoryDelta: snapshotResult.performanceDifference.memoryUsage,
                cpuDelta: snapshotResult.performanceDifference.cpuUsage
            }
        )
    }
}

const _configurePerformanceMonitoring = (): void => {
    // ⚡ Enhanced performance monitoring with anomaly detection
    logger.info('⚡ Testing Enhanced Performance Monitoring')

    // Configure performance monitoring
    const configResult = ManualPerformanceService.configurePerformanceMonitoring()

    logger.info(
        '✅ Performance monitoring configured:', {
            previousConfig: configResult.previousConfig.anomalyDetection.enabled,
            newConfig: configResult.newConfig.anomalyDetection.enabled
        }
    )
}

const _runAnomalyDetectionLoops = async (service: ManualPerformanceService): Promise<void> => {
    // Run multiple operations to build baselines and trigger anomalies
    const methods = [
        'processUserData',
        'calculateOrderTotal',
        'findProductInventory'
    ]

    for (let iteration = 0; iteration < 15; iteration++) {
        for (const method of methods) {
            const iterations = 10_000 + Math.floor(Math.random() * 20_000)
            const anomalyResult = await service.performWithAnomalyDetection(
                method, iterations
            )

            if (iteration % 5 === 0) {
                logger.info(
                    `✅ Anomaly detection iteration ${String(iteration + 1)} for ${method}:`, {
                        result: anomalyResult.executionResult,
                        anomaliesDetected: anomalyResult.trackingResult.anomalies.length,
                        thresholdViolations: anomalyResult.trackingResult.thresholdViolations.length,
                        hasBaseline: Boolean(anomalyResult.performanceBaseline)
                    }
                )
            }
        }
    }
}

const _reportPerformanceStatistics = (service: ManualPerformanceService): void => {
    // ⚡ Performance statistics and management
    logger.info('⚡ Testing Performance Statistics and Management')

    const stats = service.getPerformanceStatistics()

    logger.info(
        '✅ Performance statistics:', {
            baselinesCount: stats.allBaselines.size,
            trackedMethods: stats.anomalyStats.trackedMethods.length,
            anomalyDetectionEnabled: stats.anomalyStats.isEnabled,
            performanceLogCount: stats.performanceLogCount,
            recentOperationsCount: stats.recentOperations.length
        }
    )

    // Show detailed baselines
    for (const [method, baseline] of stats.allBaselines.entries()) {
        logger.info(
            `✅ Baseline for ${method}:`, {
                averageDuration: baseline.averageDuration.toFixed(2),
                sampleSize: baseline.sampleSize,
                lastUpdated: new Date(baseline.lastUpdated).toISOString()
            }
        )
    }
}

const _clearPerformanceDataAndReport = (service: ManualPerformanceService): void => {
    // Clear performance data
    logger.info('⚡ Testing Performance Data Cleanup')
    const clearResult = service.clearAllPerformanceData()

    logger.info(
        '✅ Performance data cleared:', {
            clearedOperationsCount: clearResult.clearedOperations.length,
            remainingBaselines: clearResult.remainingBaselines,
            remainingAnomalyData: clearResult.remainingAnomalyData
        }
    )
}

const _logFinalStatistics = (service: ManualPerformanceService): void => {
    // Final verification
    const finalStats = service.getPerformanceStatistics()

    logger.info(
        '✅ Final statistics after cleanup:', {
            baselinesCount: finalStats.allBaselines.size,
            performanceLogCount: finalStats.performanceLogCount
        }
    )
}
