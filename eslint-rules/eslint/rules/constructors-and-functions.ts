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

// Constructor and function-related constraints
export const constructorsAndFunctions = {
    'new-cap': [
        'error',
        {
            capIsNew: false,
            newIsCap: true
        }
    ],

    // No return in constructor
    'no-constructor-return': 'error',

    // No return via new for side effects
    'no-new': 'error',

    // Prevents indirect eval() usage
    'no-new-func': 'error',

    // Prevents modifying native prototypes
    'no-new-wrappers': 'error',

    // Default case at end of switch
    'no-useless-constructor': 'error'
} satisfies TSESLint.Linter.RulesRecord
