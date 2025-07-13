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
import is from '@sindresorhus/is'
import cliProgress from 'cli-progress'
import prettyBytes from 'pretty-bytes'
import prettyMilliseconds from 'pretty-ms'
import terminalLink from 'terminal-link'
import { TERMINAL_COLORS } from './colors.ts'

/**
 * 🎯 Intelligently truncates text to fit within specified width
 * @param text - The text to truncate
 * @param maxWidth - The maximum width of the text
 * @param ellipsis - The ellipsis to use
 * @returns The truncated text
 */
export function intelligentTruncate(
    text: string, maxWidth: number, ellipsis = '…'
): string {
    if (text.length <= maxWidth) {
        return text
    }
    
    const ellipsisLength = ellipsis.length
    const availableWidth = maxWidth - ellipsisLength
    
    if (availableWidth <= 0) {
        return ellipsis.slice(0, maxWidth)
    }
    
    const truncated = text.slice(0, availableWidth)
    const lastSpaceIndex = truncated.lastIndexOf(' ')
    
    if (lastSpaceIndex > availableWidth * 0.7) {
        return truncated.slice(0, lastSpaceIndex) + ellipsis
    }
    
    return truncated + ellipsis
}

/**
 * 🎯 Formats bytes to a human-readable string using Enterprise-Grade Sindre Sorhus Package
 * @param bytes - The number of bytes
 * @returns The formatted bytes
 */
export function formatBytes(bytes: number): string {
    return prettyBytes(bytes, {
        binary: true,     // Use 1024-based calculation (like our previous implementation)
        space: true       // Keep space between number and unit
    })
}

/**
 * 🎯 Formats milliseconds to a human-readable string using Enterprise-Grade Sindre Sorhus Package
 * @param ms - The number of milliseconds
 * @returns The formatted milliseconds
 */
export function formatDuration(ms: number): string {
    return prettyMilliseconds(ms, {
        compact: true,           // Short format: 1h 10m → 1h (like our previous implementation)
        secondsDecimalDigits: 1  // Keep 1 decimal place for seconds
    })
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CLI-PROGRESS CONFIGURATION FOR ENTERPRISE-GRADE PROGRESS BARS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Creates professional CLI-Progress bar for performance visualization
 * @param value - The current value
 * @param max - The maximum value
 * @param width - The width of the progress bar
 * @returns The formatted progress bar string
 */
export function createEnterpriseProgressBar(
    value: number, 
    max: number, 
    width = 39
): string {
    const percentage = Math.max(0, Math.min(1, value / max))
    const filled = Math.round(width * percentage)
    const empty = width - filled
    
    // Build progress bar string manually using cli-progress style
    const barChars = {
        complete: '█',
        incomplete: '░'
    }
    
    const bar = barChars.complete.repeat(filled) + barChars.incomplete.repeat(empty)
    const percentageText = `${Math.round(percentage * 100).toString()}%`
    const barString = `${bar} ${percentageText}`
    
    // Apply color based on percentage
    if (percentage > 0.8) {
        return TERMINAL_COLORS.error(barString)
    }
    if (percentage > 0.6) {
        return TERMINAL_COLORS.warning(barString)
    }
    
    return TERMINAL_COLORS.success(barString)
}

/**
 * 🎯 Creates a performance-optimized progress bar using CLI-Progress
 * @param value - The current value
 * @param max - The maximum value
 * @param width - The width of the progress bar
 * @returns The formatted progress bar string
 */
export function createPerformanceProgressBar(
    value: number,
    max: number,
    width = 39
): string {
    const percentage = Math.max(0, Math.min(1, value / max))
    const filled = Math.round(width * percentage)
    const empty = width - filled
    
    // Use CLI-Progress formatting but return as string
    const barChars = {
        complete: '█',
        incomplete: '░'
    }
    
    const bar = barChars.complete.repeat(filled) + barChars.incomplete.repeat(empty)
    
    // Apply enterprise-grade color coding
    if (percentage > 0.8) {
        return TERMINAL_COLORS.error(bar)
    }
    if (percentage > 0.6) {
        return TERMINAL_COLORS.warning(bar)
    }
    
    return TERMINAL_COLORS.success(bar)
}

/**
 * 🎯 Creates a multi-progress bar manager for complex operations
 * @returns A configured MultiBar instance
 */
export function createMultiProgressManager(): cliProgress.MultiBar {
    return new cliProgress.MultiBar({
        clearOnComplete: false,
        hideCursor: true,
        format: ' {bar} | {label} | {value}/{total} | {percentage}%',
        barCompleteChar: '█',
        barIncompleteChar: '░',
        stopOnComplete: false,
        barsize: 30
    }, cliProgress.Presets.shades_classic)
}

/**
 * 🎯 Creates a progress bar
 * @param value - The value of the progress bar
 * @param max - The maximum value of the progress bar
 * @param width - The width of the progress bar
 * @returns The progress bar
 */
export function createProgressBar(value: number, max: number, width = 15): string {
    return createPerformanceProgressBar(value, max, width)
}

/**
 * 🎯 Creates a terminal link
 * @param text - The text to link
 * @param url - The URL to link to
 * @returns The terminal link
 */
export function createTerminalLink(text: string, url: string): string {
    return terminalLink(text, url, { fallback: () => text })
}

/**
 * 🎯 Gets the icon for the metadata
 * @param key - The key of the metadata
 * @returns The icon for the metadata
 */
export function getMetadataIcon(key: string): string {
    const lowerKey = key.toLowerCase().replace(':', '')

    const iconMap = {
        focus: '🎯',
        operation: '⚙️',
        validation: '✅',
        mode: '🎚️',
        module: '📦',
        version: '🏷️',
        environment: '🌍',
        signaturetype: '✍️',
        intelligentsigning: '🧠',
        correlationtype: '🔗',
        distributedtracing: '🌐',
        semantictype: '🎯',
        businesscontext: '💼',
        anomalytype: '🚨',
        alertingenabled: '🔔',
        runtimeconfig: '⚙️',
        adaptivelogging: '🔄',
        sensitivity: '🔒',
        privacy: '🔒',
        monitoringlevel: '📈',
        dashboardintegration: '📊',
        performancebaseline: '📉',
        monitoringtype: '📈',
        kpitracking: '📊',
        analyticsintegration: '🔗',
        businessimpactanalysis: '💼',
        threatdetection: '🛡️',
        compliancetracking: '📋',
        auditlogging: '📜',
        securityincidentresponse: '🚒',
        queryoptimization: '🚀',
        connectionpooling: '💧',
        indexanalysis: '🔍',
        routinganalysis: '🗺️',
        loadbalancing: '⚖️',
        ratelimiting: '🚦',
        masterconfiguration: '👑',
        comprehensivetracking: '🧿'
    } as const
    
    // Safe type check instead of unsafe type assertion
    if (lowerKey in iconMap) {
        return iconMap[lowerKey as keyof typeof iconMap]
    }
    return '🔧'
}

/**
 * 🎯 Analyzes result value and returns type information
 * @param value - The value to analyze
 * @returns The type information of the value
 */
export function analyzeResultValue(value: unknown): { 
    type: string; 
    size: number | null; 
} {
    if (is.null(value)) {
        return { type: 'null', size: null }
    }
    if (is.undefined(value)) {
        return { type: 'undefined', size: null }
    }
    
    if (is.string(value)) {
        return { 
            type: 'String', 
            size: value.length
        }
    }
    
    if (is.number(value)) {
        return { 
            type: 'Number', 
            size: null
        }
    }
    
    if (is.boolean(value)) {
        return { 
            type: 'Boolean', 
            size: null
        }
    }
    
    if (is.array(value)) {
        return { 
            type: 'Array', 
            size: value.length
        }
    }
    
    if (is.plainObject(value)) {
        const keys = Object.keys(value)
        return { 
            type: 'Object', 
            size: keys.length
        }
    }
    
    return { 
        type: 'Unknown', 
        size: null
    }
} 