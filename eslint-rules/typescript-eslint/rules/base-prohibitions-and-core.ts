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

export const baseProhibitionsAndCoreRules: TSESLint.Linter.RulesRecord = {
    '@typescript-eslint/ban-ts-comment': 'error',

    // Verhindert unnötige Type Conversions
    /*
     * ✅ ==== VERIFIED ====
     * If possible, it is recommended to use tsconfig's noImplicitReturns option rather than this rule. noImplicitReturns is powered by TS's type information and control-flow analysis so it has better coverage than this rule.
     */
    '@typescript-eslint/consistent-return': 'off',

    '@typescript-eslint/dot-notation': 'off',

    // Additional typescript-eslint rules not included in strict
    '@typescript-eslint/explicit-function-return-type': 'error',

    '@typescript-eslint/no-explicit-any': 'error',

    '@typescript-eslint/no-non-null-assertion': 'error',

    '@typescript-eslint/no-useless-empty-export': 'error'
} satisfies TSESLint.Linter.RulesRecord
