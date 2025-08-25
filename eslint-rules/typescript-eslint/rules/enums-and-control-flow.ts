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

export const enumsAndControlFlowRules: TSESLint.Linter.RulesRecord = {
    // TypeScript 5.x Declaration Merging Safety
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',

    // TypeScript 5.x Enum Comparison Safety
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',

    '@typescript-eslint/prefer-enum-initializers': 'error',

    '@typescript-eslint/prefer-literal-enum-member': 'error',

    // ✅ ==== VERIFIED ====
    '@typescript-eslint/strict-boolean-expressions': 'error',

    '@typescript-eslint/switch-exhaustiveness-check': 'error'
} satisfies TSESLint.Linter.RulesRecord
