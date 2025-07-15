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
// 📊 PERFORMANCE MONITORING - SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { getCurrentCorrelationContext } from '@/logger/correlation-context/index.ts'
import type { IPerformanceSession, IPerformanceMonitorConfig } from '@/logger/performance/types.ts'
import { detectSemanticContext, type ISemanticContext } from '@/logger/semantic-detector/index.ts'

/**
 * 🏃 **Performance Session Manager**
 * 
 * Manages active performance monitoring sessions
 */
export class PerformanceSessionManager {
    private readonly _activeSessions = new Map<string, IPerformanceSession>()
    private readonly _config: IPerformanceMonitorConfig
    private _sessionCounter = 0
    private _totalSessions = 0

    public constructor(config: IPerformanceMonitorConfig) {
        this._config = config
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
     * Removes session from active tracking
     */
    public endSession(sessionId: string): void {
        this._activeSessions.delete(sessionId)
    }

    /**
     * 🔍 **Get active sessions**
     * 
     * Returns all currently active performance sessions
     */
    public getActiveSessions(): readonly IPerformanceSession[] {
        return Array.from(this._activeSessions.values())
    }

    /**
     * 📊 **Get session statistics**
     * 
     * Returns session-related statistics
     */
    public getSessionStats(): {
        readonly totalSessions: number
        readonly activeSessions: number
        } {
        return {
            totalSessions: this._totalSessions,
            activeSessions: this._activeSessions.size
        }
    }

    /**
     * 🧹 **Clear all sessions**
     * 
     * Resets all session tracking
     */
    public clearAllSessions(): void {
        this._activeSessions.clear()
        this._sessionCounter = 0
        this._totalSessions = 0
    }

    /**
     * ⚙️ **Update configuration**
     * 
     * Updates session management configuration
     */
    public updateConfig(config: IPerformanceMonitorConfig): void {
        Object.assign(this._config, config)
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
} 