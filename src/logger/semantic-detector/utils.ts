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
// 🔧 SEMANTIC DETECTION - PRIVATE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import type { OperationType, ComplexityLevel } from './types.ts'

/**
 * 📊 **Calculate pattern confidence**
 * Higher confidence for more specific matches
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function calculatePatternConfidence(methodName: Readonly<string>, pattern: ReadonlyDeep<RegExp>): number {
    const match = methodName.match(pattern)
    if (match === null) {return 0}

    let confidence = 0.5 // Base confidence

    // Bonus for exact word boundary matches
    if (pattern.source.includes('\\b') || pattern.source.includes('^') || pattern.source.includes('$')) {
        confidence += 0.3
    }

    // Bonus for longer matches
    const matchLength = match[0].length
    const nameLength = methodName.length
    confidence += (matchLength / nameLength) * 0.2

    // Bonus for matches at start or end
    if (match.index === 0) {
        confidence += 0.1
    }
    if (match.index !== undefined && match.index + matchLength === nameLength) {
        confidence += 0.1
    }

    return Math.min(confidence, 1.0)
}

/**
 * 🔍 **Calculate keyword confidence**
 * Higher confidence for more prominent keyword positions
 */
export function calculateKeywordConfidence(methodName: Readonly<string>, keyword: Readonly<string>): number {
    const index = methodName.indexOf(keyword)
    if (index === -1) {return 0}

    let confidence = 0.4 // Base confidence

    // Bonus for keyword at start
    if (index === 0) {
        confidence += 0.3
    }

    // Bonus for word boundary
    if (index === 0 || methodName[index - 1] === '_' || methodName[index - 1] === '-') {
        confidence += 0.2
    }

    // Bonus for longer keywords (more specific)
    confidence += (keyword.length / methodName.length) * 0.1

    return Math.min(confidence, 1.0)
}

/**
 * 💰 **Get base cost for operation type**
 */
export function getBaseCostForOperation(operation: OperationType): number {
    switch (operation) {
    case 'READ':
    case 'VALIDATE':
        return 1
    case 'WRITE':
    case 'UPDATE':
    case 'TRANSFORM':
        return 2
    case 'DELETE':
    case 'COMPUTE':
    case 'AGGREGATE':
        return 3
    case 'SEARCH':
        return 2
    case 'UNKNOWN':
    default:
        return 1
    }
}

/**
 * 💰 **Get complexity adjustment**
 */
export function getComplexityAdjustment(complexity: ComplexityLevel): number {
    switch (complexity) {
    case 'LOW':
        return 0
    case 'MEDIUM':
        return 1
    case 'HIGH':
        return 2
    case 'EXTREME':
        return 3
    default:
        return 0
    }
}

/**
 * 🏷️ **Detect entity type from method name**
 * Attempts to identify the main entity being operated on
 */
export function detectEntityType(methodName: Readonly<string>): string | undefined {
    // Common entity patterns in method names
    const entityPatterns = [
        /(?:get|create|update|delete|find|save|load|process|calculate)([A-Z][a-zA-Z]*)/,
        /([A-Z][a-zA-Z]*)(?:Service|Repository|Manager|Controller)$/,
        /^([a-z]+)(?:By|With|For|From)/i,
        /^(?:process|calculate|find)([A-Z][a-zA-Z]+)/
    ]

    for (const pattern of entityPatterns) {
        const match = methodName.match(pattern)
        if (match?.[1] !== undefined) {
            return match[1].toLowerCase()
        }
    }

    return undefined
} 