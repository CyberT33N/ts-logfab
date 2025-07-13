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
// 🔧 STACK PARSING UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

import { MAX_CALL_STACK_DEPTH } from './constants.ts'
import type { ICallChainInfo } from './types.ts'

/**
 * 🔍 **Parse call stack for workflow detection**
 * Extracts method names and file information from Error stack
 */
export function parseCallStack(): readonly ICallChainInfo[] {
    const stack = new Error().stack
    if (stack === undefined) {
        return []
    }

    const lines = stack.split('\n').slice(1) // Remove "Error" line
    const result: ICallChainInfo[] = []

    for (const line of lines.slice(0, MAX_CALL_STACK_DEPTH)) {
        const info = parseStackLine(line.trim())
        if (info !== null) {
            result.push(info)
        }
    }

    return result
}

/**
 * 🧩 **Parse individual stack trace line**
 * Extracts method name, file, and line number
 */
export function parseStackLine(line: Readonly<string>): ICallChainInfo | null {
    // Common Node.js stack trace patterns:
    // at MethodName (file:///path/to/file.ts:123:45)
    // at Object.methodName (file:///path/to/file.ts:123:45)
    // at ClassName.methodName (file:///path/to/file.ts:123:45)
    
    const patterns = [
        /at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/, // Standard format
        /at\s+(.+?)\s+\((.+?)\)/, // Without line numbers
        /at\s+(.+?)$/ // Simple format
    ]

    for (const pattern of patterns) {
        const match = line.match(pattern)
        if (match !== null) {
            const [, methodInfo, fileName, lineNumber] = match
            
            // Parse method name and class
            const methodParts = methodInfo.split('.')
            const methodName = methodParts[methodParts.length - 1]
            const className = methodParts.length > 1 ? methodParts[methodParts.length - 2] : undefined

            return {
                methodName: methodName || 'anonymous',
                fileName: fileName || 'unknown',
                lineNumber: lineNumber ? parseInt(lineNumber, 10) : undefined,
                className
            }
        }
    }

    return null
} 