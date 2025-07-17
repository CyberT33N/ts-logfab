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