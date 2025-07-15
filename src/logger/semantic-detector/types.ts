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

// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 SEMANTIC CONTEXT DETECTION - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Semantic Context Interface**
 * 
 * Provides business context extracted from method names and arguments
 * - operation: Type of operation being performed
 * - domain: Business domain the operation belongs to
 * - complexity: Complexity level based on arguments and patterns
 * - confidence: How confident we are in the detection (0-1)
 */
export interface ISemanticContext {
    readonly operation: OperationType
    readonly domain: DomainType
    readonly complexity: ComplexityLevel
    readonly confidence: number
    readonly metadata: {
        readonly detectedPatterns: readonly string[]
        readonly entityType?: string
        readonly estimatedCost: CostLevel
    }
}

/**
 * 🔄 **Operation Types**
 * 
 * CRUD and computational operations
 */
export type OperationType = 
    | 'READ' 
    | 'WRITE' 
    | 'UPDATE' 
    | 'DELETE' 
    | 'COMPUTE' 
    | 'VALIDATE'
    | 'TRANSFORM'
    | 'SEARCH'
    | 'AGGREGATE'
    | 'UNKNOWN'

/**
 * 🏢 **Domain Types**
 * 
 * Business domains for better log categorization
 */
export type DomainType = 
    | 'USER' 
    | 'ORDER' 
    | 'PRODUCT' 
    | 'FINANCE' 
    | 'SYSTEM' 
    | 'AUTH'
    | 'NOTIFICATION'
    | 'ANALYTICS'
    | 'INTEGRATION'
    | 'GENERAL'

/**
 * 📊 **Complexity Levels**
 * 
 * Based on argument count, types, and detected patterns
 */
export type ComplexityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'

/**
 * 💰 **Cost Levels**
 * 
 * Estimated resource cost for operations
 */
export type CostLevel = 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EXPENSIVE'

/**
 * 🔍 **Pattern Configuration**
 * 
 * Configurable patterns for operation and domain detection
 */
export interface IPatternConfig {
    readonly operations: Record<OperationType, readonly RegExp[]>
    readonly domains: Record<DomainType, readonly string[]>
    readonly complexityIndicators: {
        readonly high: readonly string[]
        readonly medium: readonly string[]
    }
    readonly costIndicators: {
        readonly expensive: readonly string[]
        readonly high: readonly string[]
        readonly medium: readonly string[]
    }
} 