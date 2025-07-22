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

// ==== Imports ====
import { ReadonlyDeep } from 'type-fest'
import { 
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError
} from '@/logger/decorators/core-logging.ts'
import { type ILogDecoratorConfig, DEFAULT_LOG_CONFIG } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ ENTERPRISE LOG DECORATOR IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Log Decorator with Enterprise Features**
 * 
 * Advanced logging decorator with correlation, semantic detection, and anomaly monitoring.
 * Now uses the modern ILogDecoratorConfig interface directly.
 * 
 * @param config - Enterprise logging configuration
 * @returns Method decorator for automatic logging
 */
export function log(config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG): MethodDecorator {
    return function(
        target: ReadonlyDeep<object>,
        propertyKey: string | symbol,
        descriptor: ReadonlyDeep<PropertyDescriptor>
    ): PropertyDescriptor {
        // 🎯 Get the original method with proper typing
        const originalMethod = descriptor.value as (...args: readonly unknown[]) => Promise<unknown>
        
        if (typeof originalMethod !== 'function') {
            throw new Error(`@log can only be applied to methods, got ${typeof originalMethod}`)
        }
        
        // 🎯 Create enhanced async wrapper with direct enhanced logging
        const enhancedMethod = async function(
            this: unknown,
            ...args: readonly unknown[]
        ): Promise<unknown> {
            // Use enhanced logging with enterprise features
            const startResult = logEnhancedMethodStart(
                target.constructor.name,
                String(propertyKey),
                args,
                config
            )

            try {
                const result = await originalMethod.apply(this, args as unknown[])
                
                // Log successful completion
                logEnhancedMethodSuccess(startResult, result, config)
                
                return result
            } catch (error: unknown) {
                // Log error with enhanced context
                logEnhancedMethodError(startResult, error, config)
                
                throw error
            }
        }
        
        return {
            ...descriptor,
            value: enhancedMethod
        }
    }
} 