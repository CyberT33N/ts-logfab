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
// 🚀 EXAMPLE APP - MAIN DECORATOR IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import { BaseService, runBaseServiceDemo } from './core/base-service.ts'

/**
 * 🚀 **Main Application Entry Point**
 * 
 * This file serves as the primary entry point for demonstrating the main
 * decorator implementation from `@/decorators/index.ts`. It utilizes the
 * BaseService to showcase all core functionalities.
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
    logger.info('🚀 Starting Main Decorator Implementation Demo')
    
    // You can instantiate services and run methods directly here for quick tests.
    // For a structured demonstration, we call the demo runner function.
    const service = new BaseService()
    const user = await service.getUserById(1)
    logger.info({ user }, 'Directly called getUserById from main.')

    // Running the comprehensive demo function from the service file.
    await runBaseServiceDemo()
    
    logger.info('🎉 Main Decorator Implementation Demo finished successfully!')
}

// 🎬 Start the application
main().catch((error: unknown) => {
    logger.error('💥 Fatal error in main application:', { error })
    process.exit(1)
}) 