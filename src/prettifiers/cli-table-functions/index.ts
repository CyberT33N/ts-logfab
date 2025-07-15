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
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 CLI-TABLE-FUNCTIONS MODULE - INTERNAL BARREL FILE
// ═══════════════════════════════════════════════════════════════════════════════

// Types and interfaces
export type { IEnhancedTableContext, IEnhancedTableConfig } from './types.ts'
export { DEFAULT_ENHANCED_TABLE_CONFIG } from './types.ts'

// Core table configuration and utilities
export { 
    CliTable, 
    createTableConfig, 
    applyTableColors, 
    createTableChars, 
    createTableStyle, 
    getMethodLabel 
} from './core-table-config.ts'

// Basic table creators
export { 
    createDecoratorTable,
    createResultAnalyticsTable,
    createAnalyticsTable,
    createMetadataTable,
    createArgumentsTable
} from './basic-table-creators.ts'

// Enhanced context tables
export { 
    createCorrelationContextTable,
    createSemanticContextTable,
    createPerformanceIndicatorsTable,
    createAnomalyWarningsTable
} from './enhanced-context-tables.ts'

// Main enhanced decorator table function
export { createEnhancedDecoratorTable } from './enhanced-decorator-table.ts' 