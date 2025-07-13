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
██                      🎨 AWARD-WINNING TERMINAL LOGGER                    ██
██                         ENTERPRISE-GRADE • TABLE-POWERED                 ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { readFileSync } from 'fs'
import { join } from 'path'
import { PackageJson } from 'zod-package-json'
import env, { Environment } from '@/env.ts'

// ==== Types ====
interface IAppMetadata {
    name: PackageJson['name'];
    version: PackageJson['version'];
    author: PackageJson['author'];
    environment: Environment['NODE_ENV'];
}

// ==== UTF-8 Symbol Integration ====

/**
 * 🎯 Domain-specific UTF-8 Icons
 */
export const DOMAIN_ICONS = {
    USER: '👤',      // Professional user icon
    ORDER: '📦',     // Package/order icon  
    PRODUCT: '🛍️',   // Shopping/product icon
    FINANCE: '💰',   // Money/finance icon
    SYSTEM: '⚙️',    // System/technical icon
    GENERAL: '📋'    // General purpose icon
} as const

/**
 * 🎯 Operation-specific UTF-8 Icons
 */
export const OPERATION_ICONS = {
    READ: '📖',      // Reading/viewing operation
    WRITE: '✏️',     // Writing/creating operation
    UPDATE: '🔄',    // Updating/modifying operation
    DELETE: '🗑️',    // Deleting/removing operation
    COMPUTE: '🧮',   // Computing/processing operation
    UNKNOWN: '❓'    // Unknown operation
} as const

/**
 * 🎯 Status-specific UTF-8 Icons  
 */
export const STATUS_ICONS = {
    SUCCESS: '✅',   // Success/completed status
    WARNING: '⚠️',   // Warning/caution status
    ERROR: '❌',     // Error/failed status
    PERFORMANCE: '🚀', // Performance/speed status
    INFO: 'ℹ️',      // Information status
    DEBUG: '🐛'      // Debug/troubleshooting status
} as const

/**
 * 🎯 Anomaly-specific UTF-8 Icons
 */
export const ANOMALY_ICONS = {
    LOW: '🟡',       // Low severity anomaly
    MEDIUM: '🟠',    // Medium severity anomaly
    HIGH: '🔴',      // High severity anomaly
    CRITICAL: '💥'   // Critical severity anomaly
} as const

/**
 * 🎯 Performance-specific UTF-8 Icons
 */
export const PERFORMANCE_ICONS = {
    FAST: '⚡',      // Fast performance
    NORMAL: '➡️',    // Normal performance
    SLOW: '🐌',     // Slow performance
    CRITICAL: '🔥'   // Critical performance
} as const

// ==== Type Definitions ====
export type DomainType = keyof typeof DOMAIN_ICONS;
export type OperationType = keyof typeof OPERATION_ICONS;
export type StatusType = keyof typeof STATUS_ICONS;
export type AnomalySeverity = keyof typeof ANOMALY_ICONS;
export type PerformanceLevel = keyof typeof PERFORMANCE_ICONS;

// ==== Icon Utility Functions ====

/**
 * 🎯 Gets the appropriate domain icon
 * @param domain - The domain type
 * @returns The UTF-8 icon for the domain
 */
export function getDomainIcon(domain: DomainType): string {
    return DOMAIN_ICONS[domain]
}

/**
 * 🎯 Gets the appropriate operation icon
 * @param operation - The operation type
 * @returns The UTF-8 icon for the operation
 */
export function getOperationIcon(operation: OperationType): string {
    return OPERATION_ICONS[operation]
}

/**
 * 🎯 Gets the appropriate status icon
 * @param status - The status type
 * @returns The UTF-8 icon for the status
 */
export function getStatusIcon(status: StatusType): string {
    return STATUS_ICONS[status]
}

/**
 * 🎯 Gets the appropriate anomaly icon
 * @param severity - The anomaly severity
 * @returns The UTF-8 icon for the anomaly severity
 */
export function getAnomalyIcon(severity: AnomalySeverity): string {
    return ANOMALY_ICONS[severity]
}

/**
 * 🎯 Gets the appropriate performance icon
 * @param level - The performance level
 * @returns The UTF-8 icon for the performance level
 */
export function getPerformanceIcon(level: PerformanceLevel): string {
    return PERFORMANCE_ICONS[level]
}

/**
 * 🎯 Creates a formatted icon with text
 * @param icon - The UTF-8 icon
 * @param text - The text to display with the icon
 * @param separator - The separator between icon and text (default: single space)
 * @returns Formatted string with icon and text
 */
export function formatIconWithText(icon: string, text: string, separator = ' '): string {
    return `${icon}${separator}${text}`
}

/**
 * 🎯 Creates a semantic context display
 * @param domain - The domain type
 * @param operation - The operation type
 * @param separator - The separator between domain and operation (default: ':')
 * @returns Formatted semantic context string
 */
export function formatSemanticContext(
    domain: DomainType, 
    operation: OperationType, 
    separator = ':'
): string {
    const domainIcon = getDomainIcon(domain)
    const operationIcon = getOperationIcon(operation)
    return `${domainIcon}${domain}${separator}${operationIcon}${operation}`
}

/**
 * 🎯 Creates a status message with icon
 * @param status - The status type
 * @param message - The status message
 * @returns Formatted status string with icon
 */
export function formatStatusMessage(status: StatusType, message: string): string {
    const statusIcon = getStatusIcon(status)
    return formatIconWithText(statusIcon, message)
}

/**
 * 🎯 Creates an anomaly warning with icon
 * @param severity - The anomaly severity
 * @param description - The anomaly description
 * @returns Formatted anomaly warning string
 */
export function formatAnomalyWarning(severity: AnomalySeverity, description: string): string {
    const anomalyIcon = getAnomalyIcon(severity)
    return formatIconWithText(anomalyIcon, `${severity} ANOMALY: ${description}`)
}

/**
 * 🎯 Creates a performance indicator with icon
 * @param level - The performance level  
 * @param details - The performance details
 * @returns Formatted performance indicator string
 */
export function formatPerformanceIndicator(level: PerformanceLevel, details: string): string {
    const performanceIcon = getPerformanceIcon(level)
    return formatIconWithText(performanceIcon, `${level}: ${details}`)
}

/**
 * 🎨 Gets the application metadata
 * @returns The application metadata
 */
export function getAppMetadata(): IAppMetadata {
    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
     
    // 🎯 Professional package.json validation with zod-package-json
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))
        
    return {
        name: packageJson.name,
        version: packageJson.version,
        author:  packageJson.author,
        environment: env.NODE_ENV
    }
} 