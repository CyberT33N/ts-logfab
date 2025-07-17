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
██               🔍 PERFORMANCE MONITORING CONFIGURATIONS                     ██
██                    ENTERPRISE-GRADE PERFORMANCE CONFIGS                   ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🔍 PERFORMANCE MONITORING CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type ILogDecoratorConfig } from '@/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🚨 PERFORMANCE MONITORING CONFIGURATION FRAMEWORK
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔍 **Critical Performance Monitoring**
 *
 * Configuration for mission-critical performance monitoring
 */
export function getCriticalPerformanceConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        logSuccess: true,
        logStart: true,
        anomalyDetection: {
            enabled: true,
            minSamples: 10,
            thresholdMultiplier: 1.5,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'CriticalPerformanceService'
        },
        correlationContext: {
            enabled: true,
            workflowId: 'critical-performance-monitoring',
            inheritFromParent: true
        },
        customContext: {
            monitoringLevel: 'CRITICAL',
            alertingEnabled: true,
            dashboardIntegration: true,
            performanceBaseline: 'STRICT'
        },
        customPrefix: 'CRITICAL-PERF'
    }
}

/**
 * 📊 **Business Metrics Monitoring**
 *
 * Configuration for business metrics and KPI tracking
 */
export function getBusinessMetricsConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: true,
        includeResult: true,
        semanticContext: {
            enabled: true,
            domain: 'SYSTEM',
            operation: 'COMPUTE',
            complexity: 'HIGH',
            businessKey: 'enterprise-business-metrics',
            tags: ['business', 'metrics', 'kpi', 'analytics']
        },
        anomalyDetection: {
            enabled: true,
            minSamples: 20,
            thresholdMultiplier: 2.0,
            enableCriticalAlerts: true,
            enableWarningAlerts: true,
            customMethodKey: 'BusinessMetricsService'
        },
        customContext: {
            monitoringType: 'BUSINESS_METRICS',
            kpiTracking: true,
            analyticsIntegration: true,
            businessImpactAnalysis: true
        },
        customPrefix: 'BUSINESS-METRICS'
    }
}

/**
 * 📈 **Real-time Analytics Monitoring**
 *
 * Configuration for real-time analytics and streaming data
 */
export function getRealTimeAnalyticsConfig(): ILogDecoratorConfig {
    return {
        level: 'info',
        includePerformance: true,
        includeArgs: false, // Reduced for high-throughput scenarios
        includeResult: false,
        logSuccess: true,
        logStart: false,
        anomalyDetection: {
            enabled: true,
            minSamples: 5,
            thresholdMultiplier: 1.8,
            enableCriticalAlerts: true,
            enableWarningAlerts: false,
            customMethodKey: 'RealTimeAnalyticsService'
        },
        correlationContext: {
            enabled: true,
            workflowId: 'real-time-analytics-workflow',
            inheritFromParent: true
        },
        customContext: {
            monitoringType: 'REAL_TIME_ANALYTICS',
            streamingData: true,
            highThroughput: true,
            latencyOptimized: true
        },
        customPrefix: 'REAL-TIME-ANALYTICS'
    }
} 