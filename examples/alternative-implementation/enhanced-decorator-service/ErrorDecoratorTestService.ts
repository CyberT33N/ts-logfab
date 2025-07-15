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
// 🔥 ERROR DECORATOR TEST SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

import { errorLog } from '@/logger/decorators/index.ts'
import { UtilityService } from './UtilityService.ts'

/**
 * 🔥 **Error Decorator Test Service**
 * 
 * Tests the enhanced @errorLog() decorator implementation
 */
export class ErrorDecoratorTestService {
    [key: string]: unknown
    private readonly _utilityService: Readonly<UtilityService>

    public constructor(utilityService: Readonly<UtilityService>) {
        this._utilityService = utilityService
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔥 ENHANCED DECORATOR 'errorLog' IMPLEMENTATION
    // ═══════════════════════════════════════════════════════════════════════════════

    @errorLog() // DEFAULT ERROR CONFIGURATION
    public async errorProneOperation(shouldFail: Readonly<boolean>, errorType: Readonly<string>): Promise<string> {
        await this._utilityService.delay(100)
        
        if (shouldFail) {
            switch (errorType) {
            case 'validation':
                throw new Error('Validation failed: Invalid input parameters')
            case 'network':
                throw new Error('Network error: Unable to connect to external service')
            case 'permission':
                throw new Error('Permission denied: Insufficient access rights')
            case 'timeout':
                throw new Error('Operation timeout: Request took too long to complete')
            default:
                throw new Error('Unknown error occurred')
            }
        }
        
        return 'Operation completed successfully without errors'
    }

    @errorLog({
        includeStackTrace: true,
        includeArguments: true,
        enableAnomalyDetection: true,
        logLevel: 'error'
    })
    public async criticalErrorHandler(
        operation: Readonly<string>, 
        data: readonly unknown[], 
        options: Readonly<Record<string, unknown>>
    ): Promise<{
        success: boolean
        errorsEncountered: string[]
        processedItems: number
    }> {
        await this._utilityService.delay(200)
        
        const errorsEncountered: string[] = []
        let processedItems = 0
        
        // Use options for configuration
        const strictMode = options.strict === true
        const maxErrors = typeof options.maxErrors === 'number' ? options.maxErrors : Infinity
        
        for (const [index, item] of data.entries()) {
            try {
                if (item === null) {
                    throw new Error(`Null value encountered at index ${String(index)}`)
                }
                
                if (typeof item !== 'object') {
                    throw new Error(`Invalid type '${typeof item}' at index ${String(index)}`)
                }
                
                // In strict mode, perform additional validation
                if (strictMode && typeof item === 'object' && Object.keys(item).length === 0) {
                    throw new Error(`Empty object at index ${String(index)} (strict mode)`)
                }
                
                processedItems++
            } catch (error) {
                errorsEncountered.push((error as Error).message)
                
                // Stop processing if max errors reached
                if (errorsEncountered.length >= maxErrors) {
                    break
                }
            }
        }
        
        if (errorsEncountered.length > 0) {
            throw new Error(`Critical errors in ${operation}: ${errorsEncountered.join(', ')}`)
        }
        
        return {
            success: true,
            errorsEncountered,
            processedItems
        }
    }

    @errorLog({
        includeStackTrace: false,
        includeArguments: false,
        enableAnomalyDetection: false,
        logLevel: 'warn'
    })
    public async recoveryOperation(failurePoint: Readonly<string>): Promise<boolean> {
        await this._utilityService.delay(150)
        
        // Simulate recovery logic
        const recoveryChance = Math.random()
        
        if (recoveryChance < 0.3) {
            throw new Error(`Recovery failed at ${failurePoint}`)
        }
        
        return true
    }
} 