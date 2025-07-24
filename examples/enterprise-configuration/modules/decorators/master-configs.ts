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
██                  🎯 MASTER DECORATOR CONFIGURATIONS                        ██
██               ENTERPRISE MASTER & RUNTIME CONFIGURATIONS                  ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 MASTER DECORATOR CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type ILogDecoratorConfig } from '@/decorators/index.ts'
import env from '@/env.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 MASTER CONFIGURATION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Master Configuration**
 *
 * Demonstrates ALL configuration options combined
 *
 * @returns Complete configuration object with all features enabled
 *
 * @example
 * ```typescript
 * const config = getMasterConfig();
 * console.log(config.level); // 'debug'
 * console.log(config.anomalyDetection.enabled); // true
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getMasterConfig(): ILogDecoratorConfig {
    return {
        // Basic configuration
        level: 'debug',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        logDebug: true,
        customContext: {
            module: 'enterprise-master',
            version: '2.0.0',
            environment: 'production',
            masterConfiguration: true
        },
        customPrefix: 'ENTERPRISE-MASTER',

        // Method signature configuration
        methodSignature: {
            parameterNames: ['businessData', 'processingOptions', 'auditContext'],
            parameterTypes: ['IBusinessData', 'IProcessingOptions', 'IAuditContext'],
            returnType: 'Promise<IBusinessResult>',
            fullSignature:
				// eslint-disable-next-line max-len
				'async processCriticalBusinessData(businessData: IBusinessData, processingOptions: IProcessingOptions, auditContext: IAuditContext): Promise<IBusinessResult>'
        },

        // Correlation context configuration
        correlationContext: {
            enabled: true,
            correlationId: 'master-correlation-enterprise-12345',
            workflowId: 'enterprise-critical-workflow',
            requestId: 'master-req-enterprise-67890',
            userId: 'enterprise-master-user-123',
            inheritFromParent: true
        },

        // Semantic context configuration
        semanticContext: {
            enabled: true,
            domain: 'FINANCE',
            operation: 'COMPUTE',
            complexity: 'HIGH',
            businessKey: 'enterprise-master-finance-12345',
            tags: ['enterprise', 'finance', 'critical', 'audit', 'master-config']
        },

        // Anomaly detection configuration
        anomalyDetection: {
            enabled: true,
            minSamples: 20,
            thresholdMultiplier: 3.0,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'EnterpriseService::masterMethod'
        },

        // Environment configuration
        environment: {
            forceEnvironment: 'production',
            forceFormat: 'machine',
            disableInEnvironments: ['test', 'development']
        }
    }
}

/**
 * 🎚️ **Runtime Configuration**
 *
 * Demonstrates adaptive runtime configuration based on environment
 *
 * @returns Adaptive configuration object based on current environment
 *
 * @example
 * ```typescript
 * const config = getRuntimeConfig();
 * console.log(config.level); // 'info' in production, 'debug' in development
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getRuntimeConfig(): ILogDecoratorConfig {
    const isProduction = env.NODE_ENV === 'production'

    return {
        level: isProduction ? 'info' : 'debug',
        includePerformance: true,
        includeArgs: !isProduction,
        includeResult: !isProduction,
        logDebug: !isProduction,
        customContext: {
            runtimeConfig: true,
            environment: env.NODE_ENV,
            adaptiveLogging: true
        },
        correlationContext: {
            enabled: true,
            workflowId: `runtime-${env.NODE_ENV}-workflow`
        },
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            tags: ['runtime', 'adaptive', env.NODE_ENV]
        },
        anomalyDetection: {
            enabled: isProduction,
            thresholdMultiplier: isProduction ? 2.0 : 3.0
        },
        environment: {
            forceEnvironment: env.NODE_ENV,
            forceFormat: isProduction ? 'machine' : 'human'
        }
    }
} 