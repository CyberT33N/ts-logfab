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

export const asyncAndPromisesRules: TSESLint.Linter.RulesRecord = {
    // Enhanced Type Checking für Edge Cases (relevant bei async Patterns)
    '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: false
        }
    ],

    '@typescript-eslint/no-floating-promises': 'error',

    // Explizites await für besseres Stack Tracing
    '@typescript-eslint/no-misused-promises': [
        'error',
        {
            checksConditionals: true,
            checksSpreads: true,
            checksVoidReturn: {
                arguments: true,
                attributes: true,
                properties: true,
                returns: true,
                variables: true
            }
        }
    ],

    '@typescript-eslint/promise-function-async': 'error',

    // Async/Promise Best Practices
    '@typescript-eslint/return-await': [
        'error',
        'always'
    ]
} satisfies TSESLint.Linter.RulesRecord
