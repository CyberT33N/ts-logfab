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

export const disabledEnterpriseFlexibility = {
    'react/destructuring-assignment': 'off',

    // TypeScript macht PropTypes obsolet
    'react/display-name': 'off',

    // Zu restriktiv
    'react/forbid-component-props': 'off',

    // Zu restriktiv
    'react/forbid-dom-props': 'off',

    // Zu restriktiv
    'react/forbid-elements': 'off',

    // Zu restriktiv
    'react/forbid-foreign-prop-types': 'off',

    // Zu arbiträr, moderne IDEs helfen
    'react/forbid-prop-types': 'off'
} satisfies TSESLint.Linter.RulesRecord
