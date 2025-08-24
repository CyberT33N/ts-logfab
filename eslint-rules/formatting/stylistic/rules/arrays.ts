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
import { MIN_ARRAY_ITEMS_FOR_NEWLINE } from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

export const arrayRules: TSESLint.Linter.RulesRecord = {
    // ✅ ==== VERIFIED ====
    '@stylistic/array-bracket-newline': [
        'error',
        {
            minItems: MIN_ARRAY_ITEMS_FOR_NEWLINE,
            multiline: true
        }
    ],

    '@stylistic/array-bracket-spacing': [
        'error',
        'never'
    ],

    // ✅ ==== VERIFIED ====
    '@stylistic/array-element-newline': [
        'error',
        {
            minItems: MIN_ARRAY_ITEMS_FOR_NEWLINE,
            multiline: true
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
