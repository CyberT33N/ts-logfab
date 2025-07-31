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
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'
import { type ILogDecoratorConfig } from '@/decorators/types.ts'
import { isStructuredLoggingEnabled } from '@/logger/adaptive-logging/index.ts'
import { 
    getCurrentCorrelationContext, 
    createCorrelationContext, 
    type ICorrelationContext 
} from '@/logger/correlation-context/index.ts'
import { detectSemanticContext, type ISemanticContext } from '@/logger/semantic-detector/index.ts'
import { toWritable } from '@/utils/data-utils.ts'
import { type ILogContext } from '../types.ts'
import { type IEnhancedContextData } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED CONTEXT CREATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create correlation context from config**
 * 
 * @param config - Log decorator configuration
 * @param className - Target class name
 * @param methodName - Target method name
 * 
 * @returns Correlation context or undefined if disabled
 */
function createCorrelationFromConfig(
    config: ReadonlyDeep<ILogDecoratorConfig>,
    className: string,
    methodName: string
): ICorrelationContext | undefined {
    const { correlationContext } = config
    const { enabled, correlationId, workflowId, requestId, inheritFromParent } = correlationContext ?? {}

    if (enabled !== true) {
        return undefined
    }

    const hasCustomValues = Boolean(
        correlationId ?? 
        workflowId ?? 
        requestId
    )

    if (hasCustomValues) {
        const baseContext = createCorrelationContext({
            requestId: requestId ?? randomUUID(),
            metadata: {
                className,
                methodName,
                origin: 'enterprise-decorator'
            }
        })
        
        // Manual workflowId and correlationId assignment (if provided)
        return {
            ...baseContext,
            correlationId: correlationId ?? baseContext.correlationId,
            workflowId: workflowId ?? baseContext.workflowId
        }
    }

    // Get or create correlation context
    const existing = getCurrentCorrelationContext()

    if (existing && inheritFromParent !== false) {
        return existing
    }

    return createCorrelationContext({
        requestId: randomUUID(),
        metadata: {
            className,
            methodName,
            origin: 'enterprise-decorator'
        }
    })
}

/**
 * 🎯 **Create semantic context from config**
 * 
 * @param config - Log decorator configuration
 * @param methodName - Target method name
 * @param args - Method arguments array
 * 
 * @returns Semantic context or undefined if disabled
 */
function createSemanticFromConfig(
    config: ReadonlyDeep<ILogDecoratorConfig>,
    methodName: string,
    args: readonly unknown[]
): ISemanticContext | undefined {
    const { semanticContext } = config
    const { enabled, domain, operation, complexity, tags, businessKey } = semanticContext ?? {}

    if (enabled !== true) {
        return undefined
    }

    if (domain !== undefined || operation !== undefined) {
        // Create semantic context with proper interface structure
        return {
            domain: domain ?? 'GENERAL',
            operation: operation ?? 'UNKNOWN',
            complexity: complexity ?? 'MEDIUM',
            confidence: 0.8, // High confidence for manual configuration
            metadata: {
                detectedPatterns: tags ?? [],
                entityType: businessKey,
                estimatedCost: 'MEDIUM' as const
            }
        }
    }

    return detectSemanticContext(methodName, args)
}

/**
 * 🎯 **Create enhanced context for enterprise decorator logging**
 * 
 * Automatically adds correlation and semantic context based on modern config.
 * Returns enterprise-grade type-safe enhanced context data.
 * 
 * @param className - Target class name for context
 * @param methodName - Target method name for context
 * @param args - Method arguments array
 * @param config - Enterprise logging configuration
 * 
 * @returns Type-safe enhanced context data with correlation, semantic, and environment information
 */
export function createEnhancedContext(
    className: string,
    methodName: string,
    args: readonly unknown[],
    config: ReadonlyDeep<ILogDecoratorConfig>
): IEnhancedContextData {
    const baseContext: ILogContext = {
        className,
        methodName,
        methodSignature: `${className}.${methodName}`,
        operationId: randomUUID(),
        args: Array.isArray(args) ? args.reduce<Record<string, unknown>>(
            (acc: Readonly<Record<string, unknown>>, arg: unknown, index: number) => {
                const mutableAcc = toWritable(acc)
                const key = `arg${String(index)}`
                mutableAcc[key] = arg
                return mutableAcc
            }, {}) : {}
    }

    const correlation = createCorrelationFromConfig(config, className, methodName)
    const semantic = createSemanticFromConfig(config, methodName, args)

    return {
        ...baseContext,
        correlation,
        semantic,
        anomalyDetection: config.anomalyDetection?.enabled === true,
        environment: {
            loggingFormat: config.environment?.forceFormat,
            disabledInEnvironments: config.environment?.disableInEnvironments
        },
        customContext: config.customContext
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PREFIX CREATION 
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Creates a contextual prefix for enhanced enterprise decorator logging**
 * 
 * @param className - Target class name
 * @param methodName - Target method name
 * @param config - Log decorator configuration
 * 
 * @returns Formatted logging prefix string
 */
export function createEnhancedDecoratorPrefix(
    className: string,
    methodName: string,
    config: ReadonlyDeep<ILogDecoratorConfig>
): string {
    const { customPrefix, semanticContext, correlationContext } = config
    
    // Use custom prefix if provided
    if (customPrefix !== undefined && customPrefix.length > 0) {
        return customPrefix
    }
    
    const parts = [className, methodName]
    
    // Add semantic context indicators if enabled
    if (semanticContext?.enabled === true) {
        let semanticIcon: string
        const { domain, operation } = semanticContext
        
        if (domain !== undefined && operation !== undefined) {
            // Use configured values
            semanticIcon = getSemanticIconFromConfig(domain, operation)
        } else {
            // Detect from method name
            const detectedSemantic = detectSemanticContext(methodName, [])
            semanticIcon = getSemanticIcon(detectedSemantic)
        }
        
        parts.push(semanticIcon)
    }
    
    // Add correlation info in structured format if enabled
    if (correlationContext?.enabled === true && isStructuredLoggingEnabled()) {
        const correlationId = correlationContext.correlationId ?? randomUUID()
        parts.push(`[${correlationId.slice(0, 8)}]`)
    }
    
    return parts.join('::')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SEMANTIC ICON MAPPING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Get semantic context icon from config**
 * 
 * @param domain - Semantic domain type
 * @param operation - Semantic operation type
 * 
 * @returns Unicode icon string representing the semantic context
 */
function getSemanticIconFromConfig(
    domain: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL',
    operation: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
): string {
    const domainIcons = {
        USER: '👤',
        ORDER: '📦', 
        PRODUCT: '🛍️',
        FINANCE: '💰',
        SYSTEM: '⚙️',
        GENERAL: '📄'
    }
    
    const operationIcons = {
        READ: '📖',
        WRITE: '✏️',
        UPDATE: '🔄',
        DELETE: '🗑️',
        COMPUTE: '🧮',
        UNKNOWN: '❓'
    }
    
    const domainIcon = domainIcons[domain]
    const operationIcon = operationIcons[operation]
    
    return `${domainIcon}${operationIcon}`
}

/**
 * 🎯 **Get semantic context icon from detected context**
 * 
 * @param semantic - Detected semantic context
 * 
 * @returns Unicode icon string representing the semantic context
 */
export function getSemanticIcon(semantic: ReadonlyDeep<ISemanticContext>): string {
    const domainIcons = {
        USER: '👤',
        ORDER: '📦', 
        PRODUCT: '🛍️',
        FINANCE: '💰',
        SYSTEM: '⚙️',
        AUTH: '🔐',
        NOTIFICATION: '🔔',
        ANALYTICS: '📊',
        INTEGRATION: '🔗',
        GENERAL: '📄'
    }
    
    const operationIcons = {
        READ: '📖',
        WRITE: '✏️',
        UPDATE: '🔄',
        DELETE: '🗑️',
        COMPUTE: '🧮',
        VALIDATE: '✅',
        TRANSFORM: '🔄',
        SEARCH: '🔍',
        AGGREGATE: '📊',
        UNKNOWN: '❓'
    }
    
    const domainIcon = domainIcons[semantic.domain]
    const operationIcon = operationIcons[semantic.operation]
    
    return `${domainIcon || '📄'}${operationIcon || '❓'}`
} 