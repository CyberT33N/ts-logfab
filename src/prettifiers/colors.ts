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
import chalk from 'chalk'
import type { AnomalySeverity } from '../logger/anomaly-detector.ts'
import type { ISemanticContext } from '../logger/semantic-detector.ts'

/**
 * 🎨 UNIFIED COLOR PALETTE - TERMINAL HARMONY
 */
export const TERMINAL_COLORS = {
    // 🎯 ELEGANT MONOCHROME PALETTE - WHITE, YELLOW, BLACK, GRAY
    primary: chalk.hex('#FFFFFF'),        // Pure White
    secondary: chalk.hex('#CCCCCC'),      // Light Gray  
    accent: chalk.hex('#FFFF00'),         // Bright Yellow
    
    // 📊 STATUS PALETTE
    success: chalk.hex('#00DD00'),        // Bright Green
    warning: chalk.hex('#FFAA00'),        // Orange
    error: chalk.hex('#FF0000'),          // Bright Red
    critical: chalk.hex('#FF0044'),       // Critical Red
    
    // 🔧 UTILITY PALETTE
    text: chalk.hex('#FFFFFF'),           // Pure White Text
    muted: chalk.hex('#888888'),          // Medium Gray
    border: chalk.hex('#FFFFFF'),         // White Border (Default)
    errorBorder: chalk.hex('#FF0000'),    // RED Border for Errors
    background: chalk.hex('#000000'),     // Pure Black Background
    
    // 🎪 SPECIAL ELEMENTS
    highlight: chalk.hex('#FFFF00'),      // Bright Yellow Highlight
    timestamp: chalk.hex('#CCCCCC'),      // Light Gray Time
    icon: chalk.hex('#FFFF00'),           // Yellow Icons
    blue: chalk.hex('#00BBFF')            // Bright Blue for Debug
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED COLOR SCHEMES FOR SEMANTIC CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏢 **Domain-Specific Colors**
 * 
 * Each business domain gets its unique, semantically meaningful color
 */
export const DOMAIN_COLORS = {
    USER: chalk.hex('#4A90E2'),           // Professional Blue - User Management
    ORDER: chalk.hex('#F5A623'),          // Warm Orange - Order Processing
    PRODUCT: chalk.hex('#7ED321'),        // Fresh Green - Product Catalog
    FINANCE: chalk.hex('#9013FE'),        // Rich Purple - Financial Operations
    SYSTEM: chalk.hex('#FF6B6B'),         // System Red - Infrastructure
    SECURITY: chalk.hex('#FF5722'),       // Alert Orange-Red - Security
    ANALYTICS: chalk.hex('#795548'),      // Earth Brown - Data Analytics
    NOTIFICATION: chalk.hex('#E91E63'),   // Vibrant Pink - Notifications
    INTEGRATION: chalk.hex('#607D8B'),    // Steel Blue - External Integrations
    GENERAL: chalk.hex('#9E9E9E')         // Neutral Gray - General Operations
} as const

/**
 * ⚡ **Operation-Specific Colors**
 * 
 * Different operation types get distinct colors for quick recognition
 */
export const OPERATION_COLORS = {
    READ: chalk.hex('#00BCD4'),           // Cyan - Data Retrieval
    WRITE: chalk.hex('#FF9800'),          // Orange - Data Creation
    UPDATE: chalk.hex('#2196F3'),         // Blue - Data Modification
    DELETE: chalk.hex('#F44336'),         // Red - Data Removal
    COMPUTE: chalk.hex('#9C27B0'),        // Purple - Computational Tasks
    VALIDATE: chalk.hex('#4CAF50'),       // Green - Validation Tasks
    TRANSFORM: chalk.hex('#FF5722'),      // Deep Orange - Data Transformation
    SYNC: chalk.hex('#795548'),           // Brown - Synchronization
    CACHE: chalk.hex('#607D8B'),          // Blue Gray - Caching Operations
    UNKNOWN: chalk.hex('#757575')         // Gray - Unknown Operations
} as const

/**
 * 🚀 **Performance-Based Colors**
 * 
 * Performance indicators with intuitive color mapping
 */
export const PERFORMANCE_COLORS = {
    FAST: chalk.hex('#4CAF50'),           // Green - Excellent Performance
    NORMAL: chalk.hex('#2196F3'),         // Blue - Normal Performance
    SLOW: chalk.hex('#FF9800'),           // Orange - Warning Performance
    CRITICAL: chalk.hex('#F44336'),       // Red - Critical Performance
    UNKNOWN: chalk.hex('#9E9E9E')         // Gray - Unknown Performance
} as const

/**
 * 🚨 **Anomaly Severity Colors**
 * 
 * Clear visual distinction for different anomaly severity levels
 */
export const ANOMALY_COLORS = {
    LOW: chalk.hex('#FFC107'),            // Amber - Low Priority
    MEDIUM: chalk.hex('#FF9800'),         // Orange - Medium Priority
    HIGH: chalk.hex('#FF5722'),           // Deep Orange - High Priority
    CRITICAL: chalk.bgRed.white.bold      // Critical Red Background - Maximum Alert
} as const

/**
 * 🎨 **Correlation Context Colors**
 * 
 * Colors for correlation and workflow tracking
 */
export const CONTEXT_COLORS = {
    correlationId: chalk.hex('#E1BEE7'),  // Light Purple - Correlation ID
    workflowId: chalk.hex('#B39DDB'),     // Medium Purple - Workflow ID
    requestId: chalk.hex('#9575CD'),      // Deep Purple - Request ID
    sessionId: chalk.hex('#7E57C2'),      // Darker Purple - Session ID
    userId: chalk.hex('#673AB7')          // Deep Purple - User ID
} as const

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED COLOR UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏢 **Get Domain Color**
 * 
 * @param domain - The business domain
 * @returns Chalk color function for the domain
 */
export function getDomainColor(domain: string): typeof chalk {
    const normalizedDomain = domain.toUpperCase()
    return normalizedDomain in DOMAIN_COLORS 
        ? DOMAIN_COLORS[normalizedDomain as keyof typeof DOMAIN_COLORS]
        : DOMAIN_COLORS.GENERAL
}

/**
 * ⚡ **Get Operation Color**
 * 
 * @param operation - The operation type
 * @returns Chalk color function for the operation
 */
export function getOperationColor(operation: string): typeof chalk {
    const normalizedOperation = operation.toUpperCase()
    return normalizedOperation in OPERATION_COLORS
        ? OPERATION_COLORS[normalizedOperation as keyof typeof OPERATION_COLORS]
        : OPERATION_COLORS.UNKNOWN
}

/**
 * 🚀 **Get Performance Color**
 * 
 * @param duration - Duration in milliseconds
 * @param thresholds - Performance thresholds
 * @returns Chalk color function for the performance level
 */
export function getPerformanceColor(
    duration: number,
    thresholds: Readonly<{ fast: number; normal: number; slow: number }> = { fast: 100, normal: 500, slow: 1000 }
): typeof chalk {
    if (duration <= thresholds.fast) {
        return PERFORMANCE_COLORS.FAST
    }
    if (duration <= thresholds.normal) {
        return PERFORMANCE_COLORS.NORMAL
    }
    if (duration <= thresholds.slow) {
        return PERFORMANCE_COLORS.SLOW
    }
    return PERFORMANCE_COLORS.CRITICAL
}

/**
 * 🚨 **Get Anomaly Color**
 * 
 * @param severity - The anomaly severity level
 * @returns Chalk color function for the severity
 */
export function getAnomalyColor(severity: AnomalySeverity): typeof chalk {
    return ANOMALY_COLORS[severity]
}

/**
 * 🎨 **Get Semantic Context Colors**
 * 
 * @param semantic - The semantic context
 * @returns Object with domain and operation colors
 */
export function getSemanticColors(semantic?: ISemanticContext): {
    readonly domain: typeof chalk
    readonly operation: typeof chalk
} {
    return {
        domain: semantic ? getDomainColor(semantic.domain) : DOMAIN_COLORS.GENERAL,
        operation: semantic ? getOperationColor(semantic.operation) : OPERATION_COLORS.UNKNOWN
    }
}

/**
 * 🎯 **Enhanced Log Level with Semantic Context**
 * 
 * @param level - The log level
 * @param message - The message to enhance
 * @param semantic - Optional semantic context
 * @returns Enhanced message with semantic colors
 */
export function enhanceLogLevelWithSemantic(
    level: string,
    message: string,
    semantic?: ISemanticContext
): string {
    const baseEnhanced = enhanceLogLevel(level, message)
    
    if (!semantic) {
        return baseEnhanced
    }
    
    const colors = getSemanticColors(semantic)
    const domainPrefix = colors.domain(`[${semantic.domain}]`)
    const operationPrefix = colors.operation(`[${semantic.operation}]`)
    
    return `${domainPrefix}${operationPrefix} ${baseEnhanced}`
}

/**
 * 🚀 **Enhanced Performance Message**
 * 
 * @param method - The method name
 * @param duration - Execution duration in ms
 * @param semantic - Optional semantic context
 * @returns Performance-colored message
 */
export function enhancePerformanceMessage(
    method: string,
    duration: number,
    semantic?: ISemanticContext
): string {
    const performanceColor = getPerformanceColor(duration)
    const semanticColors = getSemanticColors(semantic)
    
    const methodName = semanticColors.domain(method)
    const durationText = performanceColor(`${duration.toFixed(2)}ms`)
    const operationTag = semantic ? semanticColors.operation(`[${semantic.operation}]`) : ''
    
    return `${operationTag}${methodName} completed in ${durationText}`
}

/**
 * 🚨 **Enhanced Anomaly Message**
 * 
 * @param anomalyType - Type of anomaly
 * @param severity - Severity level
 * @param message - The anomaly message
 * @returns Anomaly-colored message with severity
 */
export function enhanceAnomalyMessage(
    anomalyType: string,
    severity: AnomalySeverity,
    message: string
): string {
    const severityColor = getAnomalyColor(severity)
    const typeColor = OPERATION_COLORS.VALIDATE // Use validation color for anomaly types
    
    const severityTag = severityColor(`[${severity}]`)
    const typeTag = typeColor(`[${anomalyType}]`)
    
    return `🚨 ${severityTag}${typeTag} ${message}`
}

/**
 * 🎯 Log Level Enhancer
 * @param level - The level of the log message
 * @param message - The message to enhance
 * @returns The enhanced log message
 */
export function enhanceLogLevel(
    level: string, 
    message: string
): string {
    const enhancers = {
        fatal: () => chalk.bold.redBright(message),
        error: () => chalk.red(message),
        warn: () => chalk.yellow(message),
        info: () => chalk.blue(message),
        debug: () => chalk.cyan(message),
        trace: () => chalk.gray(message)
    } as const
    
    const enhancer = enhancers[level.toLowerCase() as keyof typeof enhancers]
    return enhancer()
}