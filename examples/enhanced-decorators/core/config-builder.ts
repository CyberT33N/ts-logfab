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
██              🎯 ENHANCED DECORATOR CONFIGURATION BUILDER                  ██
██                    FLUENT API FOR CUSTOM CONFIGURATIONS                   ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR CONFIGURATION BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

import type { WritableDeep } from 'type-fest'
import {
    DEFAULT_LOG_CONFIG,
    type ILogDecoratorConfig
} from '@/logger/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION BUILDER PATTERN
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Configuration Builder Pattern**
 *
 * Fluent API for creating custom enhanced decorator configurations
 * 
 * @remarks
 * Implements the Builder design pattern to provide a fluent, chainable API
 * for constructing enhanced decorator configurations. Enables progressive
 * configuration building with method chaining while maintaining immutability
 * of the final configuration object and providing type safety throughout
 * the construction process.
 * 
 * 🏗️ **Builder Pattern Benefits:**
 * - Fluent, readable configuration syntax through method chaining
 * - Progressive configuration building with immediate validation
 * - Type-safe parameter handling with compile-time checks
 * - Flexible configuration options without complex constructors
 * - Immutable final configuration with mutable intermediate state
 * 
 * 🔧 **Configuration Categories:**
 * - **Feature Toggles**: Enable/disable advanced logging features
 * - **Logging Levels**: Control verbosity and output filtering
 * - **Content Options**: Configure what information to include
 * - **Performance Settings**: Optimize for speed vs. detail trade-offs
 * 
 * 🎯 **Builder Workflow:**
 * 1. Create builder instance via factory or constructor
 * 2. Chain configuration methods to set desired options
 * 3. Call build() to create immutable configuration object
 * 4. Use configuration with enhanced decorators
 * 
 * @example
 * Creating a custom configuration with fluent API:
 * ```typescript
 * const config = new ConfigBuilder()
 *   .enablePerformanceTracking(true)
 *   .enableAnomalyDetection(false)
 *   .setLogLevel('info')
 *   .includeArguments(true)
 *   .setMaxArgumentsLength(300)
 *   .build();
 * 
 * // Use with enhanced decorators
 * class MyService {
 *   @enhancedLog(config)
 *   async processData(data: any) {
 *     // Method automatically logged with custom configuration
 *   }
 * }
 * ```
 * 
 * @see {@link createCustomConfig} for factory-based builder creation
 * @see {@link ILogDecoratorConfig} for configuration structure details
 * @see {@link DEFAULT_LOG_CONFIG} for direct configuration creation
 */
export class ConfigBuilder {
    private readonly _config: WritableDeep<Partial<ILogDecoratorConfig>> = {}

    /**
     * 🚀 **Enable Performance Tracking**
     * 
     * Activates comprehensive performance monitoring and timing analysis for
     * decorated methods including execution time measurement, memory usage tracking,
     * and performance anomaly detection capabilities.
     * 
     * @param enabled - Whether to enable performance tracking (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withPerformanceTracking(enabled: boolean = true): ConfigBuilder {
        this._config.includePerformance = enabled
        return this
    }

    /**
     * 🚨 **Enable Anomaly Detection**
     * 
     * Activates intelligent anomaly detection for method execution patterns,
     * performance metrics, and behavioral analysis to identify potential
     * issues and optimization opportunities.
     * 
     * @param enabled - Whether to enable anomaly detection (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withAnomalyDetection(enabled: boolean = true): ConfigBuilder {
        this._config.anomalyDetection = { enabled }
        return this
    }

    /**
     * 🎯 **Enable Semantic Analysis**
     * 
     * Activates semantic context analysis for method names, arguments, and
     * operational patterns to provide intelligent categorization and enhanced
     * logging context for business domain understanding.
     * 
     * @param enabled - Whether to enable semantic analysis (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withSemanticAnalysis(enabled: boolean = true): ConfigBuilder {
        this._config.semanticContext = { enabled }
        return this
    }

    /**
     * 🔗 **Enable Correlation Tracking**
     * 
     * Activates distributed correlation tracking for method calls including
     * correlation ID generation, inheritance, and context propagation across
     * service boundaries and asynchronous operations.
     * 
     * @param enabled - Whether to enable correlation tracking (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withCorrelationTracking(enabled: boolean = true): ConfigBuilder {
        this._config.correlationContext = { enabled, inheritFromParent: true }
        return this
    }

    /**
     * 📊 **Set Logging Level**
     * 
     * Configures the logging level for decorator output to control verbosity
     * and filtering of log messages based on severity and importance levels.
     * 
     * @param level - Logging level ('debug', 'info', 'warn', 'error')
     * @returns ConfigBuilder instance for method chaining
     */
    public withLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): ConfigBuilder {
        this._config.level = level
        return this
    }

    /**
     * 📋 **Include Method Arguments**
     * 
     * Configures whether to include method arguments in log output for
     * debugging and analysis purposes with appropriate sanitization and
     * length limitation capabilities.
     * 
     * @param enabled - Whether to include arguments (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withArguments(enabled: boolean = true): ConfigBuilder {
        this._config.includeArgs = enabled
        return this
    }

    /**
     * 📝 **Include Method Results**
     * 
     * Configures whether to include method return values in log output for
     * comprehensive debugging and analysis with appropriate data sanitization
     * and security considerations.
     * 
     * @param enabled - Whether to include method results (default: true)
     * @returns ConfigBuilder instance for method chaining
     */
    public withResults(enabled: boolean = true): ConfigBuilder {
        this._config.includeResults = enabled
        return this
    }

    /**
     * 🏗️ Builds and returns the final immutable configuration object.
     * 
     * @remarks
     * Finalizes the configuration building process and creates an immutable
     * enhanced decorator configuration object based on all previously set
     * options. The returned configuration can be used with enhanced decorators
     * and is validated for consistency and completeness.
     * 
     * @returns Immutable enhanced decorator configuration object
     * 
     * @see {@link DEFAULT_LOG_CONFIG} for the underlying configuration creation
     * @see {@link ILogDecoratorConfig} for configuration structure details
     */
    public build(): ILogDecoratorConfig {
        return {
            ...DEFAULT_LOG_CONFIG,
            ...this._config
        }
    }
}

/**
 * 🎯 **Custom Configuration Builder Factory**
 *
 * Fluent API for building custom configurations
 * 
 * @remarks
 * Factory function that creates a new ConfigBuilder instance, providing
 * a clean entry point for the fluent configuration API. Offers an alternative
 * to direct constructor usage and establishes a consistent pattern for
 * configuration creation throughout the application.
 * 
 * 🏭 **Factory Pattern Benefits:**
 * - Consistent configuration creation interface
 * - Simplified API for builder instantiation
 * - Clear separation between creation and configuration
 * - Future extensibility for builder initialization options
 * 
 * 🔄 **Usage Patterns:**
 * - Quick custom configurations for specific use cases
 * - Template-based configuration building
 * - Dynamic configuration creation based on runtime conditions
 * - Testing scenarios requiring specific configuration combinations
 * 
 * @example
 * Creating custom configurations for different scenarios:
 * ```typescript
 * // Performance-optimized configuration
 * const perfConfig = createCustomConfig()
 *   .enablePerformanceTracking(true)
 *   .enableAnomalyDetection(false)
 *   .enableSemanticAnalysis(false)
 *   .setLogLevel('warn')
 *   .build();
 * 
 * // Development configuration with full features
 * const devConfig = createCustomConfig()
 *   .enablePerformanceTracking(true)
 *   .enableAnomalyDetection(true)
 *   .enableSemanticAnalysis(true)
 *   .includeArguments(true)
 *   .includeResult(true)
 *   .setLogLevel('debug')
 *   .build();
 * ```
 * 
 * @returns New ConfigBuilder instance ready for configuration
 * 
 * @see {@link ConfigBuilder} for detailed builder documentation
 * @see {@link ILogDecoratorConfig} for configuration structure
 * @see {@link DEFAULT_LOG_CONFIG} for direct configuration creation
 */
export function createCustomConfig(): ConfigBuilder {
    return new ConfigBuilder()
} 