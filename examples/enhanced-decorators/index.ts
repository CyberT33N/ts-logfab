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
██                    🚀 ENHANCED DECORATORS INDEX                           ██
██              COMPREHENSIVE ENHANCED DECORATOR EXAMPLES                    ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

/**
 * 🚀 **Enhanced Decorators Index - Central Export Hub**
 * 
 * @fileoverview 
 * Barrel file serving as the central access point for the enhanced decorators ecosystem.
 * Provides a unified API surface for configuration builders, enterprise services,
 * decorator implementations, and demonstration utilities while maintaining clean
 * separation of concerns through modular architecture.
 * 
 * @remarks
 * This file has been modularized from a single implementation into a distributed
 * core module system located in the `./core/` directory. All exports are re-exported
 * here to maintain API compatibility and provide a convenient single import point
 * for consumers of the enhanced decorators functionality.
 * 
 * 📦 **Export Categories:**
 * - **Configuration System**: Factory functions and builders for decorator configurations
 * - **Enterprise Services**: Production-ready service implementations with advanced features
 * - **Decorator Implementations**: Enhanced logging decorators with correlation and semantics
 * - **Comparison Tools**: Utilities for analyzing decorator performance and features
 * - **Demo Runners**: Comprehensive demonstration functions for all capabilities
 * 
 * 🏗️ **Architecture Benefits:**
 * - Modular code organization for better maintainability
 * - Clear separation between concerns and responsibilities
 * - Unified API surface for ease of consumption
 * - Type-safe re-exports maintaining full TypeScript support
 * - Comprehensive feature coverage through systematic exports
 * 
 * @example
 * Basic usage with configuration and service creation:
 * ```typescript
 * import { 
 *   createProductionConfig, 
 *   EnterpriseConfigService,
 *   enhancedLog 
 * } from './enhanced-decorators';
 * 
 * // Create production-ready configuration
 * const config = createProductionConfig({
 *   serviceName: 'UserService',
 *   environment: 'production'
 * });
 * 
 * // Initialize enterprise service
 * const service = new EnterpriseConfigService(config);
 * 
 * // Use enhanced decorator
 * class UserController {
 *   @enhancedLog(config.decoratorOptions)
 *   async createUser(userData: any) {
 *     // Implementation with automatic logging
 *   }
 * }
 * ```
 * 
 * @example
 * Advanced usage with comparison and analysis tools:
 * ```typescript
 * import {
 *   compareImplementations,
 *   getFeatureMatrix,
 *   runAllEnhancedDecoratorDemos
 * } from './enhanced-decorators';
 * 
 * // Compare decorator implementations
 * const comparison = await compareImplementations();
 * console.log('Performance metrics:', comparison);
 * 
 * // Get feature compatibility matrix
 * const features = getFeatureMatrix();
 * console.log('Feature support:', features);
 * 
 * // Run comprehensive demonstrations
 * await runAllEnhancedDecoratorDemos();
 * ```
 * 
 * @see {@link ./core/config-builder} for configuration system details
 * @see {@link ./core/enterprise-service} for service implementation
 * @see {@link ./types} for TypeScript type definitions
 * @see {@link runAllEnhancedDecoratorDemos} for complete feature demonstrations
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENHANCED DECORATORS INDEX - BARREL FILE
// ═══════════════════════════════════════════════════════════════════════════════
// This file has been modularized. All implementation moved to ./core/ modules.
// This file now serves as a pure re-export barrel to maintain API compatibility.
// ═══════════════════════════════════════════════════════════════════════════════

export {
    createDevelopmentConfig,
    createProductionConfig,
    createDebugConfig,
    createPerformanceConfig,
    createTestingConfig,
    createCustomConfig,
    ConfigBuilder,
    EnterpriseConfigService,
    runEnhancedConfigDemo
} from './core/index.ts'

export {
    StandardDecoratorService,
    EnhancedDecoratorService, // Note: This service is the one from the alternative implementation
    measureStandardDecorator,
    measureEnhancedDecorator,
    compareImplementations,
    getFeatureMatrix,
    getRecommendations,
    runImplementationComparisonDemo
} from './core/index.ts'

// 🚀 Re-export relevant types and decorators for convenience (from types.ts)
// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATORS MAIN INDEX - ENTERPRISE STANDARD
// ═══════════════════════════════════════════════════════════════════════════════

// ==== Main Enhanced Types ====
export type {
    ILogDecoratorConfig,
    EnterpriseDecoratorConfig,
    IEnhancedLoggingScenario,
    IEnhancedServiceOperations
} from './types.ts'

// ==== Enhanced Configuration ====
export {
    DEFAULT_LOG_CONFIG
} from '@/logger/decorators/index.ts'

// ==== Enhanced Decorator Functions ====
export {
    log,
    logDebug,
    logPerformance,
    logSilent,
    logErrorsOnly
} from '@/logger/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DEMO RUNNERS & SUMMARIES (from summary utilities)
// ═══════════════════════════════════════════════════════════════════════════════

export {
    runAllEnhancedDecoratorDemos,
    getEnhancedDecoratorsSummary,
    getEnhancedDecoratorsStatistics
} from './core/summary-utilities.ts' 