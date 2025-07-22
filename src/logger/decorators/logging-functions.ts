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
██              🎯 CONVENIENCE DECORATOR FUNCTIONS                            ██
██          ENTERPRISE-GRADE LOGGING WITH MODERN CONFIGURATION               ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { ReadonlyDeep } from 'type-fest'
import { log } from '@/decorators/core-decorator.ts'
import { type ILogDecoratorConfig, DEFAULT_LOG_CONFIG } from '@/decorators/types.ts'

// Re-export core logging functions
export {
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError,
    logEnhancedDebug
} from './core-logging.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONVENIENCE DECORATOR FUNCTIONS (ENTERPRISE-READY)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🐛 **Debug Decorator**
 * 
 * Convenience decorator for debug-level logging with enhanced context
 */
export function logDebug(config: ReadonlyDeep<Partial<ILogDecoratorConfig>> = {}): MethodDecorator {
    const debugConfig: ReadonlyDeep<ILogDecoratorConfig> = {
        ...DEFAULT_LOG_CONFIG,
        ...config,
        level: 'debug',
        logStart: true,
        logSuccess: true,
        logDebug: true,
        includePerformance: true,
        correlationContext: {
            enabled: true,
            inheritFromParent: true,
            ...config.correlationContext
        },
        semanticContext: {
            enabled: true,
            ...config.semanticContext
        }
    }
    
    return log(debugConfig)
}

/**
 * ⚠️ **Errors Only Decorator**
 * 
 * Convenience decorator for error-focused logging with enhanced error tracking
 */
export function logErrorsOnly(config: ReadonlyDeep<Partial<ILogDecoratorConfig>> = {}): MethodDecorator {
    const errorConfig: ReadonlyDeep<ILogDecoratorConfig> = {
        ...DEFAULT_LOG_CONFIG,
        ...config,
        level: 'error',
        logStart: false,
        logSuccess: false,
        includePerformance: false,
        anomalyDetection: {
            enabled: true,
            ...config.anomalyDetection
        },
        correlationContext: {
            enabled: true,
            inheritFromParent: true,
            ...config.correlationContext
        }
    }
    
    return log(errorConfig)
}

/**
 * ⚡ **Performance Decorator**
 * 
 * Convenience decorator for performance-focused logging with full metrics
 */
export function logPerformance(config: ReadonlyDeep<Partial<ILogDecoratorConfig>> = {}): MethodDecorator {
    const performanceConfig: ReadonlyDeep<ILogDecoratorConfig> = {
        ...DEFAULT_LOG_CONFIG,
        ...config,
        level: 'info',
        logStart: true,
        logSuccess: true,
        includePerformance: true,
        anomalyDetection: {
            enabled: true,
            ...config.anomalyDetection
        },
        correlationContext: {
            enabled: true,
            inheritFromParent: true,
            ...config.correlationContext
        },
        semanticContext: {
            enabled: true,
            ...config.semanticContext
        }
    }
    
    return log(performanceConfig)
}

/**
 * 🔇 **Silent Decorator**
 * 
 * Convenience decorator that only logs errors (silent execution)
 */
export function logSilent(config: ReadonlyDeep<Partial<ILogDecoratorConfig>> = {}): MethodDecorator {
    const silentConfig: ReadonlyDeep<ILogDecoratorConfig> = {
        ...DEFAULT_LOG_CONFIG,
        ...config,
        level: 'warn',
        logStart: false,
        logSuccess: false,
        includePerformance: false,
        correlationContext: {
            enabled: false,
            ...config.correlationContext
        },
        semanticContext: {
            enabled: false,
            ...config.semanticContext
        },
        anomalyDetection: {
            enabled: false,
            ...config.anomalyDetection
        }
    }
    
    return log(silentConfig)
} 