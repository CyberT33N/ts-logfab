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
// 🚀 EXAMPLE APP - ENTERPRISE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import { runAllEnterpriseConfigurationDemos } from './enterprise-configuration/index.ts'

/**
 * 🚀 **Enterprise Configuration Application Entry Point**
 * 
 * This file serves as the entry point for demonstrating the comprehensive
 * enterprise-level configuration patterns for the logging decorators.
 */
async function main(): Promise<void> {
    logger.info('🚀 Starting Enterprise Configuration Demo Suite')
    
    await runAllEnterpriseConfigurationDemos()
    
    logger.info('🎉 Enterprise Configuration Demo Suite finished successfully!')
}

// 🎬 Start the application
main().catch((error: unknown) => {
    logger.error('💥 Fatal error in enterprise configuration demo application:', { error })
    process.exit(1)
}) 