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
import { type ICorrelationContext } from '../correlation-context/index.ts'
import { type ISemanticContext } from '../semantic-detector.ts'
import { type ILogContext, type IPerformanceMetrics } from '../types.ts'

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
} 