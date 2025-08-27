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
import { randomInt } from 'node:crypto'

import { logger } from '@/logger'

import { ManualPerformanceService } from '../..'

/**
 * Tests manual performance marks and measures.
 *
 * @param service - The manual performance service.
 */
export const testManualMarks = async (service: Readonly<ManualPerformanceService>): Promise<void> => {
    // ⚡ Manual performance marks and measures
    logger.info('⚡ Testing Manual Performance Marks and Measures')

    const ITERATIONS = 50_000

    const marksResult = await service.performWithManualMarks(
        'computation-task', ITERATIONS
    )

    logger.info(
        '✅ Manual marks result:', {
            gcEventsCount: marksResult.performanceData.gcData.length,
            marksCount: marksResult.performanceData.marks.length,
            measuresCount: marksResult.performanceData.measures.length,
            result: marksResult.result
        }
    )
}

/**
 * Tests performance snapshots and calculations.
 *
 * @param service - The manual performance service.
 */
export const testSnapshots = async (service: Readonly<ManualPerformanceService>): Promise<void> => {
    // ⚡ Performance snapshots and calculations
    logger.info('⚡ Testing Performance Snapshots and Calculations')

    const operations = [
        'data-processing',
        'computation',
        'io-simulation'
    ]

    const WORKLOAD = 1000

    for (const operation of operations) {
        // eslint-disable-next-line no-await-in-loop -- Measurement isolation: uses process-level CPU/memory snapshots; parallel execution would corrupt deltas
        const snapshotResult = await service.performWithSnapshots(
            operation, WORKLOAD
        )

        logger.info(
            `✅ Snapshot result for ${operation}:`, {
                cpuDelta: snapshotResult.performanceDifference.cpuUsage,
                duration: snapshotResult.performanceDifference.duration,
                memoryDelta: snapshotResult.performanceDifference.memoryUsage
            }
        )
    }
}

/**
 * Configures performance monitoring.
 */
export const configurePerformanceMonitoring = (): void => {
    // ⚡ Enhanced performance monitoring with anomaly detection
    logger.info('⚡ Testing Enhanced Performance Monitoring')

    // Configure performance monitoring
    const configResult = ManualPerformanceService.configurePerformanceMonitoring()

    logger.info(
        '✅ Performance monitoring configured:', {
            newConfig: configResult.updatedConfig.anomalyDetection.enabled,
            previousConfig: configResult.previousConfig.anomalyDetection.enabled
        }
    )
}

/**
 * Runs anomaly detection loops.
 *
 * @param service - The manual performance service.
 */
export const runAnomalyDetectionLoops = async (service: Readonly<ManualPerformanceService>): Promise<void> => {
    // Run multiple operations to build baselines and trigger anomalies
    const methods = [
        'processUserData',
        'calculateOrderTotal',
        'findProductInventory'
    ]

    const ITERATIONS = 15
    const MIN_ITERATIONS = 10_000
    const MAX_ITERATIONS = 20_000

    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
        for (const method of methods) {
            const iterations = randomInt(MIN_ITERATIONS, MIN_ITERATIONS + MAX_ITERATIONS)
            const anomalyResult = await service.performWithAnomalyDetection(
                method, iterations
            )

            if (iteration % 5 === 0) {
                logger.info(
                    `✅ Anomaly detection iteration ${String(iteration + 1)} for ${method}:`, {
                        anomaliesDetected: anomalyResult.trackingResult.anomalies.length,
                        hasBaseline: Boolean(anomalyResult.performanceBaseline),
                        result: anomalyResult.executionResult,
                        thresholdViolations: anomalyResult.trackingResult.thresholdViolations.length
                    }
                )
            }
        }
    }
}

export const reportPerformanceStatistics = (service: ManualPerformanceService): void => {
    // ⚡ Performance statistics and management
    logger.info('⚡ Testing Performance Statistics and Management')

    const stats = service.getPerformanceStatistics()

    logger.info(
        '✅ Performance statistics:', {
            anomalyDetectionEnabled: stats.anomalyStats.isEnabled,
            baselinesCount: stats.allBaselines.size,
            performanceLogCount: stats.performanceLogCount,
            recentOperationsCount: stats.recentOperations.length,
            trackedMethods: stats.anomalyStats.trackedMethods.length
        }
    )

    // Show detailed baselines
    for (const [
        method,
        baseline
    ] of stats.allBaselines.entries()) {
        logger.info(
            `✅ Baseline for ${method}:`, {
                averageDuration: baseline.averageDuration.toFixed(2),
                lastUpdated: new Date(baseline.lastUpdated).toISOString(),
                sampleSize: baseline.sampleSize
            }
        )
    }
}
