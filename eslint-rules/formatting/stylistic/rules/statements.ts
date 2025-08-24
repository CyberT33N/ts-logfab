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

export const statementRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/nonblock-statement-body-position': [
        'error',
        'below'
    ],

    '@stylistic/padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            next: '*',
            prev: 'directive'
        },
        {
            blankLine: 'any',
            next: 'directive',
            prev: 'directive'
        },
        {
            blankLine: 'always',
            next: '*',
            prev: [
                'const',
                'let',
                'var'
            ]
        },
        {
            blankLine: 'any',
            next: [
                'const',
                'let',
                'var'
            ],
            prev: [
                'const',
                'let',
                'var'
            ]
        },
        {
            blankLine: 'always',
            next: 'return',
            prev: '*'
        },
        {
            blankLine: 'always',
            next: [
                'if',
                'try',
                'class',
                'export'
            ],
            prev: '*'
        },
        {
            blankLine: 'always',
            next: '*',
            prev: [
                'if',
                'try',
                'class',
                'export'
            ]
        },
        {
            blankLine: 'any',
            next: ['export'],
            prev: ['export']
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
