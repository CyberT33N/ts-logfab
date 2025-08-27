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
import { logger } from '@/logger'
import { ManualPerformanceService } from '..'

import {
    configurePerformanceMonitoring,
    reportPerformanceStatistics,
    runAnomalyDetectionLoops,
    testManualMarks,
    testSnapshots
} from './internal/performance-monitoring'

import {
    clearPerformanceDataAndReport,
    logFinalStatistics
} from './internal/performance-cleanup'

/**
 * ⚡ **Demo Function for Manual Performance Service**.
 *
 * @remarks
 * This comprehensive demonstration function showcases all capabilities of the Manual Performance
 * Service, including performance marks/measures, snapshot analysis, anomaly detection, and
 * statistical monitoring.
 *
 * 🔄 **Demo Scenarios:**
 * - Manual performance marks and measures with garbage collection tracking
 * - Performance snapshots and calculations across multiple operations
 * - Enhanced performance monitoring with configurable anomaly detection
 * - Statistical analysis and baseline management
 * - Performance data cleanup and verification
 *
 * 📊 **Testing Coverage:** The demo runs multiple iterations of various operations to build
 * performance baselines and intentionally trigger anomaly detection for comprehensive testing.
 * @returns Promise that resolves when the entire demonstration is complete.
 * @example
 * Running the manual performance demonstration:
 * ```typescript
 * import { runManualPerformanceDemo } from './demo-runner.ts';
 *
 * async function main() {
 *   try {
 *     await runManualPerformanceDemo();
 *     console.log('Performance demo completed successfully');
 *   } catch (error) {
 *     console.error('Demo failed:', error);
 *   }
 * }
 * ```
 * @see {@link ManualPerformanceService} for the service being demonstrated
 * @see {@link logger} for logging implementation used throughout the demo
 */
export const runManualPerformanceDemo = async (): Promise<void> => {
    logger.info('⚡ Starting Manual Performance Demo (Performance Utils)')

    const service = new ManualPerformanceService()

    try {
        await testManualMarks(service)
        await testSnapshots(service)
        configurePerformanceMonitoring()
        await runAnomalyDetectionLoops(service)
        reportPerformanceStatistics(service)
        clearPerformanceDataAndReport(service)
        logFinalStatistics(service)
    } catch (error: unknown) {
        logger.error('❌ Manual Performance Demo failed:', { error })
        throw error
    }

    logger.info('🎉 Manual Performance Demo completed successfully!')
}
