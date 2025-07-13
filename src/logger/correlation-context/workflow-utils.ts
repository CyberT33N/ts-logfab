/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██║                      ██
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
// 🔧 WORKFLOW UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { randomUUID } from 'crypto'
import { ReadonlyDeep } from 'type-fest'
import { MAX_WORKFLOW_DEPTH } from './constants.ts'
import type { ICallChainInfo, ICorrelationContext } from './types.ts'

/**
 * 🎯 **Generate workflow ID from call chain**
 * Creates deterministic ID based on method call sequence
 */
export function generateWorkflowId(
    callChain: Readonly<readonly ICallChainInfo[]>, 
    parentContext?: ReadonlyDeep<ICorrelationContext>
): string {
    if (parentContext !== undefined && parentContext.depth < MAX_WORKFLOW_DEPTH) {
        // Continue parent workflow if depth allows
        return parentContext.workflowId
    }

    // Create new workflow ID based on call signature
    const signature = callChain
        .slice(0, 3) // Use first 3 stack frames
        .map(info => `${info.className ?? ''}${info.methodName}`)
        .join('->')
        .toLowerCase()
        .replace(/[^a-z0-9->]/g, '') // Clean non-alphanumeric chars

    if (signature.length > 0) {
        // Create hash-like ID from signature
        const hash = simpleHash(signature)
        return `wf-${hash}`
    }

    // Fallback to UUID if no meaningful signature
    return `wf-${randomUUID().slice(0, 8)}`
}

/**
 * 🔍 **Detect request ID from various sources**
 * Attempts to find HTTP request ID from common sources
 */
export function detectRequestId(): string | undefined {
    // Check common HTTP header patterns in Node.js
    if (typeof process !== 'undefined') {
        // Check for common request ID environment variables
        const requestIdSources = [
            'REQUEST_ID',
            'X_REQUEST_ID', 
            'X_CORRELATION_ID',
            'TRACE_ID'
        ]

        for (const source of requestIdSources) {
            const value = process.env[source]
            if (value !== undefined && value.length > 0) {
                return value
            }
        }
    }

    // TODO: In future, could integrate with HTTP frameworks
    // to automatically extract request IDs from headers

    return undefined
}

/**
 * 🧮 **Simple hash function for deterministic IDs**
 * Creates consistent short hashes from strings
 */
export function simpleHash(str: Readonly<string>): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).slice(0, 8)
} 