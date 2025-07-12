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

/**
 * 🎯 Extracts relevant arguments for logging (excludes large objects)
 * @param args - The arguments of the method
 * @returns The relevant arguments
 */
export function extractLogRelevantArgs(args: readonly unknown[]): Record<string, unknown> {
    const relevantArgs: Record<string, unknown> = {}
    
    args.forEach((arg, index) => {
        if (arg === null || arg === undefined) {
            relevantArgs[`arg${String(index)}`] = arg
        } else if (typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean') {
            relevantArgs[`arg${String(index)}`] = arg
        } else if (typeof arg === 'object') {
            if (Array.isArray(arg)) {
                relevantArgs[`arg${String(index)}`] = { type: 'Array', length: arg.length }
            } else {
                relevantArgs[`arg${String(index)}`] = { type: 'Object', keys: Object.keys(arg).length }
            }
        } else {
            relevantArgs[`arg${String(index)}`] = { type: typeof arg }
        }
    })
    
    return relevantArgs
}

/**
 * 🎯 Determines result metadata for logging
 * @param result - The result of the method
 * @returns The result metadata
 */
export function extractResultMetadata(result: unknown): { type: string; size?: number } {
    if (result === null || result === undefined) {
        return { type: typeof result }
    }
    
    if (Array.isArray(result)) {
        return { type: 'Array', size: result.length }
    }
    
    if (typeof result === 'object') {
        return { type: 'Object', size: Object.keys(result).length }
    }
    
    return { type: typeof result }
} 