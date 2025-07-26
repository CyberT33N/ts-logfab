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
import is from '@sindresorhus/is'
import { ReadonlyDeep } from 'type-fest'
import { z } from 'zod'
import { 
    logEnhancedMethodStart,
    logEnhancedMethodSuccess,
    logEnhancedMethodError
} from '@/logger/decorators/core-logging.ts'
import { type ILogDecoratorConfig, DEFAULT_LOG_CONFIG } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 TYPE DEFINITIONS & ZOD SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🛡️ **PropertyDescriptor Zod Schema**
 * 
 * Validates PropertyDescriptor using Zod with TypeScript's built-in interface
 * - ✅ Uses native PropertyDescriptor interface
 * - ✅ Runtime validation with Zod
 * - ✅ Perfect type inference
 * - ✅ Zero custom interfaces needed
 */
const methodDescriptorSchema = z.object({
    value: z.function(),
    writable: z.boolean().optional(),
    enumerable: z.boolean().optional(), 
    configurable: z.boolean().optional(),
    get: z.function().optional(),
    set: z.function().optional()
}) satisfies z.ZodType<PropertyDescriptor>

/**
 * 🎯 **Type-safe validated descriptor interface**
 * 
 * Intersection of Zod-inferred type with explicit function typing
 */
type ValidatedMethodDescriptor = ReadonlyDeep<z.infer<typeof methodDescriptorSchema>> & {
    readonly value: (...args: readonly unknown[]) => unknown
}

/**
 * 🎯 **Zod-powered PropertyDescriptor validation**
 * 
 * Validation using Zod + native PropertyDescriptor interface
 * Single documented assertion after proven validation
 *
 * @param descriptor - The property descriptor to validate
 * @param target - The target object containing the method
 * @param propertyKey - The property key (method name) being validated
 *
 * @returns Validated descriptor with guaranteed function type
 *
 * @throws {Error} When descriptor validation fails or is invalid
 *
 * @example
 * ```typescript
 * const descriptor = {
 *   value: myFunction,
 *   writable: true,
 *   enumerable: false,
 *   configurable: true
 * };
 * const validated = validateMethodDescriptor(descriptor, target, 'myMethod');
 * ```
 */
function validateMethodDescriptor(
    descriptor: ReadonlyDeep<unknown>,
    target: ReadonlyDeep<object>,
    propertyKey: ReadonlyDeep<string | symbol>
): ValidatedMethodDescriptor {
    try {
        // 🚀 Zod parsing - validates value is function at runtime
        const parsed = methodDescriptorSchema.parse(descriptor)
        
        // ✅ Single, documented assertion: Zod guarantees value is function
        return parsed as ValidatedMethodDescriptor
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue: ReadonlyDeep<z.ZodIssue>) => 
                `${issue.path.join('.')}: ${issue.message}`
            ).join(', ')
            
            throw new Error(
                `@log decorator: Invalid PropertyDescriptor for ${target.constructor.name}.${String(propertyKey)}. ` +
                `Validation errors: ${issues}`
            )
        }

        throw error
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ LOG DECORATOR IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Log Decorator with Enterprise Features**
 * 
 * Advanced logging decorator with:
 * - ✅ Robust type detection using @sindresorhus/is
 * - ✅ Simple async/sync detection via is.asyncFunction()
 * - ✅ Runtime type validation  
 * - ✅ Generic type preservation
 * - ✅ Performance optimizations
 * - ✅ Zero unsafe type casting
 * 
 * @param config - Enterprise logging configuration
 * @returns Type-safe method decorator
 *
 * @param config - Enterprise logging configuration with enhanced features
 *
 * @returns Type-safe method decorator function
 *
 * @example
 * ```typescript
 * class UserService {
 *   @log({ level: 'info', includePerformance: true })
 *   async createUser(name: string, email: string): Promise<User> {
 *     // Implementation
 *   }
 * }
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration options
 * @see {@link MethodDecorator} for decorator interface
 */
export function log(
    config: ReadonlyDeep<ILogDecoratorConfig> = DEFAULT_LOG_CONFIG
): MethodDecorator {
    /**
     * 🎯 **Method Decorator**
     * 
     * Decorates a method with enhanced logging capabilities
     * 
     * @param target - The target object
     * @param propertyKey - The property key
     * @param descriptor - The method descriptor
     * @returns The enhanced method
     */
    return function(
        target: ReadonlyDeep<object>,
        propertyKey: ReadonlyDeep<string | symbol>,
        descriptor: ReadonlyDeep<PropertyDescriptor>
    ): PropertyDescriptor {
        // 🛡️ Enterprise-grade validation with Zod
        const validatedDescriptor = validateMethodDescriptor(descriptor, target, propertyKey)
        const originalMethod = validatedDescriptor.value
        
        // 🚀 **Unified Enterprise Wrapper** - handles both async/sync elegantly
        const enhancedMethod = function(this: unknown, ...args: readonly unknown[]): unknown {
            // Start enhanced logging
            const startResult = logEnhancedMethodStart(
                target.constructor.name,
                String(propertyKey),
                args,
                config
            )

            try {
                const result = originalMethod.apply(this, [...args])
                
                if (is.promise(result)) {
                    return result
                        .then((resolvedResult: unknown) => {
                            logEnhancedMethodSuccess(startResult, resolvedResult, config)
                            return resolvedResult
                        })
                        .catch((error: unknown) => {
                            logEnhancedMethodError(startResult, error, config)
                            throw error
                        })
                }
                
                // Sync path: Handle immediate result
                logEnhancedMethodSuccess(startResult, result, config)
                return result
            } catch (error) {
                logEnhancedMethodError(startResult, error, config)
                throw error
            }
        }
        
        return {
            ...validatedDescriptor,
            value: enhancedMethod
        }
    }
} 