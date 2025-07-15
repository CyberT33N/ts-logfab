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

export interface IAnomalyDetectionResult {
    executionResult: number
    trackingResult: ReturnType<typeof trackMethodPerformance>
    performanceBaseline: ReturnType<typeof getPerformanceBaseline>
}

export class AnomalyDetectionManager {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[]

    public constructor(performanceLog: ReadonlyDeep<{
        readonly operation: string
        readonly metrics: Record<string, unknown>
        readonly timestamp: Readonly<Date>
    }[]>) {
        this._performanceLog = toWritable(performanceLog)
    }

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

    private async _delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
} 