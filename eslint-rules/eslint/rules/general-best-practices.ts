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

// General best practices and function/class preferences
export const generalBestPractices = {
    'accessor-pairs': 'error',

    'array-callback-return': 'error',

    // ✅ ==== VERIFIED ====
    'arrow-body-style': [
        'error',
        'as-needed',
        {
            requireReturnForObjectLiteral: false
        }
    ],

    'block-scoped-var': 'error',

    /*
     * ❌ REDUNDANT: Übernommen von @typescript-eslint/naming-convention
     * 'camelcase': ['error', { properties: 'never' }],
     */
    /*
     * ✅ ==== VERIFIED ====
     * ❌ REDUNDANT: Übernommen von @typescript-eslint/consistent-return
     */
    'consistent-return': 'off',

    curly: [
        'error',
        'all'
    ],

    'default-case': 'error',

    // No unnecessary blocks
    'default-case-last': 'error',

    // Disabled to allow bracket notation for private method testing
    'dot-notation': 'off',

    // ✅ ==== VERIFIED ====
    eqeqeq: [
        'error',
        'always'
    ],

    'func-names': [
        'error',
        'never'
    ],

    // ✅ ==== VERIFIED ====
    'func-style': [
        'error',
        'expression',
        {
            overrides: { namedExports: 'expression' }
        }
    ],

    // One class per file
    'grouped-accessor-pairs': [
        'error',
        'setBeforeGet'
    ],

    'guard-for-in': 'error',

    // Console usage policy
    'no-console': [
        'error',
        {
            allow: [
                'warn',
                'error',
                'info',
                'trace'
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
