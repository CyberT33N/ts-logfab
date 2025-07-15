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
// 🔥 PERFORMANCE DECORATOR TEST SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { performanceLog } from '@/logger/decorators/index.ts'
import { UtilityService } from './UtilityService.ts'

/**
 * 🔥 **Performance Decorator Test Service**
 * 
 * Tests the enhanced @performanceLog() decorator implementation
 */
export class PerformanceDecoratorTestService {
    [key: string]: unknown
    private readonly _utilityService: Readonly<UtilityService>

    public constructor(utilityService: Readonly<UtilityService>) {
        this._utilityService = utilityService
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔥 ENHANCED DECORATOR 'performanceLog' IMPLEMENTATION
    // ═══════════════════════════════════════════════════════════════════════════════

    @performanceLog() // DEFAULT PERFORMANCE CONFIGURATION
    public async intensiveComputationTask(iterations: Readonly<number>): Promise<{
        result: number
        processingTime: number
        memoryUsed: number
    }> {
        const startTime = Date.now()
        const startMemory = process.memoryUsage().heapUsed
        
        let result = 0
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.sin(i) * Math.cos(i)
            
            // Simulate intensive work
            if (i % 10000 === 0) {
                await this._utilityService.delay(1)
            }
        }
        
        const endTime = Date.now()
        const endMemory = process.memoryUsage().heapUsed
        
        return {
            result,
            processingTime: endTime - startTime,
            memoryUsed: endMemory - startMemory
        }
    }

    @performanceLog({
        enableAnomalyDetection: true,
        enableSemanticAnalysis: true,
        logLevel: 'debug',
        includeResult: true
    })
    public async matrixMultiplication(
        matrixA: ReadonlyDeep<number[][]>, 
        matrixB: ReadonlyDeep<number[][]>
    ): Promise<number[][]> {
        await this._utilityService.delay(100)
        
        const rowsA = matrixA.length
        const colsA = matrixA[0].length
        const colsB = matrixB[0].length
        
        const result: number[][] = []
        
        for (let i = 0; i < rowsA; i++) {
            result[i] = []
            for (let j = 0; j < colsB; j++) {
                result[i][j] = 0
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j]
                }
            }
        }
        
        return result
    }

    @performanceLog({
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        logLevel: 'info',
        includeArguments: false,
        includeResult: false
    })
    public async batchProcessData(batchSize: Readonly<number>): Promise<{
        processed: number
        batches: number
        averageTime: number
    }> {
        const startTime = Date.now()
        let processed = 0
        let batches = 0
        
        const totalData = this._utilityService.getUsers().length + this._utilityService.getProducts().length
        
        for (let i = 0; i < totalData; i += batchSize) {
            await this._utilityService.delay(50)
            processed += Math.min(batchSize, totalData - i)
            batches++
        }
        
        const endTime = Date.now()
        const averageTime = (endTime - startTime) / batches
        
        return {
            processed,
            batches,
            averageTime
        }
    }
} 