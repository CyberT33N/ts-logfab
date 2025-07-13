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

import { log } from './core-decorator.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 SPECIALIZED DECORATOR VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔍 **DEBUG LOG DECORATOR**
 * Pre-configured for debug-level logging with detailed information and all Enhanced features
 */
export const logDebug = (): MethodDecorator => log({
    level: 'debug',
    logDebug: true,
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    // Enhanced Features for maximum debug information
    correlationContext: { enabled: true },
    semanticContext: { enabled: true },
    anomalyDetection: { enabled: true }
})

/**
 * ⚡ **PERFORMANCE LOG DECORATOR**
 * Focused on performance metrics and execution timing with Enhanced monitoring
 */
export const logPerformance = (): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: false,
    includeResult: true,
    logDebug: false,
    // Enhanced Features for performance monitoring
    correlationContext: { enabled: true },
    semanticContext: { enabled: false }, // Minimal semantic overhead for performance focus
    anomalyDetection: { 
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true,
        thresholdMultiplier: 2.0 // Stricter performance monitoring
    },
    customContext: { focus: 'performance' }
})

/**
 * 🔒 **SILENT LOG DECORATOR**
 * Minimal logging for sensitive operations with reduced Enhanced features
 */
export const logSilent = (): MethodDecorator => log({
    level: 'info',
    includeArgs: false,
    includeResult: false,
    logDebug: false,
    // Minimal Enhanced Features for silent operations
    correlationContext: { enabled: true }, // Keep correlation for tracing
    semanticContext: { enabled: false }, // Disable semantic analysis
    anomalyDetection: { enabled: false }, // Disable anomaly detection
    customContext: { mode: 'silent' }
})

/**
 * 🚨 **ERROR-ONLY LOG DECORATOR**
 * Only logs when methods fail with Enhanced error analysis
 */
export const logErrorsOnly = (): MethodDecorator => log({
    level: 'error',
    logStart: false,
    logSuccess: false,
    includeArgs: true,
    includeResult: false,
    logDebug: true,
    // Enhanced Features for error analysis
    correlationContext: { enabled: true },
    semanticContext: { enabled: true }, // Help categorize error types
    anomalyDetection: { 
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: false // Only critical for error-only mode
    }
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENHANCED DECORATOR VARIANTS (NEW)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔗 **CORRELATION LOG DECORATOR**
 * Automatic correlation context tracking with enhanced ID management
 */
export const logWithCorrelation = (options?: {
    readonly correlationId?: string
    readonly workflowId?: string
    readonly requestId?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    correlationContext: {
        enabled: true,
        inheritFromParent: true,
        ...options
    },
    customContext: { focus: 'correlation-tracking' }
})

/**
 * 🎯 **SEMANTIC LOG DECORATOR**
 * Business context and domain-specific logging
 */
export const logWithSemantics = (options?: {
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    readonly businessKey?: string
    readonly tags?: readonly string[]
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    semanticContext: {
        enabled: true,
        ...options
    },
    customContext: { focus: 'semantic-analysis' }
})

/**
 * 🚨 **ANOMALY DETECTION LOG DECORATOR**
 * Enhanced performance monitoring with anomaly detection
 */
export const logWithAnomalyDetection = (options?: {
    readonly minSamples?: number
    readonly thresholdMultiplier?: number
    readonly enableCriticalAlerts?: boolean
    readonly customMethodKey?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    anomalyDetection: {
        enabled: true,
        enableWarningAlerts: true,
        ...options
    },
    customContext: { focus: 'anomaly-monitoring' }
})

/**
 * 🌍 **PRODUCTION LOG DECORATOR**
 * Production-optimized logging with minimal output
 */
export const logForProduction = (): MethodDecorator => log({
    level: 'info',
    includeArgs: false,
    includeResult: false,
    logDebug: false,
    environment: {
        forceFormat: 'machine',
        disableInEnvironments: ['test']
    },
    correlationContext: { enabled: true },
    anomalyDetection: { enabled: true },
    customContext: { environment: 'production-optimized' }
})

/**
 * 🛠️ **DEVELOPMENT LOG DECORATOR**
 * Development-optimized logging with detailed output
 */
export const logForDevelopment = (): MethodDecorator => log({
    level: 'debug',
    includeArgs: true,
    includeResult: true,
    logDebug: true,
    environment: {
        forceFormat: 'human',
        forceEnvironment: 'development'
    },
    correlationContext: { enabled: true },
    semanticContext: { enabled: true },
    anomalyDetection: { enabled: false },
    customContext: { environment: 'development-verbose' }
})

/**
 * 💰 **FINANCIAL OPERATION LOG DECORATOR**
 * Specialized for financial domain operations
 */
export const logFinancialOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE'
    readonly businessKey?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: false, // Privacy for financial data
    includeResult: false, // Privacy for financial data
    correlationContext: {
        enabled: true,
        userId: options?.userId
    },
    semanticContext: {
        enabled: true,
        domain: 'FINANCE',
        operation: options?.operation ?? 'COMPUTE',
        businessKey: options?.businessKey,
        tags: ['financial', 'privacy-sensitive']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        thresholdMultiplier: 1.5 // Stricter for financial operations
    },
    customContext: { domain: 'financial', sensitivity: 'high' }
})

/**
 * 👤 **USER OPERATION LOG DECORATOR**
 * Specialized for user domain operations
 */
export const logUserOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'
    readonly userId?: string
    readonly includeUserData?: boolean
}): MethodDecorator => {
    const includeUserData = options?.includeUserData ?? false
    return log({
        level: 'info',
        includePerformance: true,
        includeArgs: includeUserData,
        includeResult: includeUserData,
        correlationContext: {
            enabled: true,
            userId: options?.userId
        },
        semanticContext: {
            enabled: true,
            domain: 'USER',
            operation: options?.operation ?? 'READ',
            tags: ['user-management']
        },
        anomalyDetection: { enabled: true },
        customContext: { domain: 'user', privacy: includeUserData ? 'normal' : 'enhanced' }
    })
}

/**
 * 📦 **ORDER OPERATION LOG DECORATOR**
 * Specialized for order/commerce domain operations
 */
export const logOrderOperation = (options?: {
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE'
    readonly orderId?: string
    readonly userId?: string
}): MethodDecorator => log({
    level: 'info',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    correlationContext: {
        enabled: true,
        userId: options?.userId,
        workflowId: 'order-processing'
    },
    semanticContext: {
        enabled: true,
        domain: 'ORDER',
        operation: options?.operation ?? 'WRITE',
        businessKey: options?.orderId,
        tags: ['commerce', 'order-management']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true
    },
    customContext: { domain: 'commerce', workflow: 'order-processing' }
})

/**
 * ⚡ **HIGH-PERFORMANCE LOG DECORATOR**
 * Minimal logging for performance-critical operations
 */
export const logHighPerformance = (): MethodDecorator => log({
    level: 'warn', // Only log warnings and errors
    includeArgs: false,
    includeResult: false,
    logStart: false,
    logSuccess: false,
    logDebug: false,
    correlationContext: { enabled: true },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: false
    },
    customContext: { mode: 'high-performance', verbosity: 'minimal' }
})

/**
 * 🔍 **COMPREHENSIVE LOG DECORATOR**
 * Maximum logging with all enhanced features enabled
 */
export const logComprehensive = (options?: {
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    readonly userId?: string
    readonly businessKey?: string
}): MethodDecorator => log({
    level: 'debug',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    logDebug: true,
    correlationContext: {
        enabled: true,
        userId: options?.userId
    },
    semanticContext: {
        enabled: true,
        domain: options?.domain ?? 'GENERAL',
        operation: options?.operation ?? 'UNKNOWN',
        businessKey: options?.businessKey,
        tags: ['comprehensive-logging']
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true
    },
    customContext: { mode: 'comprehensive', verbosity: 'maximum' }
}) 