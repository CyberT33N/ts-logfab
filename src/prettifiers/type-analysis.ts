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
// 🎯 TYPE ANALYSIS FOR ARGUMENTS
// ═══════════════════════════════════════════════════════════════════════════════

import lodash from 'lodash'
import { configure } from 'safe-stable-stringify'

// 🎯 ENTERPRISE SAFE-STABLE-STRINGIFY CONFIGURATION
const stringify = configure({
    circularValue: '[Circular]',
    deterministic: true,
    bigint: true,
    maximumDepth: 10,
    maximumBreadth: 100,
    strict: false
})

/**
 * 🎯 ENTERPRISE-GRADE ARGUMENT TYPE ANALYSIS - LODASH POWERED
 */
export function analyzeArgumentType(value: unknown): { type: string; icon: string; displayValue: string } {
    if (value === null) {
        return { 
            type: 'null', 
            icon: '⚪', 
            displayValue: 'null'
        }
    }

    if (value === undefined) {
        return { 
            type: 'undefined', 
            icon: '⚫', 
            displayValue: 'undefined' }
    }
    
    // 🎯 LODASH UTILITY FUNCTIONS - ENTERPRISE GRADE TYPE CHECKING
    if (lodash.isString(value)) {
        const truncated = value.length > 25 ? value.slice(0, 22) + '...' : value
        return { type: 'string', icon: '📝', displayValue: `"${truncated}"` }
    }
    
    if (lodash.isNumber(value)) {
        const stringified = stringify(value)
        return { type: 'number', icon: '🔢', displayValue: stringified }
    }
    
    if (lodash.isBoolean(value)) {
        const stringified = stringify(value)
        return { type: 'boolean', icon: '☑️', displayValue: stringified }
    }
    
    if (lodash.isFunction(value)) {
        return { type: 'function', icon: '⚡', displayValue: '[Function]' }
    }
    
    if (typeof value === 'bigint') {
        const stringified = stringify(value)
        return { type: 'bigint', icon: '🔢', displayValue: stringified ?? '0n' }
    }
    
    if (lodash.isSymbol(value)) {
        return { type: 'symbol', icon: '🔣', displayValue: '[Symbol]' }
    }
    
    if (lodash.isArray(value)) {
        const arrayLength = value.length.toString()
        return { type: 'array', icon: '📋', displayValue: `[Array(${arrayLength})]` }
    }
    
    if (lodash.isPlainObject(value)) {
        return { type: 'object', icon: '📦', displayValue: '[Object]' }
    }
    
    // Default fallback
    const stringified = stringify(value)
    return { type: 'unknown', icon: '❓', displayValue: stringified }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 METHOD VISIBILITY DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 METHOD VISIBILITY DETECTION
 */
export function getMethodVisibility(methodName: string): { visibility: string; icon: string } {
    if (methodName.startsWith('_')) {
        return { visibility: 'private', icon: '🔒' }
    }
    
    if (methodName.startsWith('#')) {
        return { visibility: 'private', icon: '🔐' }
    }
    
    // Default to public
    return { visibility: 'public', icon: '🌐' }
} 