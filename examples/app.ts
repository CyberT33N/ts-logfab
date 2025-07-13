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

import { ReadonlyDeep } from 'type-fest'
import { 
    log, 
    logDebug, 
    logPerformance, 
    logSilent, 
    logErrorsOnly,
    // 🚀 NEW: Enhanced Decorator Variants
    logWithCorrelation,
    logWithSemantics,
    logWithAnomalyDetection,
    logForProduction,
    logForDevelopment,
    logFinancialOperation,
    logUserOperation,
    logOrderOperation,
    logHighPerformance,
    logComprehensive
} from '@/decorators/index.ts'
import { logger } from '@/logger/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 EXAMPLE DATA MODELS
// ═══════════════════════════════════════════════════════════════════════════════

interface IUser {
    id: number
    name: string
    email: string
    age: number
}

interface IProduct {
    id: string
    name: string
    price: number
    category: string
}

interface IOrder {
    id: string
    userId: number
    products: readonly IProduct[]
    total: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    createdAt: Date
}

interface ITransaction {
    id: string
    orderId: string
    amount: number
    currency: 'USD' | 'EUR' | 'GBP'
    type: 'payment' | 'refund' | 'transfer'
    status: 'pending' | 'completed' | 'failed'
    timestamp: Date
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 EXAMPLE SERVICE CLASS WITH ALL DECORATORS
// ═══════════════════════════════════════════════════════════════════════════════

export class ExampleService {
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
        // Simuliere eine asynchrone Datenbankabfrage
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
            
            // Simuliere CPU-intensive Berechnung
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
            
            // Simuliere Batch-Verarbeitung
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
        
        // Simuliere sensitive Operation
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
    // 🛠️ HELPER METHODS (moved to bottom for member ordering)
    // ═══════════════════════════════════════════════════════════════════════════════

    private async _delay(ms: Readonly<number>): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENHANCED SERVICE CLASS WITH NEW DECORATOR VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

export class EnhancedService {
    private readonly _orders: IOrder[] = []
    private readonly _transactions: ITransaction[] = []

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔗 CORRELATION LOGGING DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logWithCorrelation({ 
        workflowId: 'user-authentication', 
        userId: 'demo-user-123' 
    })
    public async authenticateUser(
        username: Readonly<string>, 
        password: Readonly<string>
    ): Promise<boolean> {
        await this._delay(200)
        return username.length > 3 && password.length > 6
    }

    @logWithCorrelation()
    public async trackUserActivity(
        action: Readonly<string>, 
        metadata: Readonly<Record<string, unknown>>
    ): Promise<void> {
        await this._delay(50)
        logger.info(`User activity tracked: ${action}`, metadata)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🎯 SEMANTIC CONTEXT DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logWithSemantics({ 
        domain: 'USER', 
        operation: 'WRITE', 
        businessKey: 'user-profile-update',
        tags: ['profile', 'sensitive'] 
    })
    public async updateUserProfile(userId: Readonly<number>, updates: Readonly<Partial<IUser>>): Promise<IUser> {
        await this._delay(150)
        return { id: userId, name: 'Updated User', email: 'updated@example.com', age: 30, ...updates }
    }

    @logWithSemantics({ 
        domain: 'PRODUCT', 
        operation: 'READ', 
        tags: ['inventory', 'catalog'] 
    })
    public async searchProducts(
        query: Readonly<string>, 
        category?: Readonly<string>
    ): Promise<readonly IProduct[]> {
        await this._delay(100)
        return [
            { 
                id: 'prod-search-1', 
                name: `Found: ${query}`, 
                price: 99.99, 
                category: category ?? 'General' 
            }
        ]
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🚨 ANOMALY DETECTION DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logWithAnomalyDetection({ 
        thresholdMultiplier: 2.0, 
        enableCriticalAlerts: true,
        customMethodKey: 'critical-data-processing'
    })
    public async processCriticalData(data: readonly unknown[]): Promise<number> {
        // Simulate variable performance to trigger anomaly detection
        const processingTime = Math.random() > 0.7 ? 500 : 100
        await this._delay(processingTime)
        
        return data.length * 42
    }

    @logWithAnomalyDetection({ minSamples: 3, thresholdMultiplier: 1.5 })
    public async performanceTestMethod(iterations: Readonly<number>): Promise<string> {
        // Variable performance for anomaly testing
        const randomDelay = Math.floor(Math.random() * 300) + 50
        await this._delay(randomDelay)
        
        const iterationsStr = String(iterations)
        const delayStr = String(randomDelay)
        return `Processed ${iterationsStr} iterations in ${delayStr}ms`
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🌍 ENVIRONMENT-SPECIFIC DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logForProduction()
    public async productionApiCall(
        endpoint: Readonly<string>, payload: Readonly<Record<string, unknown>>
    ): Promise<unknown> {
        await this._delay(200)
        return { status: 'success', endpoint, payloadSize: Object.keys(payload).length }
    }

    @logForDevelopment()
    public async developmentDebugMethod(debugInfo: Readonly<Record<string, unknown>>): Promise<void> {
        await this._delay(100)
        logger.debug('Development debugging info processed', debugInfo)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🏢 DOMAIN-SPECIFIC DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logFinancialOperation({ 
        operation: 'WRITE', 
        businessKey: 'payment-processing',
        userId: 'financial-user-789'
    })
    public async processPayment(
        amount: Readonly<number>, 
        currency: Readonly<'USD' | 'EUR' | 'GBP'>
    ): Promise<ITransaction> {
        await this._delay(300) // Financial operations are typically slower
        
        const timestamp = Date.now()
        const timestampStr = String(timestamp)
        const transaction: ITransaction = {
            id: `txn-${timestampStr}`,
            orderId: `order-${timestampStr}`,
            amount,
            currency,
            type: 'payment',
            status: 'completed',
            timestamp: new Date()
        }
        
        this._transactions.push(transaction)
        return transaction
    }

    @logUserOperation({ 
        operation: 'UPDATE', 
        userId: 'user-456',
        includeUserData: false // Privacy protection
    })
    public async updateUserPreferences(
        userId: Readonly<number>, preferences: Readonly<Record<string, unknown>>
    ): Promise<boolean> {
        await this._delay(120)
        return Object.keys(preferences).length > 0
    }

    @logOrderOperation({ 
        operation: 'WRITE', 
        orderId: 'order-123',
        userId: 'customer-789'
    })
    public async createOrder(userId: Readonly<number>, products: ReadonlyDeep<IProduct[]>): Promise<IOrder> {
        await this._delay(250)
        
        const total = products.reduce((sum, p) => sum + p.price, 0)
        const order: IOrder = {
            id: `order-${String(Date.now())}`,
            userId,
            products,
            total,
            status: 'pending',
            createdAt: new Date()
        }
        
        this._orders.push(order)
        return order
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ PERFORMANCE-CRITICAL DECORATORS
    // ═══════════════════════════════════════════════════════════════════════════════

    @logHighPerformance()
    public highFrequencyOperation(data: readonly number[]): number {
        // Minimal logging for performance-critical code
        return data.reduce((sum, n) => sum + n, 0)
    }

    @logComprehensive({ 
        domain: 'SYSTEM', 
        operation: 'COMPUTE',
        businessKey: 'comprehensive-analysis'
    })
    public async comprehensiveAnalysis(input: Readonly<Record<string, unknown>>): Promise<Record<string, unknown>> {
        await this._delay(180)
        
        return {
            inputKeys: Object.keys(input),
            analysisTimestamp: new Date().toISOString(),
            processingMetrics: {
                complexity: 'HIGH',
                confidence: 0.95,
                recommendations: ['optimize', 'monitor', 'scale']
            }
        }
    }


    // ═══════════════════════════════════════════════════════════════════════════════
    // 📊 GETTER METHODS FOR DEMO
    // ═══════════════════════════════════════════════════════════════════════════════

    public getOrderCount(): number {
        return this._orders.length
    }

    public getTransactionCount(): number {
        return this._transactions.length
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ HELPER METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    private async _delay(ms: Readonly<number>): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
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
    } catch (error: unknown) {
        logger.error('❌ Demo failed:', { error })
    }
    
    logger.info('🎉 Logger Decorator Demo completed successfully!')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 START THE DEMO
// ═══════════════════════════════════════════════════════════════════════════════

runDemo().catch((error: unknown) => {
    logger.error('💥 Fatal error in demo:', { error })
    process.exit(1)
}) 