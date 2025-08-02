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
// 📊 PERFORMANCE MONITORING - STATISTICS CALCULATION
// ═══════════════════════════════════════════════════════════════════════════════

import type { ReadonlyDeep } from 'type-fest'
import { RingBuffer, type IRingBufferStats } from '../../ring-buffer.ts'
import type { IPerformanceStatsSummary } from '../types.ts'

/**
 * 📊 **Performance Statistics Manager**
 * 
 * Manages performance statistics calculation and aggregation
 */
export class PerformanceStatisticsManager {
    private readonly _ringBuffers = new Map<string, RingBuffer<number>>()
    private readonly _memorySnapshots: number[] = []
    private readonly _ringBufferSize: number

    public constructor(ringBufferSize: number) {
        this._ringBufferSize = ringBufferSize
    }

    /**
     * 📈 **Add performance measurement**
     * 
     * Adds a new performance measurement for a method
     */
    public addMeasurement(method: string, duration: number): IRingBufferStats {
        const buffer = this._getOrCreateRingBuffer(method)
        buffer.push(duration)
        return buffer.calculateStats()
    }

    /**
     * 📊 **Get method statistics**
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
    public getPerformanceSummary(totalSessions: number, activeSessions: number): IPerformanceStatsSummary {
        const entries = Array.from(this._ringBuffers.entries())
        const methodStats = entries.map(
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
            totalSessions,
            activeSessions,
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
     * 📊 **Get all tracked methods**
     * 
     * Returns list of all methods being monitored
     */
    public getTrackedMethods(): readonly string[] {
        return Array.from(this._ringBuffers.keys())
    }

    /**
     * 💾 **Add memory snapshot**
     * 
     * Adds a memory usage snapshot for statistical analysis
     */
    public addMemorySnapshot(memoryUsage: number): void {
        if (memoryUsage > 0) {
            this._memorySnapshots.push(memoryUsage)
            
            // Keep only recent snapshots (last 1000)
            if (this._memorySnapshots.length > 1000) {
                this._memorySnapshots.splice(0, 100)
            }
        }
    }

    /**
     * 💾 **Get memory snapshots**
     * 
     * Returns current memory usage snapshots
     */
    public getMemorySnapshots(): readonly number[] {
        return [...this._memorySnapshots]
    }

    /**
     * 🧹 **Clear all statistics**
     * 
     * Resets all tracking and statistics
     */
    public clearAll(): void {
        this._ringBuffers.clear()
        this._memorySnapshots.length = 0
    }

    /**
     * 🧹 **Clear method statistics**
     * 
     * Clears statistics for a specific method
     */
    public clearMethodStats(method: string): void {
        this._ringBuffers.delete(method)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🔧 PRIVATE UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * 📦 **Get or create ring buffer for method**
     */
    private _getOrCreateRingBuffer(method: string): RingBuffer<number> {
        let buffer = this._ringBuffers.get(method)

        if (!buffer) {
            buffer = new RingBuffer<number>(this._ringBufferSize)
            this._ringBuffers.set(method, buffer)
        }
        
        return buffer
    }
} 