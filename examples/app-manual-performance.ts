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

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 EXAMPLE APP - MANUAL PERFORMANCE UTILS
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import { runManualPerformanceDemo } from './advanced-features/manual-performance-service/demo-runner.ts'

/**
 * 🚀 **Manual Performance Utils Application Entry Point**
 * 
 * This file serves as the entry point for demonstrating the manual performance
 * tracking utilities from `@/logger/performance/utils/index.ts`.
 *
 * @returns Promise that resolves when demo completes
 *
 * @example
 * ```typescript
 * await main();
 * ```
 *
 * @throws {Error} When demo execution fails
 */
async function main(): Promise<void> {
    logger.info('🚀 Starting Manual Performance Utilities Demo')
    
    await runManualPerformanceDemo()
    
    logger.info('🎉 Manual Performance Utilities Demo finished successfully!')
}

// 🎬 Start the application
main().catch((error: unknown) => {
    logger.error('💥 Fatal error in manual performance demo application:', { error })
    process.exit(1)
}) 