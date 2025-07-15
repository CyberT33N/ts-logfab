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
// 🔥 DEBUG DECORATOR TEST SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

import { debugLog } from '@/logger/decorators/index.ts'
import { UtilityService } from './UtilityService.ts'

/**
 * 🔥 **Debug Decorator Test Service**
 * 
 * Tests the enhanced @debugLog() decorator implementation
 */
export class DebugDecoratorTestService {
    [key: string]: unknown
    private readonly _utilityService: Readonly<UtilityService>

    public constructor(utilityService: Readonly<UtilityService>) {
        this._utilityService = utilityService
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔥 ENHANCED DECORATOR 'debugLog' IMPLEMENTATION
    // ═══════════════════════════════════════════════════════════════════════════════

    @debugLog() // DEFAULT DEBUG CONFIGURATION
    public async debugDataInspection(data: readonly unknown[]): Promise<{
        dataTypes: Record<string, number>
        nullCount: number
        undefinedCount: number
        totalItems: number
        sample: unknown
    }> {
        await this._utilityService.delay(80)
        
        const dataTypes: Record<string, number> = {}
        let nullCount = 0
        let undefinedCount = 0
        
        for (const item of data) {
            const type = typeof item
            
            if (item === null) {
                nullCount++
            } else if (item === undefined) {
                undefinedCount++
            } else {
                dataTypes[type] = (dataTypes[type] || 0) + 1
            }
        }
        
        return {
            dataTypes,
            nullCount,
            undefinedCount,
            totalItems: data.length,
            sample: data[0]
        }
    }

    @debugLog({
        includeStackTrace: true,
        includeArguments: true,
        includeResult: true,
        logLevel: 'debug'
    })
    public async complexDebuggingScenario(
        config: Readonly<Record<string, unknown>>, 
        options: Readonly<Record<string, unknown>>
    ): Promise<{
        configValidation: Record<string, boolean>
        optionsValidation: Record<string, boolean>
        processingResult: string
    }> {
        await this._utilityService.delay(150)
        
        const configValidation: Record<string, boolean> = {}
        const optionsValidation: Record<string, boolean> = {}
        
        for (const [key, value] of Object.entries(config)) {
            configValidation[key] = value !== null && value !== undefined
        }
        
        for (const [key, value] of Object.entries(options)) {
            optionsValidation[key] = typeof value === 'string' || typeof value === 'number'
        }
        
        return {
            configValidation,
            optionsValidation,
            processingResult: 'Complex debugging scenario completed successfully'
        }
    }

    @debugLog({
        includeStackTrace: false,
        includeArguments: false,
        includeResult: false,
        logLevel: 'trace'
    })
    public async lightweightDebugOperation(items: readonly string[]): Promise<number> {
        await this._utilityService.delay(25)
        return items.length
    }
} 