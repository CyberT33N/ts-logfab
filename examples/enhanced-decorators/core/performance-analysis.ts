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
██               📊 PERFORMANCE ANALYSIS FRAMEWORK                           ██
██                    DECORATOR IMPLEMENTATION COMPARISON                     ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PERFORMANCE ANALYSIS FRAMEWORK
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import type { StandardDecoratorService, EnhancedDecoratorService } from './comparison-services.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PERFORMANCE INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export interface IPerformanceComparison {
	implementation: string
	executionTime: number
	memoryUsage: number
	logOutputSize: number
	featuresEnabled: readonly string[]
}

export interface IComparisonResult {
	winner: string
	executionTimeDifference: number
	memoryUsageDifference: number
	recommendations: readonly string[]
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PERFORMANCE MEASUREMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 📊 **Measures Standard Decorator Performance**
 *
 * Measures and compares performance for the standard implementation
 */
export async function measureStandardDecorator(
    service: ReadonlyDeep<StandardDecoratorService>,
    iterations = 100
): Promise<IPerformanceComparison> {
    const startTime = performance.now()
    const startMemory = process.memoryUsage().heapUsed

    for (let i = 0; i < iterations; i++) {
        await service.basicOperation(1)
    }

    const endTime = performance.now()
    const endMemory = process.memoryUsage().heapUsed

    return {
        implementation: 'Standard Decorators',
        executionTime: endTime - startTime,
        memoryUsage: endMemory - startMemory,
        logOutputSize: 0, // Would need to capture actual log output
        featuresEnabled: [
            'Correlation Context',
            'Semantic Analysis',
            'Anomaly Detection',
            'Performance Monitoring',
            'Enterprise Signatures'
        ]
    }
}

/**
 * 📊 **Measures Enhanced Decorator Performance**
 *
 * Measures and compares performance for the enhanced implementation
 */
export async function measureEnhancedDecorator(
    service: ReadonlyDeep<EnhancedDecoratorService>,
    iterations = 100
): Promise<IPerformanceComparison> {
    const startTime = performance.now()
    const startMemory = process.memoryUsage().heapUsed

    for (let i = 0; i < iterations; i++) {
        await service.basicOperation(1)
    }

    const endTime = performance.now()
    const endMemory = process.memoryUsage().heapUsed

    return {
        implementation: 'Enhanced Decorators',
        executionTime: endTime - startTime,
        memoryUsage: endMemory - startMemory,
        logOutputSize: 0, // Would need to capture actual log output
        featuresEnabled: [
            'Performance Tracking',
            'Anomaly Detection',
            'Semantic Analysis',
            'Correlation Tracking',
            'Auto Format Switching'
        ]
    }
}

/**
 * 📊 **Compares Implementations**
 *
 * Compares performance between standard and enhanced implementations
 */
export function compareImplementations(
    standard: ReadonlyDeep<IPerformanceComparison>,
    enhanced: ReadonlyDeep<IPerformanceComparison>
): IComparisonResult {
    const executionTimeDifference = standard.executionTime - enhanced.executionTime
    const memoryUsageDifference = standard.memoryUsage - enhanced.memoryUsage

    const executionWinner = executionTimeDifference > 0 ? 'Enhanced' : 'Standard'
    const memoryWinner = memoryUsageDifference > 0 ? 'Enhanced' : 'Standard'

    const overallWinner = executionWinner === 'Enhanced' && memoryWinner === 'Enhanced' ? 'Enhanced' : 'Standard'

    const recommendations: string[] = []

    if (overallWinner === 'Enhanced') {
        recommendations.push('Use Enhanced Decorators for better performance')
        recommendations.push('Consider Enhanced for new development')
        recommendations.push('Suitable for performance-critical applications')
    } else {
        recommendations.push('Use Standard Decorators for enterprise features')
        recommendations.push('Better for complex business requirements')
        recommendations.push('More suitable for large-scale applications')
    }

    return {
        winner: overallWinner,
        executionTimeDifference,
        memoryUsageDifference,
        recommendations
    }
}

/**
 * 📊 **Comprehensive Performance Analysis**
 *
 * Runs both measurements and comparison in one operation
 */
export async function runComprehensivePerformanceAnalysis(
    standardService: ReadonlyDeep<StandardDecoratorService>,
    enhancedService: ReadonlyDeep<EnhancedDecoratorService>,
    iterations = 100
): Promise<{
    standard: IPerformanceComparison
    enhanced: IPerformanceComparison
    comparison: IComparisonResult
}> {
    const [standard, enhanced] = await Promise.all([
        measureStandardDecorator(standardService, iterations),
        measureEnhancedDecorator(enhancedService, iterations)
    ])

    const comparison = compareImplementations(standard, enhanced)

    return {
        standard,
        enhanced,
        comparison
    }
} 