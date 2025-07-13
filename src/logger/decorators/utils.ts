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
██              🎯 DECORATOR LOGGING UTILITIES MODULE                        ██
██          UTILITY FUNCTIONS AND HELPERS FOR DECORATOR LOGGING             ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'
import { isStructuredLoggingEnabled } from '@/logger/AdaptiveLogging/index.ts'
import { 
    getCurrentCorrelationContext, 
    createCorrelationContext, 
    type ICorrelationContext 
} from '@/logger/correlation-context/index.ts'
import { detectSemanticContext, type ISemanticContext } from '@/logger/semantic-detector.ts'
import { toWritable } from '@/utils/data-utils.ts'
import { type ILogContext } from '../types.ts'
import { type IDecoratorLoggingConfig, DEFAULT_DECORATOR_CONFIG } from './config.ts'
import { type IEnhancedLogContext } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED CONTEXT CREATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create enhanced context for decorator logging**
 * 
 * Automatically adds correlation and semantic context
 */
export function createEnhancedContext(
    className: string,
    methodName: string,
    args: ReadonlyDeep<unknown[]>,
    config: ReadonlyDeep<IDecoratorLoggingConfig> = DEFAULT_DECORATOR_CONFIG
): IEnhancedLogContext {
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

    // Add correlation context if enabled
    let correlation: ICorrelationContext | undefined
    if (config.enableCorrelation) {
        correlation = getCurrentCorrelationContext()
        correlation ??= createCorrelationContext({
            requestId: randomUUID(),
            metadata: {
                className,
                methodName,
                origin: 'decorator'
            }
        })
    }

    // Add semantic context if enabled
    let semantic: ISemanticContext | undefined
    if (config.enableSemanticDetection) {
        semantic = detectSemanticContext(methodName, args)
    }

    return {
        ...baseContext,
        correlation,
        semantic,
        anomalyDetection: config.enableAnomalyDetection
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PREFIX CREATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Creates a contextual prefix for enhanced decorator-based logging**
 */
export function createEnhancedDecoratorPrefix(
    className: string,
    methodName: string,
    context: ReadonlyDeep<IEnhancedLogContext>
): string {
    const parts = [className, methodName]
    
    // Add semantic context indicators
    if (context.semantic) {
        const semanticIcon = getSemanticIcon(context.semantic)
        parts.push(semanticIcon)
    }
    
    // Add correlation info in structured format
    if (context.correlation && isStructuredLoggingEnabled()) {
        parts.push(`[${context.correlation.correlationId.slice(0, 8)}]`)
    }
    
    return parts.join('::')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SEMANTIC ICON MAPPING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Get semantic context icon**
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
        read: '📖',
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
    const operationKey = semantic.operation.toLowerCase() as keyof typeof operationIcons
    const operationIcon = operationIcons[operationKey]
    
    return `${domainIcon || '📄'}${operationIcon || '❓'}`
} 