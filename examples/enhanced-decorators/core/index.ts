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
██                    🚀 ENHANCED DECORATORS CORE INDEX                      ██
██              BARREL FILE FOR ALL ENHANCED DECORATOR MODULES               ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 ENHANCED DECORATORS CORE INDEX
// ═══════════════════════════════════════════════════════════════════════════════
// This index file consolidates and re-exports all functionalities from the
// enhanced decorators core modules, providing a single entry point.
// ═══════════════════════════════════════════════════════════════════════════════

// 🏭 Configuration Factories
export {
    createDevelopmentConfig,
    createProductionConfig,
    createDebugConfig,
    createPerformanceConfig,
    createTestingConfig,
    createAdaptiveConfig
} from './config-factories.ts'

// 🎯 Configuration Builder
export {
    ConfigBuilder,
    createCustomConfig
} from './config-builder.ts'

// 🏢 Enterprise Service
export {
    EnterpriseConfigService
} from './enterprise-service.ts'

// 🔍 Comparison Services
export {
    StandardDecoratorService,
    EnhancedDecoratorService,
    type IImplementationMetrics
} from './comparison-services.ts'

// 📊 Performance Analysis
export {
    measureStandardDecorator,
    measureEnhancedDecorator,
    compareImplementations,
    runComprehensivePerformanceAnalysis,
    type IPerformanceComparison,
    type IComparisonResult
} from './performance-analysis.ts'

// 🎯 Feature Analysis
export {
    getFeatureMatrix,
    getRecommendations,
    analyzeFeatureGaps,
    getHighImportanceFeatures,
    calculateFeatureScore,
    type IFeatureMatrix,
    type IRecommendations
} from './feature-analysis.ts'

// 🎪 Demo Runners
export {
    runEnhancedConfigDemo,
    runImplementationComparisonDemo
} from './demo-runners.ts'

// 📊 Summary Utilities
export {
    runAllEnhancedDecoratorDemos,
    getEnhancedDecoratorsSummary,
    getEnhancedDecoratorsStatistics,
    type IEnhancedDecoratorsSummary,
    type IEnhancedDecoratorsStatistics
} from './summary-utilities.ts' 