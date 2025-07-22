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

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PERFORMANCE MONITORING - SHARED TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

import type { IAnomalyDetection, IAnomalyConfig } from '@/logger/anomaly-detector/index.ts'
import type { IRingBufferStats } from '@/logger/ring-buffer.ts'
import type { ISemanticContext } from '@/logger/semantic-detector/index.ts'
import type { IPerformanceMetrics } from '@/logger/types.ts'

/**
 * 🏃 **Performance Session**
 * 
 * Represents an active performance monitoring session
 */
export interface IPerformanceSession {
    readonly sessionId: string
    readonly method: string
    readonly className?: string
    readonly startTime: number
    readonly startMemory: number
    readonly args: readonly unknown[]
    readonly semantic: ISemanticContext
    readonly correlationId?: string
}

/**
 * 📊 **Performance Result**
 * 
 * Complete performance analysis result
 */
export interface IPerformanceResult {
    readonly session: IPerformanceSession
    readonly endTime: number
    readonly duration: number
    readonly endMemory: number
    readonly memoryDelta: number
    readonly success: boolean
    readonly error?: Error
    readonly result?: unknown
    readonly anomalies: readonly IAnomalyDetection[]
    readonly stats: IRingBufferStats
}

/**
 * ⚙️ **Performance Monitor Configuration**
 * 
 * Configuration for performance monitoring
 */
export interface IPerformanceMonitorConfig {
    readonly enabled: boolean
    readonly enableMemoryTracking: boolean
    readonly enableAnomalyDetection: boolean
    readonly enableSemanticAnalysis: boolean
    readonly autoLogAnomalies: boolean
    readonly autoLogSlowOperations: boolean
    readonly slowOperationThreshold: number // ms
    readonly memoryTrackingInterval: number // ms
    readonly maxConcurrentSessions: number
    readonly sessionTimeout: number // ms
    readonly ringBufferSize: number
    readonly anomalyConfig: Partial<IAnomalyConfig>
}

/**
 * 📈 **Performance Statistics Summary**
 * 
 * Aggregated performance statistics
 */
export interface IPerformanceStatsSummary {
    readonly totalMethods: number
    readonly totalSessions: number
    readonly activeSessions: number
    readonly averageDuration: number
    readonly slowestMethod: {
        readonly method: string
        readonly averageDuration: number
        readonly worstDuration: number
    }
    readonly mostActiveMethod: {
        readonly method: string
        readonly callCount: number
        readonly totalDuration: number
    }
    readonly anomalyCount: {
        readonly total: number
        readonly bySeverity: Record<string, number>
        readonly byType: Record<string, number>
    }
    readonly memoryStats: {
        readonly averageUsage: number
        readonly peakUsage: number
        readonly totalAllocated: number
    }
}

/**
 * 🎯 **Performance Baseline Data**
 * 
 * Baseline performance metrics for a specific method
 */
export interface IPerformanceBaseline {
    readonly method: string
    readonly averageDuration: number
    readonly medianDuration: number
    readonly p95Duration: number
    readonly averageMemory: number
    readonly sampleSize: number
    readonly lastUpdated: number
    readonly semantic?: ISemanticContext
}

/**
 * 🎯 **Enhanced Performance Snapshot**
 * 
 * Extended performance snapshot with anomaly detection results
 */
export interface IEnhancedPerformanceSnapshot extends IPerformanceMetrics {
    readonly anomalies?: readonly IAnomalyDetection[]
    readonly baseline?: IPerformanceBaseline
    readonly thresholdViolations?: readonly string[]
} 