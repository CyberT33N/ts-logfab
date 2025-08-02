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
// 📊 PERFORMANCE MONITORING - MAIN MONITOR CLASS
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import {
    AnomalyDetector,
    createPerformanceMetric,
    type IAnomalyDetection
} from '@/logger/anomaly-detector/index.ts'
import { getLogger } from '@/logger/logger-factory.ts'
import type {
    IPerformanceSession,
    IPerformanceResult,
    IPerformanceMonitorConfig,
    IPerformanceStatsSummary
} from '@/logger/performance/types.ts'
import type { IRingBufferStats } from '@/logger/ring-buffer.ts'
import { PerformanceSessionManager } from './session-management.ts'
import { PerformanceStatisticsManager } from './statistics.ts'

/**
 * 🎛️ **Performance Monitor Class**
 * 
 * Central performance monitoring and analytics system
 */
export class PerformanceMonitor {
    private readonly _sessionManager: PerformanceSessionManager
    private readonly _statisticsManager: PerformanceStatisticsManager
    private readonly _anomalyDetector: AnomalyDetector
    private readonly _config: IPerformanceMonitorConfig

    public constructor(config: ReadonlyDeep<Partial<IPerformanceMonitorConfig>> = {}) {
        this._config = {
            ...DEFAULT_PERFORMANCE_CONFIG,
            ...config
        }

        this._sessionManager = new PerformanceSessionManager(this._config)
        this._statisticsManager = new PerformanceStatisticsManager(this._config.ringBufferSize)
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
        return this._sessionManager.startSession(method, args, className)
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
        this._sessionManager.endSession(session.sessionId)

        // Add measurement to statistics
        const stats = this._statisticsManager.addMeasurement(session.method, duration)

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
        return this._statisticsManager.getMethodStats(method)
    }

    /**
     * 📈 **Get comprehensive performance summary**
     * 
     * Returns aggregated statistics across all methods
     */
    public getPerformanceSummary(): IPerformanceStatsSummary {
        const sessionStats = this._sessionManager.getSessionStats()
        return this._statisticsManager.getPerformanceSummary(
            sessionStats.totalSessions,
            sessionStats.activeSessions
        )
    }

    /**
     * 🧹 **Clear all performance data**
     * 
     * Resets all tracking and statistics
     */
    public clearAll(): void {
        this._sessionManager.clearAllSessions()
        this._statisticsManager.clearAll()
        this._anomalyDetector.clearAll()
    }

    /**
     * ⚙️ **Update configuration**
     * 
     * Updates monitoring configuration at runtime
     */
    public updateConfig(updates: ReadonlyDeep<Partial<IPerformanceMonitorConfig>>): void {
        Object.assign(this._config, updates)
        this._sessionManager.updateConfig(this._config)
    }

    /**
     * 📊 **Get all tracked methods**
     * 
     * Returns list of all methods being monitored
     */
    public getTrackedMethods(): readonly string[] {
        return this._statisticsManager.getTrackedMethods()
    }

    /**
     * 🔍 **Get active sessions**
     * 
     * Returns all currently active performance sessions
     */
    public getActiveSessions(): readonly IPerformanceSession[] {
        return this._sessionManager.getActiveSessions()
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 PRIVATE UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

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
                this._statisticsManager.addMemorySnapshot(memoryUsage)
            }
        }, this._config.memoryTrackingInterval)
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