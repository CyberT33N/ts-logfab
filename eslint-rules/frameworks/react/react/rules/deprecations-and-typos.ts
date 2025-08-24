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

export const deprecationsAndTypos = {
    'react/no-typos': 'error',

    'react/no-unescaped-entities': [
        'error',
        {
            forbid: [
                '>',
                '"',
                '\'',
                '}'
            ]
        }
    ],

    // Warn statt error für Flexibilität
    'react/no-unstable-nested-components': [
        'error',
        {
            allowAsProps: false
        }
    ],

    'react/no-unused-class-component-methods': 'error',

    'react/no-unused-prop-types': [
        'error',
        {
            // Shape props oft nur teilweise genutzt
            skipShapeProps: true
        }
    ],

    'react/no-unused-state': 'error'
} satisfies TSESLint.Linter.RulesRecord
