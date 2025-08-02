/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 BASE SERVICE CLASS WITH ORIGINAL DECORATORS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

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
 * @remarks
 * Comprehensive demonstration service showcasing all five original decorator variants
 * from the main logging implementation. Each decorator type is tested with multiple
 * methods to illustrate different configuration options, error scenarios, and use cases.
 *
 * 🏷️ **Decorator Categories Demonstrated:**
 * - **@log()**: Standard logging with configurable options
 * - **@logDebug()**: Debug-level logging for development scenarios
 * - **@logPerformance()**: Performance monitoring and timing
 * - **@logSilent()**: Silent execution for sensitive operations
 * - **@logErrorsOnly()**: Error-focused logging for production monitoring
 *
 * 🔧 **Configuration Testing:**
 * - Custom prefixes and context data
 * - Selective start/success logging control
 * - Advanced parameter and result inclusion options
 *
 * @example
 * Basic service usage with decorator demonstrations:
 * ```typescript
 * const service = new BaseService();
 *
 * // Standard logging demo
 * const user = await service.getUserById(1);
 *
 * // Performance logging demo
 * const result = await service.complexCalculation(10000);
 *
 * // Error handling demo
 * try {
 *   await service.riskyOperation(true);
 * } catch (error) {
 *   console.log('Expected error caught');
 * }
 * ```
 *
 * @see {@link runBaseServiceDemo} for complete demonstration workflow
 * @see {@link log} for standard logging decorator documentation
 * @see {@link logPerformance} for performance monitoring decorator
 */
export class BaseService {
    private readonly _users: IUser[] = [
        {
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            age: 25
        },
        {
            id: 2,
            name: 'Bob',
            email: 'bob@example.com',
            age: 30
        },
        {
            id: 3,
            name: 'Charlie',
            email: 'charlie@example.com',
            age: 35
        }
    ]

    private readonly _products: IProduct[] = [
        {
            id: 'prod-1',
            name: 'Laptop',
            price: 999.99,
            category: 'Electronics'
        },
        {
            id: 'prod-2',
            name: 'Book',
            price: 29.99,
            category: 'Education'
        },
        {
            id: 'prod-3',
            name: 'Coffee',
            price: 4.99,
            category: 'Food'
        }
    ]

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🎯 STANDARD LOGGING DECORATOR
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 🔍 Retrieves a user by their unique identifier with standard @log() decorator.
     *
     * @remarks
     * Demonstrates basic @log() decorator functionality with error handling.
     * Includes artificial delay to simulate real-world database operations
     * and showcases error logging when user is not found.
     *
     * @param id - The unique identifier of the user to retrieve
     * @returns Promise resolving to the user object if found
     *
     * @throws {Error} When no user exists with the specified ID
     *
     * @see {@link createUser} for user creation with advanced logging options
     */
    @log()
    public async getUserById(
        id: Readonly<number>
    ): Promise<IUser | null> {
        await this._delay(
            100
        )

        const user = this._users.find(
            (
                u: Readonly<IUser>
            ) => u.id === id
        )

        if (!user) {
            throw new Error(
                `User with id ${String(
                    id
                )} not found`
            )
        }

        return user
    }

    /**
     * 👤 Creates a new user with comprehensive @log() decorator configuration.
     *
     * @remarks
     * Demonstrates advanced @log() decorator options including argument logging,
     * result logging, performance tracking, and custom context data. Showcases
     * how to configure the decorator for maximum observability in user creation operations.
     *
     * @param name - The full name of the new user
     * @param email - The email address for the new user
     * @param age - The age of the new user in years
     * @returns Promise resolving to the newly created user object
     *
     * @see {@link IUser} for the user data structure
     */
    @log(
        {
            includeArgs: true,
            includeResult: true,
            includePerformance: true,
            customContext: { operation: 'user-creation' }
        }
    )
    public async createUser(
        name: Readonly<string>, email: Readonly<string>, age: Readonly<number>
    ): Promise<IUser> {
        await this._delay(
            150
        )

        const newUser: IUser = {
            id: this._users.length + 1,
            name,
            email,
            age
        }

        this._users.push(
            newUser
        )

        return newUser
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🔍 DEBUG LOGGING DECORATOR
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 📋 Returns all users from the internal collection using @logDebug() decorator.
     *
     * @remarks
     * Demonstrates @logDebug() decorator for development-time logging scenarios.
     * Returns a shallow copy to prevent external modification of internal data
     * while providing debug-level observability.
     *
     * @returns Array containing all user objects in the system
     *
     * @see {@link getUsersData} for readonly access to user data
     */
    @logDebug()
    public getAllUsers(): IUser[] {
        return [...this._users]
    }

    /**
     * 🔎 Searches users by name using case-insensitive matching with @logDebug() decorator.
     *
     * @remarks
     * Illustrates @logDebug() decorator usage for search operations with filtering logic.
     * Performs case-insensitive partial matching against user names with simulated
     * database query delay for realistic performance characteristics.
     *
     * @param searchTerm - The search term to match against user names
     * @returns Promise resolving to array of users matching the search criteria
     *
     * @see {@link getAllUsers} for retrieving all users without filtering
     */
    @logDebug()
    public async searchUsersByName(
        searchTerm: Readonly<string>
    ): Promise<IUser[]> {
        await this._delay(
            50
        )

        return this._users.filter(
            (
                user: Readonly<IUser>
            ) => user.name.toLowerCase().includes(
                searchTerm.toLowerCase()
            )
        )
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * ⚡ PERFORMANCE LOGGING DECORATOR
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 🧮 Performs intensive mathematical calculations for @logPerformance() demonstration.
     *
     * @remarks
     * Showcases @logPerformance() decorator capabilities for monitoring resource-intensive
     * operations. Combines mathematical computation with randomization and periodic delays
     * to simulate real-world CPU-intensive tasks with I/O interruptions.
     *
     * ⚡ **Performance Characteristics:**
     * - CPU-intensive mathematical operations
     * - Periodic I/O simulation through delays
     * - Scalable iteration count for load testing
     * - Memory-efficient single-pass computation
     *
     * @param iterations - Number of mathematical iterations to perform
     * @returns Promise resolving to the computed numerical result
     *
     * @example
     * Performance testing with different iteration counts:
     * ```typescript
     * // Light load test
     * const result1 = await service.complexCalculation(1000);
     *
     * // Heavy load test
     * const result2 = await service.complexCalculation(100000);
     *
     * // Performance comparison
     * console.log('Results:', { light: result1, heavy: result2 });
     * ```
     *
     * @see {@link batchProcessUsers} for batch processing performance monitoring
     */
    @logPerformance()
    public async complexCalculation(
        iterations: Readonly<number>
    ): Promise<number> {
        let result = 0

        for (let i = 0; i < iterations; i++) {
            result += Math.sqrt(
                i
            ) * Math.random()

            if (i % 1000 === 0) {
                await this._delay(
                    1
                )
            }
        }

        return result
    }

    /**
     * 📦 Processes users in configurable batches with @logPerformance() monitoring.
     *
     * @remarks
     * Demonstrates @logPerformance() decorator for batch processing scenarios.
     * Transforms user data by normalizing email addresses while maintaining
     * efficient memory usage through batch-based processing patterns.
     *
     * 🔄 **Batch Processing Features:**
     * - Configurable batch size for memory optimization
     * - Email normalization for data consistency
     * - Simulated processing delays for realistic timing
     * - Immutable data transformation patterns
     *
     * @param batchSize - Number of users to process in each batch iteration
     * @returns Promise resolving to array of processed users with normalized emails
     *
     * @see {@link getAllUsers} for retrieving source user data
     */
    @logPerformance()
    public async batchProcessUsers(
        batchSize: Readonly<number>
    ): Promise<IUser[]> {
        const processedUsers: IUser[] = []

        for (let i = 0; i < this._users.length; i += batchSize) {
            const batch = this._users.slice(
                i, i + batchSize
            )

            await this._delay(
                100
            )

            for (const user of batch) {
                processedUsers.push(
                    {
                        ...user,
                        email: user.email.toLowerCase()
                    }
                )
            }
        }

        return processedUsers
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🔇 SILENT LOGGING DECORATOR
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 🔐 Performs sensitive operations with @logSilent() decorator for security.
     *
     * @remarks
     * Illustrates @logSilent() decorator usage for operations involving sensitive
     * data where standard logging would be inappropriate. Validates security
     * credentials without exposing them in log outputs while maintaining
     * basic operational monitoring.
     *
     * @param apiKey - The API key for authentication validation
     * @param secretData - Sensitive data requiring secure processing
     * @returns Promise resolving to validation success status
     *
     * @see {@link getInternalSystemInfo} for other silent operations
     */
    @logSilent()
    public async sensitiveOperation(
        apiKey: Readonly<string>, secretData: Readonly<string>
    ): Promise<boolean> {
        await this._delay(
            200
        )

        return apiKey.length > 10 && secretData.length > 5
    }

    /**
     * 📊 Retrieves internal system information using @logSilent() decorator.
     *
     * @remarks
     * Demonstrates @logSilent() decorator for system information gathering
     * that should not generate standard log output. Collects Node.js runtime
     * metrics for internal monitoring without verbose logging.
     *
     * @returns Object containing system uptime, memory usage, and Node.js version
     *
     * @see {@link sensitiveOperation} for other silent security operations
     */
    @logSilent()
    public getInternalSystemInfo(): Record<string, unknown> {
        return {
            systemUptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            nodeVersion: process.version
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🚨 ERROR-ONLY LOGGING DECORATOR
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * ⚠️ Performs controlled failure testing with @logErrorsOnly() decorator.
     *
     * @remarks
     * Showcases @logErrorsOnly() decorator for production monitoring scenarios
     * where only failures should generate log entries. Provides controllable
     * error conditions for testing error handling and logging behavior.
     *
     * 🧪 **Testing Features:**
     * - Controllable success/failure modes
     * - Predictable error conditions for testing
     * - Production-ready error monitoring patterns
     * - Clean success path without log noise
     *
     * @param shouldFail - Whether the operation should intentionally fail
     * @returns Promise resolving to success message when operation succeeds
     *
     * @throws {Error} When shouldFail is true, demonstrating error-only logging
     *
     * @example
     * Testing both success and failure scenarios:
     * ```typescript
     * // Success scenario (no logs generated)
     * const success = await service.riskyOperation(false);
     *
     * // Failure scenario (error logged)
     * try {
     *   await service.riskyOperation(true);
     * } catch (error) {
     *   console.log('Error was logged by decorator');
     * }
     * ```
     *
     * @see {@link validateData} for validation-specific error-only logging
     */
    @logErrorsOnly()
    public async riskyOperation(
        shouldFail: Readonly<boolean>
    ): Promise<string> {
        await this._delay(
            100
        )

        if (shouldFail) {
            throw new Error(
                'This operation was designed to fail!'
            )
        }

        return 'Operation completed successfully'
    }

    /**
     * ✅ Validates data integrity with @logErrorsOnly() decorator monitoring.
     *
     * @remarks
     * Demonstrates @logErrorsOnly() decorator for validation scenarios where
     * only validation failures should be logged. Performs basic data type
     * and structure validation with comprehensive error reporting for invalid inputs.
     *
     * @param data - The data object to validate for basic structure requirements
     * @returns Promise resolving to true when validation passes
     *
     * @throws {Error} When data is null, undefined, or not an object type
     *
     * @see {@link riskyOperation} for other error-only logging scenarios
     */
    @logErrorsOnly()
    public async validateData(
        data: unknown
    ): Promise<boolean> {
        await this._delay(
            50
        )

        if (data === null || data === undefined || typeof data !== 'object') {
            throw new Error(
                'Invalid data provided'
            )
        }

        return true
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🔧 CUSTOM CONFIGURATION TESTS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 🔢 Returns user count with customized @log() decorator configuration.
     *
     * @remarks
     * Illustrates @log() decorator with selective logging options disabled.
     * Demonstrates how to suppress start and success logging while maintaining
     * error logging and other monitoring capabilities.
     *
     * @returns The total number of users currently in the system
     *
     * @see {@link getAllUsers} for retrieving actual user data
     */
    @log(
        {
            logStart: false,
            logSuccess: false
        }
    )
    public getUserCount(): number {
        return this._users.length
    }

    /**
     * 🛍️ Retrieves product by ID with custom @log() decorator prefix.
     *
     * @remarks
     * Demonstrates @log() decorator with custom prefix configuration for
     * service-specific log identification. Helps distinguish product service
     * operations from other service operations in combined log outputs.
     *
     * @param id - The unique identifier of the product to retrieve
     * @returns Promise resolving to the product object if found, null otherwise
     *
     * @see {@link getProductsData} for accessing all product data
     */
    @log(
        { customPrefix: 'PRODUCT_SERVICE' }
    )
    public async getProductById(
        id: Readonly<string>
    ): Promise<IProduct | null> {
        await this._delay(
            75
        )

        return this._products.find(
            (
                p: Readonly<IProduct>
            ) => p.id === id
        ) ?? null
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🛠️ HELPER METHODS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    /**
     * 📋 Provides readonly access to the internal user data collection.
     *
     * @remarks
     * Returns the complete user dataset as a readonly array to prevent external
     * modifications while allowing data inspection for testing and demonstration purposes.
     *
     * @returns Readonly array of all user objects in the system
     *
     * @see {@link getAllUsers} for a mutable copy of user data
     */
    public getUsersData(): readonly IUser[] {
        return this._users
    }

    /**
     * 🛒 Provides readonly access to the internal product data collection.
     *
     * @remarks
     * Returns the complete product dataset as a readonly array to prevent external
     * modifications while enabling data inspection for testing and demonstration workflows.
     *
     * @returns Readonly array of all product objects in the system
     *
     * @see {@link getProductById} for retrieving specific products
     */
    public getProductsData(): readonly IProduct[] {
        return this._products
    }

    /**
     * ⏱️ Private utility method for simulating asynchronous delays.
     *
     * @remarks
     * Internal helper for creating realistic timing delays in demonstration methods.
     * Simulates database operations, network requests, and other I/O-bound operations
     * to provide meaningful performance metrics in decorator demonstrations.
     *
     * @param ms - The delay duration in milliseconds
     * @returns Promise that resolves after the specified delay
     */
    private async _delay(
        ms: Readonly<number>
    ): Promise<void> {
        await new Promise(
            resolve => setTimeout(
                resolve, ms
            )
        )
    }
}

/**
 * 🎯 **Demo Function for Base Service**
 *
 * @remarks
 * Comprehensive demonstration function that exercises all decorator variants
 * and configuration options provided by the BaseService class. Includes both
 * success and error scenarios to showcase complete logging behavior across
 * different decorator types and operational contexts.
 *
 * 🎪 **Demonstration Coverage:**
 * - Standard logging with various configurations
 * - Debug logging for development scenarios
 * - Performance monitoring for resource-intensive operations
 * - Silent operations for security-sensitive tasks
 * - Error-only logging for production monitoring
 * - Custom configuration testing and validation
 *
 * 🧪 **Test Scenarios:**
 * - Successful operations across all decorator types
 * - Error handling and exception scenarios
 * - Performance testing with different load levels
 * - Security operation validation
 * - Custom logging configuration verification
 *
 * @returns Promise that resolves when all demonstration scenarios complete
 *
 * @throws {Error} Only if unexpected errors occur during demonstration execution
 *
 * @example
 * Running the complete base service demonstration:
 * ```typescript
 * // Execute all decorator demonstrations
 * await runBaseServiceDemo();
 *
 * // Console output will show various logging patterns
 * // based on decorator configurations and operations
 * ```
 *
 * @see {@link BaseService} for the service class being demonstrated
 * @see {@link logger} for the underlying logging implementation
 */
export async function runBaseServiceDemo(): Promise<void> {
    logger.info(
        '🚀 Starting Base Service Demo (Original Decorators)'
    )

    const service = new BaseService()

    try {
        // Standard logging tests
        logger.info(
            '📊 Testing Standard Logging Decorator'
        )
        const user1 = await service.getUserById(
            1
        )

        logger.info(
            '✅ Retrieved user:', { user: user1 }
        )

        const newUser = await service.createUser(
            'David', 'david@example.com', 28
        )

        logger.info(
            '✅ Created user:', { user: newUser }
        )

        // Debug logging tests
        logger.info(
            '🔍 Testing Debug Logging Decorator'
        )
        const allUsers = service.getAllUsers()

        logger.info(
            '✅ All users count:', { count: allUsers.length }
        )

        const searchResults = await service.searchUsersByName(
            'alice'
        )

        logger.info(
            '✅ Search results:', { count: searchResults.length }
        )

        // Performance logging tests
        logger.info(
            '⚡ Testing Performance Logging Decorator'
        )
        const calcResult = await service.complexCalculation(
            10000
        )

        logger.info(
            '✅ Complex calculation result:', { result: calcResult }
        )

        const batchResult = await service.batchProcessUsers(
            2
        )

        logger.info(
            '✅ Batch processing result:', { count: batchResult.length }
        )

        // Silent logging tests
        logger.info(
            '🔇 Testing Silent Logging Decorator'
        )
        const sensitiveResult = await service.sensitiveOperation(
            'super-secret-key-123', 'sensitive-data'
        )

        logger.info(
            '✅ Sensitive operation result:', { success: sensitiveResult }
        )

        const systemInfo = service.getInternalSystemInfo()

        logger.info(
            '✅ System info retrieved:', {
                keys: Object.keys(
                    systemInfo
                )
            }
        )

        // Error-only logging tests
        logger.info(
            '🚨 Testing Error-Only Logging Decorator'
        )
        const successResult = await service.riskyOperation(
            false
        )

        logger.info(
            '✅ Risky operation success:', { result: successResult }
        )

        const validationResult = await service.validateData(
            { valid: true }
        )

        logger.info(
            '✅ Validation success:', { result: validationResult }
        )

        // Custom configuration tests
        logger.info(
            '🔧 Testing Custom Configuration'
        )
        const userCount = service.getUserCount()

        logger.info(
            '✅ User count:', { count: userCount }
        )

        const product = await service.getProductById(
            'prod-1'
        )

        logger.info(
            '✅ Product retrieved:', { product }
        )

        // Error scenarios
        logger.info(
            '🚨 Testing Error Scenarios'
        )

        try {
            await service.getUserById(
                999
            )
        }
        catch (error) {
            logger.info(
                '✅ Expected error caught:', { error: (error as Error).message }
            )
        }

        try {
            await service.riskyOperation(
                true
            )
        }
        catch (error) {
            logger.info(
                '✅ Expected risky operation error caught:', { error: (error as Error).message }
            )
        }

        try {
            await service.validateData(
                null
            )
        }
        catch (error) {
            logger.info(
                '✅ Expected validation error caught:', { error: (error as Error).message }
            )
        }
    }
    catch (error: unknown) {
        logger.error(
            '❌ Base Service Demo failed:', { error }
        )
    }

    logger.info(
        '🎉 Base Service Demo completed successfully!'
    )
}
