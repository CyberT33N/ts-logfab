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
import {
    CHAIN_DEPTH_LIMIT, ENTERPRISE_INDENT_SIZE, ENTERPRISE_MAX_LINE_LENGTH, ENTERPRISE_MAX_STATEMENTS_PER_LINE
} from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

export const lineBreaksAndWrappingRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/max-len': [
        'error',
        {
            code: ENTERPRISE_MAX_LINE_LENGTH,
            ignoreComments: true,
            ignorePattern: String.raw`^import\s.+\sfrom\s.+;$`,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: false,
            ignoreUrls: true,
            tabWidth: ENTERPRISE_INDENT_SIZE
        }
    ],

    '@stylistic/max-statements-per-line': [
        'error',
        { max: ENTERPRISE_MAX_STATEMENTS_PER_LINE }
    ],

    '@stylistic/member-delimiter-style': [
        'error',
        {
            multiline: {
                delimiter: 'none',
                requireLast: false
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false
            }
        }
    ],

    '@stylistic/multiline-ternary': [
        'error',
        'always-multiline'
    ],

    '@stylistic/new-parens': [
        'error',
        'always'
    ],

    '@stylistic/newline-per-chained-call': [
        'error',
        { ignoreChainWithDepth: CHAIN_DEPTH_LIMIT }
    ],

    '@stylistic/no-extra-parens': [
        'error',
        'all',
        {
            conditionalAssign: false,
            enforceForArrowConditionals: false,
            enforceForFunctionPrototypeMethods: false,
            enforceForNewInMemberExpressions: false,
            enforceForSequenceExpressions: false,
            ignoreJSX: 'all',
            nestedBinaryExpressions: false,
            returnAssign: false
        }
    ],

    '@stylistic/no-extra-semi': ['error'],

    '@stylistic/wrap-iife': [
        'error',
        'inside',
        {
            functionPrototypeMethods: true
        }
    ],
    '@stylistic/wrap-regex': ['error'],

    '@stylistic/yield-star-spacing': [
        'error',
        {
            after: true,
            before: false
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
