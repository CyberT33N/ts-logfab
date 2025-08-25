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

export const collectionsAndExpressionsRules: TSESLint.Linter.RulesRecord = {

    '@typescript-eslint/no-unnecessary-template-expression': 'error',

    '@typescript-eslint/no-unused-expressions': [
        'error',
        {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: false,
            enforceForJSX: true
        }
    ],

    // Entfernt unnötige Namespace Qualifier
    '@typescript-eslint/prefer-destructuring': [
        'error',
        {
            // Erzwingt Destructuring (moderne Syntax)
            array: true,
            object: true
        }
    ],

    // Korrekter Name (nicht no-useless-template-literals)
    '@typescript-eslint/prefer-find': 'error',

    // Array.find() > filter()[0]
    '@typescript-eslint/prefer-includes': 'error',

    '@typescript-eslint/require-array-sort-compare': 'error',

    '@typescript-eslint/restrict-template-expressions': 'error'
} satisfies TSESLint.Linter.RulesRecord
