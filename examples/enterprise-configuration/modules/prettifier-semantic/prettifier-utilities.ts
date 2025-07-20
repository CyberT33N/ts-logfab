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
██                🎨 PRETTIFIER UTILITIES & TYPES                            ██
██               CONFIGURATION TYPES & INTERFACES                           ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 PRETTIFIER UTILITIES & TYPES
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import type { ISemanticContext } from '@/logger/semantic-detector/index.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 PRETTIFIER CONFIGURATION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎨 **Prettifier Configuration Interface**
 * 
 * Configuration for prettifier output formatting
 *
 * @see {@link IPrettyConfig.customFormatters} for custom formatting functions
 * @see {@link IPrettyConfig.tableFormat} for table format options
 */
export interface IPrettyConfig {
    readonly colorOutput: boolean
    readonly showTimestamp: boolean
    readonly showLogLevel: boolean
    readonly showContextInfo: boolean
    readonly showPerformanceMetrics: boolean
    readonly showArguments: boolean
    readonly showResults: boolean
    readonly maxArgumentLength: number
    readonly maxResultLength: number
    readonly indentLevel: number
    readonly tableFormat: 'simple' | 'fancy' | 'csv'
    readonly highlightErrors: boolean
    readonly highlightWarnings: boolean
    readonly showMethodSignature: boolean
    readonly showCorrelationId: boolean
    readonly showSemanticContext: boolean
    readonly compactMode: boolean
    readonly customFormatters: {
        readonly timestamp: (date: Readonly<Date>) => string
        readonly logLevel: (level: string) => string
        readonly methodName: (name: string) => string
        readonly arguments: (args: ReadonlyDeep<readonly unknown[]>) => string
        readonly result: (result: unknown) => string
        readonly performance: (time: number) => string
        readonly correlation: (id: string) => string
        readonly semantic: (context: ReadonlyDeep<ISemanticContext>) => string
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SEMANTIC CONFIGURATION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Semantic Configuration Interface**
 * 
 * Configuration for semantic analysis patterns
 *
 * @see {@link ISemanticConfig.domainPatterns} for domain pattern configuration
 * @see {@link ISemanticConfig.complexityPatterns} for complexity detection
 */
export interface ISemanticConfig {
    readonly domainPatterns: Readonly<Record<string, {
            readonly patterns: readonly RegExp[]
            readonly operations: Readonly<Record<string, readonly RegExp[]>>
        }>>
    readonly complexityPatterns: Readonly<Record<string, readonly RegExp[]>>
    readonly businessKeyPatterns?: Readonly<Record<string, readonly RegExp[]>>
    readonly tagPatterns?: Readonly<Record<string, readonly RegExp[]>>
}

/**
 * 🎯 **Pattern Configuration Interface**
 * 
 * Configuration for pattern matching
 *
 * @see {@link IPatternConfig.domainPatterns} for domain pattern matching
 * @see {@link IPatternConfig.businessKeyPatterns} for business key detection
 */
export interface IPatternConfig {
    readonly domainPatterns: Readonly<Record<string, {
            readonly patterns: readonly RegExp[]
            readonly operations: Readonly<Record<string, readonly RegExp[]>>
        }>>
    readonly complexityPatterns: Readonly<Record<string, readonly RegExp[]>>
    readonly businessKeyPatterns?: Readonly<Record<string, readonly RegExp[]>>
    readonly tagPatterns?: Readonly<Record<string, readonly RegExp[]>>
} 