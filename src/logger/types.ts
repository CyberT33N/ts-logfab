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

// ==== Imports ====
import type { ReadonlyDeep } from 'type-fest'

export interface ILogContext {
    readonly className?: string
    readonly methodName?: string
    readonly methodSignature?: string
    readonly operationId?: string
    readonly requestId?: string
    readonly userId?: string
    readonly args?: Record<string, unknown>
    readonly metadata?: Record<string, unknown>
}

export interface IPerformanceMetrics {
    readonly startTime: number
    readonly duration?: number
    readonly memoryUsage?: NodeJS.MemoryUsage
    readonly cpuUsage?: NodeJS.CpuUsage
    readonly gcPerformance?: PerformanceEntry[]
    readonly markEntries?: PerformanceEntry[]
    readonly measureEntries?: PerformanceEntry[]
    readonly resourceTimings?: PerformanceEntry[]
}

// ==== Enhanced Types for Advanced Features ====

/**
 * 🔗 Correlation Context Interface
 * Manages correlation IDs, workflow IDs, and request context
 */
export interface ICorrelationContext {
    readonly correlationId: string
    readonly workflowId?: string
    readonly requestId?: string
    readonly sessionId?: string
    readonly userId?: string
    readonly parentCorrelationId?: string
    readonly depth: number
    readonly timestamp: number
}

/**
 * 🎯 Semantic Context Interface  
 * Business context and domain information
 */
export interface ISemanticContext {
    readonly operation: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    readonly domain: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    readonly complexity: 'LOW' | 'MEDIUM' | 'HIGH'
    readonly businessKey?: string
    readonly tags?: readonly string[]
}

/**
 * 🚨 Anomaly Detection Result Interface
 * Statistical anomaly information
 */
export interface IAnomalyResult {
    readonly isAnomaly: boolean
    readonly severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    readonly confidence: number
    readonly deviation: number
    readonly baseline: number
    readonly current: number
    readonly threshold: number
    readonly methodKey: string
    readonly timestamp: number
    readonly description?: string
}

/**
 * 📊 Performance Baseline Interface
 * Historical performance tracking
 */
export interface IPerformanceBaseline {
    readonly methodKey: string
    readonly samples: readonly number[]
    readonly average: number
    readonly standardDeviation: number
    readonly minimum: number
    readonly maximum: number
    readonly lastUpdated: number
    readonly sampleCount: number
    readonly warningThreshold: number
    readonly criticalThreshold: number
}

/**
 * ⚙️ Enhanced Performance Configuration Interface
 * Performance monitoring settings
 */
export interface IEnhancedPerformanceConfig {
    readonly enableAnomalyDetection: boolean
    readonly enableBaselineTracking: boolean
    readonly warningThresholdMultiplier: number
    readonly criticalThresholdMultiplier: number
    readonly minSamplesForBaseline: number
    readonly maxMethodsTracked: number
    readonly inactivityTimeoutMs: number
}

/**
 * 🌍 Logging Environment Enum
 * Environment-specific logging behavior
 */
export enum ELoggingEnvironment {
    development = 'development',
    staging = 'staging', 
    production = 'production',
    test = 'test'
}

/**
 * 🎨 Logging Format Enum
 * Output format configuration
 */
export enum ELoggingFormat {
    human = 'human',
    machine = 'machine',
    auto = 'auto'
}

/**
 * 📋 Enhanced Log Context Interface
 * Extended logging context with new features
 */
export interface IEnhancedLogContext extends ILogContext {
    readonly correlationContext?: ICorrelationContext
    readonly semanticContext?: ISemanticContext
    readonly performanceBaseline?: IPerformanceBaseline
    readonly anomalyResult?: IAnomalyResult
    readonly environment?: ELoggingEnvironment
    readonly format?: ELoggingFormat
}

/**
 * 🚀 Enhanced Logger Interface
 * Extended logger with anomaly and performance features
 */
export interface IEnhancedLogger {
    // Core logging methods
    info(message: string, context?: ReadonlyDeep<IEnhancedLogContext>): void
    warn(message: string, context?: ReadonlyDeep<IEnhancedLogContext>): void
    error(message: string, context?: ReadonlyDeep<IEnhancedLogContext>): void
    debug(message: string, context?: ReadonlyDeep<IEnhancedLogContext>): void
    
    // Performance tracking
    startPerformanceTracking(methodKey: string): void
    endPerformanceTracking(methodKey: string): IAnomalyResult | null
    
    // Anomaly statistics
    getAnomalyStatistics(): {
        readonly totalAnomalies: number
        readonly anomaliesByMethod: Record<string, number>
        readonly anomaliesBySeverity: Record<string, number>
    }
    
    // Baseline management
    getPerformanceBaseline(methodKey: string): IPerformanceBaseline | null
    resetPerformanceBaseline(methodKey: string): void
    
    // Context management
    withCorrelationContext(context: ReadonlyDeep<ICorrelationContext>): IEnhancedLogger
    withSemanticContext(context: ReadonlyDeep<ISemanticContext>): IEnhancedLogger
} 