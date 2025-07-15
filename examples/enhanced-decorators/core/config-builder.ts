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
██              🎯 ENHANCED DECORATOR CONFIGURATION BUILDER                  ██
██                    FLUENT API FOR CUSTOM CONFIGURATIONS                   ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED DECORATOR CONFIGURATION BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

import type { WritableDeep } from 'type-fest'
import {
    createEnhancedConfig,
    type IEnhancedDecoratorConfig
} from '@/logger/decorators/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONFIGURATION BUILDER PATTERN
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Configuration Builder Pattern**
 *
 * Fluent API for creating custom enhanced decorator configurations
 */
export class ConfigBuilder {
    private readonly _config: WritableDeep<Partial<IEnhancedDecoratorConfig>> = {}

    public enablePerformanceTracking(enabled = true): this {
        this._config.enablePerformanceTracking = enabled
        return this
    }

    public enableAnomalyDetection(enabled = true): this {
        this._config.enableAnomalyDetection = enabled
        return this
    }

    public enableSemanticAnalysis(enabled = true): this {
        this._config.enableSemanticAnalysis = enabled
        return this
    }

    public enableCorrelationTracking(enabled = true): this {
        this._config.enableCorrelationTracking = enabled
        return this
    }

    public enableAutoFormatSwitching(enabled = true): this {
        this._config.enableAutoFormatSwitching = enabled
        return this
    }

    public setLogLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'error'): this {
        this._config.logLevel = level
        return this
    }

    public includeStackTrace(enabled = true): this {
        this._config.includeStackTrace = enabled
        return this
    }

    public includeArguments(enabled = true): this {
        this._config.includeArguments = enabled
        return this
    }

    public includeResult(enabled = true): this {
        this._config.includeResult = enabled
        return this
    }

    public setMaxArgumentsLength(length: number): this {
        this._config.maxArgumentsLength = length
        return this
    }

    public build(): IEnhancedDecoratorConfig {
        return createEnhancedConfig(this._config)
    }
}

/**
 * 🎯 **Custom Configuration Builder Factory**
 *
 * Fluent API for building custom configurations
 */
export function createCustomConfig(): ConfigBuilder {
    return new ConfigBuilder()
} 