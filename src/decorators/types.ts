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
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

import type { ReadonlyDeep } from 'type-fest'

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DECORATOR CONFIGURATION TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Method Signature Configuration**
 * 
 * Defines the structure for manually overriding method signature information.
 */
export interface IMethodSignature {
    /**
     * 📝 Parameter names in order
     * @example ['name', 'email', 'age']
     */
    readonly parameterNames?: readonly string[]
    
    /**
     * 📝 Parameter types in order  
     * @example ['string', 'string', 'number']
     */
    readonly parameterTypes?: readonly string[]
    
    /**
     * 📤 Return type
     * @example 'Promise<User>'
     */
    readonly returnType?: string
    
    /**
     * 🔧 Full signature override
     * @example 'async createUser(name: string, email: string, age: number): Promise<User>'
     */
    readonly fullSignature?: string
}

/**
 * 🔗 **Correlation Context Configuration**
 * 
 * Configuration for automatic correlation ID management and distributed tracing.
 */
export interface ICorrelationContext {
    /**
     * 📝 Enable automatic correlation context injection
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 🆔 Custom correlation ID override
     * @example 'user-session-123'
     */
    readonly correlationId?: string
    
    /**
     * 🔗 Custom workflow ID override
     * @example 'checkout-process'
     */
    readonly workflowId?: string
    
    /**
     * 📨 Custom request ID override
     * @example 'req-456'
     */
    readonly requestId?: string
    
    /**
     * 👤 Custom user ID override
     * @example 'user-789'
     */
    readonly userId?: string
    
    /**
     * 🔄 Inherit correlation context from parent
     * @default true
     */
    readonly inheritFromParent?: boolean
}

/**
 * 🎯 **Semantic Context Configuration**
 * 
 * Configuration for business domain and operation detection.
 */
export interface ISemanticContext {
    /**
     * 📝 Enable semantic context detection
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 🏢 Manual domain override
     * @example 'USER'
     */
    readonly domain?: 'USER' | 'ORDER' | 'PRODUCT' | 'FINANCE' | 'SYSTEM' | 'GENERAL'
    
    /**
     * ⚙️ Manual operation override
     * @example 'WRITE'
     */
    readonly operation?: 'READ' | 'WRITE' | 'UPDATE' | 'DELETE' | 'COMPUTE' | 'UNKNOWN'
    
    /**
     * 🎚️ Manual complexity override
     * @example 'HIGH'
     */
    readonly complexity?: 'LOW' | 'MEDIUM' | 'HIGH'
    
    /**
     * 🔑 Business key for tracking
     * @example 'order-12345'
     */
    readonly businessKey?: string
    
    /**
     * 🏷️ Custom tags for categorization
     * @example ['payment', 'critical']
     */
    readonly tags?: readonly string[]
}

/**
 * 🚨 **Anomaly Detection Configuration**
 * 
 * Configuration for performance anomaly monitoring.
 */
export interface IAnomalyDetection {
    /**
     * 📝 Enable anomaly detection for this method
     * @default true
     */
    readonly enabled?: boolean
    
    /**
     * 📊 Custom baseline samples count override
     * @default 10
     */
    readonly minSamples?: number
    
    /**
     * 🎚️ Custom threshold multiplier override
     * @default 2.5
     */
    readonly thresholdMultiplier?: number
    
    /**
     * 🚨 Enable critical anomaly alerts
     * @default true
     */
    readonly enableCriticalAlerts?: boolean
    
    /**
     * ⚠️ Enable warning anomaly alerts
     * @default true
     */
    readonly enableWarningAlerts?: boolean
    
    /**
     * 📝 Custom method key for anomaly tracking
     * @example 'UserService::createUser'
     */
    readonly customMethodKey?: string
}

/**
 * 🎛️ Configuration interface for the Log decorator
 */
export interface ILogDecoratorConfig {
    /**
     * 📊 Log level for method execution tracking
     * @default 'info'
     */
    readonly level?: 'trace' | 'debug' | 'info' | 'warn' | 'error'
    
    /**
     * ⚡ Include performance metrics in logs
     * @default true
     */
    readonly includePerformance?: boolean
    
    /**
     * 📥 Include method arguments in logs (filtered for relevance)
     * @default true
     */
    readonly includeArgs?: boolean
    
    /**
     * 📤 Include return value metadata in logs
     * @default true
     */
    readonly includeResult?: boolean
    
    /**
     * 🔧 Custom context to include in all logs
     */
    readonly customContext?: ReadonlyDeep<Record<string, unknown>>
    
    /**
     * 🏷️ Custom prefix override (if not using automatic generation)
     */
    readonly customPrefix?: string
    
    /**
     * 🎚️ Log successful operations
     * @default true
     */
    readonly logSuccess?: boolean
    
    /**
     * 🎚️ Log method start
     * @default true
     */
    readonly logStart?: boolean
    
    /**
     * 🎚️ Log detailed debug information
     * @default false
     */
    readonly logDebug?: boolean
    
    /**
     * 🎯 **ENTERPRISE SIGNATURE CONFIG** - Manual method signature override
     */
    readonly methodSignature?: IMethodSignature
    
    // ==== 🚀 ENHANCED FEATURES (NEW) ====
    
    /**
     * 🔗 **CORRELATION CONTEXT CONFIG** - Automatic correlation ID management
     */
    readonly correlationContext?: ICorrelationContext
    
    /**
     * 🎯 **SEMANTIC CONTEXT CONFIG** - Business domain and operation detection
     */
    readonly semanticContext?: ISemanticContext
    
    /**
     * 🚨 **ANOMALY DETECTION CONFIG** - Performance anomaly monitoring
     */
    readonly anomalyDetection?: IAnomalyDetection
    
    /**
     * 🌍 **ENVIRONMENT CONFIG** - Environment-specific behavior
     */
    readonly environment?: {
        /**
         * 📝 Override auto-detected environment
         * @example 'production'
         */
        readonly forceEnvironment?: 'development' | 'staging' | 'production' | 'test'
        
        /**
         * 🎨 Override auto-detected logging format
         * @example 'machine'
         */
        readonly forceFormat?: 'human' | 'machine' | 'auto'
        
        /**
         * 🔇 Disable logging entirely in certain environments
         * @default []
         */
        readonly disableInEnvironments?: readonly ('development' | 'staging' | 'production' | 'test')[]
    }
}

/**
 * 🎯 Default configuration for the Log decorator
 */
export const DEFAULT_LOG_CONFIG: Required<
    Omit<ILogDecoratorConfig, 'customContext' | 'customPrefix' | 'methodSignature'>
> = {
    level: 'info',
    includePerformance: true,
    includeArgs: true,
    includeResult: true,
    logSuccess: true,
    logStart: true,
    logDebug: false,
    correlationContext: {
        enabled: true,
        inheritFromParent: true
    },
    semanticContext: {
        enabled: true
    },
    anomalyDetection: {
        enabled: true,
        enableCriticalAlerts: true,
        enableWarningAlerts: true
    },
    environment: {
        disableInEnvironments: []
    }
} as const