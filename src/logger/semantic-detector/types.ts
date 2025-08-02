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
 * 🔄 **Operation Types Enum**
 * 
 * Central source of truth for all operation types
 * Used for type-safe iteration without type-casting
 */
export enum EOperationType {
    read = 'READ',
    write = 'WRITE',
    update = 'UPDATE',
    delete = 'DELETE',
    compute = 'COMPUTE',
    validate = 'VALIDATE',
    transform = 'TRANSFORM',
    search = 'SEARCH',
    aggregate = 'AGGREGATE',
    unknown = 'UNKNOWN'
}

/**
 * 🔄 **Operation Types**
 * 
 * CRUD and computational operations
 * Automatically derived from EOperationType enum - ZERO DUPLICATION!
 */
export type OperationType = `${EOperationType}`

/**
 * 🏢 **Domain Types Enum**
 * 
 * Central source of truth for all domain types
 * Used for type-safe iteration without type-casting
 */
export enum EDomainType {
    user = 'USER',
    order = 'ORDER',
    product = 'PRODUCT',
    finance = 'FINANCE',
    system = 'SYSTEM',
    auth = 'AUTH',
    notification = 'NOTIFICATION',
    analytics = 'ANALYTICS',
    integration = 'INTEGRATION',
    general = 'GENERAL'
}

/**
 * 🏢 **Domain Types**
 * 
 * Business domains for better log categorization
 * Automatically derived from EDomainType enum - ZERO DUPLICATION!
 */
export type DomainType = `${EDomainType}`

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
 * Uses mapped types for complete readonly compliance
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