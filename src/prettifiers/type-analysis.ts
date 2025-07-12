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
 * 🎯 ARGUMENT TYPE ANALYSIS - LODASH POWERED
 * @param value - The value to analyze
 * @returns The type analysis of the value
 */
export function analyzeArgumentType(
    value: unknown
): { type: string; icon: string; displayValue: string } {
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
    
    // 🎯 SINDRESORHUS TYPE GUARDS - ENTERPRISE GRADE TYPE CHECKING
    if (is.string(value)) {
        const truncated = value.length > 25 ? value.slice(0, 22) + '...' : value
        return { type: 'string', icon: '📝', displayValue: `"${truncated}"` }
    }
    
    if (is.number(value)) {
        const stringified = stringify(value)
        return { type: 'number', icon: '🔢', displayValue: stringified }
    }
    
    if (is.boolean(value)) {
        const stringified = stringify(value)
        return { type: 'boolean', icon: '☑️', displayValue: stringified }
    }
    
    if (is.function(value)) {
        return { type: 'function', icon: '⚡', displayValue: '[Function]' }
    }
    
    if (is.bigint(value)) {
        const stringified = stringify(value)
        return { type: 'bigint', icon: '🔢', displayValue: stringified ?? '0n' }
    }
    
    if (is.symbol(value)) {
        return { type: 'symbol', icon: '🔣', displayValue: '[Symbol]' }
    }
    
    if (is.array(value)) {
        const arrayLength = value.length.toString()
        return { type: 'array', icon: '📋', displayValue: `[Array(${arrayLength})]` }
    }
    
    if (is.plainObject(value)) {
        return { type: 'object', icon: '📦', displayValue: '[Object]' }
    }
    
    // Default fallback
    const stringified = stringify(value)
    return { type: 'unknown', icon: '❓', displayValue: stringified }
}

/**
 * 🎯 METHOD VISIBILITY DETECTION
 * @param methodName - The name of the method
 * @returns The visibility of the method
 */
export function getMethodVisibility(
    methodName: string
): { visibility: string; icon: string } {
    if (methodName.startsWith('_')) {
        return { visibility: 'private', icon: '🔒' }
    }
    
    if (methodName.startsWith('#')) {
        return { visibility: 'private', icon: '🔐' }
    }
    
    // Default to public
    return { visibility: 'public', icon: '🌐' }
} 