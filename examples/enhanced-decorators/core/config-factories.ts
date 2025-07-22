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
// 🎯 ENTERPRISE CONFIGURATION FACTORIES
// ═══════════════════════════════════════════════════════════════════════════════

import env from '@/env.ts'
import {
    DEFAULT_LOG_CONFIG,
    type ILogDecoratorConfig
} from '@/logger/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE CONFIGURATION FACTORIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🛠️ **Development Configuration Factory**
 * 
 * Creates a comprehensive logging configuration optimized for development environments.
 * This configuration provides maximum debugging capabilities, detailed performance metrics,
 * enhanced context information, and comprehensive error tracking to support effective
 * development and troubleshooting workflows.
 * 
 * **🔧 Key Features:**
 * - Full debugging capabilities with detailed context information
 * - Enhanced performance monitoring for development optimization
 * - Comprehensive error tracking with stack traces and arguments
 * - Correlation context for distributed debugging scenarios
 * - Semantic analysis for intelligent operation categorization
 * - Anomaly detection for identifying unusual development patterns
 * 
 * **🎯 Use Cases:**
 * - Local development environments requiring comprehensive logging
 * - Integration testing with detailed operation tracking
 * - Performance profiling and optimization during development
 * - Debugging complex business logic with enhanced context
 * - Development CI/CD pipelines requiring detailed operation logs
 * 
 * @example
 * ```typescript
 * @log(createDevelopmentConfig())
 * public async complexBusinessLogic(data: BusinessData): Promise<Result> {
 *     // Enhanced development logging with full context
 *     return await this.processBusinessData(data)
 * }
 * ```
 * 
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createDevelopmentConfig(): ILogDecoratorConfig {
    return {
        ...DEFAULT_LOG_CONFIG,
        level: 'debug',
        logStart: true,
        logSuccess: true,
        logDebug: true,
        includePerformance: true,
        correlationContext: {
            enabled: true,
            inheritFromParent: true
        },
        semanticContext: {
            enabled: true
        },
        anomalyDetection: {
            enabled: true
        },
        environment: {
            forceFormat: 'human'
        }
    }
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
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createProductionConfig(): ILogDecoratorConfig {
    return {
        ...DEFAULT_LOG_CONFIG,
        level: 'info',
        logStart: false,
        logSuccess: false,
        logDebug: false,
        includePerformance: true,
        correlationContext: {
            enabled: true,
            inheritFromParent: true
        },
        anomalyDetection: {
            enabled: true
        },
        environment: {
            forceFormat: 'json',
            disableInEnvironments: ['test']
        }
    }
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
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createDebugConfig(): ILogDecoratorConfig {
    return {
        ...DEFAULT_LOG_CONFIG,
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
    }
}

/**
 * 🎯 **Performance Optimization Configuration Factory**
 * 
 * Generates configuration optimized for high-performance production environments
 * with minimal logging overhead while maintaining essential monitoring capabilities.
 * 
 * @see {@link createProductionConfig} for balanced production configuration
 * @see {@link createDevelopmentConfig} for development-friendly alternative
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createPerformanceConfig(): ILogDecoratorConfig {
    return {
        ...DEFAULT_LOG_CONFIG,
        level: 'error',
        logStart: false,
        logSuccess: false,
        logDebug: false,
        includePerformance: false,
        correlationContext: {
            enabled: false
        },
        semanticContext: {
            enabled: false
        },
        anomalyDetection: {
            enabled: false
        },
        environment: {
            forceFormat: 'machine'
        }
    }
}

/**
 * 🎯 **Testing Configuration Factory**
 * 
 * Creates configuration specifically designed for testing environments with
 * comprehensive logging and validation features to support test execution,
 * debugging, and validation processes.
 * 
 * @see {@link createDebugConfig} for maximum debugging capabilities
 * @see {@link createDevelopmentConfig} for development environment configuration
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createTestingConfig(): ILogDecoratorConfig {
    return {
        ...DEFAULT_LOG_CONFIG,
        level: 'debug',
        logStart: true,
        logSuccess: true,
        logDebug: true,
        includePerformance: true,
        correlationContext: {
            enabled: true,
            inheritFromParent: false
        },
        semanticContext: {
            enabled: true
        },
        anomalyDetection: {
            enabled: false
        },
        environment: {
            forceFormat: 'human'
        }
    }
}

/**
 * 🎚️ **Adaptive Configuration Factory**
 * 
 * Creates adaptive configuration that automatically adjusts based on the current
 * environment and operational context to provide optimal logging behavior across
 * different deployment scenarios and operational contexts.
 * 
 * @see {@link createProductionConfig} for explicit production configuration
 * @see {@link env} for environment variable access utilities
 * @see {@link ILogDecoratorConfig} for configuration structure details
 */
export function createAdaptiveConfig(): ILogDecoratorConfig {
    const isDevelopment = env.NODE_ENV === 'development'
    const isProduction = env.NODE_ENV === 'production'
    const isTesting = env.NODE_ENV === 'test'

    return {
        ...DEFAULT_LOG_CONFIG,
        level: isDevelopment ? 'debug' : isProduction ? 'info' : 'debug',
        logStart: !isProduction,
        logSuccess: isDevelopment,
        logDebug: isDevelopment || isTesting,
        includePerformance: !isProduction,
        correlationContext: {
            enabled: true,
            inheritFromParent: isProduction
        },
        semanticContext: {
            enabled: !isProduction
        },
        anomalyDetection: {
            enabled: isProduction
        },
        environment: {
            forceFormat: isProduction ? 'machine' : 'human'
        }
    }
} 