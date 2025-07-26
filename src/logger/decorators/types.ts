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
██              🎯 DECORATOR LOGGING TYPES MODULE                            ██
██          SHARED TYPES AND INTERFACES FOR DECORATOR LOGGING               ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { type ICorrelationContext } from '@/logger/correlation-context/index.ts'
import { type ISemanticContext } from '@/logger/semantic-detector/index.ts'
import { type ILogContext, type IPerformanceMetrics } from '@/logger/types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED CONTEXT DATA INTERFACES (ENTERPRISE-GRADE TYPE SAFETY)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🌍 **Environment Configuration Data**
 * 
 * Type-safe representation of environment-specific logging configuration
 */
export interface IEnvironmentContextData {
    readonly loggingFormat?: 'human' | 'machine' | 'auto'
    readonly disabledInEnvironments?: readonly ('development' | 'staging' | 'production' | 'test')[]
}

/**
 * 🎯 **Enhanced Context Data Interface**
 * 
 * Enterprise-grade type-safe representation of enhanced logging context data.
 * This interface defines the exact structure returned by `createEnhancedContext`.
 * 
 * @extends ILogContext - Inherits all base logging context properties
 */
export interface IEnhancedContextData extends ILogContext {
    readonly correlation?: ICorrelationContext
    readonly semantic?: ISemanticContext
    readonly anomalyDetection: boolean
    readonly environment: IEnvironmentContextData
    readonly customContext?: unknown
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE CONTEXT INTERFACE (from logger-factory)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Performance Context for Method Tracking** 
 */
interface IPerformanceContext {
    readonly method: string
    readonly startTime: number
    readonly startSnapshot: IPerformanceMetrics
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED LOGGING INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Log Context with Correlation and Semantic Data**
 * 
 * Enterprise-grade logging context with performance tracking and type-safe enhanced context data.
 */
export interface IEnhancedLogContext extends ILogContext {
    readonly correlation?: ICorrelationContext
    readonly semantic?: ISemanticContext
    readonly performance?: IPerformanceMetrics
    readonly anomalyDetection?: boolean
    
    // ==== 🚀 ENTERPRISE EXTENSIONS ====
    readonly startTime: number
    readonly performanceContext?: IPerformanceContext
    readonly enhancedContext: IEnhancedContextData
    readonly prefix: string
} 