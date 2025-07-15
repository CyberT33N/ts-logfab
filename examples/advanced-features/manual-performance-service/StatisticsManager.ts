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

export interface IPerformanceStatistics {
    allBaselines: ReturnType<typeof getAllPerformanceBaselines>
    anomalyStats: ReturnType<typeof getAnomalyDetectionStatistics>
    performanceLogCount: number
    recentOperations: { operation: string; timestamp: Date }[]
}

export interface IClearResult {
    clearedOperations: string[]
    remainingBaselines: number
    remainingAnomalyData: boolean
}

export class StatisticsManager {
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

    public getPerformanceStatistics(): IPerformanceStatistics {
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

    public clearAllPerformanceData(): IClearResult {
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

    public getPerformanceLog(): readonly {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[] {
        return this._performanceLog
    }
} 