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
// 🔄 RING BUFFER - MEMORY-EFFICIENT PERFORMANCE TRACKING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Memory-Efficient Ring Buffer for Performance Tracking**
 * 
 * Features:
 * - Fixed size (50 samples) to prevent memory bloat
 * - Automatic overwriting of old values
 * - Real-time statistical calculations
 * - TypeScript-generic for type safety
 * 
 * Memory Footprint: ~2.5KB per method (50 * 50 bytes avg)
 * Performance: O(1) insert, O(n) statistics calculation
 */

export interface IRingBufferStats {
    readonly average: number
    readonly standardDeviation: number
    readonly min: number
    readonly max: number
    readonly sampleCount: number
    readonly variance: number
}

export class RingBuffer<T extends number> {
    // 🔧 Configuration Constants
    private static readonly _defaultMaxSize = 50
    private static readonly _minSamplesForStats = 3

    // 📊 Internal State
    private readonly _buffer: T[]
    private readonly _maxSize: number
    private _currentSize: number
    private _pointer: number
    private _lastStats: IRingBufferStats | null

    public constructor(maxSize: number = RingBuffer._defaultMaxSize) {
        if (maxSize <= 0) {
            throw new Error('RingBuffer maxSize must be greater than 0')
        }
        
        this._maxSize = maxSize
        this._buffer = new Array<T>(maxSize)
        this._currentSize = 0
        this._pointer = 0
        this._lastStats = null
    }

    /**
     * 🔄 **Add new value to ring buffer**
     * Automatically overwrites oldest value when buffer is full
     */
    public push(value: T): void {
        this._buffer[this._pointer] = value
        this._pointer = (this._pointer + 1) % this._maxSize
        
        if (this._currentSize < this._maxSize) {
            this._currentSize++
        }
        
        // Invalidate cached stats
        this._lastStats = null
    }

    /**
     * 📊 **Get all current values in insertion order**
     * Returns values from oldest to newest
     */
    public getAll(): readonly T[] {
        if (this._currentSize === 0) {
            return []
        }

        if (this._currentSize < this._maxSize) {
            // Buffer not full yet, return from start to current position
            return this._buffer.slice(0, this._currentSize)
        }

        // Buffer is full, return from pointer (oldest) to end, then start to pointer
        const result: T[] = []
        for (let i = 0; i < this._maxSize; i++) {
            const index = (this._pointer + i) % this._maxSize
            result.push(this._buffer[index])
        }
        return result
    }

    /**
     * 📈 **Calculate comprehensive statistics**
     * Cached for performance - recalculated only when buffer changes
     */
    public calculateStats(): IRingBufferStats {
        if (this._lastStats !== null) {
            return this._lastStats
        }

        if (this._currentSize < RingBuffer._minSamplesForStats) {
            this._lastStats = {
                average: 0,
                standardDeviation: 0,
                min: 0,
                max: 0,
                sampleCount: this._currentSize,
                variance: 0
            }
            return this._lastStats
        }

        const values = this.getAll()
        const sum = values.reduce((acc, val) => acc + val, 0)
        const average = sum / values.length

        // Calculate variance and standard deviation
        const squaredDifferences = values.map(val => Math.pow(val - average, 2))
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length
        const standardDeviation = Math.sqrt(variance)

        const min = Math.min(...values)
        const max = Math.max(...values)

        this._lastStats = {
            average,
            standardDeviation,
            min,
            max,
            sampleCount: values.length,
            variance
        }

        return this._lastStats
    }

    /**
     * 🧮 **Quick statistical checks for anomaly detection**
     */
    public isAnomaly(value: T, thresholdMultiplier = 2.5): boolean {
        if (this._currentSize < RingBuffer._minSamplesForStats) {
            return false // Not enough data for anomaly detection
        }

        const stats = this.calculateStats()
        const threshold = stats.average + (stats.standardDeviation * thresholdMultiplier)
        
        return value > threshold
    }

    /**
     * 📏 **Calculate how many standard deviations away from mean**
     */
    public getZScore(value: T): number {
        if (this._currentSize < RingBuffer._minSamplesForStats) {
            return 0
        }

        const stats = this.calculateStats()
        if (stats.standardDeviation === 0) {
            return 0 // Avoid division by zero
        }

        return (value - stats.average) / stats.standardDeviation
    }

    /**
     * 🔍 **Buffer state information**
     */
    public getInfo(): {
        readonly currentSize: number
        readonly maxSize: number
        readonly isFull: boolean
        readonly utilizationPercentage: number
        } {
        return {
            currentSize: this._currentSize,
            maxSize: this._maxSize,
            isFull: this._currentSize === this._maxSize,
            utilizationPercentage: (this._currentSize / this._maxSize) * 100
        }
    }

    /**
     * 🧹 **Clear all data**
     */
    public clear(): void {
        this._currentSize = 0
        this._pointer = 0
        this._lastStats = null
    }

    /**
     * 📊 **Check if buffer has enough data for reliable statistics**
     */
    public hasReliableStats(): boolean {
        return this._currentSize >= RingBuffer._minSamplesForStats
    }

    /**
     * 🎯 **Get recent performance trend**
     * Returns 'improving', 'stable', or 'degrading' based on recent vs overall average
     */
    public getPerformanceTrend(recentSampleCount = 5): 'improving' | 'stable' | 'degrading' {
        if (this._currentSize < RingBuffer._minSamplesForStats) {
            return 'stable'
        }

        const allValues = this.getAll()
        const overallStats = this.calculateStats()
        
        const recentValues = allValues.slice(-Math.min(recentSampleCount, allValues.length))
        const recentAverage = recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length

        const difference = recentAverage - overallStats.average
        const threshold = overallStats.standardDeviation * 0.5 // 50% of std dev

        if (difference > threshold) {
            return 'degrading' // Recent performance is worse
        } else if (difference < -threshold) {
            return 'improving' // Recent performance is better
        } else {
            return 'stable'
        }
    }
} 