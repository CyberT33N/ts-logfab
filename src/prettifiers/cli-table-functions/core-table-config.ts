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
// 🎯 CORE TABLE CONFIGURATION AND UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

// eslint-disable-next-line @typescript-eslint/naming-convention
import CliTable from 'cli-table3'

import { 
    TERMINAL_COLORS
} from '@/prettifiers/colors.ts'

// Re-export CliTable for convenience
export { CliTable }

/**
 * 🎨 DYNAMIC BORDER COLOR - LEVEL-SPECIFIC COLORS
 * @param level - The level of the log message
 * @returns The color function for the level
 */
const getLevelColor = (level: string): (text: string) => string => {
    const levelConfig = {
        'INFO': TERMINAL_COLORS.success,
        'WARN': TERMINAL_COLORS.warning, 
        'ERROR': TERMINAL_COLORS.error,
        'DEBUG': TERMINAL_COLORS.blue,
        'TRACE': TERMINAL_COLORS.error,
        'FATAL': TERMINAL_COLORS.critical
    } as const
     
    const levelKey = level as keyof typeof levelConfig

    if (levelKey in levelConfig) {
        return levelConfig[levelKey]
    }

    return TERMINAL_COLORS.primary
}

/**
 * 🎯 PROFESSIONAL CLI-TABLE3 CONFIGURATION WITH LEVEL-BASED STYLING
 * @param level - The level of the log message
 * @returns The table configuration
 */
export function createTableConfig(level: string): {
    chars: Record<string, string>;
    style: Record<string, unknown>;
    colWidths: number[];
    borderColor: (text: string) => string;
} {
    const borderColor = getLevelColor(level)
    
    return {
        // 🎯 PROFESSIONAL UNICODE BORDERS - HONEYWELL STYLE
        /* eslint-disable @typescript-eslint/naming-convention */
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        style: {
            'padding-left': 1,
            'padding-right': 1,
            // 🎨 CLEAR BORDER COLORS FOR CUSTOM COLORING
            head: [],
            border: []
        },
        /* eslint-enable @typescript-eslint/naming-convention */
        colWidths: [13, 60, 20], // Label, Content, Type columns
        // 🎯 STORE BORDER COLOR FOR LATER USE
        borderColor: borderColor
    }
}

/**
 * 🎯 Applies level-specific colors to CLI-Table3 output
 * @param tableOutput - The table output to color
 * @param borderColor - The color function for the level
 * @returns The colored table output
 */
export function applyTableColors(
    tableOutput: string, 
    borderColor: (text: string) => string
): string {
    // Apply border colors to table characters while preserving content colors
    return tableOutput
        .split('\n')
        .map(line => {
            // Color all border characters
            return line.replace(/[╔╗╚╝║╠╣╬╦╩═╤╧╟╢┼─│]/g, char => borderColor(char))
        })
        .join('\n')
}

/**
 * 🎯 **Creates standard table characters**
 * @returns Standard table character configuration
 */
export function createTableChars(): Record<string, string> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
        'top': '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        'bottom': '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        'left': '║',
        'left-mid': '╟',
        'mid': '─',
        'mid-mid': '┼',
        'right': '║',
        'right-mid': '╢',
        'middle': '│'
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * 🎯 **Creates standard table style**
 * @returns Standard table style configuration
 */
export function createTableStyle(): Record<string, unknown> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
        'padding-left': 1,
        'padding-right': 1,
        head: [],
        border: []
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * 🎯 Gets method label based on visibility
 * @param visibility - The visibility of the method
 * @returns The method label
 */
export function getMethodLabel(visibility: string): string {
    const labels = {
        'Private': TERMINAL_COLORS.icon('🔒') + ' PRIVATE',
        'Internal': TERMINAL_COLORS.icon('🔧') + ' INTRNL',
        'Public': TERMINAL_COLORS.icon('🌐') + ' METHOD'
    } as const
    
    return labels[visibility as keyof typeof labels] || labels.Public
} 