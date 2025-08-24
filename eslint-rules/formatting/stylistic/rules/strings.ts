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

export const stringRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/quote-props': [
        'error',
        'as-needed',
        {
            keywords: false,
            numbers: false,
            unnecessary: true
        }
    ],

    '@stylistic/quotes': [
        'error',
        'single',
        {
            allowTemplateLiterals: 'never',
            avoidEscape: true
        }
    ],

    '@stylistic/rest-spread-spacing': [
        'error',
        'never'
    ],

    '@stylistic/template-curly-spacing': [
        'error',
        'never'
    ],

    '@stylistic/template-tag-spacing': [
        'error',
        'never'
    ]
} satisfies TSESLint.Linter.RulesRecord
