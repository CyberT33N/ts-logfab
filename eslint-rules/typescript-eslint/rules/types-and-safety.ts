/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== IMPORTS ====
import type { TSESLint } from '@typescript-eslint/utils'

export const typesAndSafetyRules: TSESLint.Linter.RulesRecord = {
    // Enhanced Type Checking für Edge Cases
    '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: false
        }
    ],

    // Verhindert redundante Union/Intersection Types
    '@typescript-eslint/no-duplicate-type-constituents': 'error',

    /*
     * ===== ENTERPRISE-GRADE NEUE REGELN (VERIFIZIERT) =====
     * Type Safety Enhancement
     */
    '@typescript-eslint/no-redundant-type-constituents': 'error',

    // Restricted Types (Security & Type Safety)
    '@typescript-eslint/no-restricted-types': [
        'error',
        {
            types: {
                Function: {
                    message: 'Use a specific function type instead',
                    suggest: [
                        '() => void',
                        '(...args: unknown[]) => unknown'
                    ]
                },
                Object: {
                    fixWith: 'Record<string, unknown>',
                    message: 'Use Record<string, unknown> or a specific interface instead'
                },
                '{}': {
                    fixWith: 'Record<string, never>',
                    message:
                        'Use Record<string, never> for empty object, unknown for any value, or a specific interface'
                }
            }
        }
    ],

    '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
            allowConstantLoopConditions: false,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
        }
    ],

    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

    /*
     * Verhindert leere Exports
     * Code Quality & Maintainability
     */
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Keine doppelten Type Constituents
    '@typescript-eslint/no-unnecessary-template-expression': 'error',

    // Verhindert unsichere Type Assertions
    '@typescript-eslint/no-unnecessary-type-conversion': 'error',

    /*
     * ===== ENTERPRISE-GRADE ZUSÄTZLICHE REGELN =====
     * Type Safety Enhancement
     */
    '@typescript-eslint/no-unsafe-type-assertion': 'error',

    '@typescript-eslint/unbound-method': 'error'
} satisfies TSESLint.Linter.RulesRecord
