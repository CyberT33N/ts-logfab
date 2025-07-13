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
// 🧠 SEMANTIC CONTEXT DETECTION - ENTERPRISE PATTERN RECOGNITION
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'

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
interface IPatternConfig {
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

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DEFAULT PATTERN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_PATTERN_CONFIG: IPatternConfig = {
    operations: {
        READ: [
            /^(get|find|fetch|read|retrieve|search|list|show|query|select|load|check)/i,
            /^(is|has|can|should|exists|contains)/i,
            /(search|find|query|lookup|discover)$/i
        ],
        WRITE: [
            /^(create|add|insert|save|store|put|post|new|make|generate)/i,
            /(create|add|insert|store|save|register)$/i
        ],
        UPDATE: [
            /^(update|modify|edit|change|patch|set|alter|adjust|sync)/i,
            /(update|modify|edit|change|patch|sync)$/i
        ],
        DELETE: [
            /^(delete|remove|destroy|drop|clear|purge|clean|erase)/i,
            /(delete|remove|destroy|clean|purge)$/i
        ],
        COMPUTE: [
            /^(calculate|compute|process|analyze|generate|transform|convert)/i,
            /(calculate|compute|process|analyze|transform|aggregate)$/i
        ],
        VALIDATE: [
            /^(validate|verify|check|test|confirm|ensure|assert)/i,
            /(validate|verify|check|test|confirm)$/i
        ],
        TRANSFORM: [
            /^(transform|convert|map|format|parse|serialize|encode|decode)/i,
            /(transform|convert|format|parse|serialize)$/i
        ],
        SEARCH: [
            /^(search|filter|sort|order|group|index|scan)/i,
            /(search|filter|sort|index|scan)$/i
        ],
        AGGREGATE: [
            /^(aggregate|sum|count|total|average|min|max|merge|combine)/i,
            /(aggregate|sum|count|total|average|merge)$/i
        ],
        UNKNOWN: []
    },
    domains: {
        USER: ['user', 'account', 'profile', 'customer', 'person', 'member', 'client', 'employee'],
        ORDER: ['order', 'purchase', 'transaction', 'cart', 'checkout', 'booking', 'reservation'],
        PRODUCT: ['product', 'item', 'catalog', 'inventory', 'stock', 'goods', 'article', 'sku'],
        FINANCE: ['payment', 'billing', 'invoice', 'tax', 'price', 'cost', 'money', 'currency', 'wallet'],
        AUTH: ['auth', 'login', 'logout', 'token', 'session', 'permission', 'role', 'access', 'security'],
        NOTIFICATION: ['notification', 'message', 'email', 'sms', 'alert', 'reminder', 'mail'],
        ANALYTICS: ['analytics', 'metrics', 'stats', 'report', 'tracking', 'event', 'log', 'monitor'],
        INTEGRATION: ['api', 'webhook', 'sync', 'import', 'export', 'integration', 'external'],
        SYSTEM: ['system', 'config', 'setting', 'admin', 'health', 'status', 'info', 'debug'],
        GENERAL: []
    },
    complexityIndicators: {
        high: ['batch', 'bulk', 'mass', 'complex', 'advanced', 'deep', 'recursive', 'heavy'],
        medium: ['multi', 'group', 'collection', 'list', 'array', 'set', 'range']
    },
    costIndicators: {
        expensive: ['migrate', 'rebuild', 'reindex', 'backup', 'restore', 'export', 'import'],
        high: ['batch', 'bulk', 'mass', 'analyze', 'aggregate', 'report', 'calculate'],
        medium: ['search', 'query', 'process', 'transform', 'validate', 'sync']
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 SEMANTIC DETECTION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

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

    // Test each operation type
    for (const [operationType, patterns] of Object.entries(config.operations)) {
        if (operationType === 'UNKNOWN') {
            continue
        }

        for (const pattern of patterns) {
            if (pattern.test(methodName)) {
                detectedPatterns.push(pattern.source)
                
                // Calculate confidence based on pattern specificity
                const confidence = calculatePatternConfidence(methodName, pattern)
                
                if (confidence > highestConfidence) {
                    highestConfidence = confidence
                    bestMatch = operationType as OperationType
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

    // Test each domain
    for (const [domainType, keywords] of Object.entries(config.domains)) {
        if (domainType === 'GENERAL') {
            continue
        }

        for (const keyword of keywords) {
            if (lowerMethodName.includes(keyword)) {
                detectedKeywords.push(keyword)
                
                // Calculate confidence based on keyword specificity and position
                const confidence = calculateKeywordConfidence(lowerMethodName, keyword)
                
                if (confidence > highestConfidence) {
                    highestConfidence = confidence
                    bestMatch = domainType.toUpperCase() as DomainType
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

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 PRIVATE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 📊 **Calculate pattern confidence**
 * Higher confidence for more specific matches
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function calculatePatternConfidence(methodName: Readonly<string>, pattern: ReadonlyDeep<RegExp>): number {
    const match = methodName.match(pattern)
    if (match === null) {return 0}

    let confidence = 0.5 // Base confidence

    // Bonus for exact word boundary matches
    if (pattern.source.includes('\\b') || pattern.source.includes('^') || pattern.source.includes('$')) {
        confidence += 0.3
    }

    // Bonus for longer matches
    const matchLength = match[0].length
    const nameLength = methodName.length
    confidence += (matchLength / nameLength) * 0.2

    // Bonus for matches at start or end
    if (match.index === 0) {
        confidence += 0.1
    }
    if (match.index !== undefined && match.index + matchLength === nameLength) {
        confidence += 0.1
    }

    return Math.min(confidence, 1.0)
}

/**
 * 🔍 **Calculate keyword confidence**
 * Higher confidence for more prominent keyword positions
 */
function calculateKeywordConfidence(methodName: Readonly<string>, keyword: Readonly<string>): number {
    const index = methodName.indexOf(keyword)
    if (index === -1) {return 0}

    let confidence = 0.4 // Base confidence

    // Bonus for keyword at start
    if (index === 0) {
        confidence += 0.3
    }

    // Bonus for word boundary
    if (index === 0 || methodName[index - 1] === '_' || methodName[index - 1] === '-') {
        confidence += 0.2
    }

    // Bonus for longer keywords (more specific)
    confidence += (keyword.length / methodName.length) * 0.1

    return Math.min(confidence, 1.0)
}

/**
 * 💰 **Get base cost for operation type**
 */
function getBaseCostForOperation(operation: OperationType): number {
    switch (operation) {
    case 'READ':
    case 'VALIDATE':
        return 1
    case 'WRITE':
    case 'UPDATE':
    case 'TRANSFORM':
        return 2
    case 'DELETE':
    case 'COMPUTE':
    case 'AGGREGATE':
        return 3
    case 'SEARCH':
        return 2
    case 'UNKNOWN':
    default:
        return 1
    }
}

/**
 * 💰 **Get complexity adjustment**
 */
function getComplexityAdjustment(complexity: ComplexityLevel): number {
    switch (complexity) {
    case 'LOW':
        return 0
    case 'MEDIUM':
        return 1
    case 'HIGH':
        return 2
    case 'EXTREME':
        return 3
    default:
        return 0
    }
}

/**
 * 🏷️ **Detect entity type from method name**
 * Attempts to identify the main entity being operated on
 */
function detectEntityType(methodName: Readonly<string>): string | undefined {
    // Common entity patterns in method names
    const entityPatterns = [
        /(?:get|create|update|delete|find|save|load)([A-Z][a-zA-Z]*)/,
        /([A-Z][a-zA-Z]*)(?:Service|Repository|Manager|Controller)$/,
        /^([a-z]+)(?:By|With|For|From)/i
    ]

    for (const pattern of entityPatterns) {
        const match = methodName.match(pattern)
        if (match?.[1] !== undefined) {
            return match[1].toLowerCase()
        }
    }

    return undefined
}

/**
 * 🎨 **Create custom pattern configuration**
 * Allows extending or overriding default patterns
 */
export function createCustomPatternConfig(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    overrides: ReadonlyDeep<Partial<IPatternConfig>>
): IPatternConfig {
    return {
        operations: { ...DEFAULT_PATTERN_CONFIG.operations, ...overrides.operations },
        domains: { ...DEFAULT_PATTERN_CONFIG.domains, ...overrides.domains },
        complexityIndicators: { 
            ...DEFAULT_PATTERN_CONFIG.complexityIndicators, 
            ...overrides.complexityIndicators 
        },
        costIndicators: { 
            ...DEFAULT_PATTERN_CONFIG.costIndicators, 
            ...overrides.costIndicators 
        }
    } as IPatternConfig
} 