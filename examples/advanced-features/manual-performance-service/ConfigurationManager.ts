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
import {
    configureEnhancedPerformanceMonitoring,
    getEnhancedPerformanceConfiguration
} from '@/logger/performance/utils/index.ts'

export interface IConfigurationResult {
    previousConfig: ReturnType<typeof getEnhancedPerformanceConfiguration>
    newConfig: ReturnType<typeof getEnhancedPerformanceConfiguration>
}

export class ConfigurationManager {
    public configurePerformanceMonitoring(): IConfigurationResult {
        // Get current configuration
        const previousConfig = getEnhancedPerformanceConfiguration()
        
        // Configure enhanced performance monitoring
        configureEnhancedPerformanceMonitoring({
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
        })
        
        // Get updated configuration
        const newConfig = getEnhancedPerformanceConfiguration()
        
        return {
            previousConfig,
            newConfig
        }
    }
} 