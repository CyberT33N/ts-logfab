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
██              🎯 DECORATOR LOGGING CONFIGURATION MODULE                     ██
██          UNIFIED CONFIGURATION FOR ALL DECORATOR LOGGING FEATURES        ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DECORATOR LOGGING CONFIGURATION INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Decorator Logging Configuration**
 */
export interface IDecoratorLoggingConfig {
    readonly enableCorrelation: boolean
    readonly enableSemanticDetection: boolean
    readonly enableAnomalyDetection: boolean
    readonly enablePerformanceTracking: boolean
    readonly useHybridLogger: boolean
    readonly logLevel: 'debug' | 'info' | 'warn' | 'error'
}

/**
 * ⚙️ **Enhanced Decorator Configuration**
 * 
 * Configuration for all enhanced logging decorators
 */
export interface IEnhancedDecoratorConfig {
    readonly enablePerformanceTracking: boolean
    readonly enableAnomalyDetection: boolean
    readonly enableSemanticAnalysis: boolean
    readonly enableCorrelationTracking: boolean
    readonly enableAutoFormatSwitching: boolean
    readonly logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error'
    readonly includeStackTrace: boolean
    readonly includeArguments: boolean
    readonly includeResult: boolean
    readonly maxArgumentsLength: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DEFAULT CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Default Decorator Configuration**
 */
export const DEFAULT_DECORATOR_CONFIG: IDecoratorLoggingConfig = {
    enableCorrelation: true,
    enableSemanticDetection: true,
    enableAnomalyDetection: true,
    enablePerformanceTracking: true,
    useHybridLogger: true,
    logLevel: 'info'
}

/**
 * 🎯 **Default Enhanced Configuration**
 */
export const DEFAULT_ENHANCED_CONFIG: IEnhancedDecoratorConfig = {
    enablePerformanceTracking: true,
    enableAnomalyDetection: true,
    enableSemanticAnalysis: true,
    enableCorrelationTracking: true,
    enableAutoFormatSwitching: true,
    logLevel: 'info',
    includeStackTrace: false,
    includeArguments: true,
    includeResult: false,
    maxArgumentsLength: 200
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION FACTORY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Create decorator logging configuration**
 */
export function createDecoratorLoggingConfig(
    overrides: Partial<IDecoratorLoggingConfig> = {}
): IDecoratorLoggingConfig {
    return {
        ...DEFAULT_DECORATOR_CONFIG,
        ...overrides
    }
}

/**
 * 🎯 **Enhanced Logging Configuration Factory**
 * 
 * Create custom configurations for enhanced decorators
 */
export function createEnhancedConfig(
    overrides: Partial<IEnhancedDecoratorConfig>
): IEnhancedDecoratorConfig {
    return {
        ...DEFAULT_ENHANCED_CONFIG,
        ...overrides
    }
}

/**
 * 🎯 **Get default decorator logging configuration**
 */
export function getDefaultDecoratorConfig(): IDecoratorLoggingConfig {
    return { ...DEFAULT_DECORATOR_CONFIG }
}

/**
 * 📋 **Enhanced Logging Status**
 * 
 * Get current status of enhanced logging system
 */
export function getEnhancedLoggingStatus(): {
    readonly performanceMonitor: boolean
    readonly correlationContext: boolean
    readonly semanticAnalysis: boolean
    readonly formatSwitching: boolean
    } {
    return {
        performanceMonitor: true,
        correlationContext: true,
        semanticAnalysis: true,
        formatSwitching: true
    }
} 