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
██                🎯 ADAPTIVE LOGGING - UNIFIED MODULE INDEX                 ██
██                     COMPREHENSIVE BARREL EXPORT FILE                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ADAPTIVE LOGGING MODULE - BARREL EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Re-export all types
export type {
    EnvironmentType,
    LogFormatType,
    IFormattedLogEntry,
    IHumanLogOutput,
    IJsonLogOutput,
    IFormatConfig,
    IStructuredLogEntry,
    IHybridLoggerConfig
} from './types.ts'

// Re-export environment detection functions
export {
    detectEnvironment,
    isDevelopmentEnvironment,
    isProductionEnvironment,
    isTestEnvironment,
    isStagingEnvironment
} from './environment-detection.ts'

// Re-export format management functions
export {
    autoConfigureFormat,
    createFormatConfig,
    createHumanOutput,
    createJsonOutput,
    formatLogEntry
} from './format-management.ts'

// Re-export logger factory functions
export {
    createHybridLoggerConfig,
    createHybridLogger,
    createDevelopmentLogger,
    createProductionLogger,
    getCurrentLoggingFormat,
    isStructuredLoggingEnabled
} from './logger-factory.ts' 