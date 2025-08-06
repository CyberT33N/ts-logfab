/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== Imports ====
import {
    configureEnterprisePerformanceMonitoring,
    getEnterprisePerformanceConfiguration
} from '@/logger/performance'

/**
 * ⚙️ Result structure for performance monitoring configuration changes.
 *
 * @remarks
 * This interface provides a before-and-after snapshot of performance monitoring
 * configuration, allowing for comparison and verification of configuration changes.
 *
 * 🔄 **Configuration Tracking:** Captures both the previous configuration state
 * and the newly applied configuration to enable rollback scenarios and change auditing.
 *
 * @see {@link getEnterprisePerformanceConfiguration} for configuration retrieval
 * @see {@link configureEnterprisePerformanceMonitoring} for configuration application
 */
export interface ConfigurationResult {
    previousConfig: ReturnType<typeof getEnterprisePerformanceConfiguration>
    updatedConfig: ReturnType<typeof getEnterprisePerformanceConfiguration>
}

/**
 * ⚙️ Configures comprehensive performance monitoring with advanced anomaly detection.
 *
 * @remarks
 * This function applies a predefined set of enhanced performance monitoring configurations,
 * including sophisticated anomaly detection algorithms, baseline tracking, and multi-tier
 * threshold management for various performance metrics.
 *
 * ⚙️ **Configuration Categories:**
 * - **Anomaly Detection:** Configures sensitivity thresholds and detector types
 * - **Baseline Tracking:** Manages historical performance data collection
 * - **Performance Thresholds:** Sets warning and critical limits for various metrics
 * - **Reporting:** Controls logging and notification behavior
 *
 * 🛡️ **Anomaly Detection Features:**
 * - Performance-based detection (slow/fast execution patterns)
 * - Memory usage monitoring with configurable thresholds
 * - Statistical outlier detection using standard deviation analysis
 * - Rate limiting for anomaly notifications
 *
 * 🛡️ **Anomaly Detection Configuration:**
 * - **Anomaly Detection:** Enables anomaly detection with configurable thresholds
 * - **Sample Size:** Sets minimum samples (10) for baseline establishment
 * - **Threshold Multiplier:** Configures sensitivity with 2.5x threshold multiplier
 * - **Alert Management:** Enables both critical and warning alerts
 *
 * 📊 **Threshold Configuration:**
 * - Method execution warnings at 500ms, critical at 2000ms
 * - Memory usage warnings at 25MB, critical at 50MB
 * - CPU utilization warnings at 70%, critical at 90%
 *
 * 📈 **Baseline Tracking:**
 * - Minimum 10 samples required for baseline establishment
 * - 7-day historical data retention for trend analysis
 * - Automatic baseline updates for performance drift detection
 *
 * @returns Configuration result containing both previous and newly applied
 * performance monitoring configurations for comparison and auditing
 *
 * @example
 * Configuring enhanced performance monitoring:
 * ```typescript
 * const result = configurePerformanceMonitoring();
 *
 * console.log('Previous anomaly detection:', result.previousConfig.anomalyDetection.enabled);
 * console.log('New anomaly detection:', result.updatedConfig.anomalyDetection.enabled);
 * console.log('Critical alerts enabled:', result.updatedConfig.anomalyDetection.enableCriticalAlerts);
 *
 * // Access specific threshold configurations
 * console.log('Slow method warning:', result.updatedConfig.thresholds.slowMethodWarning);
 * console.log('Memory warning threshold:', result.updatedConfig.thresholds.memoryWarning);
 * ```
 *
 * @example
 * Applying and verifying performance monitoring configuration:
 * ```typescript
 * const result = configurePerformanceMonitoring();
 *
 * // Verify anomaly detection is enabled
 * if (result.updatedConfig.anomalyDetection.enabled) {
 *   console.log('Anomaly detection successfully enabled');
 *   console.log('Critical alerts enabled:', result.updatedConfig.anomalyDetection.enableCriticalAlerts);
 * }
 *
 * // Check threshold configuration
 * const thresholds = result.updatedConfig.thresholds;
 * console.log(`Method thresholds: ${thresholds.slowMethodWarning}ms warning,
 *  ${thresholds.slowMethodCritical}ms critical`);
 *
 * // Verify baseline tracking
 * console.log('Baseline tracking enabled:', result.updatedConfig.baseline.trackingEnabled);
 * console.log('Min sample size:', result.updatedConfig.baseline.minSampleSize);
 * ```
 *
 * @see {@link ConfigurationResult} for detailed return value structure
 * @see {@link getEnterprisePerformanceConfiguration} for configuration state retrieval
 * @see {@link configureEnterprisePerformanceMonitoring} for underlying configuration utility
 */
export const configurePerformanceMonitoring = (): ConfigurationResult => {
    // Get current configuration
    const previousConfig = getEnterprisePerformanceConfiguration()

    // Configure enhanced performance monitoring
    configureEnterprisePerformanceMonitoring({
        anomalyDetection: {
            enabled: true,
            minSamples: 10,
            thresholdMultiplier: 2.5,
            enableCriticalAlerts: true,
            enableWarningAlerts: true
        },
        baseline: {
            trackingEnabled: true,
            minSampleSize: 10,
            maxHistoryDays: 7
        },
        thresholds: {
            slowMethodWarning: 500,
            slowMethodCritical: 2000,

            // 25MB
            memoryWarning: 25 * 1024 * 1024,

            // 50MB
            memoryCritical: 50 * 1024 * 1024,
            cpuWarning: 70,
            cpuCritical: 90
        },
        reporting: {
            logAnomalies: true,
            logBaselines: true,
            logThresholdViolations: true
        }
    })

    // Get updated configuration
    const updatedConfig = getEnterprisePerformanceConfiguration()

    return {
        previousConfig,
        updatedConfig
    }
}
