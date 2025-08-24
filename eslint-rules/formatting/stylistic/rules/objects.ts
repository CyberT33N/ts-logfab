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
    JSX_MULTILINE_THRESHOLD, MIN_IMPORT_PROPERTIES_FOR_NEWLINE, MIN_OBJECT_PROPERTIES_FOR_NEWLINE
} from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

export const objectRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/object-curly-newline': [
        'error',
        {
            ExportDeclaration: {
                consistent: true,
                minProperties: MIN_IMPORT_PROPERTIES_FOR_NEWLINE,
                multiline: true
            },
            ImportDeclaration: {
                consistent: false,
                minProperties: MIN_IMPORT_PROPERTIES_FOR_NEWLINE
            },
            ObjectExpression: {
                consistent: true,
                minProperties: MIN_OBJECT_PROPERTIES_FOR_NEWLINE,
                multiline: true
            },
            ObjectPattern: {
                consistent: false,
                minProperties: MIN_IMPORT_PROPERTIES_FOR_NEWLINE,
                multiline: true
            },
            TSEnumBody: {
                consistent: true,
                minProperties: JSX_MULTILINE_THRESHOLD,
                multiline: true
            },
            TSInterfaceBody: {
                consistent: true,
                minProperties: JSX_MULTILINE_THRESHOLD,
                multiline: true
            },
            TSTypeLiteral: {
                consistent: true,
                minProperties: JSX_MULTILINE_THRESHOLD,
                multiline: true
            }
        }
    ],

    '@stylistic/object-curly-spacing': [
        'error',
        'always'
    ],

    '@stylistic/object-property-newline': [
        'error',
        {
            allowAllPropertiesOnSameLine: false
        }
    ],

    '@stylistic/one-var-declaration-per-line': [
        'error',
        'always'
    ]
} satisfies TSESLint.Linter.RulesRecord
