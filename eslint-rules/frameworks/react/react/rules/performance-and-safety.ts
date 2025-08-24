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

export const performanceAndSafety = {
    // ===== PERFORMANCE OPTIMIZATIONS =====
    'react/no-array-index-key': 'warn',

    // Prettier handled das
    'react/no-arrow-function-lifecycle': 'off',

    // ===== SAFETY & CORE USAGE =====
    'react/no-children-prop': 'error',

    // Zu restriktiv
    'react/no-danger': 'warn',

    'react/no-danger-with-children': 'error',

    'react/no-find-dom-node': 'error',

    // Moderne Patterns erlauben das
    'react/no-invalid-html-attribute': 'off',

    'react/no-redundant-should-component-update': 'error',

    'react/no-render-return-value': 'error'
} satisfies TSESLint.Linter.RulesRecord
