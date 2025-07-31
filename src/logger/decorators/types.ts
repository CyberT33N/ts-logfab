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
// 🎯 ENHANCED CONTEXT DATA INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🌍 **Environment Configuration Data**
 * 
 * Type-safe representation of environment-specific logging configuration
 * 
 * @property loggingFormat - Preferred logging format for the environment
 * @property disabledInEnvironments - List of environments where logging is disabled
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
 * @property correlation - Correlation context information
 * @property semantic - Semantic context information
 * @property anomalyDetection - Whether anomaly detection is enabled
 * @property environment - Environment-specific configuration
 * @property customContext - Additional custom context data
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
 * 
 * @property method - Method name being tracked
 * @property startTime - Start timestamp for performance measurement
 * @property startSnapshot - Initial performance metrics snapshot
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
 * 
 * @property correlation - Correlation context information
 * @property semantic - Semantic context information
 * @property performance - Performance metrics data
 * @property anomalyDetection - Whether anomaly detection is enabled
 * @property startTime - Start timestamp for logging
 * @property performanceContext - Performance tracking context
 * @property enhancedContext - Enhanced context data
 * @property prefix - Logging prefix string
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