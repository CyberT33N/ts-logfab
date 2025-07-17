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
██                🎨 PRETTIFIER ANALYSIS CONFIGURATIONS                      ██
██                ENTERPRISE PRETTIFIER CONFIGURATIONS                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 PRETTIFIER ANALYSIS CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import type { ISemanticContext } from '@/logger/semantic-detector/index.ts'
import type { IPrettyConfig } from './prettifier-utilities.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ENTERPRISE PRETTIFIER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎨 **Development Prettifier Configuration**
 *
 * Human-readable format optimized for development
 */
export function getDevelopmentPrettifierConfig(): IPrettyConfig {
    return {
        colorOutput: true,
        showTimestamp: true,
        showLogLevel: true,
        showContextInfo: true,
        showPerformanceMetrics: true,
        showArguments: true,
        showResults: true,
        maxArgumentLength: 500,
        maxResultLength: 500,
        indentLevel: 2,
        tableFormat: 'fancy',
        highlightErrors: true,
        highlightWarnings: true,
        showMethodSignature: true,
        showCorrelationId: true,
        showSemanticContext: true,
        compactMode: false,
        customFormatters: {
            timestamp: (date: Readonly<Date>): string => `[${date.toISOString()}]`,
            logLevel: (level: string): string => `[${level.toUpperCase()}]`,
            methodName: (name: string): string => `🎯 ${name}`,
            arguments: (args: ReadonlyDeep<readonly unknown[]>): string => 
                `📥 Args: ${JSON.stringify(args, null, 2)}`,
            result: (result: unknown): string => `📤 Result: ${JSON.stringify(result, null, 2)}`,
            performance: (time: number): string => `⏱️ ${time.toFixed(2)}ms`,
            correlation: (id: string): string => `🔗 ${id}`,
            semantic: (context: ReadonlyDeep<ISemanticContext>): string =>
                `🎯 ${context.domain}::${context.operation}`
        }
    }
}

/**
 * 🏭 **Production Prettifier Configuration**
 *
 * Machine-readable format optimized for production
 */
export function getProductionPrettifierConfig(): IPrettyConfig {
    return {
        colorOutput: false,
        showTimestamp: true,
        showLogLevel: true,
        showContextInfo: true,
        showPerformanceMetrics: true,
        showArguments: false,
        showResults: false,
        maxArgumentLength: 100,
        maxResultLength: 100,
        indentLevel: 0,
        tableFormat: 'simple',
        highlightErrors: false,
        highlightWarnings: false,
        showMethodSignature: false,
        showCorrelationId: true,
        showSemanticContext: true,
        compactMode: true,
        customFormatters: {
            timestamp: (date: Readonly<Date>): string => date.toISOString(),
            logLevel: (level: string): string => level.toUpperCase(),
            methodName: (name: string): string => name,
            arguments: (args: ReadonlyDeep<readonly unknown[]>): string => JSON.stringify(args),
            result: (result: unknown): string => JSON.stringify(result),
            performance: (time: number): string => String(time),
            correlation: (id: string): string => id,
            semantic: (context: ReadonlyDeep<ISemanticContext>): string => 
                `${context.domain}:${context.operation}`
        }
    }
}

/**
 * 🔍 **Debug Prettifier Configuration**
 *
 * Verbose format for debugging scenarios
 */
export function getDebugPrettifierConfig(): IPrettyConfig {
    return {
        colorOutput: true,
        showTimestamp: true,
        showLogLevel: true,
        showContextInfo: true,
        showPerformanceMetrics: true,
        showArguments: true,
        showResults: true,
        maxArgumentLength: 1000,
        maxResultLength: 1000,
        indentLevel: 4,
        tableFormat: 'fancy',
        highlightErrors: true,
        highlightWarnings: true,
        showMethodSignature: true,
        showCorrelationId: true,
        showSemanticContext: true,
        compactMode: false,
        customFormatters: {
            timestamp: (date: Readonly<Date>): string => `🕐 ${date.toISOString()}`,
            logLevel: (level: string): string => `🏷️ ${level.toUpperCase()}`,
            methodName: (name: string): string => `🔧 ${name}`,
            arguments: (args: ReadonlyDeep<readonly unknown[]>): string => 
                `📊 Arguments:\n${JSON.stringify(args, null, 4)}`,
            result: (result: unknown): string => `📋 Result:\n${JSON.stringify(result, null, 4)}`,
            performance: (time: number): string => `⏱️ Execution Time: ${time.toFixed(3)}ms`,
            correlation: (id: string): string => `🔗 Correlation ID: ${id}`,
            semantic: (context: ReadonlyDeep<ISemanticContext>): string =>
                `🎯 Semantic Context: ${context.domain}::${context.operation} [${context.complexity}]`
        }
    }
}

/**
 * 📊 **Analytics Prettifier Configuration**
 *
 * Structured format for analytics and reporting
 */
export function getAnalyticsPrettifierConfig(): IPrettyConfig {
    return {
        colorOutput: false,
        showTimestamp: true,
        showLogLevel: false,
        showContextInfo: true,
        showPerformanceMetrics: true,
        showArguments: false,
        showResults: false,
        maxArgumentLength: 50,
        maxResultLength: 50,
        indentLevel: 0,
        tableFormat: 'csv',
        highlightErrors: false,
        highlightWarnings: false,
        showMethodSignature: false,
        showCorrelationId: true,
        showSemanticContext: true,
        compactMode: true,
        customFormatters: {
            timestamp: (date: Readonly<Date>): string => String(date.getTime()),
            logLevel: (level: string): string => level,
            methodName: (name: string): string => name,
            arguments: (): string => '',
            result: (): string => '',
            performance: (time: number): string => time.toFixed(6),
            correlation: (id: string): string => id,
            semantic: (context: ReadonlyDeep<ISemanticContext>): string =>
                `${context.domain}|${context.operation}|${context.complexity}`
        }
    }
}

/**
 * 🎯 **Master Prettifier Configuration**
 *
 * Comprehensive prettifier configuration
 */
export function getMasterPrettifierConfig(): IPrettyConfig {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        colorOutput: !isProduction,
        showTimestamp: true,
        showLogLevel: true,
        showContextInfo: true,
        showPerformanceMetrics: true,
        showArguments: !isProduction,
        showResults: !isProduction,
        maxArgumentLength: isProduction ? 100 : 1000,
        maxResultLength: isProduction ? 100 : 1000,
        indentLevel: isProduction ? 0 : 2,
        tableFormat: isProduction ? 'simple' : 'fancy',
        highlightErrors: !isProduction,
        highlightWarnings: !isProduction,
        showMethodSignature: !isProduction,
        showCorrelationId: true,
        showSemanticContext: true,
        compactMode: isProduction,
        customFormatters: {
            timestamp: (date: Readonly<Date>): string => 
                (isProduction ? date.toISOString() : `[${date.toISOString()}]`),
            logLevel: (level: string): string => 
                (isProduction ? level.toUpperCase() : `[${level.toUpperCase()}]`),
            methodName: (name: string): string => (isProduction ? name : `🎯 ${name}`),
            arguments: (args: ReadonlyDeep<readonly unknown[]>): string =>
                isProduction ? JSON.stringify(args) : `📥 Args: ${JSON.stringify(args, null, 2)}`,
            result: (result: unknown): string =>
                isProduction ? JSON.stringify(result) : `📤 Result: ${JSON.stringify(result, null, 2)}`,
            performance: (time: number): string => 
                (isProduction ? String(time) : `⏱️ ${time.toFixed(2)}ms`),
            correlation: (id: string): string => (isProduction ? id : `🔗 ${id}`),
            semantic: (context: ReadonlyDeep<ISemanticContext>): string =>
                isProduction
                    ? `${context.domain}:${context.operation}`
                    : `🎯 ${context.domain}::${context.operation} [${context.complexity}]`
        }
    }
} 