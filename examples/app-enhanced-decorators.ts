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
// 🚀 EXAMPLE APP - ENHANCED DECORATOR IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import { runAllEnhancedDecoratorDemos } from './enhanced-decorators/index.ts'

/**
 * 🚀 **Enhanced Decorator Application Entry Point**
 * 
 * This file serves as the entry point for demonstrating the enhanced
 * decorator implementation from `@/logger/decorators/index.ts`.
 */
async function main(): Promise<void> {
    logger.info('🚀 Starting Enhanced Decorator Implementation Demo')
    
    await runAllEnhancedDecoratorDemos()
    
    logger.info('🎉 Enhanced Decorator Implementation Demo finished successfully!')
}

// 🎬 Start the application
main().catch((error: unknown) => {
    logger.error('💥 Fatal error in enhanced decorator demo application:', { error })
    process.exit(1)
})