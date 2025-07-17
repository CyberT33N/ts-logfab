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
██            🏗️ INFRASTRUCTURE MONITORING CONFIGURATIONS                   ██
██                ENTERPRISE-GRADE INFRASTRUCTURE CONFIGS                   ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🏗️ INFRASTRUCTURE MONITORING CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type ILogDecoratorConfig } from '@/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🏗️ INFRASTRUCTURE MONITORING CONFIGURATION FRAMEWORK
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🛡️ **Security Monitoring**
 *
 * Configuration for security event monitoring and alerting
 */
export function getSecurityMonitoringConfig(): ILogDecoratorConfig {
    return {
        level: 'warn',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        logDebug: true,
        correlationContext: {
            enabled: true,
            workflowId: 'security-monitoring-workflow',
            inheritFromParent: true
        },
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'HIGH',
            businessKey: 'enterprise-security-monitoring',
            tags: ['security', 'monitoring', 'threat-detection', 'compliance']
        },
        customContext: {
            monitoringType: 'SECURITY',
            threatDetection: true,
            complianceTracking: true,
            auditLogging: true,
            securityIncidentResponse: true
        },
        customPrefix: 'SECURITY-MONITOR'
    }
}

/**
 * 💾 **Database Performance Monitoring**
 *
 * Configuration for database operation monitoring
 */
export function getDatabasePerformanceConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        anomalyDetection: {
            enabled: true,
            minSamples: 15,
            thresholdMultiplier: 2.5,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'DatabasePerformanceService'
        },
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'MEDIUM',
            businessKey: 'enterprise-database-performance',
            tags: ['database', 'performance', 'query', 'optimization']
        },
        customContext: {
            monitoringType: 'DATABASE_PERFORMANCE',
            queryOptimization: true,
            connectionPooling: true,
            indexAnalysis: true
        },
        customPrefix: 'DB-PERF'
    }
}

/**
 * 🌐 **API Gateway Monitoring**
 *
 * Configuration for API gateway and microservices monitoring
 */
export function getAPIGatewayConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        correlationContext: {
            enabled: true,
            workflowId: 'api-gateway-monitoring',
            inheritFromParent: true
        },
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'HIGH',
            businessKey: 'enterprise-api-gateway',
            tags: ['api', 'gateway', 'microservices', 'routing']
        },
        anomalyDetection: {
            enabled: true,
            minSamples: 12,
            thresholdMultiplier: 2.0,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'APIGatewayService'
        },
        customContext: {
            monitoringType: 'API_GATEWAY',
            routingAnalysis: true,
            loadBalancing: true,
            rateLimiting: true
        },
        customPrefix: 'API-GATEWAY'
    }
}

/**
 * 🎯 **Master Monitoring Configuration**
 *
 * Complete monitoring configuration with all features
 */
export function getMasterMonitoringConfig(): ILogDecoratorConfig {
    return {
        level: 'debug',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        logDebug: true,

        // Correlation context for distributed tracing
        correlationContext: {
            enabled: true,
            correlationId: 'master-monitoring-correlation',
            workflowId: 'enterprise-master-monitoring',
            requestId: 'master-monitoring-request',
            userId: 'enterprise-monitoring-system',
            inheritFromParent: true
        },

        // Semantic context for business intelligence
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'HIGH',
            businessKey: 'enterprise-master-monitoring',
            tags: ['master', 'monitoring', 'enterprise', 'comprehensive']
        },

        // Anomaly detection for proactive alerting
        anomalyDetection: {
            enabled: true,
            minSamples: 25,
            thresholdMultiplier: 3.0,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'MasterMonitoringService'
        },

        // Custom context for comprehensive monitoring
        customContext: {
            monitoringType: 'MASTER_MONITORING',
            comprehensiveTracking: true,
            alertingEnabled: true,
            dashboardIntegration: true,
            analyticsIntegration: true,
            complianceTracking: true,
            securityMonitoring: true,
            performanceBaseline: 'COMPREHENSIVE'
        },

        customPrefix: 'MASTER-MONITOR'
    }
} 