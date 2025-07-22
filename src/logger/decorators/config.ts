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
██              🎯 DECORATOR CONFIGURATION MODULE                           ██
██          ENTERPRISE-STANDARD DECORATOR CONFIGURATIONS                    ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE DECORATOR CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enterprise Decorator Configuration Module**
 * 
 * This module provides enterprise-standard decorator configurations that have been
 * migrated from legacy interfaces to the modern ILogDecoratorConfig standard.
 * 
 * All legacy interfaces (IEnhancedDecoratorConfig, IDecoratorLoggingConfig) have
 * been completely removed and replaced with the unified enterprise interface.
 * 
 * @see {@link ILogDecoratorConfig} - Located in @/decorators/types.ts
 * @see {@link DEFAULT_LOG_CONFIG} - Located in @/decorators/types.ts
 * 
 * @module DecoratorConfig
 * @version 2.1.0 - Enterprise Standard
 * @author Enterprise Logging Team
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE CONFIGURATION EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ✅ **All decorator configurations now use the Enterprise Standard:**
 * 
 * - ILogDecoratorConfig (from @/decorators/types.ts)
 * - DEFAULT_LOG_CONFIG (from @/decorators/types.ts)
 * 
 * Legacy interfaces completely removed:
 * - ❌ IEnhancedDecoratorConfig (DELETED)
 * - ❌ IDecoratorLoggingConfig (DELETED)  
 * - ❌ DEFAULT_ENHANCED_CONFIG (DELETED)
 * - ❌ createEnhancedConfig (DELETED)
 * - ❌ getEnhancedLoggingStatus (DELETED)
 */

// Re-export Enterprise Standard from central location
export {
    type ILogDecoratorConfig,
    DEFAULT_LOG_CONFIG
} from '@/decorators/types.ts' 