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

export const numbersAndOperatorsRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/no-floating-decimal': ['error'],

    '@stylistic/no-mixed-operators': [
        'error',
        {
            allowSamePrecedence: true,
            groups: [
                [
                    '%',
                    '**'
                ],
                [
                    '%',
                    '+'
                ],
                [
                    '%',
                    '-'
                ],
                [
                    '%',
                    '*'
                ],
                [
                    '%',
                    '/'
                ],
                [
                    '/',
                    '*'
                ],
                [
                    '&',
                    '|',
                    '<<',
                    '>>',
                    '>>>'
                ],
                [
                    '==',
                    '!=',
                    '===',
                    '!=='
                ],
                [
                    '&&',
                    '||'
                ]
            ]
        }
    ],

    '@stylistic/operator-linebreak': [
        'error',
        'before',
        {
            overrides: {
                '%=': 'none',
                '*=': 'none',
                '+=': 'none',
                '-=': 'none',
                '/=': 'none',
                '=': 'none'
            }
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
