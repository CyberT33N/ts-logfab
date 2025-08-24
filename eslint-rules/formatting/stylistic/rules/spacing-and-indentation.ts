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
import { ENTERPRISE_INDENT_SIZE, NEWLINE_CONSISTENT_COUNT } from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

export const spacingAndIndentationRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/indent': [
        'error',
        ENTERPRISE_INDENT_SIZE,
        {
            ArrayExpression: 1,
            CallExpression: {
                arguments: 1
            },
            FunctionDeclaration: {
                body: 1,
                parameters: 1
            },
            FunctionExpression: {
                body: 1,
                parameters: 1
            },
            ImportDeclaration: 1,
            MemberExpression: 1,
            ObjectExpression: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
            offsetTernaryExpressions: true,
            outerIIFEBody: 1
        }
    ],

    '@stylistic/indent-binary-ops': [
        'error',
        ENTERPRISE_INDENT_SIZE
    ],

    '@stylistic/no-mixed-spaces-and-tabs': ['error'],

    '@stylistic/no-multi-spaces': [
        'error',
        {
            exceptions: {},
            ignoreEOLComments: false
        }
    ],

    '@stylistic/no-multiple-empty-lines': [
        'error',
        {
            max: NEWLINE_CONSISTENT_COUNT,
            maxBOF: 0,
            maxEOF: 0
        }
    ],

    '@stylistic/no-tabs': ['error'],

    '@stylistic/no-trailing-spaces': [
        'error',
        {
            ignoreComments: false,
            skipBlankLines: false
        }
    ],

    '@stylistic/no-whitespace-before-property': ['error'],

    '@stylistic/space-in-parens': [
        'error',
        'never'
    ],

    '@stylistic/space-infix-ops': [
        'error',
        { int32Hint: false }
    ],

    '@stylistic/space-unary-ops': [
        'error',
        {
            nonwords: false,
            overrides: {},
            words: true
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
