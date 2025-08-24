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

export const blocksAndBracesRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/block-spacing': [
        'error',
        'always'
    ],

    '@stylistic/brace-style': [
        'error',
        '1tbs',
        {
            allowSingleLine: false
        }
    ],

    '@stylistic/padded-blocks': [
        'error',
        'never',
        {
            allowSingleLineBlocks: false
        }
    ],

    '@stylistic/space-before-blocks': [
        'error',
        'always'
    ]
} satisfies TSESLint.Linter.RulesRecord
