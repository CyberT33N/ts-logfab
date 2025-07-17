/**
 * Enterprise Configuration - Main Index
 * 
 * This file provides a unified API surface for all enterprise configuration functionality.
 * It maintains 100% backward compatibility through re-exports of modularized components.
 * 
 * Modules:
 * - Monitoring: Advanced monitoring, alerting, and infrastructure configurations
 * - Decorators: Complete decorator configurations and enterprise service setup
 * - Prettifier-Semantic: Semantic analysis and prettifier configurations
 */

// Re-export everything from the monitoring module
export * from './modules/monitoring/index.ts'

// Re-export everything from the decorators module  
export * from './modules/decorators/index.ts'

// Re-export everything from the prettifier-semantic module
export * from './modules/prettifier-semantic/index.ts'

// For convenience, also provide direct access to main demo functions
export { runAdvancedMonitoringDemo } from './modules/monitoring/monitoring-demo.ts'
export { runCompleteConfigurationDemo } from './modules/decorators/configuration-demo.ts'
export { runPrettifierSemanticDemo } from './modules/prettifier-semantic/semantic-demo.ts'

// Re-export main service classes for direct access
export { EnterpriseMonitoringService } from './modules/monitoring/monitoring-service.ts'
export { EnterpriseConfigurationService } from './modules/decorators/configuration-service.ts'
export { EnterprisePrettifierSemanticService } from './modules/prettifier-semantic/semantic-service.ts' 