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
import { createUsers } from '../../core/models.ts'

export interface IPerformanceHelpers {
    processLargeDataset(size: number): Promise<{ processed: number; checksum: number }>
    performComplexComputation(complexity: number): Promise<{ result: number; operations: number }>
    simulateIOOperations(operations: number): Promise<{ operations: number; totalTime: number }>
    defaultOperation(workload: number): Promise<{ workload: number; result: string }>
}

export class PerformanceHelpers implements IPerformanceHelpers {
    public async processLargeDataset(size: number): Promise<{ processed: number; checksum: number }> {
        const data = createUsers(size)
        let checksum = 0
        
        for (const user of data) {
            checksum += user.id + user.age + user.name.length + user.email.length
            await this._delay(1) // Simulate processing time
        }
        
        return { processed: data.length, checksum }
    }

    public async performComplexComputation(complexity: number): Promise<{ result: number; operations: number }> {
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

    public async simulateIOOperations(operations: number): Promise<{ operations: number; totalTime: number }> {
        const startTime = Date.now()
        
        for (let i = 0; i < operations; i++) {
            // Simulate I/O delay with variable timing
            const ioDelay = Math.random() * 10 + 5
            await this._delay(ioDelay)
        }
        
        const totalTime = Date.now() - startTime
        
        return { operations, totalTime }
    }

    public async defaultOperation(workload: number): Promise<{ workload: number; result: string }> {
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