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
██                  🎯 BASIC DECORATOR CONFIGURATIONS                         ██
██                   ENTERPRISE BASIC CONFIGURATIONS                         ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 BASIC DECORATOR CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type ILogDecoratorConfig } from '@/decorators/index.ts'
import env from '@/env.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 BASIC CONFIGURATION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Complete Basic Configuration**
 *
 * Demonstrates all basic configuration options
 *
 * @returns Basic logging configuration object with default settings
 *
 * @example
 * ```typescript
 * const config = getBasicConfig();
 * console.log(config.level); // 'info'
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getBasicConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        logDebug: false,
        customContext: {
            module: 'enterprise-basic',
            version: '1.0.0',
            environment: env.NODE_ENV
        },
        customPrefix: 'ENTERPRISE-BASIC'
    }
}

/**
 * 🔧 **Enterprise Method Signature Configuration**
 *
 * Demonstrates intelligent method signature overrides
 *
 * @returns Configuration object with intelligent method signature overrides
 *
 * @example
 * ```typescript
 * const config = getMethodSignatureConfig();
 * console.log(config.methodSignature.isAsync); // true
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getMethodSignatureConfig(): ILogDecoratorConfig {
    return {
        level: 'debug',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        methodSignature: {
            parameterNames: ['userId', 'searchCriteria', 'options'],
            parameterTypes: ['number', 'ISearchCriteria', 'ISearchOptions'],
            isAsync: true,
            returnType: 'Promise<IUser[]>',
            fullSignature:
				// eslint-disable-next-line max-len
				'async searchUsers(userId: number, searchCriteria: ISearchCriteria, options: ISearchOptions): Promise<IUser[]>'
        },
        customContext: {
            signatureType: 'enterprise-method-signature',
            intelligentSigning: true
        }
    }
}

/**
 * 🔗 **Complete Correlation Context Configuration**
 *
 * Demonstrates all correlation context options
 *
 * @returns Configuration object with correlation context settings
 *
 * @example
 * ```typescript
 * const config = getCorrelationContextConfig();
 * console.log(config.correlationContext.enabled); // true
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getCorrelationContextConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        correlationContext: {
            enabled: true,
            correlationId: 'enterprise-correlation-12345',
            workflowId: 'user-management-workflow',
            requestId: 'req-enterprise-67890',
            userId: 'enterprise-user-123',
            inheritFromParent: true
        },
        customContext: {
            correlationType: 'enterprise-correlation',
            distributedTracing: true
        }
    }
} 