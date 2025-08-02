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
// 🎯 SEMANTIC CONTEXT DETECTION - CORE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { DEFAULT_PATTERN_CONFIG } from './config.ts'
import { 
    EOperationType,
    EDomainType,
    type OperationType, 
    type DomainType, 
    type ComplexityLevel, 
    type CostLevel, 
    type IPatternConfig, 
    type ISemanticContext
} from './types.ts'
import { 
    calculatePatternConfidence, 
    calculateKeywordConfidence, 
    getBaseCostForOperation, 
    getComplexityAdjustment, 
    detectEntityType 
} from './utils.ts'

/**
 * 🎯 **Detect operation type from method name**
 * Uses configurable regex patterns for accurate detection
 */
export function detectOperation(
    methodName: Readonly<string>,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: ReadonlyDeep<IPatternConfig> = DEFAULT_PATTERN_CONFIG
): { operation: OperationType; confidence: number; patterns: readonly string[] } {
    const detectedPatterns: string[] = []
    let bestMatch: OperationType = 'UNKNOWN'
    let highestConfidence = 0

    // Enterprise-grade: Use enum values for type-safe iteration
    const operationTypes = Object.values(EOperationType)
    
    for (const operationType of operationTypes) {
        if (operationType === EOperationType.unknown) {
            continue
        }

        const patterns = config.operations[operationType]
        for (const pattern of patterns) {
            if (pattern.test(methodName)) {
                detectedPatterns.push(pattern.source)
                
                // Calculate confidence based on pattern specificity
                const confidence = calculatePatternConfidence(methodName, pattern)
                
                if (confidence > highestConfidence) {
                    highestConfidence = confidence
                    bestMatch = operationType
                }
            }
        }
    }

    return {
        operation: bestMatch,
        confidence: highestConfidence,
        patterns: detectedPatterns
    }
}

/**
 * 🏢 **Detect domain from method name and context**
 * Uses keyword matching with confidence scoring
 */
export function detectDomain(
    methodName: Readonly<string>,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: ReadonlyDeep<IPatternConfig> = DEFAULT_PATTERN_CONFIG
): { domain: DomainType; confidence: number; keywords: readonly string[] } {
    const lowerMethodName = methodName.toLowerCase()
    const detectedKeywords: string[] = []
    let bestMatch: DomainType = 'GENERAL'
    let highestConfidence = 0

    // Enterprise-grade: Use enum values for type-safe iteration
    const domainTypes = Object.values(EDomainType)

    for (const domainType of domainTypes) {
        if (domainType === EDomainType.general) {
            continue
        }

        const keywords = config.domains[domainType]
        for (const keyword of keywords) {
            if (lowerMethodName.includes(keyword)) {
                detectedKeywords.push(keyword)
                
                // Calculate confidence based on keyword specificity and position
                const confidence = calculateKeywordConfidence(lowerMethodName, keyword)
                
                if (confidence > highestConfidence) {
                    highestConfidence = confidence
                    bestMatch = domainType
                }
            }
        }
    }

    return {
        domain: bestMatch,
        confidence: highestConfidence,
        keywords: detectedKeywords
    }
}

/**
 * 📊 **Calculate complexity level**
 * Based on argument count, types, and method name patterns
 */
export function calculateComplexity(
    methodName: Readonly<string>,
    args: ReadonlyDeep<readonly unknown[]>,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: ReadonlyDeep<IPatternConfig> = DEFAULT_PATTERN_CONFIG
): { complexity: ComplexityLevel; factors: readonly string[] } {
    const factors: string[] = []
    let score = 0

    // Argument count factor
    if (args.length === 0) {
        factors.push('no-args')
    } else if (args.length <= 2) {
        score += 10
        factors.push('simple-args')
    } else if (args.length <= 5) {
        score += 20
        factors.push('moderate-args')
    } else {
        score += 40
        factors.push('many-args')
    }

    // Argument type complexity
    for (const arg of args) {
        if (arg !== null && typeof arg === 'object') {
            score += 15
            factors.push('object-arg')
        } else if (Array.isArray(arg)) {
            score += 20
            factors.push('array-arg')
        }
    }

    // Method name complexity indicators
    const lowerMethodName = methodName.toLowerCase()
    
    for (const indicator of config.complexityIndicators.high) {
        if (lowerMethodName.includes(indicator)) {
            score += 30
            factors.push(`high-complexity-${indicator}`)
        }
    }
    
    for (const indicator of config.complexityIndicators.medium) {
        if (lowerMethodName.includes(indicator)) {
            score += 15
            factors.push(`medium-complexity-${indicator}`)
        }
    }

    // Determine complexity level
    let complexity: ComplexityLevel
    if (score >= 80) {
        complexity = 'EXTREME'
    } else if (score >= 50) {
        complexity = 'HIGH'
    } else if (score >= 20) {
        complexity = 'MEDIUM'
    } else {
        complexity = 'LOW'
    }

    return { complexity, factors }
}

/**
 * 💰 **Estimate operation cost**
 * Based on method patterns and complexity
 */
export function estimateOperationCost(
    methodName: Readonly<string>,
    operation: OperationType,
    complexity: ComplexityLevel,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: ReadonlyDeep<IPatternConfig> = DEFAULT_PATTERN_CONFIG
): CostLevel {
    const lowerMethodName = methodName.toLowerCase()

    // Check for expensive operations
    for (const indicator of config.costIndicators.expensive) {
        if (lowerMethodName.includes(indicator)) {
            return 'EXPENSIVE'
        }
    }

    // Check for high-cost operations
    for (const indicator of config.costIndicators.high) {
        if (lowerMethodName.includes(indicator)) {
            return 'HIGH'
        }
    }

    // Check for medium-cost operations
    for (const indicator of config.costIndicators.medium) {
        if (lowerMethodName.includes(indicator)) {
            return 'MEDIUM'
        }
    }

    // Base cost calculation
    const baseCost = getBaseCostForOperation(operation) + getComplexityAdjustment(complexity)

    // Map to cost level
    if (baseCost >= 5) {return 'EXPENSIVE'}
    if (baseCost >= 4) {return 'HIGH'}
    if (baseCost >= 2) {return 'MEDIUM'}
    if (baseCost >= 1) {return 'LOW'}
    return 'MINIMAL'
}

/**
 * 🎯 **Main semantic context detection function**
 * Combines all detection methods for comprehensive analysis
 */
export function detectSemanticContext(
    methodName: Readonly<string>,
    args: ReadonlyDeep<readonly unknown[]> = [],
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    config: ReadonlyDeep<IPatternConfig> = DEFAULT_PATTERN_CONFIG
): ISemanticContext {
    // Detect operation
    const operationResult = detectOperation(methodName, config)
    
    // Detect domain
    const domainResult = detectDomain(methodName, config)
    
    // Calculate complexity
    const complexityResult = calculateComplexity(methodName, args, config)
    
    // Estimate cost
    const estimatedCost = estimateOperationCost(
        methodName, 
        operationResult.operation, 
        complexityResult.complexity, 
        config
    )

    // Detect entity type from method name
    const entityType = detectEntityType(methodName)

    // Calculate overall confidence
    const overallConfidence = (operationResult.confidence + domainResult.confidence) / 2

    return {
        operation: operationResult.operation,
        domain: domainResult.domain,
        complexity: complexityResult.complexity,
        confidence: overallConfidence,
        metadata: {
            detectedPatterns: [
                ...operationResult.patterns,
                ...domainResult.keywords,
                ...complexityResult.factors
            ],
            entityType,
            estimatedCost
        }
    }
} 