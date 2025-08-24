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

export const keysAndKeywordsRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/key-spacing': [
        'error',
        {
            afterColon: true,
            beforeColon: false,
            mode: 'strict'
        }
    ],

    '@stylistic/keyword-spacing': [
        'error',
        {
            after: true,
            before: true,
            overrides: {
                case: { after: true },
                return: { after: true },
                throw: { after: true }
            }
        }
    ],

    '@stylistic/switch-colon-spacing': [
        'error',
        {
            after: true,
            before: false
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
