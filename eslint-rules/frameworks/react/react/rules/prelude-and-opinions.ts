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

export const preludeAndOpinions = {
    // Nicht relevant mit TypeScript
    'react/boolean-prop-naming': 'off',

    /*
     * Abgedeckt durch @stylistic/jsx-equals-spacing
     * ===== ZUSÄTZLICHE ENTERPRISE STANDARDS =====
     */
    'react/button-has-type': [
        'error',
        {
            button: true,
            reset: true,
            submit: true
        }
    ],

    // Warn für graduelle Adoption
    'react/checked-requires-onchange-or-readonly': 'warn',

    // Zu opinion-based
    'react/default-props-match-prop-types': 'off'
} satisfies TSESLint.Linter.RulesRecord
