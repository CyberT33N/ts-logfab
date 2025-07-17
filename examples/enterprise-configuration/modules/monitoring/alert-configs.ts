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
██                🚨 ENTERPRISE ALERTING CONFIGURATIONS                      ██
██                    HIGH-PRIORITY ALERT CONFIGURATIONS                     ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🚨 ENTERPRISE ALERTING CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { type IAnomalyConfig } from '@/logger/anomaly-detector/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🚨 ENTERPRISE ALERTING CONFIGURATION FRAMEWORK
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔥 **Critical Alert Configuration**
 *
 * High-priority alerting for critical system failures
 */
export function getCriticalAlertConfig(): IAnomalyConfig {
    return {
        performance: {
            slowThreshold: 1.5,
            fastThreshold: 0.2,
            stdDevSensitivity: 2.0,
            minSampleSize: 5
        },
        memory: {
            highThreshold: 2.0,
            lowThreshold: 0.2,
            stdDevSensitivity: 2.0
        },
        frequency: {
            highThreshold: 10,
            lowThreshold: 0.1,
            timeWindow: 5000
        },
        error: {
            spikeThreshold: 0.5,
            consecutiveErrors: 3
        },
        global: {
            confidenceThreshold: 0.8,
            maxAnomaliesPerSecond: 5,
            enabledDetectors: ['PERFORMANCE_SLOW', 'MEMORY_HIGH', 'ERROR_SPIKE', 'STATISTICAL_OUTLIER']
        }
    }
}

/**
 * ⚠️ **Warning Alert Configuration**
 *
 * Medium-priority alerting for system warnings
 */
export function getWarningAlertConfig(): IAnomalyConfig {
    return {
        performance: {
            slowThreshold: 2.5,
            fastThreshold: 0.3,
            stdDevSensitivity: 1.5,
            minSampleSize: 10
        },
        memory: {
            highThreshold: 1.5,
            lowThreshold: 0.3,
            stdDevSensitivity: 1.5
        },
        frequency: {
            highThreshold: 5,
            lowThreshold: 0.2,
            timeWindow: 10000
        },
        error: {
            spikeThreshold: 0.2,
            consecutiveErrors: 5
        },
        global: {
            confidenceThreshold: 0.6,
            maxAnomaliesPerSecond: 10,
            enabledDetectors: ['PERFORMANCE_SLOW', 'MEMORY_HIGH', 'FREQUENCY_HIGH']
        }
    }
} 