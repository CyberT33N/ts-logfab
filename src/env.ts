/* eslint-disable @typescript-eslint/naming-convention */
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
import { z } from 'zod'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 LOGGING FORMAT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Logging Format Options**
 * 
 * - `human`: Pretty formatted output for development (colored, readable)
 * - `machine`: JSON structured output for production (parseable, structured)
 * - `auto`: Automatically choose based on NODE_ENV (dev=human, prod=machine)
 */
export type LoggingFormat = 'human' | 'machine' | 'auto'

/**
 * 🎯 **Environment Detection Schema**
 * 
 * Single Source of Truth for environment configuration
 */
const envSchema = z.object({
    // 🔧 ==== Application Environment ====
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    
    // 🎨 ==== Logging Format Configuration ====
    LOGGING_FORMAT: z.enum(['human', 'machine', 'auto']).default('auto')
})

const env = envSchema.parse(process.env)

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 LOGGING FORMAT AUTO-DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Resolve actual logging format based on environment**
 * 
 * Auto-Detection Logic:
 * - `development` → `human` (pretty, colored output)
 * - `production` → `machine` (JSON, structured output)
 * - `test` → `machine` (consistent, parseable output)
 * - Manual override via LOGGING_FORMAT env var
 */
export function resolveLoggingFormat(): Exclude<LoggingFormat, 'auto'> {
    if (env.LOGGING_FORMAT === 'human') {
        return 'human'
    }
    
    if (env.LOGGING_FORMAT === 'machine') {
        return 'machine'
    }
    
    // Auto-detection based on NODE_ENV
    switch (env.NODE_ENV) {
    case 'development':
        return 'human'
    case 'production':
        return 'machine'
    case 'test':
        return 'machine'
    default:
        return 'machine' // Safe fallback
    }
}

/**
 * 🎯 **Check if current environment should use human-readable format**
 */
export function shouldUseHumanFormat(): boolean {
    return resolveLoggingFormat() === 'human'
}

/**
 * 🎯 **Check if current environment should use machine-readable format**
 */
export function shouldUseMachineFormat(): boolean {
    return resolveLoggingFormat() === 'machine'
}

/**
 * 🎯 **Get logging configuration details**
 */
export function getLoggingConfig(): {
    readonly format: Exclude<LoggingFormat, 'auto'>
    readonly isHuman: boolean
    readonly isMachine: boolean
    readonly nodeEnv: string
    readonly configuredFormat: LoggingFormat
    } {
    const resolvedFormat = resolveLoggingFormat()
    
    return {
        format: resolvedFormat,
        isHuman: resolvedFormat === 'human',
        isMachine: resolvedFormat === 'machine',
        nodeEnv: env.NODE_ENV,
        configuredFormat: env.LOGGING_FORMAT
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export type Environment = z.infer<typeof envSchema>
export default env