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
 */
export interface IEnhancedLogContext extends ILogContext {
    readonly correlation?: ICorrelationContext
    readonly semantic?: ISemanticContext
    readonly performance?: IPerformanceMetrics
    readonly anomalyDetection?: boolean
    
    // ==== 🚀 ENTERPRISE EXTENSIONS ====
    readonly startTime: number
    readonly performanceContext?: IPerformanceContext
    readonly enhancedContext: Record<string, unknown>
    readonly prefix: string
} 