/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██║                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 ANOMALY DETECTION CONFIG - DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { type IAnomalyConfig } from './types.ts'

const DEFAULT_ANOMALY_CONFIG: IAnomalyConfig = {
    performance: {
        slowThreshold: 3.0, // 3x average is considered slow
        fastThreshold: 0.1, // 0.1x average is unusually fast
        stdDevSensitivity: 2.5, // 2.5 standard deviations
        minSampleSize: 10 // need at least 10 samples
    },
    memory: {
        highThreshold: 2.0, // 2x average memory usage
        lowThreshold: 0.5, // 0.5x average memory usage
        stdDevSensitivity: 2.0
    },
    frequency: {
        highThreshold: 10, // 10 calls per time window
        lowThreshold: 0.1, // very low frequency
        timeWindow: 5000 // 5 second window
    },
    error: {
        spikeThreshold: 0.5, // 50% error rate
        consecutiveErrors: 3 // 3 consecutive errors
    },
    global: {
        confidenceThreshold: 0.7, // 70% confidence minimum
        maxAnomaliesPerSecond: 2, // max 2 anomalies per second
        enabledDetectors: [
            'PERFORMANCE_SLOW',
            'PERFORMANCE_FAST',
            'MEMORY_HIGH',
            'ERROR_SPIKE',
            'FREQUENCY_HIGH',
            'STATISTICAL_OUTLIER'
        ]
    }
}

export { DEFAULT_ANOMALY_CONFIG } 