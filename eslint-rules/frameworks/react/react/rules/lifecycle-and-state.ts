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

export const lifecycleAndState = {
    // Modern class fields
    'react/no-access-state-in-setstate': 'error',

    // Nicht immer notwendig
    'react/no-adjacent-inline-elements': 'off',

    // Deprecations
    'react/no-deprecated': 'error',

    'react/no-did-mount-set-state': 'error',

    'react/no-did-update-set-state': 'error',

    'react/no-direct-mutation-state': 'error',

    'react/no-is-mounted': 'error',

    // Zu restriktiv für i18n
    'react/no-set-state': 'off',

    'react/no-string-refs': 'error',

    'react/no-this-in-sfc': 'error',

    'react/no-will-update-set-state': 'error'
} satisfies TSESLint.Linter.RulesRecord
