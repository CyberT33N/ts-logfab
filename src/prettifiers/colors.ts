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
import chalk from 'chalk'

/**
 * 🎨 UNIFIED COLOR PALETTE - TERMINAL HARMONY
 */
export const TERMINAL_COLORS = {
    // 🎯 ELEGANT MONOCHROME PALETTE - WHITE, YELLOW, BLACK, GRAY
    primary: chalk.hex('#FFFFFF'),        // Pure White
    secondary: chalk.hex('#CCCCCC'),      // Light Gray  
    accent: chalk.hex('#FFFF00'),         // Bright Yellow
    
    // 📊 STATUS PALETTE
    success: chalk.hex('#00DD00'),        // Bright Green
    warning: chalk.hex('#FFAA00'),        // Orange
    error: chalk.hex('#FF0000'),          // Bright Red
    critical: chalk.hex('#FF0044'),       // Critical Red
    
    // 🔧 UTILITY PALETTE
    text: chalk.hex('#FFFFFF'),           // Pure White Text
    muted: chalk.hex('#888888'),          // Medium Gray
    border: chalk.hex('#FFFFFF'),         // White Border (Default)
    errorBorder: chalk.hex('#FF0000'),    // RED Border for Errors
    background: chalk.hex('#000000'),     // Pure Black Background
    
    // 🎪 SPECIAL ELEMENTS
    highlight: chalk.hex('#FFFF00'),      // Bright Yellow Highlight
    timestamp: chalk.hex('#CCCCCC'),      // Light Gray Time
    icon: chalk.hex('#FFFF00'),           // Yellow Icons
    blue: chalk.hex('#00BBFF')            // Bright Blue for Debug
} as const

/**
 * 🎯 Log Level Enhancer
 * @param level - The level of the log message
 * @param message - The message to enhance
 * @returns The enhanced log message
 */
export function enhanceLogLevel(
    level: string, 
    message: string
): string {
    const enhancers = {
        fatal: () => chalk.bold.redBright(message),
        error: () => chalk.red(message),
        warn: () => chalk.yellow(message),
        info: () => chalk.blue(message),
        debug: () => chalk.cyan(message),
        trace: () => chalk.gray(message)
    } as const
    
    const enhancer = enhancers[level.toLowerCase() as keyof typeof enhancers]
    return enhancer()
}