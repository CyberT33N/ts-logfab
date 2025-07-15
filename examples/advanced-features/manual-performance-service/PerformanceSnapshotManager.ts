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
    createPerformanceSnapshot,
    calculatePerformanceDifference
} from '@/logger/performance/utils/index.ts'
import { toWritable } from '@/utils/data-utils.ts'
import type { IPerformanceHelpers } from './PerformanceHelpers.ts'

export interface IPerformanceSnapshotResult {
    operationResult: unknown
    performanceDifference: ReturnType<typeof calculatePerformanceDifference>
    snapshotComparison: {
        start: ReturnType<typeof createPerformanceSnapshot>
        end: ReturnType<typeof createPerformanceSnapshot>
    }
}

export class PerformanceSnapshotManager {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[]
    private readonly _helpers: IPerformanceHelpers

    public constructor(
        performanceLog: ReadonlyDeep<{
            readonly operation: string
            readonly metrics: Record<string, unknown>
            readonly timestamp: Readonly<Date>
        }[]>,
        helpers: IPerformanceHelpers
    ) {
        this._performanceLog = toWritable(performanceLog)
        this._helpers = helpers
    }

    public async performWithSnapshots(operationName: string, workload: number): Promise<IPerformanceSnapshotResult> {
        // Take initial snapshot
        const startSnapshot = createPerformanceSnapshot()
        
        // Perform operation
        let operationResult: unknown
        
        switch (operationName) {
        case 'data-processing':
            operationResult = await this._helpers.processLargeDataset(workload)
            break
        case 'computation':
            operationResult = await this._helpers.performComplexComputation(workload)
            break
        case 'io-simulation':
            operationResult = await this._helpers.simulateIOOperations(workload)
            break
        default:
            operationResult = await this._helpers.defaultOperation(workload)
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
} 