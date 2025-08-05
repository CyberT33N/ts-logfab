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

// ==== Imports ====
import  { type ReadonlyDeep } from 'type-fest'

/**
 * 🌍 Logging Environment Enum
 * Environment-specific logging behavior
 */
export enum ELoggingEnvironment {
    development = 'development',
    production = 'production',
    staging = 'staging',
    test = 'test'
}

/**
 * 🎨 Logging Format Enum
 * Output format configuration
 */
export enum ELoggingFormat {
    auto = 'auto',
    human = 'human',
    machine = 'machine'
}

// ==== Enhanced Types for Advanced Features ====

/**
 * 🚨 Anomaly Detection Result Interface
 * Statistical anomaly information
 */
export interface IAnomalyResult {
    readonly baseline: number
    readonly confidence: number
    readonly current: number
    readonly description?: string
    readonly deviation: number
    readonly isAnomaly: boolean
    readonly methodKey: string
    readonly severity: 'CRITICAL' | 'HIGH' | 'LOW' | 'MEDIUM'
    readonly threshold: number
    readonly timestamp: number
}

/**
 * 🔗 Correlation Context Interface
 * Manages correlation IDs, workflow IDs, and request context
 */
export interface ICorrelationContext {
    readonly correlationId: string
    readonly depth: number
    readonly parentCorrelationId?: string
    readonly requestId?: string
    readonly sessionId?: string
    readonly timestamp: number
    readonly userId?: string
    readonly workflowId?: string
}

/**
 * 📋 Enhanced Log Context Interface
 * Extended logging context with new features
 */
export interface IEnhancedLogContext extends ILogContext {
    readonly anomalyResult?: IAnomalyResult
    readonly correlationContext?: ICorrelationContext
    readonly environment?: ELoggingEnvironment
    readonly format?: ELoggingFormat
    readonly performanceBaseline?: IPerformanceBaseline
    readonly semanticContext?: ISemanticContext
}

/**
 * � Enhanced Logger Interface
 * Extended logger with anomaly and performance features
 */
export interface IEnhancedLogger {

    debug: (message: string, context?: ReadonlyDeep<IEnhancedLogContext>) => void
    endPerformanceTracking: (methodKey: string) => IAnomalyResult | null
    error: (message: string, context?: ReadonlyDeep<IEnhancedLogContext>) => void

    // Anomaly statistics
    getAnomalyStatistics: () => {
        readonly anomaliesByMethod: Record<string, number>
        readonly anomaliesBySeverity: Record<string, number>
        readonly totalAnomalies: number
    }

    // Baseline management
    getPerformanceBaseline: (methodKey: string) => IPerformanceBaseline | null

    // Core logging methods
    info: (message: string, context?: ReadonlyDeep<IEnhancedLogContext>) => void

    resetPerformanceBaseline: (methodKey: string) => void

    // Performance tracking
    startPerformanceTracking: (methodKey: string) => void
    warn: (message: string, context?: ReadonlyDeep<IEnhancedLogContext>) => void

    // Context management
    withCorrelationContext: (context: ReadonlyDeep<ICorrelationContext>) => IEnhancedLogger
    withSemanticContext: (context: ReadonlyDeep<ISemanticContext>) => IEnhancedLogger
}

export interface ILogContext {
    readonly args?: Record<string, unknown>
    readonly className?: string
    readonly metadata?: Record<string, unknown>
    readonly methodName?: string
    readonly methodSignature?: string
    readonly operationId?: string
    readonly requestId?: string
    readonly userId?: string
}

/**
 * � Performance Baseline Interface
 * Historical performance tracking
 */
export interface IPerformanceBaseline {
    readonly average: number
    readonly criticalThreshold: number
    readonly lastUpdated: number
    readonly maximum: number
    readonly methodKey: string
    readonly minimum: number
    readonly sampleCount: number
    readonly samples: readonly number[]
    readonly standardDeviation: number
    readonly warningThreshold: number
}

export interface IPerformanceMetrics {
    readonly cpuUsage?: NodeJS.CpuUsage
    readonly duration?: number
    readonly gcPerformance?: PerformanceEntry[]
    readonly markEntries?: PerformanceEntry[]
    readonly measureEntries?: PerformanceEntry[]
    readonly memoryUsage?: NodeJS.MemoryUsage
    readonly resourceTimings?: PerformanceEntry[]
    readonly startTime: number
}

/**
 * 🎯 Semantic Context Interface
 * Business context and domain information
 */
export interface ISemanticContext {
    readonly businessKey?: string
    readonly complexity: 'HIGH' | 'LOW' | 'MEDIUM'
    readonly domain: 'FINANCE' | 'GENERAL' | 'ORDER' | 'PRODUCT' | 'SYSTEM' | 'USER'
    readonly operation: 'COMPUTE' | 'DELETE' | 'READ' | 'UNKNOWN' | 'UPDATE' | 'WRITE'
    readonly tags?: readonly string[]
}
