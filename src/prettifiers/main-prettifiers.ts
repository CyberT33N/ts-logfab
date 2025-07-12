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
// 🎪 AWARD-WINNING MESSAGE FORMAT - PROFESSIONAL CLI-TABLE3 POWERED DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

import type { PrettyOptions } from 'pino-pretty'
import { configure } from 'safe-stable-stringify'
import type { ReadonlyDeep } from 'type-fest'
import { 
    createDecoratorTable, 
    createAnalyticsTable, 
    createMetadataTable, 
    createArgumentsTable, 
    createResultAnalyticsTable 
} from './cli-table-functions.ts'
import { TERMINAL_COLORS } from './colors.ts'
import { getAppMetadata } from './metadata.ts'
import { getMethodVisibility } from './type-analysis.ts'
import { formatBytes, formatDuration, createProgressBar } from './utility-functions.ts'

// 🎯 ENTERPRISE SAFE-STABLE-STRINGIFY CONFIGURATION
const stringify = configure({
    circularValue: '[Circular]',
    deterministic: true,
    bigint: true,
    maximumDepth: 10,
    maximumBreadth: 100,
    strict: false
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 PINO-COMPATIBLE COLOR TYPES FOR FUNCTIONAL ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

type IColorFunction = (text: string) => string

interface IColors {
    cyan: IColorFunction
    blue: IColorFunction
    green: IColorFunction
    yellow: IColorFunction
    red: IColorFunction
    gray: IColorFunction
    white: IColorFunction
    magenta: IColorFunction
    bold: IColorFunction
}

export const createEnterpriseMessageFormat: PrettyOptions['messageFormat'] = (
    log: ReadonlyDeep<unknown>, 
    messageKey: string, 
    levelLabel: string, 
    { colors }: ReadonlyDeep<{ colors: IColors }>
) => {
    const logObj = log as ReadonlyDeep<Record<string, unknown>>
    const msgValue = logObj[messageKey]
    const msg = stringify(msgValue) ?? '[Message]'
    const prefix = typeof logObj.prefix === 'string' ? logObj.prefix : ''
    
    // Suppress unused warning: colors parameter is required for Pino compatibility
    void colors
    
    // 🎯 GET ACTUAL LEVEL FROM LOG OBJECT
    const rawLevel = Number(logObj.level)
    /* eslint-disable @typescript-eslint/naming-convention */
    const levelMap = {
        '10': 'TRACE',
        '20': 'DEBUG',
        '30': 'INFO',
        '40': 'WARN',
        '50': 'ERROR',
        '60': 'FATAL'
    } as const


    const actualLevel = levelMap[String(rawLevel) as keyof typeof levelMap]
    
    // Get current timestamp for inline display
    const now = new Date()
    const timeStr = now.toLocaleTimeString('de-DE', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    })
    
    // Award-winning level icons and colors
    const levelConfig = {
        'INFO': { icon: 'ℹ️ ', color: TERMINAL_COLORS.success },
        'WARN': { icon: '⚠️', color: TERMINAL_COLORS.warning }, 
        'ERROR': { icon: '🚨', color: TERMINAL_COLORS.error },
        'DEBUG': { icon: '🔬', color: TERMINAL_COLORS.blue },
        'TRACE': { icon: '🔍', color: TERMINAL_COLORS.error },
        'FATAL': { icon: '💀', color: TERMINAL_COLORS.critical }
    } as const
    
    const levelInfo = levelConfig[actualLevel]
    
    if (prefix.length === 0) {
        // 📝 AWARD-WINNING SINGLE-LINE LOG FORMAT (NO DIVIDER)
        const timeDisplay = TERMINAL_COLORS.muted(timeStr)
        const levelDisplay = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)}`
        const messageDisplay = TERMINAL_COLORS.text(msg)
        
        return `${levelDisplay} ${timeDisplay} | ${messageDisplay}`
    }
    
    // Enhanced divider with breathing space - ONLY FOR DECORATOR LOGS
    const divider = TERMINAL_COLORS.muted('──  '.repeat(24))
    
    // 🎯 PARSE PREFIX FOR AWARD-WINNING DECORATOR DISPLAY
    const parts = prefix.split('::')
    if (parts.length >= 2) {
        const [className, methodPart] = parts
        const method = methodPart.split('(')[0]
        const appMeta = getAppMetadata()
        const methodInfo = getMethodVisibility(method)
        
        // 🏢 AWARD-WINNING HEADER WITH DECORATOR LOG PREFIX
        let result = '\n' + divider + '\n\n'
        
        // 🎯 DECORATOR LOG HEADER WITH DYNAMIC DATA - NOW INTEGRATED INTO TABLE
        const decoratorHeader = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)} ` +
                               `${TERMINAL_COLORS.muted(timeStr)} | ` +
                               `${TERMINAL_COLORS.text(appMeta.author)} ` +
                               `${TERMINAL_COLORS.accent(`${appMeta.name} v${appMeta.version}`)} ` +
                               TERMINAL_COLORS.muted(`[${appMeta.environment}]`)
        
        // 🎯 PROFESSIONAL TABLE CONSTRUCTION WITH CLI-TABLE3 - HEADER INTEGRATED
        const decoratorTable = createDecoratorTable(
            className || '', 
            method, 
            msg, 
            actualLevel, 
            methodInfo, 
            decoratorHeader, 
            logObj
        )
        result += decoratorTable + '\n'
        
        return result
    }
    
    // 🏷️ FALLBACK FOR SIMPLE PREFIX
    const levelDisplay = `${TERMINAL_COLORS.icon(levelInfo.icon)} ${levelInfo.color(`[${actualLevel}]`)}`
    const timeDisplay = TERMINAL_COLORS.muted(timeStr)
    const borderColor = levelInfo.color
    
    return '\n' + divider + '\n\n' + 
           `${levelDisplay} ${timeDisplay} | ` +
           `${borderColor('╭─')} ` +
           `${TERMINAL_COLORS.highlight('🏷️')} ` +
           `${TERMINAL_COLORS.accent(prefix)} ` +
           `${borderColor('─╮')}\n` +
           `${borderColor('│')} ` +
           `${TERMINAL_COLORS.text(msg)} ` +
           `${borderColor('│')}\n` +
           borderColor('╰─────────────────────────────────────────╯')
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 CUSTOM PRETTIFIERS - CLI-TABLE3 POWERED
// ═══════════════════════════════════════════════════════════════════════════════

export const createEnterpriseCustomPrettifiers = (): PrettyOptions['customPrettifiers'] => ({
    // 🕰️ TIME STYLING - INTEGRATED INTO MESSAGE FORMAT
    time: (): string => '',
    
    // 🎨 LEVEL INDICATORS - INTEGRATED INTO MESSAGE FORMAT  
    level: (): string => '',
    
    // 📊 PERFORMANCE ANALYTICS - PROFESSIONAL CLI-TABLE3 POWERED
    performance: (perf: unknown): string => {
        if (typeof perf !== 'object' || perf === null) {return ''}
        
        const perfObj = perf as Record<string, unknown>
        const analyticsData: (readonly [string, string, string, string])[] = []
        
        // ⏱️ DURATION with Progress Bars
        if (typeof perfObj.duration === 'number') {
            const duration = Number(perfObj.duration)
            const durationFormatted = formatDuration(duration)
            const bar = createProgressBar(duration, 5000, 39)
            
            analyticsData.push([
                TERMINAL_COLORS.icon('⏱️') + '   DURATION',
                TERMINAL_COLORS.text(durationFormatted),
                bar,
                'Response Time'
            ] as const)
        }
        
        // 🧠 MEMORY with Formatting
        if (perfObj.memoryUsage !== null && typeof perfObj.memoryUsage === 'object') {
            const mem = perfObj.memoryUsage as Record<string, unknown>
            const heapBytes = Number(mem.heapUsed)
            const heapFormatted = formatBytes(heapBytes)
            const bar = createProgressBar(heapBytes, 100 * 1024 * 1024, 39)
            
            analyticsData.push([
                TERMINAL_COLORS.icon('🧠') + '  HEAP USED',
                TERMINAL_COLORS.text(heapFormatted),
                bar,
                'Memory Usage'
            ] as const)
        }

        // 🖥️ CPU with Styling
        if (perfObj.cpuUsage !== null && typeof perfObj.cpuUsage === 'object') {
            const cpu = perfObj.cpuUsage as Record<string, unknown>
            if (typeof cpu.user === 'number') {
                const userMs = Number(cpu.user) / 1000
                const cpuFormatted = formatDuration(userMs)
                const bar = createProgressBar(userMs, 1000, 39)
                
                analyticsData.push([
                    TERMINAL_COLORS.icon('🖥️') + '   CPU USER',
                    TERMINAL_COLORS.text(cpuFormatted),
                    bar,
                    'CPU Time'
                ] as const)
            }
        }
        
        if (analyticsData.length === 0) {
            return ''
        }
        
        // 🎯 OVERWRITE "performance:" LABEL AND ADD PROPER SPACING  
        const tableOutput = createAnalyticsTable(analyticsData)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 🔧 METADATA - PROFESSIONAL CLI-TABLE3
    metadata: (metadata: unknown): string => {
        if (typeof metadata !== 'object' || metadata === null) {return ''}
        
        const metaEntries = Object.entries(metadata as Record<string, unknown>)
        if (metaEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "metadata:" LABEL AND ADD PROPER SPACING
        const typedEntries: (readonly [string, string])[] = metaEntries.map(
            ([key, value]: readonly [string, unknown]) => [key, stringify(value) ?? '[Value]'] as const
        )
        const tableOutput = createMetadataTable(typedEntries)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 📥 ARGUMENTS ANALYZER - PROFESSIONAL CLI-TABLE3 POWERED
    args: (args: unknown): string => {
        if (typeof args !== 'object' || args === null) {return ''}
        
        const argEntries = Object.entries(args as Record<string, unknown>)
        if (argEntries.length === 0) {return ''}
        
        // 🎯 OVERWRITE "args:" LABEL AND ADD PROPER SPACING
        const typedEntries: (readonly [string, unknown])[] = argEntries.map(
            ([key, value]: readonly [string, unknown]) => [key, value] as const
        )
        const tableOutput = createArgumentsTable(typedEntries)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    },
    
    // 🎯 RESULT ANALYTICS - PROFESSIONAL CLI-TABLE3 POWERED
    result: (result: unknown): string => {
        if (result === null || result === undefined) {return ''}
        
        // 🎯 OVERWRITE "result:" LABEL AND ADD PROPER SPACING
        const tableOutput = createResultAnalyticsTable(result)
        const leftAlignedTable = tableOutput.split('\n').map(line => '\u001b[0G' + line).join('\n')
        return '\u001b[1A\u001b[2K\u001b[0G\n' + leftAlignedTable + '\n'
    }
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 AWARD-WINNING CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎨 Creates award-winning terminal logging configuration
 */
export function createEnterprisePrettyConfig(): 
    Parameters<typeof import('pino-pretty')>[0] {
    return {
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        singleLine: false,
        hideObject: false,
        levelFirst: false,
        messageKey: 'msg',
        levelKey: 'level',
        timestampKey: 'time',
        
        // 🎯 FUNCTIONAL: Essential properties for clean logs
        // eslint-disable-next-line max-len
        ignore: 'pid,hostname,name,service,version,environment,nodeVersion,platform,prefix,className,methodName,argumentTypes,argumentCount',
        
        // 🌈 PROFESSIONAL COLOR SCHEME  
        customColors: 'info:blue,warn:yellow,error:red,debug:cyan,trace:magenta,fatal:brightRed',
        
        // 🎪 AWARD-WINNING CLI-TABLE3 POWERED DESIGN
        messageFormat: createEnterpriseMessageFormat,
        customPrettifiers: createEnterpriseCustomPrettifiers()
    }
} 