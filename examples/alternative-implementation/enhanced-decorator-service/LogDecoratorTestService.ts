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
// 🔥 LOG DECORATOR TEST SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

import { log } from '@/logger/decorators/index.ts'
import { IUser } from '../../core/models.ts'
import { UtilityService } from './UtilityService.ts'

/**
 * 🔥 **Log Decorator Test Service**
 * 
 * Tests the enhanced @log() decorator implementation
 */
export class LogDecoratorTestService {
    [key: string]: unknown
    private readonly _utilityService: Readonly<UtilityService>

    public constructor(utilityService: Readonly<UtilityService>) {
        this._utilityService = utilityService
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔥 ENHANCED DECORATOR 'log' IMPLEMENTATION
    // ═══════════════════════════════════════════════════════════════════════════════

    @log() // DEFAULT CONFIGURATION
    public async getUserProfile(userId: Readonly<number>): Promise<IUser | null> {
        await this._utilityService.delay(120)
        
        const user = this._utilityService.findUserById(userId)
        if (!user) {
            throw new Error(`User ${String(userId)} not found`)
        }
        
        return user
    }

    @log({
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        enableSemanticAnalysis: true,
        enableCorrelationTracking: true,
        includeArguments: true,
        includeResult: true,
        logLevel: 'info'
    })
    public async createUserWithAnalytics(
        name: Readonly<string>, 
        email: Readonly<string>, 
        age: Readonly<number>
    ): Promise<IUser> {
        await this._utilityService.delay(200)
        
        const newUser: IUser = {
            id: this._utilityService.getNextUserId(),
            name,
            email,
            age
        }
        
        this._utilityService.addUser(newUser)
        
        // Track analytics event
        this._utilityService.addAnalyticsEvent('user_created', { userId: newUser.id, name, email })
        
        return newUser
    }

    @log({
        enablePerformanceTracking: false,
        enableAnomalyDetection: false,
        enableSemanticAnalysis: false,
        enableCorrelationTracking: false,
        includeArguments: false,
        includeResult: false,
        logLevel: 'warn'
    })
    public async minimalLoggingOperation(data: readonly unknown[]): Promise<number> {
        await this._utilityService.delay(50)
        return data.length
    }
} 