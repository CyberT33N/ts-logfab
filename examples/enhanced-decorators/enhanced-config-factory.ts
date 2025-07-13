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
██              🎯 ENHANCED DECORATOR CONFIGURATION FACTORY                  ██
██                    ENTERPRISE-GRADE CONFIGURATION MANAGEMENT             ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR CONFIGURATION FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep, WritableDeep } from 'type-fest'
import env from '@/env.ts'
import {
    createEnhancedConfig,
    debugLog,
    errorLog,
    getEnhancedLoggingStatus,
    log,
    performanceLog,
    type IEnhancedDecoratorConfig
} from '@/logger/decorators/index.ts'
import { logger } from '@/logger/index.ts'
import { createProducts, createUsers, type IProduct, type IUser } from '../core/models.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 ENTERPRISE CONFIG FACTORY PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🚀 **Development Configuration**
 *
 * Optimized for development environments with maximum visibility
 */
export function createDevelopmentConfig(): IEnhancedDecoratorConfig {
    return createEnhancedConfig({
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        enableSemanticAnalysis: true,
        enableCorrelationTracking: true,
        enableAutoFormatSwitching: true,
        logLevel: 'debug',
        includeStackTrace: true,
        includeArguments: true,
        includeResult: true,
        maxArgumentsLength: 500
    })
}

/**
 * 🏭 **Production Configuration**
 *
 * Optimized for production environments with performance focus
 */
export function createProductionConfig(): IEnhancedDecoratorConfig {
    return createEnhancedConfig({
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        enableSemanticAnalysis: false, // Disabled for performance
        enableCorrelationTracking: true,
        enableAutoFormatSwitching: true,
        logLevel: 'info',
        includeStackTrace: false,
        includeArguments: false,
        includeResult: false,
        maxArgumentsLength: 100
    })
}

/**
 * 🔍 **Debug Configuration**
 *
 * Maximum verbosity for debugging scenarios
 */
export function createDebugConfig(): IEnhancedDecoratorConfig {
    return createEnhancedConfig({
        enablePerformanceTracking: true,
        enableAnomalyDetection: true,
        enableSemanticAnalysis: true,
        enableCorrelationTracking: true,
        enableAutoFormatSwitching: true,
        logLevel: 'debug',
        includeStackTrace: true,
        includeArguments: true,
        includeResult: true,
        maxArgumentsLength: 1000
    })
}

/**
 * ⚡ **Performance Configuration**
 *
 * Minimal logging for performance-critical operations
 */
export function createPerformanceConfig(): IEnhancedDecoratorConfig {
    return createEnhancedConfig({
        enablePerformanceTracking: true,
        enableAnomalyDetection: false,
        enableSemanticAnalysis: false,
        enableCorrelationTracking: false,
        enableAutoFormatSwitching: false,
        logLevel: 'warn',
        includeStackTrace: false,
        includeArguments: false,
        includeResult: false,
        maxArgumentsLength: 50
    })
}

/**
 * 🧪 **Testing Configuration**
 *
 * Specialized for testing environments
 */
export function createTestingConfig(): IEnhancedDecoratorConfig {
    return createEnhancedConfig({
        enablePerformanceTracking: false,
        enableAnomalyDetection: false,
        enableSemanticAnalysis: false,
        enableCorrelationTracking: true,
        enableAutoFormatSwitching: true,
        logLevel: 'error',
        includeStackTrace: true,
        includeArguments: true,
        includeResult: true,
        maxArgumentsLength: 200
    })
}

/**
 * 🎯 **Custom Configuration Builder**
 *
 * Fluent API for building custom configurations
 */
export function createCustomConfig(): ConfigBuilder {
    return new ConfigBuilder()
}

/**
 * 🎯 **Configuration Builder Pattern**
 *
 * Fluent API for creating custom enhanced decorator configurations
 */
export class ConfigBuilder {
    private readonly _config: WritableDeep<Partial<IEnhancedDecoratorConfig>> = {}

    public enablePerformanceTracking(enabled = true): this {
        this._config.enablePerformanceTracking = enabled
        return this
    }

    public enableAnomalyDetection(enabled = true): this {
        this._config.enableAnomalyDetection = enabled
        return this
    }

    public enableSemanticAnalysis(enabled = true): this {
        this._config.enableSemanticAnalysis = enabled
        return this
    }

    public enableCorrelationTracking(enabled = true): this {
        this._config.enableCorrelationTracking = enabled
        return this
    }

    public enableAutoFormatSwitching(enabled = true): this {
        this._config.enableAutoFormatSwitching = enabled
        return this
    }

    public setLogLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'error'): this {
        this._config.logLevel = level
        return this
    }

    public includeStackTrace(enabled = true): this {
        this._config.includeStackTrace = enabled
        return this
    }

    public includeArguments(enabled = true): this {
        this._config.includeArguments = enabled
        return this
    }

    public includeResult(enabled = true): this {
        this._config.includeResult = enabled
        return this
    }

    public setMaxArgumentsLength(length: number): this {
        this._config.maxArgumentsLength = length
        return this
    }

    public build(): IEnhancedDecoratorConfig {
        return createEnhancedConfig(this._config)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE SERVICE WITH CONFIGURATION PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏢 **Enterprise Configuration Service**
 *
 * Demonstrates all configuration patterns and factory usage
 */
export class EnterpriseConfigService {
    [key: string]: unknown
    private readonly _users: IUser[] = createUsers(10)
    private readonly _products: IProduct[] = createProducts(15)

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🚀 DEVELOPMENT ENVIRONMENT METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

	@log(createDevelopmentConfig())
    public async developmentMethod(
        data: ReadonlyDeep<readonly unknown[]>,
        options: ReadonlyDeep<{ verbose: boolean; traceId: string }>
    ): Promise<{ processed: number; timestamp: Date }> {
        await this._delay(150)

        logger.info('Development method executed', { options })

        return {
            processed: data.length,
            timestamp: new Date()
        }
    }

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🏭 PRODUCTION ENVIRONMENT METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@log(createProductionConfig())
	public async productionMethod(userId: number): Promise<IUser | null> {
	    await this._delay(100)

	    return this._users.find(user => user.id === userId) ?? null
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🔍 DEBUG ENVIRONMENT METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@debugLog(createDebugConfig())
	public async debugMethod(
	    input: ReadonlyDeep<{ query: string; filters: Record<string, unknown> }>
	): Promise<{ results: IProduct[]; metadata: Record<string, unknown> }> {
	    await this._delay(200)

	    const results = this._products.filter(product =>
	        product.name.toLowerCase().includes(input.query.toLowerCase())
	    )

	    return {
	        results,
	        metadata: {
	            totalProducts: this._products.length,
	            matchedProducts: results.length,
	            searchQuery: input.query,
	            appliedFilters: Object.keys(input.filters)
	        }
	    }
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// ⚡ PERFORMANCE-CRITICAL METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@performanceLog(createPerformanceConfig())
	public performanceCriticalMethod(data: readonly number[]): number {
	    // High-performance operation with minimal logging
	    return data.reduce((sum, num) => sum + num, 0)
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🧪 TESTING ENVIRONMENT METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@errorLog(createTestingConfig())
	public async testingMethod(shouldFail: boolean): Promise<string> {
	    await this._delay(50)

	    if (shouldFail) {
	        throw new Error('Testing error scenario')
	    }

	    return 'Testing successful'
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🎯 CUSTOM CONFIGURATION METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@log(
	    createCustomConfig()
	        .enablePerformanceTracking(true)
	        .enableAnomalyDetection(true)
	        .enableSemanticAnalysis(false)
	        .enableCorrelationTracking(true)
	        .setLogLevel('info')
	        .includeArguments(true)
	        .includeResult(false)
	        .setMaxArgumentsLength(300)
	        .build()
	)
	public async customConfigMethod(
	    request: ReadonlyDeep<{ id: string; payload: Record<string, unknown> }>
	): Promise<{ success: boolean; id: string; timestamp: Date }> {
	    await this._delay(120)

	    return {
	        success: true,
	        id: request.id,
	        timestamp: new Date()
	    }
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🎚️ RUNTIME CONFIGURATION METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	@log(((): IEnhancedDecoratorConfig => {
	    const isDev = env.NODE_ENV === 'development'
	    return isDev ? createDevelopmentConfig() : createProductionConfig()
	})())
	public async adaptiveConfigMethod(data: readonly string[]): Promise<string[]> {
	    await this._delay(80)

	    return data.map(item => item.toUpperCase())
	}

	// ═══════════════════════════════════════════════════════════════════════════════
	// 🛠️ UTILITY METHODS
	// ═══════════════════════════════════════════════════════════════════════════════

	public getServiceStatistics(): {
		totalUsers: number
		totalProducts: number
		enhancedLoggingStatus: ReturnType<typeof getEnhancedLoggingStatus>
		} {
	    return {
	        totalUsers: this._users.length,
	        totalProducts: this._products.length,
	        enhancedLoggingStatus: getEnhancedLoggingStatus()
	    }
	}

	private async _delay(ms: number): Promise<void> {
	    return new Promise(resolve => setTimeout(resolve, ms))
	}
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DEMONSTRATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Config Factory Demo**
 *
 * Demonstrates all configuration patterns and factory usage
 */
export async function runEnhancedConfigDemo(): Promise<void> {
    logger.info('🎯 Starting Enhanced Config Factory Demo')

    const service = new EnterpriseConfigService()

    try {
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🚀 DEVELOPMENT CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🚀 Testing Development Configuration')
        const devResult = await service.developmentMethod([1, 2, 3, 4, 5], {
            verbose: true,
            traceId: 'dev-trace-12345'
        })
        logger.info('✅ Development result:', devResult)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🏭 PRODUCTION CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🏭 Testing Production Configuration')
        const prodResult = await service.productionMethod(1)
        logger.info('✅ Production result:', { found: Boolean(prodResult) })

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🔍 DEBUG CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🔍 Testing Debug Configuration')
        const debugResult = await service.debugMethod({
            query: 'laptop',
            filters: { category: 'Electronics', maxPrice: 1000 }
        })
        logger.info('✅ Debug result:', {
            foundItems: debugResult.results.length,
            metadata: debugResult.metadata
        })

        // ═══════════════════════════════════════════════════════════════════════════════
        // ⚡ PERFORMANCE CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('⚡ Testing Performance Configuration')
        const perfResult = service.performanceCriticalMethod([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        logger.info('✅ Performance result:', { sum: perfResult })

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🧪 TESTING CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🧪 Testing Configuration (Success)')
        const testSuccessResult = await service.testingMethod(false)
        logger.info('✅ Test success result:', { result: testSuccessResult })

        logger.info('🧪 Testing Configuration (Error)')
        try {
            await service.testingMethod(true)
        } catch (error) {
            logger.info('✅ Test error captured:', { error: (error as Error).message })
        }

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎯 CUSTOM CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎯 Testing Custom Configuration')
        const customResult = await service.customConfigMethod({
            id: 'custom-12345',
            payload: { type: 'demo', timestamp: Date.now() }
        })
        logger.info('✅ Custom result:', customResult)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎚️ ADAPTIVE CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎚️ Testing Adaptive Configuration')
        const adaptiveResult = await service.adaptiveConfigMethod(['hello', 'world', 'enhanced', 'logging'])
        logger.info('✅ Adaptive result:', { transformed: adaptiveResult })

        // ═══════════════════════════════════════════════════════════════════════════════
        // 📊 SERVICE STATISTICS
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('📊 Service Statistics')
        const stats = service.getServiceStatistics()
        logger.info('✅ Final statistics:', stats)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎯 CONFIGURATION COMPARISON
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎯 Configuration Comparison')
        const configs = {
            development: createDevelopmentConfig(),
            production: createProductionConfig(),
            debug: createDebugConfig(),
            performance: createPerformanceConfig(),
            testing: createTestingConfig()
        }

        logger.info('✅ Configuration comparison:', {
            development: {
                logLevel: configs.development.logLevel,
                performanceTracking: configs.development.enablePerformanceTracking,
                arguments: configs.development.includeArguments
            },
            production: {
                logLevel: configs.production.logLevel,
                performanceTracking: configs.production.enablePerformanceTracking,
                arguments: configs.production.includeArguments
            },
            debug: {
                logLevel: configs.debug.logLevel,
                performanceTracking: configs.debug.enablePerformanceTracking,
                arguments: configs.debug.includeArguments
            },
            performance: {
                logLevel: configs.performance.logLevel,
                performanceTracking: configs.performance.enablePerformanceTracking,
                arguments: configs.performance.includeArguments
            },
            testing: {
                logLevel: configs.testing.logLevel,
                performanceTracking: configs.testing.enablePerformanceTracking,
                arguments: configs.testing.includeArguments
            }
        })
    } catch (error: unknown) {
        logger.error('❌ Enhanced Config Demo failed:', { error })
    }

    logger.info('🎉 Enhanced Config Factory Demo completed!')
} 