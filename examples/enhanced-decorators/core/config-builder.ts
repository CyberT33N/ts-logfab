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
    createEnhancedConfig,
    type IEnhancedDecoratorConfig
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
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
 * @see {@link createEnhancedConfig} for direct configuration creation
 */
export class ConfigBuilder {
    private readonly _config: WritableDeep<Partial<IEnhancedDecoratorConfig>> = {}

    /**
     * 🔍 Enables or disables performance tracking for method execution timing.
     * 
     * @remarks
     * Controls whether the enhanced decorators collect and report execution
     * timing metrics for decorated methods. When enabled, provides detailed
     * performance insights including execution duration, timing patterns,
     * and performance trend analysis.
     * 
     * @param enabled - Whether to enable performance tracking (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link enableAnomalyDetection} for anomaly detection configuration
     */
    public enablePerformanceTracking(enabled = true): this {
        this._config.enablePerformanceTracking = enabled
        return this
    }

    /**
     * 🚨 Enables or disables anomaly detection for unusual execution patterns.
     * 
     * @remarks
     * Controls whether the enhanced decorators monitor for anomalous behavior
     * such as unexpected execution times, unusual parameter patterns, or
     * irregular method call frequencies. Provides early warning system for
     * potential performance issues or system irregularities.
     * 
     * @param enabled - Whether to enable anomaly detection (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link enablePerformanceTracking} for performance monitoring configuration
     */
    public enableAnomalyDetection(enabled = true): this {
        this._config.enableAnomalyDetection = enabled
        return this
    }

    /**
     * 🧠 Enables or disables semantic analysis for context-aware logging.
     * 
     * @remarks
     * Controls whether the enhanced decorators perform semantic analysis
     * of method parameters, return values, and execution context to provide
     * intelligent, context-aware logging with semantic understanding of
     * the data being processed.
     * 
     * @param enabled - Whether to enable semantic analysis (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link enableCorrelationTracking} for correlation tracking configuration
     */
    public enableSemanticAnalysis(enabled = true): this {
        this._config.enableSemanticAnalysis = enabled
        return this
    }

    /**
     * 🔗 Enables or disables correlation tracking for request/operation tracing.
     * 
     * @remarks
     * Controls whether the enhanced decorators maintain correlation IDs
     * and context tracking across method calls and operations. Enables
     * distributed tracing capabilities and helps track operations across
     * multiple services and method boundaries.
     * 
     * @param enabled - Whether to enable correlation tracking (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link enableSemanticAnalysis} for semantic analysis configuration
     */
    public enableCorrelationTracking(enabled = true): this {
        this._config.enableCorrelationTracking = enabled
        return this
    }

    /**
     * 🎨 Enables or disables automatic format switching based on output destination.
     * 
     * @remarks
     * Controls whether the enhanced decorators automatically adapt their
     * output format based on the destination (console, file, structured logging).
     * Provides optimal formatting for different output contexts while maintaining
     * consistent information content.
     * 
     * @param enabled - Whether to enable auto-format switching (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link setLogLevel} for log level configuration
     */
    public enableAutoFormatSwitching(enabled = true): this {
        this._config.enableAutoFormatSwitching = enabled
        return this
    }

    /**
     * 📊 Sets the logging level to control output verbosity and filtering.
     * 
     * @remarks
     * Configures the minimum logging level for the enhanced decorators.
     * Controls which log messages are output based on their severity level,
     * helping to filter noise in production environments while providing
     * detailed information in development and debugging scenarios.
     * 
     * @param level - The minimum log level to output (trace, debug, info, warn, error)
     * @returns The builder instance for method chaining
     * 
     * @see {@link includeStackTrace} for stack trace inclusion configuration
     */
    public setLogLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'error'): this {
        this._config.logLevel = level
        return this
    }

    /**
     * 📍 Configures whether to include stack traces in log output.
     * 
     * @remarks
     * Controls whether the enhanced decorators capture and include
     * stack trace information in log entries. Valuable for debugging
     * and error analysis but may impact performance and expose
     * sensitive information in production environments.
     * 
     * @param enabled - Whether to include stack traces (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link includeArguments} for argument inclusion configuration
     */
    public includeStackTrace(enabled = true): this {
        this._config.includeStackTrace = enabled
        return this
    }

    /**
     * 🔧 Configures whether to include method arguments in log output.
     * 
     * @remarks
     * Controls whether the enhanced decorators capture and log the actual
     * arguments passed to decorated methods. Provides valuable debugging
     * information but may impact performance and expose sensitive data,
     * so consider security implications in production environments.
     * 
     * @param enabled - Whether to include method arguments (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link includeResult} for result inclusion configuration
     */
    public includeArguments(enabled = true): this {
        this._config.includeArguments = enabled
        return this
    }

    /**
     * 📤 Configures whether to include method return values in log output.
     * 
     * @remarks
     * Controls whether the enhanced decorators capture and log the return
     * values from decorated methods. Useful for understanding method behavior
     * and debugging, but consider performance impact and data sensitivity,
     * especially for methods returning large objects or sensitive information.
     * 
     * @param enabled - Whether to include method results (defaults to true)
     * @returns The builder instance for method chaining
     * 
     * @see {@link setMaxArgumentsLength} for argument length limitation
     */
    public includeResult(enabled = true): this {
        this._config.includeResult = enabled
        return this
    }

    /**
     * 📏 Sets the maximum length for logged arguments to prevent excessive output.
     * 
     * @remarks
     * Configures the character limit for argument serialization in log output.
     * Helps prevent excessive log sizes when methods receive large objects
     * while still providing useful debugging information. Arguments exceeding
     * this length will be truncated with an indication of the original size.
     * 
     * @param length - Maximum character length for argument serialization
     * @returns The builder instance for method chaining
     * 
     * @see {@link includeArguments} for enabling argument inclusion
     */
    public setMaxArgumentsLength(length: number): this {
        this._config.maxArgumentsLength = length
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
     * @see {@link createEnhancedConfig} for the underlying configuration creation
     * @see {@link IEnhancedDecoratorConfig} for configuration structure details
     */
    public build(): IEnhancedDecoratorConfig {
        return createEnhancedConfig(this._config)
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
 * @see {@link IEnhancedDecoratorConfig} for configuration structure
 * @see {@link createEnhancedConfig} for direct configuration creation
 */
export function createCustomConfig(): ConfigBuilder {
    return new ConfigBuilder()
} 