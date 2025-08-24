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

// Core restrictions and safety
export const restrictionsCore = {
    // Additional Safety
    'no-alert': 'error',

    // No alert/confirm/prompt
    'no-caller': 'error',

    'no-empty': [
        'error',
        { allowEmptyCatch: false }
    ],

    'no-eval': 'error',

    /*
     * Prevents javascript: URLs (XSS prevention)
     * Object & Prototype Safety
     */
    'no-extend-native': 'error',

    'no-fallthrough': [
        'error',
        { commentPattern: String.raw`falls?\s?through` }
    ],

    // No empty constructors
    'no-implicit-globals': [
        'error',
        {
            // No implicit globals
            lexicalBindings: true
        }
    ],

    /*
     * Prevents closure issues in loops
     * Security & Code Injection Prevention
     */
    'no-implied-eval': 'error',

    'no-irregular-whitespace': [
        'error',
        {
            skipComments: false,
            skipRegExps: false,
            skipStrings: false,
            skipTemplates: false
        }
    ],

    // No arguments.caller/callee
    'no-iterator': 'error',

    // No __iterator__
    'no-labels': 'error',

    // No labeled statements
    'no-lone-blocks': 'error',

    // Detects loops that only run once
    'no-loop-func': 'error',

    // ✅ ==== VERIFIED ====
    'no-magic-numbers': [
        'error',
        {
            ignore: [
                0,
                1,
                -1
            ]
        }
    ],

    // No assignments that aren't used
    'no-multi-assign': 'error',

    /*
     * Modern hasOwn() over hasOwnProperty
     * Variable & Parameter Management
     */
    'no-param-reassign': [
        'error',
        {
            ignorePropertyModificationsFor: [
                'acc',
                'accumulator',
                'ctx',
                'context',
                'req',
                'request',
                'res',
                'response',
                'state'
            ],

            // Immutability best practice
            props: true
        }
    ],

    // Prevents new String/Number/Boolean
    'no-proto': 'error',

    /*
     * Unicode flag for RegEx
     * Restricted Usage (Enterprise Security)
     */
    'no-restricted-globals': [
        'error',

        // Browser globals that shouldn't be used in Node.js
        'window',
        'document',
        'navigator',
        'alert',
        'confirm',
        'prompt',

        // Deprecated or dangerous globals
        'event',
        'length',
        'name',
        'origin',
        'self',
        'top',

        // Force explicit imports
        'Buffer',
        'process',
        'global'
    ],

    'no-restricted-imports': [
        'error',
        {
            paths: [
                {
                    message: 'Use lodash-es or specific lodash/* packages instead',
                    name: 'lodash'
                },
                {
                    message: 'Use date-fns or native Temporal API instead',
                    name: 'moment'
                },
                {
                    message: 'Use lodash-es or native methods instead',
                    name: 'underscore'
                }
            ],
            patterns: [
                {
                    group: [
                        '*/dist/*',
                        '*/build/*'
                    ],
                    message: 'Do not import from dist/build directories'
                },
                {
                    group: [
                        '**/test/**',
                        '**/tests/**',
                        '**/*.test.*',
                        '**/*.spec.*'
                    ],
                    message: 'Do not import test files in production code'
                },

                // ✅ ==== VERIFIED ====
                {
                    group: ['@/**/internal/**'],
                    message: 'Internal modules are private; import via index or from tests.'
                },
                {
                    group: ['**/internal/**'],
                    message: 'Internal modules are private; import via index or from tests.'
                }
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
