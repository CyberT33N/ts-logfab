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
██               🚀 ADVANCED DECORATOR CONFIGURATIONS                        ██
██                ENTERPRISE ADVANCED CONFIGURATIONS                         ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ADVANCED DECORATOR CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type ILogDecoratorConfig } from '@/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 ADVANCED CONFIGURATION TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Complete Semantic Context Configuration**
 *
 * Demonstrates all semantic context options
 *
 * @returns Configuration object with semantic context settings
 *
 * @example
 * ```typescript
 * const config = getSemanticContextConfig();
 * console.log(config.semanticContext.domain); // 'USER'
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getSemanticContextConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        semanticContext: {
            enabled: true,
            domain: 'USER',
            operation: 'READ',
            complexity: 'HIGH',
            businessKey: 'enterprise-user-operation-12345',
            tags: ['enterprise', 'user-management', 'critical', 'audit']
        },
        customContext: {
            semanticType: 'enterprise-semantic-analysis',
            businessContext: true
        }
    }
}

/**
 * 🚨 **Complete Anomaly Detection Configuration**
 *
 * Demonstrates all anomaly detection options
 *
 * @returns Configuration object with anomaly detection settings
 *
 * @example
 * ```typescript
 * const config = getAnomalyDetectionConfig();
 * console.log(config.anomalyDetection.enabled); // true
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getAnomalyDetectionConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        anomalyDetection: {
            enabled: true,
            minSamples: 15,
            thresholdMultiplier: 2.5,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'EnterpriseService::performanceMethod'
        },
        customContext: {
            anomalyType: 'enterprise-anomaly-detection',
            alertingEnabled: true
        }
    }
}

/**
 * 🌍 **Complete Environment Configuration**
 *
 * Demonstrates all environment configuration options
 *
 * @returns Configuration object with environment-specific settings
 *
 * @example
 * ```typescript
 * const config = getEnvironmentConfig();
 * console.log(config.environment.forceEnvironment); // 'production'
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getEnvironmentConfig(): ILogDecoratorConfig {
    return {
        level: 'debug',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        environment: {
            forceEnvironment: 'production',
            forceFormat: 'machine',
            disableInEnvironments: ['test']
        },
        customContext: {
            environmentType: 'enterprise-environment-control',
            environmentOverride: true
        }
    }
}

/**
 * 🎯 **New Enhanced Features Configuration (2024)**
 *
 * Demonstrates the latest Enhanced features with explicit configuration
 *
 * @returns Configuration object with enhanced features enabled
 *
 * @example
 * ```typescript
 * const config = getEnhancedFeaturesConfig();
 * console.log(config.correlationContext.enabled); // true
 * ```
 *
 * @see {@link ILogDecoratorConfig} for configuration structure
 */
export function getEnhancedFeaturesConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        
        // 🔥 **NEW ENHANCED FEATURES - Direct Configuration**
        correlationContext: {
            enabled: true,
            correlationId: 'enhanced-2024-correlation',
            workflowId: 'enhanced-workflow-demo',
            requestId: 'enhanced-req-demo-123',
            userId: 'enhanced-user-demo',
            inheritFromParent: true
        },
        
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'MEDIUM',
            businessKey: 'enhanced-analytics-2024',
            tags: ['enhanced', 'analytics', '2024', 'demo']
        },
        
        anomalyDetection: {
            enabled: true,
            minSamples: 10,
            thresholdMultiplier: 2.0,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'EnhancedDemo::analyticsMethod'
        },
        
        customContext: {
            enhancedFeatures: true,
            demonstrationType: 'enhanced-analytics-2024',
            newCapabilities: ['correlation', 'semantic', 'anomaly']
        }
    }
} 