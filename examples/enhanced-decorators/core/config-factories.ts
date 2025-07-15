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
 * 🎚️ **Adaptive Configuration**
 *
 * Runtime configuration that adapts to environment
 */
export function createAdaptiveConfig(): IEnhancedDecoratorConfig {
    const isDev = env.NODE_ENV === 'development'
    return isDev ? createDevelopmentConfig() : createProductionConfig()
} 