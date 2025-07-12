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
// 🚀 EXAMPLE APP - LOGGER DECORATOR TESTING
// ═══════════════════════════════════════════════════════════════════════════════

import { log, logDebug, logPerformance, logSilent, logErrorsOnly } from '@/decorators/index.ts'
import { logger } from '@/logger/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 EXAMPLE DATA MODELS
// ═══════════════════════════════════════════════════════════════════════════════

interface User {
    id: number
    name: string
    email: string
    age: number
}

interface Product {
    id: string
    name: string
    price: number
    category: string
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 EXAMPLE SERVICE CLASS WITH ALL DECORATORS
// ═══════════════════════════════════════════════════════════════════════════════

export class ExampleService {
    private readonly users: User[] = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 }
    ]

    private readonly products: Product[] = [
        { id: 'prod-1', name: 'Laptop', price: 999.99, category: 'Electronics' },
        { id: 'prod-2', name: 'Book', price: 29.99, category: 'Education' },
        { id: 'prod-3', name: 'Coffee', price: 4.99, category: 'Food' }
    ]

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🎯 STANDARD LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @log()
    async getUserById(id: number): Promise<User | null> {
        // Simuliere eine asynchrone Datenbankabfrage
        await this.delay(100)
        
        const user = this.users.find(u => u.id === id)
        if (!user) {
            throw new Error(`User with id ${id} not found`)
        }
        
        return user
    }

    @log({
        includeArgs: true,
        includeResult: true,
        includePerformance: true,
        customContext: { operation: 'user-creation' }
    })
    async createUser(name: string, email: string, age: number): Promise<User> {
        await this.delay(150)
        
        const newUser: User = {
            id: this.users.length + 1,
            name,
            email,
            age
        }
        
        this.users.push(newUser)
        return newUser
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔍 DEBUG LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logDebug()
    getAllUsers(): User[] {
        return [...this.users]
    }

    @logDebug()
    async searchUsersByName(searchTerm: string): Promise<User[]> {
        await this.delay(50)
        
        return this.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ PERFORMANCE LOGGING DECORATOR
    // ═══════════════════════════════════════════════════════════════════════════════

    @logPerformance()
    async complexCalculation(iterations: number): Promise<number> {
        let result = 0
        
        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(i) * Math.random()
            
            // Simuliere CPU-intensive Berechnung
            if (i % 1000 === 0) {
                await this.delay(1)
            }
        }
        
        return result
    }

    @logPerformance()
    async batchProcessUsers(batchSize: number): Promise<User[]> {
        const processedUsers: User[] = []
        
        for (let i = 0; i < this.users.length; i += batchSize) {
            const batch = this.users.slice(i, i + batchSize)
            
            // Simuliere Batch-Verarbeitung
            await this.delay(100)
            
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
    async sensitiveOperation(apiKey: string, secretData: string): Promise<boolean> {
        await this.delay(200)
        
        // Simuliere sensitive Operation
        return apiKey.length > 10 && secretData.length > 5
    }

    @logSilent()
    getInternalSystemInfo(): Record<string, unknown> {
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
    async riskyOperation(shouldFail: boolean): Promise<string> {
        await this.delay(100)
        
        if (shouldFail) {
            throw new Error('This operation was designed to fail!')
        }
        
        return 'Operation completed successfully'
    }

    @logErrorsOnly()
    async validateData(data: unknown): Promise<boolean> {
        await this.delay(50)
        
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data provided')
        }
        
        return true
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ HELPER METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    @log({ logStart: false, logSuccess: false })
    getUserCount(): number {
        return this.users.length
    }

    @log({ customPrefix: 'PRODUCT_SERVICE' })
    async getProductById(id: string): Promise<Product | null> {
        await this.delay(75)
        
        return this.products.find(p => p.id === id) || null
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 MAIN DEMO FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

async function runDemo(): Promise<void> {
    logger.info('🚀 Starting Logger Decorator Demo')
    
    const service = new ExampleService()
    
    try {
        // ═══════════════════════════════════════════════════════════════════════════════
        // 📊 STANDARD LOGGING TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('📊 Testing Standard Logging Decorator')
        
        const user1 = await service.getUserById(1)
        logger.info('✅ Retrieved user:', { user: user1 })
        
        const newUser = await service.createUser('David', 'david@example.com', 28)
        logger.info('✅ Created user:', { user: newUser })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🔍 DEBUG LOGGING TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('🔍 Testing Debug Logging Decorator')
        
        const allUsers = service.getAllUsers()
        logger.info('✅ All users count:', { count: allUsers.length })
        
        const searchResults = await service.searchUsersByName('alice')
        logger.info('✅ Search results:', { count: searchResults.length })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // ⚡ PERFORMANCE LOGGING TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('⚡ Testing Performance Logging Decorator')
        
        const calcResult = await service.complexCalculation(10000)
        logger.info('✅ Complex calculation result:', { result: calcResult })
        
        const batchResult = await service.batchProcessUsers(2)
        logger.info('✅ Batch processing result:', { count: batchResult.length })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🔇 SILENT LOGGING TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('🔇 Testing Silent Logging Decorator')
        
        const sensitiveResult = await service.sensitiveOperation('super-secret-key-123', 'sensitive-data')
        logger.info('✅ Sensitive operation result:', { success: sensitiveResult })
        
        const systemInfo = service.getInternalSystemInfo()
        logger.info('✅ System info retrieved:', { keys: Object.keys(systemInfo) })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🚨 ERROR-ONLY LOGGING TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('🚨 Testing Error-Only Logging Decorator')
        
        // Test successful operation (should not log)
        const successResult = await service.riskyOperation(false)
        logger.info('✅ Risky operation success:', { result: successResult })
        
        // Test validation success (should not log)
        const validationResult = await service.validateData({ valid: true })
        logger.info('✅ Validation success:', { result: validationResult })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🔧 CUSTOM CONFIGURATION TESTS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('🔧 Testing Custom Configuration')
        
        const userCount = service.getUserCount()
        logger.info('✅ User count:', { count: userCount })
        
        const product = await service.getProductById('prod-1')
        logger.info('✅ Product retrieved:', { product })
        
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🚨 ERROR SCENARIOS
        // ═══════════════════════════════════════════════════════════════════════════════
        
        logger.info('🚨 Testing Error Scenarios')
        
        // Test user not found error
        try {
            await service.getUserById(999)
        } catch (error) {
            logger.info('✅ Expected error caught:', { error: (error as Error).message })
        }
        
        // Test risky operation failure
        try {
            await service.riskyOperation(true)
        } catch (error) {
            logger.info('✅ Expected risky operation error caught:', { error: (error as Error).message })
        }
        
        // Test validation error
        try {
            await service.validateData(null)
        } catch (error) {
            logger.info('✅ Expected validation error caught:', { error: (error as Error).message })
        }
    } catch (error) {
        logger.error('❌ Demo failed:', { error })
    }
    
    logger.info('🎉 Logger Decorator Demo completed successfully!')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 START THE DEMO
// ═══════════════════════════════════════════════════════════════════════════════

runDemo().catch(error => {
    logger.error('💥 Fatal error in demo:', { error })
    process.exit(1)
}) 