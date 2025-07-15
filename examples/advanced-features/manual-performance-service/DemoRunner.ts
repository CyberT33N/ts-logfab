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
import { logger } from '@/logger/index.ts'
import { ManualPerformanceService } from './index.ts'

/**
 * ⚡ **Demo Function for Manual Performance Service**
 */
export async function runManualPerformanceDemo(): Promise<void> {
    logger.info('⚡ Starting Manual Performance Demo (Performance Utils)')
    
    const service = new ManualPerformanceService()
    
    try {
        // ⚡ Manual performance marks and measures
        logger.info('⚡ Testing Manual Performance Marks and Measures')
        
        const marksResult = await service.performWithManualMarks('computation-task', 50000)
        logger.info('✅ Manual marks result:', {
            result: marksResult.result,
            marksCount: marksResult.performanceData.marks.length,
            measuresCount: marksResult.performanceData.measures.length,
            gcEventsCount: marksResult.performanceData.gcData.length
        })
        
        // ⚡ Performance snapshots and calculations
        logger.info('⚡ Testing Performance Snapshots and Calculations')
        
        const operations = ['data-processing', 'computation', 'io-simulation']
        
        for (const operation of operations) {
            const snapshotResult = await service.performWithSnapshots(operation, 1000)
            logger.info(`✅ Snapshot result for ${operation}:`, {
                duration: snapshotResult.performanceDifference.duration,
                memoryDelta: snapshotResult.performanceDifference.memoryUsage,
                cpuDelta: snapshotResult.performanceDifference.cpuUsage
            })
        }
        
        // ⚡ Enhanced performance monitoring with anomaly detection
        logger.info('⚡ Testing Enhanced Performance Monitoring')
        
        // Configure performance monitoring
        const configResult = service.configurePerformanceMonitoring()
        logger.info('✅ Performance monitoring configured:', {
            previousConfig: configResult.previousConfig.anomalyDetection.enabled,
            newConfig: configResult.newConfig.anomalyDetection.enabled
        })
        
        // Run multiple operations to build baselines and trigger anomalies
        const methods = ['processUserData', 'calculateOrderTotal', 'findProductInventory']
        
        for (let iteration = 0; iteration < 15; iteration++) {
            for (const method of methods) {
                const iterations = 10000 + Math.floor(Math.random() * 20000)
                const anomalyResult = await service.performWithAnomalyDetection(method, iterations)
                
                if (iteration % 5 === 0) {
                    logger.info(`✅ Anomaly detection iteration ${String(iteration + 1)} for ${method}:`, {
                        result: anomalyResult.executionResult,
                        anomaliesDetected: anomalyResult.trackingResult.anomalies.length,
                        thresholdViolations: anomalyResult.trackingResult.thresholdViolations.length,
                        hasBaseline: Boolean(anomalyResult.performanceBaseline)
                    })
                }
            }
        }
        
        // ⚡ Performance statistics and management
        logger.info('⚡ Testing Performance Statistics and Management')
        
        const stats = service.getPerformanceStatistics()
        logger.info('✅ Performance statistics:', {
            baselinesCount: stats.allBaselines.size,
            trackedMethods: stats.anomalyStats.trackedMethods.length,
            anomalyDetectionEnabled: stats.anomalyStats.isEnabled,
            performanceLogCount: stats.performanceLogCount,
            recentOperationsCount: stats.recentOperations.length
        })
        
        // Show detailed baselines
        for (const [method, baseline] of stats.allBaselines.entries()) {
            logger.info(`✅ Baseline for ${method}:`, {
                averageDuration: baseline.averageDuration.toFixed(2),
                sampleSize: baseline.sampleSize,
                lastUpdated: new Date(baseline.lastUpdated).toISOString()
            })
        }
        
        // Clear performance data
        logger.info('⚡ Testing Performance Data Cleanup')
        const clearResult = service.clearAllPerformanceData()
        logger.info('✅ Performance data cleared:', {
            clearedOperationsCount: clearResult.clearedOperations.length,
            remainingBaselines: clearResult.remainingBaselines,
            remainingAnomalyData: clearResult.remainingAnomalyData
        })
        
        // Final verification
        const finalStats = service.getPerformanceStatistics()
        logger.info('✅ Final statistics after cleanup:', {
            baselinesCount: finalStats.allBaselines.size,
            performanceLogCount: finalStats.performanceLogCount
        })
    } catch (error: unknown) {
        logger.error('❌ Manual Performance Demo failed:', { error })
        throw error
    }
    
    logger.info('🎉 Manual Performance Demo completed successfully!')
} 