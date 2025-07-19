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
██              🎯 ENHANCED DECORATOR CONFIGURATION FACTORIES                ██
██                    ENTERPRISE-GRADE CONFIGURATION MANAGEMENT             ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR CONFIGURATION FACTORIES
// ═══════════════════════════════════════════════════════════════════════════════

import env from '@/env.ts'
import {
    createEnhancedConfig,
    type IEnhancedDecoratorConfig
} from '@/logger/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 ENTERPRISE CONFIG FACTORY PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🚀 **Development Configuration**
 *
 * Optimized for development environments with maximum visibility
 * 
 * @remarks
 * Creates a comprehensive configuration optimized for development workflows
 * with maximum observability and debugging capabilities. Enables all advanced
 * features including semantic analysis, anomaly detection, and full argument
 * logging to provide developers with complete insight into application behavior.
 * 
 * 🔧 **Configuration Characteristics:**
 * - Performance tracking enabled for timing analysis
 * - Anomaly detection active for unusual behavior identification
 * - Semantic analysis enabled for context-aware logging
 * - Correlation tracking for request/operation tracing
 * - Auto-format switching based on output destination
 * - Debug-level logging with maximum verbosity
 * - Full stack traces and argument/result logging included
 * - Extended argument length limit (500 chars) for detailed inspection
 * 
 * 💡 **Development Benefits:**
 * - Complete visibility into method execution flow
 * - Detailed debugging information for troubleshooting
 * - Performance metrics for optimization identification
 * - Rich context for understanding application behavior
 * 
 * @returns Configuration object optimized for development environments
 * 
 * @see {@link createProductionConfig} for production-optimized alternative
 * @see {@link createDebugConfig} for maximum verbosity configuration
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
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
 * 
 * @remarks
 * Creates a performance-optimized configuration suitable for production environments
 * where logging overhead must be minimized while maintaining essential monitoring
 * capabilities. Disables resource-intensive features like semantic analysis while
 * preserving critical functionality such as performance tracking and anomaly detection.
 * 
 * 🚀 **Production Optimizations:**
 * - Performance tracking enabled for production monitoring
 * - Anomaly detection active for issue identification
 * - Semantic analysis disabled to reduce computational overhead
 * - Correlation tracking maintained for request tracing
 * - Auto-format switching enabled for efficient output
 * - Info-level logging to reduce verbosity
 * - Stack traces disabled to prevent sensitive information exposure
 * - Arguments and results excluded to minimize logging overhead
 * - Reduced argument length limit (100 chars) for performance
 * 
 * 🛡️ **Production Benefits:**
 * - Minimal performance impact on application execution
 * - Essential monitoring without overwhelming log volume
 * - Security-conscious logging to prevent data exposure
 * - Efficient resource utilization for scalability
 * 
 * @returns Configuration object optimized for production environments
 * 
 * @see {@link createDevelopmentConfig} for development-friendly alternative
 * @see {@link createPerformanceConfig} for maximum performance configuration
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
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
 * 
 * @remarks
 * Creates an ultra-verbose configuration designed for intensive debugging sessions
 * where maximum information is required to diagnose complex issues. Enables all
 * available features and extends logging limits to capture comprehensive execution
 * details for thorough analysis and troubleshooting.
 * 
 * 🔬 **Debug Characteristics:**
 * - All advanced features enabled for maximum insight
 * - Performance tracking with detailed timing metrics
 * - Anomaly detection for unusual behavior patterns
 * - Semantic analysis for context-aware debugging
 * - Full correlation tracking across operations
 * - Auto-format switching for optimal output rendering
 * - Debug-level logging with complete verbosity
 * - Comprehensive stack traces for error analysis
 * - Complete argument and result logging
 * - Extended argument length limit (1000 chars) for full data capture
 * 
 * 🎯 **Debug Use Cases:**
 * - Complex issue investigation and root cause analysis
 * - Performance bottleneck identification and optimization
 * - Integration testing with detailed execution flow analysis
 * - Legacy code understanding and modernization efforts
 * 
 * @returns Configuration object with maximum debugging capabilities
 * 
 * @see {@link createDevelopmentConfig} for standard development configuration
 * @see {@link createTestingConfig} for testing-specific configuration
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
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
 * 
 * @remarks
 * Creates a minimal-overhead configuration specifically designed for performance-critical
 * applications where logging impact must be absolutely minimized. Disables most advanced
 * features while maintaining only essential performance tracking capabilities to ensure
 * negligible impact on application execution speed.
 * 
 * 🚀 **Performance Optimizations:**
 * - Only performance tracking enabled for timing metrics
 * - All analysis features disabled (anomaly, semantic, correlation)
 * - Auto-format switching disabled to reduce processing
 * - Warning-level logging to minimize output volume
 * - No stack traces to eliminate stack inspection overhead
 * - No argument or result logging to reduce serialization cost
 * - Minimal argument length limit (50 chars) for emergency logging
 * 
 * ⚡ **Performance Benefits:**
 * - Near-zero logging overhead for maximum application speed
 * - Essential timing metrics preserved for performance monitoring
 * - Minimal resource consumption for high-throughput scenarios
 * - Streamlined execution path with reduced branching
 * 
 * 🎯 **Ideal For:**
 * - High-frequency trading systems and real-time applications
 * - Microservices with strict latency requirements
 * - Batch processing operations with performance constraints
 * - Production APIs with heavy load requirements
 * 
 * @returns Configuration object optimized for maximum performance
 * 
 * @see {@link createProductionConfig} for balanced production configuration
 * @see {@link createDevelopmentConfig} for development-friendly alternative
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
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
 * 
 * @remarks
 * Creates a testing-optimized configuration that balances minimal performance
 * impact with essential debugging capabilities required for test execution
 * and failure analysis. Disables performance-intensive features while maintaining
 * correlation tracking and argument logging for effective test debugging.
 * 
 * 🧪 **Testing Characteristics:**
 * - Performance tracking disabled to avoid test timing interference
 * - Anomaly detection disabled to prevent false positives in test data
 * - Semantic analysis disabled to reduce test execution overhead
 * - Correlation tracking enabled for test flow tracing
 * - Auto-format switching enabled for readable test output
 * - Error-level logging to focus on failures and issues
 * - Stack traces enabled for test failure debugging
 * - Arguments and results logged for test assertion verification
 * - Moderate argument length limit (200 chars) for test data inspection
 * 
 * 🎯 **Testing Benefits:**
 * - Minimal interference with test execution timing
 * - Essential debugging information for test failure analysis
 * - Focused logging on errors and critical issues
 * - Correlation tracking for complex test scenario debugging
 * 
 * 🔧 **Testing Use Cases:**
 * - Unit test debugging and assertion verification
 * - Integration test flow analysis and issue identification
 * - End-to-end test execution monitoring
 * - Test environment deployment validation
 * 
 * @returns Configuration object optimized for testing environments
 * 
 * @see {@link createDebugConfig} for maximum debugging capabilities
 * @see {@link createDevelopmentConfig} for development environment configuration
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
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
 * 🎚️ **Adaptive Configuration**
 *
 * Runtime configuration that adapts to environment
 * 
 * @remarks
 * Creates an intelligent configuration that automatically adapts to the runtime
 * environment by detecting the NODE_ENV setting and selecting the most appropriate
 * configuration profile. Provides seamless transitions between development and
 * production environments without requiring manual configuration changes.
 * 
 * 🤖 **Adaptive Logic:**
 * - Automatically detects NODE_ENV environment variable
 * - Switches to development configuration for 'development' environment
 * - Defaults to production configuration for all other environments
 * - Provides consistent behavior across different deployment scenarios
 * - Eliminates manual configuration management overhead
 * 
 * 🌍 **Environment Detection:**
 * - **Development Mode**: Full debugging features, maximum observability
 * - **Production Mode**: Performance-optimized, security-conscious logging
 * - **Fallback Behavior**: Defaults to production for safety in unknown environments
 * 
 * 🔄 **Benefits:**
 * - Zero-configuration deployment across environments
 * - Automatic optimization based on runtime context
 * - Consistent behavior with environment-appropriate settings
 * - Simplified application configuration management
 * 
 * @example
 * Demonstrating adaptive configuration behavior:
 * ```typescript
 * // In development environment (NODE_ENV=development)
 * const config1 = createAdaptiveConfig();
 * // Returns development config with full debugging features
 * 
 * // In production environment (NODE_ENV=production)
 * const config2 = createAdaptiveConfig(); 
 * // Returns production config with performance optimizations
 * 
 * // In unknown environment (NODE_ENV=staging)
 * const config3 = createAdaptiveConfig();
 * // Returns production config as safe fallback
 * ```
 * 
 * @returns Configuration object adapted to the current runtime environment
 * 
 * @see {@link createDevelopmentConfig} for explicit development configuration
 * @see {@link createProductionConfig} for explicit production configuration
 * @see {@link env} for environment variable access utilities
 * @see {@link IEnhancedDecoratorConfig} for configuration structure details
 */
export function createAdaptiveConfig(): IEnhancedDecoratorConfig {
    const isDev = env.NODE_ENV === 'development'
    return isDev ? createDevelopmentConfig() : createProductionConfig()
} 