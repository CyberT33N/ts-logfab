/*
 *█████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software *************************██
 *██                                                                         ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                    ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                    ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                    ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                    ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                    ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                    ██
 *██                                                                         ██
 *█████████████████████████████████████████████████████████████████████████████
 *█████████████████████████████████████████████████████████████████████████████
 */

/*
 * ═════════════════════════════════════════════════════════════════════════════
 * 📊 SEMANTIC CONTEXT DETECTION - DEFAULT PATTERN CONFIGURATION
 * ═════════════════════════════════════════════════════════════════════════════
 */

import { ReadonlyDeep } from 'type-fest'
import {
    EOperationType, EDomainType, type IPatternConfig
} from './types.ts'

export const DEFAULT_PATTERN_CONFIG = {
    operations: {
        [EOperationType.read]: [
            /^(get|find|fetch|read|retrieve|search|list|show|query|select|load|check)/i,
            /^(is|has|can|should|exists|contains)/i,
            /(search|find|query|lookup|discover)$/i
        ] as const,
        [EOperationType.write]: [/^(create|add|insert|save|store|put|post|new|make|generate)/i, /(create|add|insert|store|save|register)$/i] as const,
        [EOperationType.update]: [/^(update|modify|edit|change|patch|set|alter|adjust|sync)/i, /(update|modify|edit|change|patch|sync)$/i] as const,
        [EOperationType.delete]: [/^(delete|remove|destroy|drop|clear|purge|clean|erase)/i, /(delete|remove|destroy|clean|purge)$/i] as const,
        [EOperationType.compute]: [/^(calculate|compute|process|analyze|generate|transform|convert)/i, /(calculate|compute|process|analyze|transform|aggregate)$/i] as const,
        [EOperationType.validate]: [/^(validate|verify|check|test|confirm|ensure|assert)/i, /(validate|verify|check|test|confirm)$/i] as const,
        [EOperationType.transform]: [/^(transform|convert|map|format|parse|serialize|encode|decode)/i, /(transform|convert|format|parse|serialize)$/i] as const,
        [EOperationType.search]: [/^(search|filter|sort|order|group|index|scan)/i, /(search|filter|sort|index|scan)$/i] as const,
        [EOperationType.aggregate]: [/^(aggregate|sum|count|total|average|min|max|merge|combine)/i, /(aggregate|sum|count|total|average|merge)$/i] as const,
        [EOperationType.unknown]: [] as const
    },
    domains: {
        [EDomainType.user]: [
            'user',
            'account',
            'profile',
            'customer',
            'person',
            'member',
            'client',
            'employee'
        ] as const,
        [EDomainType.order]: [
            'order',
            'purchase',
            'transaction',
            'cart',
            'checkout',
            'booking',
            'reservation'
        ] as const,
        [EDomainType.product]: [
            'product',
            'item',
            'catalog',
            'inventory',
            'stock',
            'goods',
            'article',
            'sku'
        ] as const,
        [EDomainType.finance]: [
            'payment',
            'billing',
            'invoice',
            'tax',
            'price',
            'cost',
            'money',
            'currency',
            'wallet'
        ] as const,
        [EDomainType.auth]: [
            'auth',
            'login',
            'logout',
            'token',
            'session',
            'permission',
            'role',
            'access',
            'security'
        ] as const,
        [EDomainType.notification]: [
            'notification',
            'message',
            'email',
            'sms',
            'alert',
            'reminder',
            'mail'
        ] as const,
        [EDomainType.analytics]: [
            'analytics',
            'metrics',
            'stats',
            'report',
            'tracking',
            'event',
            'log',
            'monitor'
        ] as const,
        [EDomainType.integration]: [
            'api',
            'webhook',
            'sync',
            'import',
            'export',
            'integration',
            'external'
        ] as const,
        [EDomainType.system]: [
            'system',
            'config',
            'setting',
            'admin',
            'health',
            'status',
            'info',
            'debug'
        ] as const,
        [EDomainType.general]: [] as const
    },
    complexityIndicators: {
        high: [
            'batch',
            'bulk',
            'mass',
            'complex',
            'advanced',
            'deep',
            'recursive',
            'heavy'
        ] as const,
        medium: [
            'multi',
            'group',
            'collection',
            'list',
            'array',
            'set',
            'range'
        ] as const
    },
    costIndicators: {
        expensive: [
            'migrate',
            'rebuild',
            'reindex',
            'backup',
            'restore',
            'export',
            'import'
        ] as const,
        high: [
            'batch',
            'bulk',
            'mass',
            'analyze',
            'aggregate',
            'report',
            'calculate'
        ] as const,
        medium: [
            'search',
            'query',
            'process',
            'transform',
            'validate',
            'sync'
        ] as const
    }
} as const satisfies IPatternConfig

/**
 * 🎨 **Create custom pattern configuration**
 * Allows extending or overriding default patterns
 */
export function createCustomPatternConfig(
    overrides: ReadonlyDeep<Partial<IPatternConfig>>
): IPatternConfig {
    return {
        operations: {
            ...DEFAULT_PATTERN_CONFIG.operations,
            ...overrides.operations
        },
        domains: {
            ...DEFAULT_PATTERN_CONFIG.domains,
            ...overrides.domains
        },
        complexityIndicators: {
            ...DEFAULT_PATTERN_CONFIG.complexityIndicators,
            ...overrides.complexityIndicators
        },
        costIndicators: {
            ...DEFAULT_PATTERN_CONFIG.costIndicators,
            ...overrides.costIndicators
        }
    }
}
