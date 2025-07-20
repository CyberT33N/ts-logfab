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
██              🎯 SEMANTIC ANALYSIS CONFIGURATIONS                          ██
██               ENTERPRISE SEMANTIC CONFIGURATIONS                         ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SEMANTIC ANALYSIS CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { toWritable } from '@/utils/data-utils.ts'
import type { ISemanticConfig } from './prettifier-utilities.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ENTERPRISE SEMANTIC ANALYSIS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 💼 **Business Domain Configuration**
 *
 * Semantic patterns for business operations
 *
 * @returns Comprehensive business domain semantic configuration
 *
 * @example
 * ```typescript
 * const config = getBusinessDomainConfig();
 * console.log(Object.keys(config.domainPatterns)); // ['USER', 'PRODUCT', ...]
 * ```
 *
 * @see {@link ISemanticConfig} for configuration structure
 */
export function getBusinessDomainConfig(): ISemanticConfig {
    return {
        domainPatterns: {
            USER: {
                patterns: [
                    /user/i,
                    /customer/i,
                    /client/i,
                    /account/i,
                    /profile/i,
                    /authentication/i,
                    /authorization/i,
                    /login/i,
                    /register/i,
                    /signup/i,
                    /persona/i,
                    /identity/i,
                    /member/i
                ],
                operations: {
                    CREATE: [/create/i, /register/i, /signup/i, /add/i, /new/i],
                    READ: [/get/i, /find/i, /search/i, /list/i, /view/i, /retrieve/i],
                    UPDATE: [/update/i, /edit/i, /modify/i, /change/i, /patch/i],
                    DELETE: [/delete/i, /remove/i, /deactivate/i, /disable/i]
                }
            },
            PRODUCT: {
                patterns: [
                    /product/i,
                    /item/i,
                    /catalog/i,
                    /inventory/i,
                    /goods/i,
                    /merchandise/i,
                    /sku/i,
                    /stock/i,
                    /category/i,
                    /brand/i
                ],
                operations: {
                    CREATE: [/create/i, /add/i, /new/i, /insert/i, /stock/i],
                    READ: [/get/i, /find/i, /search/i, /list/i, /catalog/i, /browse/i],
                    UPDATE: [/update/i, /edit/i, /modify/i, /restock/i, /adjust/i],
                    DELETE: [/delete/i, /remove/i, /discontinue/i, /unstock/i]
                }
            },
            ORDER: {
                patterns: [
                    /order/i,
                    /purchase/i,
                    /transaction/i,
                    /sale/i,
                    /booking/i,
                    /reservation/i,
                    /checkout/i,
                    /cart/i,
                    /basket/i,
                    /billing/i
                ],
                operations: {
                    CREATE: [/create/i, /place/i, /submit/i, /checkout/i, /book/i],
                    READ: [/get/i, /find/i, /track/i, /status/i, /history/i],
                    UPDATE: [/update/i, /modify/i, /cancel/i, /refund/i, /exchange/i],
                    DELETE: [/delete/i, /cancel/i, /void/i, /remove/i]
                }
            },
            FINANCE: {
                patterns: [
                    /payment/i,
                    /invoice/i,
                    /billing/i,
                    /transaction/i,
                    /money/i,
                    /currency/i,
                    /price/i,
                    /cost/i,
                    /revenue/i,
                    /profit/i,
                    /refund/i,
                    /charge/i,
                    /credit/i,
                    /debit/i,
                    /balance/i
                ],
                operations: {
                    COMPUTE: [/calculate/i, /compute/i, /process/i, /settle/i],
                    VALIDATE: [/validate/i, /verify/i, /check/i, /audit/i],
                    TRANSFER: [/transfer/i, /send/i, /receive/i, /move/i],
                    RECONCILE: [/reconcile/i, /match/i, /balance/i, /adjust/i]
                }
            },
            SECURITY: {
                patterns: [
                    /security/i,
                    /auth/i,
                    /permission/i,
                    /role/i,
                    /access/i,
                    /token/i,
                    /session/i,
                    /encryption/i,
                    /decrypt/i,
                    /hash/i,
                    /audit/i,
                    /compliance/i,
                    /policy/i,
                    /firewall/i,
                    /threat/i
                ],
                operations: {
                    AUTHENTICATE: [/authenticate/i, /login/i, /verify/i, /validate/i],
                    AUTHORIZE: [/authorize/i, /permit/i, /allow/i, /grant/i],
                    ENCRYPT: [/encrypt/i, /hash/i, /secure/i, /protect/i],
                    AUDIT: [/audit/i, /log/i, /track/i, /monitor/i, /inspect/i]
                }
            },
            SYSTEM: {
                patterns: [
                    /system/i,
                    /service/i,
                    /application/i,
                    /platform/i,
                    /infrastructure/i,
                    /database/i,
                    /cache/i,
                    /queue/i,
                    /job/i,
                    /task/i,
                    /process/i
                ],
                operations: {
                    MONITOR: [/monitor/i, /watch/i, /observe/i, /track/i, /check/i],
                    CONFIGURE: [/configure/i, /setup/i, /initialize/i, /install/i],
                    MAINTAIN: [/maintain/i, /cleanup/i, /backup/i, /restore/i],
                    SCALE: [/scale/i, /resize/i, /expand/i, /shrink/i, /optimize/i]
                }
            }
        },
        complexityPatterns: {
            HIGH: [
                /complex/i,
                /enterprise/i,
                /critical/i,
                /advanced/i,
                /comprehensive/i,
                /transaction/i,
                /workflow/i,
                /pipeline/i,
                /orchestration/i,
                /aggregation/i
            ],
            MEDIUM: [
                /process/i,
                /handle/i,
                /manage/i,
                /coordinate/i,
                /integrate/i,
                /validate/i,
                /transform/i,
                /format/i,
                /parse/i,
                /convert/i
            ],
            LOW: [
                /get/i,
                /set/i,
                /find/i,
                /list/i,
                /basic/i,
                /simple/i,
                /direct/i,
                /single/i,
                /quick/i,
                /fast/i,
                /immediate/i
            ]
        },
        businessKeyPatterns: {
            TRANSACTION: [/transaction/i, /txn/i, /order/i, /payment/i, /invoice/i],
            USER: [/user/i, /customer/i, /client/i, /account/i, /profile/i],
            PRODUCT: [/product/i, /item/i, /sku/i, /catalog/i, /inventory/i],
            SESSION: [/session/i, /auth/i, /token/i, /login/i, /request/i],
            WORKFLOW: [/workflow/i, /process/i, /pipeline/i, /job/i, /task/i]
        },
        tagPatterns: {
            CRITICAL: [/critical/i, /urgent/i, /high-priority/i, /emergency/i],
            AUDIT: [/audit/i, /compliance/i, /regulatory/i, /legal/i, /governance/i],
            PERFORMANCE: [/performance/i, /optimization/i, /speed/i, /efficiency/i],
            SECURITY: [/security/i, /auth/i, /permission/i, /encryption/i, /threat/i],
            INTEGRATION: [/integration/i, /api/i, /external/i, /third-party/i, /webhook/i]
        }
    }
}

/**
 * 🏭 **Production Semantic Configuration**
 *
 * Optimized semantic detection for production environments
 *
 * @returns Performance-optimized semantic configuration for production
 *
 * @example
 * ```typescript
 * const config = getProductionSemanticConfig();
 * console.log(config.domainPatterns.USER.patterns.length); // reduced patterns
 * ```
 *
 * @see {@link ISemanticConfig} for configuration structure
 */
export function getProductionSemanticConfig(): ISemanticConfig {
    const baseConfig = getBusinessDomainConfig()

    return {
        ...baseConfig,
        // Reduced pattern complexity for better performance
        domainPatterns: {
            USER: {
                patterns: [/user/i, /customer/i, /account/i, /profile/i],
                operations: {
                    CREATE: [/create/i, /register/i, /add/i],
                    READ: [/get/i, /find/i, /search/i],
                    UPDATE: [/update/i, /edit/i, /modify/i],
                    DELETE: [/delete/i, /remove/i]
                }
            },
            FINANCE: {
                patterns: [/payment/i, /transaction/i, /billing/i, /invoice/i],
                operations: {
                    COMPUTE: [/calculate/i, /process/i],
                    VALIDATE: [/validate/i, /verify/i],
                    TRANSFER: [/transfer/i, /send/i],
                    RECONCILE: [/reconcile/i, /balance/i]
                }
            },
            SECURITY: {
                patterns: [/security/i, /auth/i, /permission/i, /access/i],
                operations: {
                    AUTHENTICATE: [/authenticate/i, /login/i],
                    AUTHORIZE: [/authorize/i, /permit/i],
                    ENCRYPT: [/encrypt/i, /secure/i],
                    AUDIT: [/audit/i, /monitor/i]
                }
            }
        },
        complexityPatterns: {
            HIGH: [/complex/i, /enterprise/i, /critical/i, /transaction/i],
            MEDIUM: [/process/i, /handle/i, /manage/i, /validate/i],
            LOW: [/get/i, /set/i, /find/i, /basic/i, /simple/i]
        }
    }
}

/**
 * 🔍 **Debug Semantic Configuration**
 *
 * Comprehensive semantic detection for debugging
 *
 * @returns Extended semantic configuration for debugging scenarios
 *
 * @example
 * ```typescript
 * const config = getDebugSemanticConfig();
 * console.log(config.domainPatterns.DEBUG); // debug-specific patterns
 * ```
 *
 * @see {@link ISemanticConfig} for configuration structure
 */
export function getDebugSemanticConfig(): ISemanticConfig {
    const baseConfig = getBusinessDomainConfig()
    const writableBaseConfig = toWritable(baseConfig)

    return {
        ...writableBaseConfig,
        // Extended patterns for comprehensive debugging
        domainPatterns: {
            ...writableBaseConfig.domainPatterns,
            DEBUG: {
                patterns: [
                    /debug/i,
                    /trace/i,
                    /inspect/i,
                    /analyze/i,
                    /investigate/i,
                    /diagnostic/i,
                    /troubleshoot/i,
                    /error/i,
                    /exception/i,
                    /fault/i
                ],
                operations: {
                    TRACE: [/trace/i, /track/i, /follow/i, /monitor/i],
                    INSPECT: [/inspect/i, /examine/i, /analyze/i, /study/i],
                    DIAGNOSE: [/diagnose/i, /troubleshoot/i, /investigate/i],
                    FIX: [/fix/i, /repair/i, /resolve/i, /correct/i, /patch/i]
                }
            },
            TESTING: {
                patterns: [
                    /test/i,
                    /verify/i,
                    /validate/i,
                    /check/i,
                    /assert/i,
                    /mock/i,
                    /stub/i,
                    /fake/i,
                    /scenario/i,
                    /case/i
                ],
                operations: {
                    RUN: [/run/i, /execute/i, /perform/i, /conduct/i],
                    VERIFY: [/verify/i, /validate/i, /check/i, /confirm/i],
                    MOCK: [/mock/i, /stub/i, /fake/i, /simulate/i],
                    ASSERT: [/assert/i, /expect/i, /should/i, /must/i]
                }
            }
        },
        tagPatterns: {
            ...writableBaseConfig.tagPatterns,
            DEBUG: [/debug/i, /trace/i, /verbose/i, /detailed/i, /comprehensive/i],
            TESTING: [/test/i, /mock/i, /stub/i, /scenario/i, /case/i, /spec/i],
            DEVELOPMENT: [/dev/i, /development/i, /local/i, /sandbox/i, /experimental/i]
        }
    }
} 