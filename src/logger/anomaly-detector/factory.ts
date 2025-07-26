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
// 🏭 ANOMALY DETECTION FACTORY - FACTORY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import { AnomalyDetector } from './main-detector.ts'
import { 
    type IAnomalyConfig, type IPerformanceMetric, type ISemanticContext 
} from './types.ts'

/**
 * 🏭 **Create anomaly detector with configuration**
 * @param config - Optional anomaly detection configuration
 * @returns Configured anomaly detector instance
 */
export function createAnomalyDetector(
    config: ReadonlyDeep<Partial<IAnomalyConfig>> = {}
): AnomalyDetector {
    return new AnomalyDetector(config)
}

/**
 * 📊 **Create performance metric object**
 * 
 * @param method - Method name
 * @param duration - Execution duration in milliseconds
 * @param memory - Memory usage in MB
 * @param success - Whether the operation succeeded
 * @param semantic - Optional semantic context
 *
 * @returns Performance metric object
 *
 * @example
 * ```typescript
 * const metric = createPerformanceMetric('getUserById', 150, 25, true);
 * detector.addMetricAndDetect(metric);
 * ```
 */
export function createPerformanceMetric(
    method: string,
    duration: number,
    memory = 0,
    success = true,
    semantic?: ISemanticContext
): IPerformanceMetric {
    return {
        method,
        duration,
        memory,
        timestamp: Date.now(),
        success,
        semantic
    }
} 