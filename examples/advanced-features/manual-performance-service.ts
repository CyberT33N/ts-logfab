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
// ⚡ MANUAL PERFORMANCE TRACKING USING PERFORMANCE-UTILS.TS
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import {
    createPerformanceMark,
    createPerformanceMeasure,
    getGCPerformanceData,
    getPerformanceMarks,
    getPerformanceMeasures,
    clearPerformanceData,
    createPerformanceSnapshot,
    calculatePerformanceDifference,
    trackMethodPerformance,
    configureEnhancedPerformanceMonitoring,
    getEnhancedPerformanceConfiguration,
    getPerformanceBaseline,
    getAllPerformanceBaselines,
    clearPerformanceBaselines,
    getAnomalyDetectionStatistics,
    clearAnomalyDetectionData
} from '@/logger/performance-utils.ts'
import { createUsers } from '../core/models.ts'

/**
 * ⚡ **Manual Performance Service**
 * 
 * Demonstrates manual performance tracking using performance-utils.ts
 * Tests all the functions that were NOT being used in the original app.ts
 */
export class ManualPerformanceService {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[] = []

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ MANUAL PERFORMANCE MARKS AND MEASURES
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithManualMarks(taskName: string, iterations: number): Promise<{
        result: number
        performanceData: {
            marks: PerformanceEntry[]
            measures: PerformanceEntry[]
            gcData: PerformanceEntry[]
        }
    }> {
        const startMark = `${taskName}-start`
        const endMark = `${taskName}-end`
        const measureName = `${taskName}-duration`
        
        // Create performance marks
        createPerformanceMark(startMark)
        
        let result = 0
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.random()
            
            if (i % 10000 === 0) {
                await this._delay(1)
            }
        }
        
        createPerformanceMark(endMark)
        
        // Create performance measure
        createPerformanceMeasure(measureName, startMark, endMark)
        
        // Gather performance data
        const marks = getPerformanceMarks()
        const measures = getPerformanceMeasures()
        const gcData = getGCPerformanceData()
        
        this._performanceLog.push({
            operation: taskName,
            metrics: {
                result,
                iterations,
                marksCount: marks.length,
                measuresCount: measures.length,
                gcEventsCount: gcData.length
            },
            timestamp: new Date()
        })
        
        return {
            result,
            performanceData: {
                marks,
                measures,
                gcData
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ PERFORMANCE SNAPSHOTS AND CALCULATIONS
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithSnapshots(operationName: string, workload: number): Promise<{
        operationResult: unknown
        performanceDifference: ReturnType<typeof calculatePerformanceDifference>
        snapshotComparison: {
            start: ReturnType<typeof createPerformanceSnapshot>
            end: ReturnType<typeof createPerformanceSnapshot>
        }
    }> {
        // Take initial snapshot
        const startSnapshot = createPerformanceSnapshot()
        
        // Perform operation
        let operationResult: unknown
        
        switch (operationName) {
        case 'data-processing':
            operationResult = await this._processLargeDataset(workload)
            break
        case 'computation':
            operationResult = await this._performComplexComputation(workload)
            break
        case 'io-simulation':
            operationResult = await this._simulateIOOperations(workload)
            break
        default:
            operationResult = await this._defaultOperation(workload)
        }
        
        // Take final snapshot
        const endSnapshot = createPerformanceSnapshot()
        
        // Calculate performance difference
        const performanceDifference = calculatePerformanceDifference(startSnapshot, endSnapshot)
        
        this._performanceLog.push({
            operation: operationName,
            metrics: {
                workload,
                duration: performanceDifference.duration,
                memoryDelta: performanceDifference.memoryUsage,
                cpuDelta: performanceDifference.cpuUsage
            },
            timestamp: new Date()
        })
        
        return {
            operationResult,
            performanceDifference,
            snapshotComparison: {
                start: startSnapshot,
                end: endSnapshot
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ ENHANCED PERFORMANCE MONITORING WITH ANOMALY DETECTION
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithAnomalyDetection(methodName: string, iterations: number): Promise<{
        executionResult: number
        trackingResult: ReturnType<typeof trackMethodPerformance>
        performanceBaseline: ReturnType<typeof getPerformanceBaseline>
    }> {
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

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ CONFIGURATION AND MANAGEMENT METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    public configurePerformanceMonitoring(): {
        previousConfig: ReturnType<typeof getEnhancedPerformanceConfiguration>
        newConfig: ReturnType<typeof getEnhancedPerformanceConfiguration>
        } {
        // Get current configuration
        const previousConfig = getEnhancedPerformanceConfiguration()
        
        // Configure enhanced performance monitoring
        configureEnhancedPerformanceMonitoring({
            anomalyDetection: {
                enabled: true,
                config: {
                    performance: {
                        slowThreshold: 2.0,
                        fastThreshold: 0.2,
                        stdDevSensitivity: 2.0,
                        minSampleSize: 5
                    },
                    memory: {
                        highThreshold: 1.5,
                        lowThreshold: 0.2,
                        stdDevSensitivity: 1.8
                    },
                    global: {
                        confidenceThreshold: 0.8,
                        maxAnomaliesPerSecond: 5,
                        enabledDetectors: [
                            'PERFORMANCE_SLOW',
                            'PERFORMANCE_FAST',
                            'MEMORY_HIGH',
                            'STATISTICAL_OUTLIER'
                        ]
                    }
                }
            },
            baseline: {
                trackingEnabled: true,
                minSampleSize: 10,
                maxHistoryDays: 7
            },
            thresholds: {
                slowMethodWarning: 500,
                slowMethodCritical: 2000,
                memoryWarning: 25 * 1024 * 1024, // 25MB
                memoryCritical: 50 * 1024 * 1024, // 50MB
                cpuWarning: 70,
                cpuCritical: 90
            },
            reporting: {
                logAnomalies: true,
                logBaselines: true,
                logThresholdViolations: true
            }
        })
        
        // Get updated configuration
        const newConfig = getEnhancedPerformanceConfiguration()
        
        return {
            previousConfig,
            newConfig
        }
    }

    public getPerformanceStatistics(): {
        allBaselines: ReturnType<typeof getAllPerformanceBaselines>
        anomalyStats: ReturnType<typeof getAnomalyDetectionStatistics>
        performanceLogCount: number
        recentOperations: { operation: string; timestamp: Date }[]
        } {
        const allBaselines = getAllPerformanceBaselines()
        const anomalyStats = getAnomalyDetectionStatistics()
        
        const recentOperations = this._performanceLog
            .slice(-10)
            .map((entry: Readonly<{ operation: string; timestamp: Readonly<Date> }>) => ({
                operation: entry.operation,
                timestamp: entry.timestamp
            }))
        
        return {
            allBaselines,
            anomalyStats,
            performanceLogCount: this._performanceLog.length,
            recentOperations
        }
    }

    public clearAllPerformanceData(): {
        clearedOperations: string[]
        remainingBaselines: number
        remainingAnomalyData: boolean
        } {
        const clearedOperations = this._performanceLog.map(
            (entry: Readonly<{ operation: string; timestamp: Readonly<Date> }>
            ) => entry.operation)
        
        // Clear all performance data
        clearPerformanceData()
        clearPerformanceBaselines()
        clearAnomalyDetectionData()
        
        // Clear internal log
        this._performanceLog.splice(0, this._performanceLog.length)
        
        // Check what remains
        const remainingBaselines = getAllPerformanceBaselines().size
        const anomalyStats = getAnomalyDetectionStatistics()
        
        return {
            clearedOperations,
            remainingBaselines,
            remainingAnomalyData: anomalyStats.isEnabled && anomalyStats.totalMethods > 0
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚒️ HELPER METHODS FOR DIFFERENT OPERATION TYPES
    // ═══════════════════════════════════════════════════════════════════════════════


    public getPerformanceLog(): readonly {
     operation: string
     metrics: Record<string, unknown>
     timestamp: Date
 }[] {
        return this._performanceLog
    }

    private async _processLargeDataset(size: number): Promise<{ processed: number; checksum: number }> {
        const data = createUsers(size)
        let checksum = 0
        
        for (const user of data) {
            checksum += user.id + user.age + user.name.length + user.email.length
            await this._delay(1) // Simulate processing time
        }
        
        return { processed: data.length, checksum }
    }

    private async _performComplexComputation(complexity: number): Promise<{ result: number; operations: number }> {
        let result = 0
        let operations = 0
        
        for (let i = 0; i < complexity; i++) {
            for (let j = 0; j < 100; j++) {
                result += Math.sqrt(i * j) * Math.sin(i) * Math.cos(j)
                operations++
            }
            
            if (i % 1000 === 0) {
                await this._delay(1)
            }
        }
        
        return { result, operations }
    }

    private async _simulateIOOperations(operations: number): Promise<{ operations: number; totalTime: number }> {
        const startTime = Date.now()
        
        for (let i = 0; i < operations; i++) {
            // Simulate I/O delay with variable timing
            const ioDelay = Math.random() * 10 + 5
            await this._delay(ioDelay)
        }
        
        const totalTime = Date.now() - startTime
        
        return { operations, totalTime }
    }

    private async _defaultOperation(workload: number): Promise<{ workload: number; result: string }> {
        await this._delay(workload * 10)
        
        return {
            workload,
            result: `Default operation completed with workload ${String(workload)}`
        }
    }

    private async _delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

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
        const methods = ['algorithm-a', 'algorithm-b', 'algorithm-c']
        
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
    }
    
    logger.info('🎉 Manual Performance Demo completed successfully!')
}
