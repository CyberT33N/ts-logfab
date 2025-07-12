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

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import terminalLink from 'terminal-link'
import { TERMINAL_COLORS } from './colors.ts'

/**
 * 🎯 Intelligently truncates text to fit within specified width
 */
export function intelligentTruncate(text: string, maxWidth: number, ellipsis = '…'): string {
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

export function formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'] as const
    if (bytes === 0) {return '0 B'}
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const value = Math.round(bytes / Math.pow(1024, i) * 100) / 100
    return `${value.toString()} ${sizes[i] ?? 'B'}`
}

export function formatDuration(ms: number): string {
    const roundedMs = Math.round(ms)
    const roundedSeconds = Math.round(ms / 1000 * 100) / 100
    const roundedMinutes = Math.round(ms / 60000 * 100) / 100
    
    if (ms < 1000) {return `${roundedMs.toString()}ms`}
    if (ms < 60000) {return `${roundedSeconds.toString()}s`}
    return `${roundedMinutes.toString()}m`
}

export function createProgressBar(value: number, max: number, width = 15): string {
    const percentage = Math.max(0, Math.min(1, value / max))
    const filled = Math.round(width * percentage)
    const empty = width - filled
    
    const bar = '█'.repeat(filled) + '░'.repeat(empty)
    
    if (percentage > 0.8) {return TERMINAL_COLORS.error(bar)}
    if (percentage > 0.6) {return TERMINAL_COLORS.warning(bar)}
    return TERMINAL_COLORS.success(bar)
}

export function createTerminalLink(text: string, url: string): string {
    return terminalLink(text, url, { fallback: () => text })
}

export function getMetadataIcon(key: string): string {
    const iconMap = {
        focus: '🎯',
        operation: '⚙️',
        validation: '✅',
        mode: '🎚️'
    } as const
    
    return iconMap[key as keyof typeof iconMap]
}

/**
 * 🎯 Analyzes result value and returns type information
 */
export function analyzeResultValue(value: unknown): { 
    type: string; 
    size: number | null; 
} {
    if (value === null) {return { type: 'null', size: null }}
    if (value === undefined) {return { type: 'undefined', size: null }}
    
    const valueType = typeof value
    
    if (valueType === 'string') {
        return { 
            type: 'String', 
            size: (value as string).length
        }
    }
    
    if (valueType === 'number') {
        return { 
            type: 'Number', 
            size: null
        }
    }
    
    if (valueType === 'boolean') {
        return { 
            type: 'Boolean', 
            size: null
        }
    }
    
    if (Array.isArray(value)) {
        return { 
            type: 'Array', 
            size: value.length
        }
    }
    
    if (valueType === 'object') {
        const obj = value as Record<string, unknown>
        const keys = Object.keys(obj)
        return { 
            type: 'Object', 
            size: keys.length
        }
    }
    
    return { 
        type: valueType, 
        size: null
    }
} 