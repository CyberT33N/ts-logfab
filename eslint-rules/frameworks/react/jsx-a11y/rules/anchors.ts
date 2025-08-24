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

export const anchorRules = {
    'jsx-a11y/anchor-has-content': [
        'error',
        {
            components: [
                'Link',
                'NavLink',
                'RouterLink'
            ]
        }
    ],

    'jsx-a11y/anchor-is-valid': [
        'error',
        {
            aspects: [
                'noHref',
                'invalidHref',
                'preferButton'
            ],
            components: [
                'Link',
                'NavLink',
                'RouterLink'
            ],
            specialLink: [
                'to',
                'href'
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
