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
// 🎯 BASE SERVICE CLASS WITH ORIGINAL DECORATORS
// ═══════════════════════════════════════════════════════════════════════════════

import { 
    log, 
    logDebug, 
    logPerformance, 
    logSilent, 
    logErrorsOnly
} from '@/decorators/index.ts'
import { logger } from '@/logger/index.ts'
import { IUser, IProduct } from './models.ts'

/**
 * 🎯 **Base Service Class**
 * 
 * Demonstrates the original 5 decorator variants from the main implementation
 */
export class BaseService {
    private readonly _users: IUser[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 }
    ]

    private readonly _products: IProduct[] = [
        { id: 'prod-1', name: 'Laptop', price: 999.99, category: 'Electronics' },
        { id: 'prod-2', name: 'Book', price: 29.99, category: 'Education' },
        { id: 'prod-3', name: 'Coffee', price: 4.99, category: 'Food' }
    ]

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🎯 STANDARD LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @log()
    public async getUserById(id: Readonly<number>): Promise<IUser | null> {
        await this._delay(100)
        
        const user = this._users.find((u: Readonly<IUser>) => u.id === id)
        if (!user) {
            throw new Error(`User with id ${String(id)} not found`)
        }
        
        return user
    }

    @log({
        includeArgs: true,
        includeResult: true,
        includePerformance: true,
        customContext: { operation: 'user-creation' }
    })
    public async createUser(name: Readonly<string>, email: Readonly<string>, age: Readonly<number>): Promise<IUser> {
        await this._delay(150)
        
        const newUser: IUser = {
            id: this._users.length + 1,
            name,
            email,
            age
        }
        
        this._users.push(newUser)
        return newUser
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔍 DEBUG LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logDebug()
    public getAllUsers(): IUser[] {
        return [...this._users]
    }

    @logDebug()
    public async searchUsersByName(searchTerm: Readonly<string>): Promise<IUser[]> {
        await this._delay(50)
        
        return this._users.filter((user: Readonly<IUser>) => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ PERFORMANCE LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logPerformance()
    public async complexCalculation(iterations: Readonly<number>): Promise<number> {
        let result = 0
        
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.random()
            
            if (i % 1000 === 0) {
                await this._delay(1)
            }
        }
        
        return result
    }

    @logPerformance()
    public async batchProcessUsers(batchSize: Readonly<number>): Promise<IUser[]> {
        const processedUsers: IUser[] = []
        
        for (let i = 0; i < this._users.length; i += batchSize) {
            const batch = this._users.slice(i, i + batchSize)
            
            await this._delay(100)
            
            for (const user of batch) {
                processedUsers.push({
                    ...user,
                    email: user.email.toLowerCase()
                })
            }
        }
        
        return processedUsers
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔇 SILENT LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logSilent()
    public async sensitiveOperation(apiKey: Readonly<string>, secretData: Readonly<string>): Promise<boolean> {
        await this._delay(200)
        
        return apiKey.length > 10 && secretData.length > 5
    }

    @logSilent()
    public getInternalSystemInfo(): Record<string, unknown> {
        return {
            systemUptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            nodeVersion: process.version
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🚨 ERROR-ONLY LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logErrorsOnly()
    public async riskyOperation(shouldFail: Readonly<boolean>): Promise<string> {
        await this._delay(100)
        
        if (shouldFail) {
            throw new Error('This operation was designed to fail!')
        }
        
        return 'Operation completed successfully'
    }

    @logErrorsOnly()
    public async validateData(data: unknown): Promise<boolean> {
        await this._delay(50)
        
        if (data === null || data === undefined || typeof data !== 'object') {
            throw new Error('Invalid data provided')
        }
        
        return true
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 CUSTOM CONFIGURATION TESTS
    // ═══════════════════════════════════════════════════════════════════════════════

    @log({ logStart: false, logSuccess: false })
    public getUserCount(): number {
        return this._users.length
    }

    @log({ customPrefix: 'PRODUCT_SERVICE' })
    public async getProductById(id: Readonly<string>): Promise<IProduct | null> {
        await this._delay(75)
        
        return this._products.find((p: Readonly<IProduct>) => p.id === id) ?? null
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ HELPER METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    public getUsersData(): readonly IUser[] {
        return this._users
    }

    public getProductsData(): readonly IProduct[] {
        return this._products
    }

    private async _delay(ms: Readonly<number>): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

/**
 * 🎯 **Demo Function for Base Service**
 */
export async function runBaseServiceDemo(): Promise<void> {
    logger.info('🚀 Starting Base Service Demo (Original Decorators)')
    
    const service = new BaseService()
    
    try {
        // Standard logging tests
        logger.info('📊 Testing Standard Logging Decorator')
        const user1 = await service.getUserById(1)
        logger.info('✅ Retrieved user:', { user: user1 })
        
        const newUser = await service.createUser('David', 'david@example.com', 28)
        logger.info('✅ Created user:', { user: newUser })
        
        // Debug logging tests
        logger.info('🔍 Testing Debug Logging Decorator')
        const allUsers = service.getAllUsers()
        logger.info('✅ All users count:', { count: allUsers.length })
        
        const searchResults = await service.searchUsersByName('alice')
        logger.info('✅ Search results:', { count: searchResults.length })
        
        // Performance logging tests
        logger.info('⚡ Testing Performance Logging Decorator')
        const calcResult = await service.complexCalculation(10000)
        logger.info('✅ Complex calculation result:', { result: calcResult })
        
        const batchResult = await service.batchProcessUsers(2)
        logger.info('✅ Batch processing result:', { count: batchResult.length })
        
        // Silent logging tests
        logger.info('🔇 Testing Silent Logging Decorator')
        const sensitiveResult = await service.sensitiveOperation('super-secret-key-123', 'sensitive-data')
        logger.info('✅ Sensitive operation result:', { success: sensitiveResult })
        
        const systemInfo = service.getInternalSystemInfo()
        logger.info('✅ System info retrieved:', { keys: Object.keys(systemInfo) })
        
        // Error-only logging tests
        logger.info('🚨 Testing Error-Only Logging Decorator')
        const successResult = await service.riskyOperation(false)
        logger.info('✅ Risky operation success:', { result: successResult })
        
        const validationResult = await service.validateData({ valid: true })
        logger.info('✅ Validation success:', { result: validationResult })
        
        // Custom configuration tests
        logger.info('🔧 Testing Custom Configuration')
        const userCount = service.getUserCount()
        logger.info('✅ User count:', { count: userCount })
        
        const product = await service.getProductById('prod-1')
        logger.info('✅ Product retrieved:', { product })
        
        // Error scenarios
        logger.info('🚨 Testing Error Scenarios')
        
        try {
            await service.getUserById(999)
        } catch (error) {
            logger.info('✅ Expected error caught:', { error: (error as Error).message })
        }
        
        try {
            await service.riskyOperation(true)
        } catch (error) {
            logger.info('✅ Expected risky operation error caught:', { error: (error as Error).message })
        }
        
        try {
            await service.validateData(null)
        } catch (error) {
            logger.info('✅ Expected validation error caught:', { error: (error as Error).message })
        }
    } catch (error: unknown) {
        logger.error('❌ Base Service Demo failed:', { error })
    }
    
    logger.info('🎉 Base Service Demo completed successfully!')
}
