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
// 📊 SEMANTIC CONTEXT DETECTION - DEFAULT PATTERN CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { ReadonlyDeep } from 'type-fest'
import type { IPatternConfig } from './types.ts'

export const DEFAULT_PATTERN_CONFIG: IPatternConfig = {
    operations: {
        READ: [
            /^(get|find|fetch|read|retrieve|search|list|show|query|select|load|check)/i,
            /^(is|has|can|should|exists|contains)/i,
            /(search|find|query|lookup|discover)$/i
        ],
        WRITE: [
            /^(create|add|insert|save|store|put|post|new|make|generate)/i,
            /(create|add|insert|store|save|register)$/i
        ],
        UPDATE: [
            /^(update|modify|edit|change|patch|set|alter|adjust|sync)/i,
            /(update|modify|edit|change|patch|sync)$/i
        ],
        DELETE: [
            /^(delete|remove|destroy|drop|clear|purge|clean|erase)/i,
            /(delete|remove|destroy|clean|purge)$/i
        ],
        COMPUTE: [
            /^(calculate|compute|process|analyze|generate|transform|convert)/i,
            /(calculate|compute|process|analyze|transform|aggregate)$/i
        ],
        VALIDATE: [
            /^(validate|verify|check|test|confirm|ensure|assert)/i,
            /(validate|verify|check|test|confirm)$/i
        ],
        TRANSFORM: [
            /^(transform|convert|map|format|parse|serialize|encode|decode)/i,
            /(transform|convert|format|parse|serialize)$/i
        ],
        SEARCH: [
            /^(search|filter|sort|order|group|index|scan)/i,
            /(search|filter|sort|index|scan)$/i
        ],
        AGGREGATE: [
            /^(aggregate|sum|count|total|average|min|max|merge|combine)/i,
            /(aggregate|sum|count|total|average|merge)$/i
        ],
        UNKNOWN: []
    },
    domains: {
        USER: ['user', 'account', 'profile', 'customer', 'person', 'member', 'client', 'employee'],
        ORDER: ['order', 'purchase', 'transaction', 'cart', 'checkout', 'booking', 'reservation'],
        PRODUCT: ['product', 'item', 'catalog', 'inventory', 'stock', 'goods', 'article', 'sku'],
        FINANCE: ['payment', 'billing', 'invoice', 'tax', 'price', 'cost', 'money', 'currency', 'wallet'],
        AUTH: ['auth', 'login', 'logout', 'token', 'session', 'permission', 'role', 'access', 'security'],
        NOTIFICATION: ['notification', 'message', 'email', 'sms', 'alert', 'reminder', 'mail'],
        ANALYTICS: ['analytics', 'metrics', 'stats', 'report', 'tracking', 'event', 'log', 'monitor'],
        INTEGRATION: ['api', 'webhook', 'sync', 'import', 'export', 'integration', 'external'],
        SYSTEM: ['system', 'config', 'setting', 'admin', 'health', 'status', 'info', 'debug'],
        GENERAL: []
    },
    complexityIndicators: {
        high: ['batch', 'bulk', 'mass', 'complex', 'advanced', 'deep', 'recursive', 'heavy'],
        medium: ['multi', 'group', 'collection', 'list', 'array', 'set', 'range']
    },
    costIndicators: {
        expensive: ['migrate', 'rebuild', 'reindex', 'backup', 'restore', 'export', 'import'],
        high: ['batch', 'bulk', 'mass', 'analyze', 'aggregate', 'report', 'calculate'],
        medium: ['search', 'query', 'process', 'transform', 'validate', 'sync']
    }
}

/**
 * 🎨 **Create custom pattern configuration**
 * Allows extending or overriding default patterns
 */
export function createCustomPatternConfig(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    overrides: ReadonlyDeep<Partial<IPatternConfig>>
): IPatternConfig {
    return {
        operations: { ...DEFAULT_PATTERN_CONFIG.operations, ...overrides.operations },
        domains: { ...DEFAULT_PATTERN_CONFIG.domains, ...overrides.domains },
        complexityIndicators: { 
            ...DEFAULT_PATTERN_CONFIG.complexityIndicators, 
            ...overrides.complexityIndicators 
        },
        costIndicators: { 
            ...DEFAULT_PATTERN_CONFIG.costIndicators, 
            ...overrides.costIndicators 
        }
    } as IPatternConfig
} 