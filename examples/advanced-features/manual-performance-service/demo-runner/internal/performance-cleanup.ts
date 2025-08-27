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

import type { ManualPerformanceService } from '../..'

/**
 * Clears the performance data and reports the results.
 *
 * @param service - The manual performance service.
 */
export const clearPerformanceDataAndReport = (service: Readonly<ManualPerformanceService>): void => {
    // Clear performance data
    logger.info('⚡ Testing Performance Data Cleanup')
    const clearResult = service.clearAllPerformanceData()

    logger.info(
        '✅ Performance data cleared:', {
            clearedOperationsCount: clearResult.clearedOperations.length,
            remainingAnomalyData: clearResult.remainingAnomalyData,
            remainingBaselines: clearResult.remainingBaselines
        }
    )
}

/**
 * Logs the final statistics after cleanup.
 *
 * @param service - The manual performance service.
 */
export const logFinalStatistics = (service: Readonly<ManualPerformanceService>): void => {
    // Final verification
    const finalStats = service.getPerformanceStatistics()

    logger.info(
        '✅ Final statistics after cleanup:', {
            baselinesCount: finalStats.allBaselines.size,
            performanceLogCount: finalStats.performanceLogCount
        }
    )
}
