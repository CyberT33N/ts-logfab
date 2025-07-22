/**
 * 🎯 **Enhanced Decorators Example Types**
 * 
 * This module defines comprehensive TypeScript types and interfaces specifically designed
 * for the enhanced decorator logging examples. These types provide structure and validation
 * for demonstration scenarios across multiple operational contexts.
 * 
 * The types encompass various configuration patterns, service interfaces, and
 * enhanced logging scenario definitions that support comprehensive testing and
 * validation of the enhanced decorator logging system's capabilities.
 * 
 * @module EnhancedDecoratorsTypes
 * @version 2.1.0
 * @author Enterprise Logging Team
 */

// ==== Type Imports ====
import type { ReadonlyDeep } from 'type-fest'
import type {
    ILogDecoratorConfig
} from '@/logger/decorators/index.ts'

// ==== Enhanced Types ====

/**
 * 🎯 **Enterprise Configuration Interface**
 * 
 * Modern Enterprise-ready logging configuration interface.
 * This is the current standard for all decorator configurations.
 */
export type EnterpriseDecoratorConfig = ReadonlyDeep<ILogDecoratorConfig>

/**
 * 🎯 **Enhanced Logging Scenario**
 * 
 * Comprehensive interface for enhanced logging demonstration scenarios that
 * provide comprehensive coverage of decorator functionality across multiple
 * operational contexts and configuration patterns.
 */
export interface IEnhancedLoggingScenario {
    readonly scenarioId: string
    readonly description: string
    readonly config: EnterpriseDecoratorConfig
    readonly expectedBehavior: readonly string[]
    readonly performanceMetrics?: {
        readonly maxExecutionTime: number
        readonly memoryUsageThreshold: number
    }
}

// ==== Service Interfaces ====

/**
 * 🎯 **Enhanced Service Operations**
 * 
 * Interface for enhanced service operations that provide comprehensive
 * logging functionality across multiple operational scenarios and contexts.
 */
export interface IEnhancedServiceOperations {
    executeBasicOperation(input: unknown): Promise<unknown>
    executeCriticalOperation(data: Record<string, unknown>): Promise<boolean>
    executePerformanceIntensiveOperation(workload: number): Promise<number>
}

// ==== Export Configuration ====
export { type ILogDecoratorConfig, DEFAULT_LOG_CONFIG } from '@/logger/decorators/index.ts' 