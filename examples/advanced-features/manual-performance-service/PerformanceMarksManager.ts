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
    createPerformanceMark,
    createPerformanceMeasure,
    getGCPerformanceData,
    getPerformanceMarks,
    getPerformanceMeasures
} from '@/logger/performance/utils/index.ts'
import { toWritable } from '@/utils/data-utils.ts'

export interface IPerformanceMarksResult {
    result: number
    performanceData: {
        marks: PerformanceEntry[]
        measures: PerformanceEntry[]
        gcData: PerformanceEntry[]
    }
}

export class PerformanceMarksManager {
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

    public async performWithManualMarks(taskName: string, iterations: number): Promise<IPerformanceMarksResult> {
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

    private async _delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
} 