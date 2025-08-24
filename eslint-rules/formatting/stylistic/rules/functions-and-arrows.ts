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

export const functionAndArrowRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/arrow-parens': [
        'error',
        'as-needed',
        {
            requireForBlockBody: true
        }
    ],

    '@stylistic/arrow-spacing': [
        'error',
        {
            after: true,
            before: true
        }
    ],

    // We use custom rules for formatting function definitions
    '@stylistic/function-call-argument-newline': [
        'error',
        'consistent'
    ],

    '@stylistic/function-call-spacing': [
        'error',
        'never'
    ],

    // ===== FUNCTIONS =====
    '@stylistic/function-paren-newline': [
        'error',
        'consistent'
    ],

    '@stylistic/generator-star-spacing': [
        'error',
        {
            after: false,
            before: true
        }
    ],

    '@stylistic/implicit-arrow-linebreak': [
        'error',
        'beside'
    ],

    '@stylistic/space-before-function-paren': [
        'error',
        {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never'
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
