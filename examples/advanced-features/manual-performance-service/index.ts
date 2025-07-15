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

// ==== Imports ====
import { AnomalyDetectionManager, type IAnomalyDetectionResult } from './AnomalyDetectionManager.ts'
import { ConfigurationManager, type IConfigurationResult } from './ConfigurationManager.ts'
import { PerformanceHelpers, type IPerformanceHelpers } from './PerformanceHelpers.ts'
import { PerformanceMarksManager, type IPerformanceMarksResult } from './PerformanceMarksManager.ts'
import { PerformanceSnapshotManager, type IPerformanceSnapshotResult } from './PerformanceSnapshotManager.ts'
import { StatisticsManager, type IPerformanceStatistics, type IClearResult } from './StatisticsManager.ts'

// Re-export types for external use
export type {
    IPerformanceMarksResult,
    IPerformanceSnapshotResult,
    IAnomalyDetectionResult,
    IConfigurationResult,
    IPerformanceStatistics,
    IClearResult,
    IPerformanceHelpers
}

/**
 * ⚡ **Manual Performance Service**
 * 
 * Demonstrates manual performance tracking using performance-utils.ts
 * Tests all the functions that were NOT being used in the original app.ts
 * 
 * This is a Composition-Root that orchestrates all specialized manager instances.
 */
export class ManualPerformanceService {
    private readonly _performanceLog: {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[] = []

    private readonly _marksManager: PerformanceMarksManager
    private readonly _snapshotManager: PerformanceSnapshotManager
    private readonly _anomalyManager: AnomalyDetectionManager
    private readonly _configManager: ConfigurationManager
    private readonly _statsManager: StatisticsManager
    private readonly _helpers: IPerformanceHelpers

    public constructor() {
        this._helpers = new PerformanceHelpers()
        this._marksManager = new PerformanceMarksManager(this._performanceLog)
        this._snapshotManager = new PerformanceSnapshotManager(this._performanceLog, this._helpers)
        this._anomalyManager = new AnomalyDetectionManager(this._performanceLog)
        this._configManager = new ConfigurationManager()
        this._statsManager = new StatisticsManager(this._performanceLog)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ MANUAL PERFORMANCE MARKS AND MEASURES
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithManualMarks(taskName: string, iterations: number): Promise<IPerformanceMarksResult> {
        return this._marksManager.performWithManualMarks(taskName, iterations)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ PERFORMANCE SNAPSHOTS AND CALCULATIONS
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithSnapshots(operationName: string, workload: number): Promise<IPerformanceSnapshotResult> {
        return this._snapshotManager.performWithSnapshots(operationName, workload)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ ENHANCED PERFORMANCE MONITORING WITH ANOMALY DETECTION
    // ═══════════════════════════════════════════════════════════════════════════════

    public async performWithAnomalyDetection(methodName: string, iterations: number): Promise<IAnomalyDetectionResult> {
        return this._anomalyManager.performWithAnomalyDetection(methodName, iterations)
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚡ CONFIGURATION AND MANAGEMENT METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    public configurePerformanceMonitoring(): IConfigurationResult {
        return this._configManager.configurePerformanceMonitoring()
    }

    public getPerformanceStatistics(): IPerformanceStatistics {
        return this._statsManager.getPerformanceStatistics()
    }

    public clearAllPerformanceData(): IClearResult {
        return this._statsManager.clearAllPerformanceData()
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // ⚒️ HELPER METHODS FOR DIFFERENT OPERATION TYPES
    // ═══════════════════════════════════════════════════════════════════════════════

    public getPerformanceLog(): readonly {
        operation: string
        metrics: Record<string, unknown>
        timestamp: Date
    }[] {
        return this._statsManager.getPerformanceLog()
    }
} 