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
// 📊 PERFORMANCE MONITORING - INTEGRATED SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import {
    AnomalyDetector,
    createPerformanceMetric,
    type IAnomalyDetection,
    type IAnomalyConfig
} from './anomaly-detector.ts'
import { getCurrentCorrelationContext } from './correlation-context.ts'
import { getLogger } from './logger-factory.ts'
import { RingBuffer, type IRingBufferStats } from './ring-buffer.ts'
import { type ISemanticContext, detectSemanticContext } from './semantic-detector.ts'

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
 * 🎛️ **Performance Monitor Class**
 * 
 * Central performance monitoring and analytics system
 */
export class PerformanceMonitor {
    private readonly _ringBuffers = new Map<string, RingBuffer<number>>()
    private readonly _activeSessions = new Map<string, IPerformanceSession>()
    private readonly _anomalyDetector: AnomalyDetector
    private readonly _config: IPerformanceMonitorConfig
    private _sessionCounter = 0
    private _totalSessions = 0
    private readonly _memorySnapshots: number[] = []

    public constructor(config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>> = {}) {
        this._config = {
            ...DEFAULT_PERFORMANCE_CONFIG,
            ...config
        } as IPerformanceMonitorConfig

        this._anomalyDetector = new AnomalyDetector(this._config.anomalyConfig)

        // Start memory tracking if enabled
        if (this._config.enableMemoryTracking) {
            this._startMemoryTracking()
        }
    }

    /**
     * 🚀 **Start performance monitoring session**
     * 
     * Begins tracking performance for a method execution
     */
    public startSession(
        method: string,
        args: ReadonlyDeep<readonly unknown[]> = [],
        className?: string
    ): IPerformanceSession {
        if (!this._config.enabled) {
            // Return minimal session when disabled
            return this._createMinimalSession(method, args, className)
        }

        // Clean up old sessions
        this._cleanupExpiredSessions()

        // Check concurrent session limit
        const maxSessions = this._config.maxConcurrentSessions
        if (this._activeSessions.size >= maxSessions) {
            console.warn(`[PerformanceMonitor] Max concurrent sessions (${maxSessions.toString()}) reached`)
            return this._createMinimalSession(method, args, className)
        }

        const sessionId = this._generateSessionId()
        const startTime = performance.now()
        const startMemory = this._getCurrentMemoryUsage()

        // Semantic analysis
        let semantic: ISemanticContext
        if (this._config.enableSemanticAnalysis) {
            semantic = detectSemanticContext(method, args)
        } else {
            semantic = {
                operation: 'UNKNOWN',
                domain: 'GENERAL', 
                complexity: 'LOW',
                confidence: 0,
                metadata: {
                    detectedPatterns: [],
                    estimatedCost: 'MINIMAL'
                }
            }
        }

        // Get correlation context
        const correlationContext = getCurrentCorrelationContext()

        const session: IPerformanceSession = {
            sessionId,
            method,
            className,
            startTime,
            startMemory,
            args,
            semantic,
            correlationId: correlationContext?.correlationId
        }

        this._activeSessions.set(sessionId, session)
        this._totalSessions++

        return session
    }

    /**
     * 🏁 **End performance monitoring session**
     * 
     * Completes performance tracking and analyzes results
     */
    public endSession(
        session: ReadonlyDeep<IPerformanceSession>,
        success = true,
        error?: ReadonlyDeep<Error>,
        result?: unknown
    ): IPerformanceResult {
        if (!this._config.enabled) {
            return this._createMinimalResult(session, success, error, result)
        }

        const endTime = performance.now()
        const duration = endTime - session.startTime
        const endMemory = this._getCurrentMemoryUsage()
        const memoryDelta = endMemory - session.startMemory

        // Remove from active sessions
        this._activeSessions.delete(session.sessionId)

        // Get or create ring buffer for this method
        const buffer = this._getOrCreateRingBuffer(session.method)
        buffer.push(duration)

        // Get current statistics
        const stats = buffer.calculateStats()

        // Detect anomalies
        let anomalies: readonly IAnomalyDetection[] = []
        if (this._config.enableAnomalyDetection) {
            const metric = createPerformanceMetric(
                session.method,
                duration,
                memoryDelta,
                success,
                session.semantic
            )
            anomalies = this._anomalyDetector.addMetricAndDetect(metric)
        }

        const performanceResult: IPerformanceResult = {
            session,
            endTime,
            duration,
            endMemory,
            memoryDelta,
            success,
            error,
            result,
            anomalies,
            stats
        }

        // Auto-logging
        this._handleAutoLogging(performanceResult)

        return performanceResult
    }

    /**
     * 📊 **Get performance statistics for a method**
     * 
     * Returns current performance stats for a specific method
     */
    public getMethodStats(method: string): IRingBufferStats | undefined {
        const buffer = this._ringBuffers.get(method)
        return buffer?.calculateStats()
    }

    /**
     * 📈 **Get comprehensive performance summary**
     * 
     * Returns aggregated statistics across all methods
     */
    public getPerformanceSummary(): IPerformanceStatsSummary {
        const methodStats = Array.from(this._ringBuffers.entries()).map(
            ([method, buffer]: readonly [string, ReadonlyDeep<RingBuffer<number>>]) => ({
                method,
                stats: buffer.calculateStats()
            })
        )

        // Find slowest method
        let slowestMethod = {
            method: 'none',
            averageDuration: 0,
            worstDuration: 0
        }

        let mostActiveMethod = {
            method: 'none',
            callCount: 0,
            totalDuration: 0
        }

        let totalDuration = 0
        let totalCalls = 0

        for (const { method, stats } of methodStats) {
            totalDuration += stats.average * stats.sampleCount
            totalCalls += stats.sampleCount

            // Check for slowest
            if (stats.average > slowestMethod.averageDuration) {
                slowestMethod = {
                    method,
                    averageDuration: stats.average,
                    worstDuration: stats.max
                }
            }

            // Check for most active
            if (stats.sampleCount > mostActiveMethod.callCount) {
                mostActiveMethod = {
                    method,
                    callCount: stats.sampleCount,
                    totalDuration: stats.average * stats.sampleCount
                }
            }
        }

        // Memory statistics
        const memoryStats = {
            averageUsage: this._memorySnapshots.length > 0 
                ? this._memorySnapshots.reduce((sum, val) => sum + val, 0) / this._memorySnapshots.length 
                : 0,
            peakUsage: this._memorySnapshots.length > 0 ? Math.max(...this._memorySnapshots) : 0,
            totalAllocated: this._memorySnapshots.reduce((sum, val) => sum + val, 0)
        }

        return {
            totalMethods: this._ringBuffers.size,
            totalSessions: this._totalSessions,
            activeSessions: this._activeSessions.size,
            averageDuration: totalCalls > 0 ? totalDuration / totalCalls : 0,
            slowestMethod,
            mostActiveMethod,
            anomalyCount: {
                total: 0, // Would need to track this separately
                bySeverity: {},
                byType: {}
            },
            memoryStats
        }
    }

    /**
     * 🧹 **Clear all performance data**
     * 
     * Resets all tracking and statistics
     */
    public clearAll(): void {
        this._ringBuffers.clear()
        this._activeSessions.clear()
        this._anomalyDetector.clearAll()
        this._sessionCounter = 0
        this._totalSessions = 0
        this._memorySnapshots.length = 0
    }

    /**
     * ⚙️ **Update configuration**
     * 
     * Updates monitoring configuration at runtime
     */
    public updateConfig(updates: ReadonlyDeep<Partial<IPerformanceMonitorConfig>>): void {
        Object.assign(this._config, updates)
    }

    /**
     * 📊 **Get all tracked methods**
     * 
     * Returns list of all methods being monitored
     */
    public getTrackedMethods(): readonly string[] {
        return Array.from(this._ringBuffers.keys())
    }

    /**
     * 🔍 **Get active sessions**
     * 
     * Returns all currently active performance sessions
     */
    public getActiveSessions(): readonly IPerformanceSession[] {
        return Array.from(this._activeSessions.values())
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 PRIVATE UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * 🆔 **Generate unique session ID**
     */
    private _generateSessionId(): string {
        return `perf_${Date.now().toString()}_${(++this._sessionCounter).toString()}`
    }

    /**
     * 📦 **Get or create ring buffer for method**
     */
    private _getOrCreateRingBuffer(method: string): RingBuffer<number> {
        let buffer = this._ringBuffers.get(method)
        if (!buffer) {
            buffer = new RingBuffer<number>(this._config.ringBufferSize)
            this._ringBuffers.set(method, buffer)
        }
        return buffer
    }

    /**
     * 💾 **Get current memory usage**
     */
    private _getCurrentMemoryUsage(): number {
        if (!this._config.enableMemoryTracking) {
            return 0
        }

        try {
            const memUsage = process.memoryUsage()
            return memUsage.heapUsed / (1024 * 1024) // Convert to MB
        } catch {
            return 0
        }
    }

    /**
     * 🕒 **Start memory tracking**
     */
    private _startMemoryTracking(): void {
        setInterval(() => {
            const memoryUsage = this._getCurrentMemoryUsage()
            if (memoryUsage > 0) {
                this._memorySnapshots.push(memoryUsage)
                
                // Keep only recent snapshots (last 1000)
                if (this._memorySnapshots.length > 1000) {
                    this._memorySnapshots.splice(0, 100)
                }
            }
        }, this._config.memoryTrackingInterval)
    }

    /**
     * 🧹 **Clean up expired sessions**
     */
    private _cleanupExpiredSessions(): void {
        const now = performance.now()
        const expiredSessions: string[] = []

        for (const [sessionId, session] of this._activeSessions) {
            if (now - session.startTime > this._config.sessionTimeout) {
                expiredSessions.push(sessionId)
            }
        }

        for (const sessionId of expiredSessions) {
            this._activeSessions.delete(sessionId)
            console.warn(`[PerformanceMonitor] Session ${sessionId} expired and was cleaned up`)
        }
    }

    /**
     * 🚨 **Handle auto-logging**
     */
    private _handleAutoLogging(result: ReadonlyDeep<IPerformanceResult>): void {
        // Log anomalies
        if (this._config.autoLogAnomalies && result.anomalies.length > 0) {
            const logger = getLogger()
            for (const anomaly of result.anomalies) {
                logger.warn(
                    {
                        anomaly: formatAnomalyForLog(anomaly),
                        details: `Anomaly detected in ${result.session.method}`
                    },
                    `[PerformanceMonitor] Anomaly detected: ${anomaly.type}`
                )
            }
        }

        // Log slow operations
        if (
            this._config.autoLogSlowOperations &&
            result.duration > this._config.slowOperationThreshold
        ) {
            const logger = getLogger()
            logger.warn(
                {
                    performance: {
                        method: result.session.method,
                        duration: result.duration,
                        threshold: this._config.slowOperationThreshold,
                        memoryDelta: result.memoryDelta
                    }
                },
                `[PerformanceMonitor] Slow operation detected in ${result.session.method}`
            )
        }
    }

    /**
     * 🏗️ **Create minimal session when disabled**
     */
    private _createMinimalSession(
        method: string, 
        args: ReadonlyDeep<readonly unknown[]>, 
        className?: string
    ): IPerformanceSession {
        return {
            sessionId: 'disabled',
            method,
            className,
            startTime: performance.now(),
            startMemory: 0,
            args,
            semantic: {
                operation: 'UNKNOWN',
                domain: 'GENERAL',
                complexity: 'LOW',
                confidence: 0,
                metadata: {
                    detectedPatterns: [],
                    estimatedCost: 'MINIMAL'
                }
            }
        }
    }

    /**
     * 🏗️ **Create minimal result when disabled**
     */
    private _createMinimalResult(
        session: ReadonlyDeep<IPerformanceSession>,
        success: boolean,
        error?: ReadonlyDeep<Error>,
        result?: unknown
    ): IPerformanceResult {
        return {
            session,
            endTime: performance.now(),
            duration: 0,
            endMemory: 0,
            memoryDelta: 0,
            success,
            error,
            result,
            anomalies: [],
            stats: { 
                average: 0, 
                min: 0, 
                max: 0, 
                standardDeviation: 0, 
                sampleCount: 0,
                variance: 0
            }
        }
    }
}

/**
 * 🎨 **Format anomaly for logging**
 */
function formatAnomalyForLog(anomaly: ReadonlyDeep<IAnomalyDetection>): Record<string, unknown> {
    return {
        type: anomaly.type,
        severity: anomaly.severity,
        confidence: Math.round(anomaly.confidence * 100),
        method: anomaly.context.method,
        current: anomaly.current,
        expected: anomaly.expected,
        deviation: Math.round(anomaly.deviation * 100) / 100,
        threshold: anomaly.threshold,
        timestamp: anomaly.context.timestamp,
        sampleSize: anomaly.context.sampleSize
    }
}

/**
 * 🎯 **Performance Baseline Data**
 * 
 * This interface defines the expected structure of performance metrics
 * that can be used to detect anomalies.
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
 * This interface defines the structure of performance metrics
 * that are collected and processed by the anomaly detector.
 */
export interface IPerformanceSnapshot {
    readonly method: string;
    readonly duration: number;
    readonly memoryDelta: number;
    readonly success: boolean;
    readonly semantic: ISemanticContext;
    readonly timestamp: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DEFAULT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const DEFAULT_PERFORMANCE_CONFIG: IPerformanceMonitorConfig = {
    enabled: true,
    enableMemoryTracking: true,
    enableAnomalyDetection: true,
    enableSemanticAnalysis: true,
    autoLogAnomalies: true,
    autoLogSlowOperations: true,
    slowOperationThreshold: 1000, // 1 second
    memoryTrackingInterval: 5000, // 5 seconds
    maxConcurrentSessions: 1000,
    sessionTimeout: 300000, // 5 minutes
    ringBufferSize: 50,
    anomalyConfig: {
        performance: {
            slowThreshold: 3.0,
            fastThreshold: 0.1,
            stdDevSensitivity: 2.5,
            minSampleSize: 10
        },
        global: {
            confidenceThreshold: 0.7,
            maxAnomaliesPerSecond: 2,
            enabledDetectors: [
                'PERFORMANCE_SLOW',
                'PERFORMANCE_FAST',
                'MEMORY_HIGH',
                'ERROR_SPIKE',
                'STATISTICAL_OUTLIER'
            ]
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 FACTORY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🏭 **Create performance monitor instance**
 * 
 * Factory function for creating configured performance monitor
 */
export function createPerformanceMonitor(
    config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>> = {}
): PerformanceMonitor {
    return new PerformanceMonitor(config)
}

/**
 * 🌐 **Global performance monitor singleton**
 * 
 * Shared instance for use across the application
 */
let globalPerformanceMonitor: PerformanceMonitor | undefined

/**
 * 🔗 **Get global performance monitor**
 * 
 * Returns the global singleton instance
 */
export function getGlobalPerformanceMonitor(): PerformanceMonitor {
    globalPerformanceMonitor ??= new PerformanceMonitor()
    return globalPerformanceMonitor
}

/**
 * ⚙️ **Configure global performance monitor**
 * 
 * Updates the configuration of the global instance
 */
export function configureGlobalPerformanceMonitor(
    config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>>
): void {
    const monitor = getGlobalPerformanceMonitor()
    monitor.updateConfig(config)
}

/**
 * 🔄 **Reset global performance monitor**
 * 
 * Resets the global instance
 */
export function resetGlobalPerformanceMonitor(): void {
    globalPerformanceMonitor = undefined
} 