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
import { readFileSync } from 'fs'
import { join } from 'path'
import { performance } from 'perf_hooks'
import { pino } from 'pino'
import pretty from 'pino-pretty'
import { ReadonlyDeep } from 'type-fest'
import { PackageJson } from 'zod-package-json'
import { createEnterprisePrettyConfig } from '@/prettifiers/index.ts'
import { 
    createAnomalyDetector, 
    type AnomalyDetector, 
    type IAnomalyDetection, 
    createPerformanceMetric 
} from './anomaly-detector/index.ts'
import { createPerformanceSnapshot } from './performance-utils.ts'
import { type IPerformanceMetrics } from './types.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🚨 ANOMALY DETECTOR SINGLETON
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Singleton Anomaly Detector Instance**
 * 
 * Global instance for consistent anomaly detection across all logger instances
 */
let anomalyDetectorInstance: AnomalyDetector | null = null

/**
 * 🎯 **Get or create the singleton anomaly detector**
 */
function getAnomalyDetector(): AnomalyDetector {
    anomalyDetectorInstance ??= createAnomalyDetector({
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
                'FREQUENCY_HIGH',
                'STATISTICAL_OUTLIER'
            ]
        }
    })
    return anomalyDetectorInstance
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE TRACKING HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Performance Context for Method Tracking**
 */
interface IPerformanceContext {
    readonly method: string
    readonly startTime: number
    readonly startSnapshot: IPerformanceMetrics
}

/**
 * 🎯 **Start performance tracking for a method**
 */
export function startPerformanceTracking(method: string): IPerformanceContext {
    return {
        method,
        startTime: performance.now(),
        startSnapshot: createPerformanceSnapshot()
    }
}

/**
 * 🎯 **End performance tracking and detect anomalies**
 */
export function endPerformanceTracking(
    context: ReadonlyDeep<IPerformanceContext>,
    success = true,
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    logger: pino.Logger = getLogger()
): void {
    const endTime = performance.now()
    const duration = endTime - context.startTime
    const endSnapshot = createPerformanceSnapshot()
    
    // Calculate memory usage difference - safe access
    const startMemory = context.startSnapshot.memoryUsage?.heapUsed ?? 0
    const endMemory = endSnapshot.memoryUsage?.heapUsed ?? 0
    const memoryDiff = endMemory - startMemory
    const memoryUsageMB = Math.round(memoryDiff / (1024 * 1024) * 100) / 100
    
    // Create performance metric
    const metric = createPerformanceMetric(
        context.method,
        duration,
        memoryUsageMB,
        success
    )
    
    // Detect anomalies using singleton detector
    const anomalyDetector = getAnomalyDetector()
    const anomalies = anomalyDetector.addMetricAndDetect(metric)
    
    // Log performance data
    const memoryDisplay = memoryUsageMB > 0 ? `, +${memoryUsageMB.toString()}MB` : ''
    logger.info({
        performance: {
            method: context.method,
            duration,
            memoryUsage: memoryUsageMB,
            success,
            anomalies: anomalies.length > 0 ? anomalies.map(formatAnomalyForLog) : undefined
        }
    }, `🎯 Performance: ${context.method} (${duration.toFixed(2)}ms${memoryDisplay})`)
    
    // Log anomalies if detected
    if (anomalies.length > 0) {
        logAnomalies(anomalies, logger)
    }
}

/**
 * 🚨 **Log detected anomalies**
 */
function logAnomalies(
    anomalies: ReadonlyDeep<readonly IAnomalyDetection[]>, 
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    logger: pino.Logger
): void {
    for (const anomaly of anomalies) {
        const severity = anomaly.severity
        const message = formatAnomalyMessage(anomaly)
        
        switch (severity) {
        case 'CRITICAL':
            logger.error({
                anomaly: formatAnomalyForLog(anomaly)
            }, message)
            break
        case 'HIGH':
            logger.warn({
                anomaly: formatAnomalyForLog(anomaly)
            }, message)
            break
        case 'MEDIUM':
            logger.info({
                anomaly: formatAnomalyForLog(anomaly)
            }, message)
            break
        case 'LOW':
            logger.debug({
                anomaly: formatAnomalyForLog(anomaly)
            }, message)
            break
        default:
            logger.info({
                anomaly: formatAnomalyForLog(anomaly)
            }, message)
            break
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
 * 🎨 **Format anomaly message for human reading**
 */
function formatAnomalyMessage(anomaly: ReadonlyDeep<IAnomalyDetection>): string {
    const icons = {
        performanceSlow: '🐌',
        performanceFast: '⚡',
        memoryHigh: '💾',
        memoryLow: '💾',
        errorSpike: '❌',
        frequencyHigh: '🔄',
        frequencyLow: '🔄',
        patternDeviation: '📊',
        statisticalOutlier: '📈'
    }
    
    // Convert enum to camelCase for icon lookup with safe typing
    const typeKey = anomaly.type.toLowerCase().replace(/_(.)/g, (_, char: string) => char.toUpperCase())
    const icon = icons[typeKey as keyof typeof icons] || '🚨'
    const confidencePercent = Math.round(anomaly.confidence * 100)
    
    return `${icon} Anomaly: ${anomaly.type} in ${anomaly.context.method} (${String(confidencePercent)}% confidence)`
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED LOGGER FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Enhanced Logger Instance with Anomaly Detection**
 */
interface IEnhancedLogger extends pino.Logger {
    /**
     * 🎯 Get current anomaly detector statistics
     */
    getAnomalyStats(): {
        trackedMethods: readonly string[]
        totalMethods: number
    }
    
    /**
     * 🎯 Clear all anomaly detection data
     */
    clearAnomalyData(): void
    
    /**
     * 🎯 Get method statistics from anomaly detector
     */
    getMethodStats(method: string): ReturnType<AnomalyDetector['getMethodStats']>
}

/**
 * 🎯 Creates an enterprise logger instance with integrated anomaly detection
 * @returns The enhanced logger instance
 */
const createEnterpriseLogger = (): IEnhancedLogger => {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isTest = process.env.NODE_ENV === 'test'

    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
    
    // 🎯 Professional package.json validation with zod-package-json
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))

    // 🎯 Create beautiful visual stream with enterprise styling
    const stream = pretty(createEnterprisePrettyConfig())
        
    const baseLogger = pino(
        {
            name: packageJson.name,
            level: isDevelopment ? 'debug' : (isTest ? 'debug' : 'info'),
            base: {
                author: packageJson.author,
                version: packageJson.version,
                environment: process.env.NODE_ENV,
                nodeVersion: process.version,
                platform: process.platform,
                anomalyDetection: {
                    enabled: true,
                    detectors: [
                        'PERFORMANCE_SLOW',
                        'PERFORMANCE_FAST', 
                        'MEMORY_HIGH',
                        'ERROR_SPIKE',
                        'FREQUENCY_HIGH',
                        'STATISTICAL_OUTLIER'
                    ]
                }
            }
        },
        stream
    )

    // 🎯 Enhance logger with anomaly detection methods
    const enhancedLogger = baseLogger as IEnhancedLogger
    
    enhancedLogger.getAnomalyStats = (): {
        trackedMethods: readonly string[]
        totalMethods: number
    } => {
        const detector = getAnomalyDetector()
        const trackedMethods = detector.getTrackedMethods()
        return {
            trackedMethods,
            totalMethods: trackedMethods.length
        }
    }
    
    enhancedLogger.clearAnomalyData = (): void => {
        const detector = getAnomalyDetector()
        detector.clearAll()
        enhancedLogger.info('🧹 Anomaly detection data cleared')
    }
    
    enhancedLogger.getMethodStats = (method: string): ReturnType<AnomalyDetector['getMethodStats']> => {
        const detector = getAnomalyDetector()
        return detector.getMethodStats(method)
    }

    // 🎯 Log anomaly detection initialization
    enhancedLogger.info({
        anomalyDetection: {
            initialized: true,
            enabledDetectors: 6,
            confidenceThreshold: 0.7,
            maxAnomaliesPerSecond: 2
        }
    }, '🚨 Anomaly detection initialized')

    return enhancedLogger
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SINGLETON LOGGER INSTANCE
// ═══════════════════════════════════════════════════════════════════════════════

let loggerInstance: IEnhancedLogger | null = null

/**
 * 🎯 **Get the singleton logger instance**
 */
export function getLogger(): IEnhancedLogger {
    loggerInstance ??= createEnterpriseLogger()
    return loggerInstance
}

/**
 * 🎯 **Main logger export for backwards compatibility**
 */
export const logger = getLogger()

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CONVENIENCE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Reset both logger and anomaly detector (useful for tests)**
 */
export function resetLogger(): void {
    loggerInstance = null
    anomalyDetectorInstance = null
}

/**
 * 🎯 **Get anomaly detector instance (for advanced usage)**
 */
export function getAnomalyDetectorInstance(): AnomalyDetector {
    return getAnomalyDetector()
} 