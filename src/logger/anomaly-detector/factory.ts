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
 */
export function createAnomalyDetector(
    config: ReadonlyDeep<Partial<IAnomalyConfig>> = {}
): AnomalyDetector {
    return new AnomalyDetector(config)
}

/**
 * 📊 **Create performance metric object**
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