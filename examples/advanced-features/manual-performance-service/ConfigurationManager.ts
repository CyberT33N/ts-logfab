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
} from '@/logger/performance/utils/index.ts'

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
export interface IConfigurationResult {
    previousConfig: ReturnType<typeof getEnterprisePerformanceConfiguration>
    newConfig: ReturnType<typeof getEnterprisePerformanceConfiguration>
}

/**
 * 🔧 Advanced configuration manager for performance monitoring systems.
 *
 * @remarks
 * This manager class provides centralized configuration management for enhanced performance
 * monitoring, including anomaly detection, baseline tracking, threshold management, and
 * comprehensive reporting capabilities.
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
 * @example
 * Configuring enhanced performance monitoring:
 * ```typescript
 * const configManager = new ConfigurationManager();
 *
 * const result = configManager.configurePerformanceMonitoring();
 *
 * console.log('Previous anomaly detection:', result.previousConfig.anomalyDetection.enabled);
 * console.log('New anomaly detection:', result.newConfig.anomalyDetection.enabled);
 * console.log('Configured detectors:', result.newConfig.anomalyDetection.config.global.enabledDetectors);
 *
 * // Access specific threshold configurations
 * console.log('Slow method warning:', result.newConfig.thresholds.slowMethodWarning);
 * console.log('Memory warning threshold:', result.newConfig.thresholds.memoryWarning);
 * ```
 *
 * @see {@link IConfigurationResult} for return value structure
 * @see {@link configureEnterprisePerformanceMonitoring} for underlying configuration utility
 */
export class ConfigurationManager {
    /**
     * ⚙️ Configures comprehensive performance monitoring with advanced anomaly detection.
     *
     * @remarks
     * This method applies a predefined set of enhanced performance monitoring configurations,
     * including sophisticated anomaly detection algorithms, baseline tracking, and multi-tier
     * threshold management for various performance metrics.
     *
     * 🛡️ **Anomaly Detection Configuration:**
     * - **Performance Detectors:** Configures slow/fast execution detection with 2.0s/0.2s thresholds
     * - **Memory Detectors:** Sets up memory usage monitoring with 1.5x/0.2x baseline thresholds
     * - **Statistical Analysis:** Enables outlier detection using standard deviation analysis
     * - **Rate Limiting:** Prevents alert flooding with max 5 anomalies per second
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
     * Applying and verifying performance monitoring configuration:
     * ```typescript
     * const manager = new ConfigurationManager();
     * const result = manager.configurePerformanceMonitoring();
     *
     * // Verify anomaly detection is enabled
     * if (result.newConfig.anomalyDetection.enabled) {
     *   console.log('Anomaly detection successfully enabled');
     *   console.log('Enabled detectors:', result.newConfig.anomalyDetection.config.global.enabledDetectors);
     * }
     *
     * // Check threshold configuration
     * const thresholds = result.newConfig.thresholds;
     * console.log(`Method thresholds: ${thresholds.slowMethodWarning}ms warning,
     *  ${thresholds.slowMethodCritical}ms critical`);
     *
     * // Verify baseline tracking
     * console.log('Baseline tracking enabled:', result.newConfig.baseline.trackingEnabled);
     * console.log('Min sample size:', result.newConfig.baseline.minSampleSize);
     * ```
     *
     * @see {@link IConfigurationResult} for detailed return value structure
     * @see {@link getEnterprisePerformanceConfiguration} for configuration state retrieval
     */
    public configurePerformanceMonitoring(): IConfigurationResult {
        // Get current configuration
        const previousConfig = getEnterprisePerformanceConfiguration()

        // Configure enhanced performance monitoring
        configureEnterprisePerformanceMonitoring(
            {
                anomalyDetection: {
                    enabled: true,
                    config: {
                        performance: {
                            slowThreshold: 2.0,
                            fastThreshold: 0.2,
                            stdDevSensitivity: 2.0,
                            minSampleSize: 5
                        },
                        memory: {
                            highThreshold: 1.5,
                            lowThreshold: 0.2,
                            stdDevSensitivity: 1.8
                        },
                        global: {
                            confidenceThreshold: 0.8,
                            maxAnomaliesPerSecond: 5,
                            enabledDetectors: [
                                'PERFORMANCE_SLOW',
                                'PERFORMANCE_FAST',
                                'MEMORY_HIGH',
                                'STATISTICAL_OUTLIER'
                            ]
                        }
                    }
                },
                baseline: {
                    trackingEnabled: true,
                    minSampleSize: 10,
                    maxHistoryDays: 7
                },
                thresholds: {
                    slowMethodWarning: 500,
                    slowMethodCritical: 2000,
                    memoryWarning: 25 * 1024 * 1024, // 25MB
                    memoryCritical: 50 * 1024 * 1024, // 50MB
                    cpuWarning: 70,
                    cpuCritical: 90
                },
                reporting: {
                    logAnomalies: true,
                    logBaselines: true,
                    logThresholdViolations: true
                }
            }
        )

        // Get updated configuration
        const newConfig = getEnterprisePerformanceConfiguration()

        return {
            previousConfig,
            newConfig
        }
    }
}
