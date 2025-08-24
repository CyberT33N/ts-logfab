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
import eslintPluginJsonc from 'eslint-plugin-jsonc'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// ==== CONSTANTS ====
const ENTERPRISE_INDENT_SIZE = 2

// Enhanced JSONC rules configuration
const jsoncRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        'jsonc/array-bracket-newline': [
            'error',
            {
                minItems: 3,
                multiline: true
            }
        ],

        /*
         * Arrays often have semantic ordering
         * FORMATTING STANDARDS (Airbnb/Google Hybrid)
         */
        'jsonc/array-bracket-spacing': [
            'error',
            'never'
        ],

        'jsonc/array-element-newline': [
            'error',
            {
                minItems: 3,
                multiline: true
            }
        ],

        /*
         * .5 should be 0.5
         * SPECIAL CASES FOR CONFIGURATION FILES
         */
        'jsonc/auto': 'off',

        /*
         * Infinity not valid in JSON
         * STANDARDIZATION & CONSISTENCY (Google Style Guide)
         */
        'jsonc/comma-dangle': [
            'error',
            'never'
        ],

        'jsonc/comma-style': [
            'error',
            'last'
        ],

        // Property names must be quoted
        'jsonc/indent': [
            'error',
            ENTERPRISE_INDENT_SIZE
        ],

        'jsonc/key-spacing': [
            'error',
            {
                afterColon: true,
                beforeColon: false,
                mode: 'strict'
            }
        ],

        // JSON files MUST NOT contain comments (breaks parsers)
        'jsonc/no-bigint-literals': 'error',

        // 0xFF not valid
        'jsonc/no-binary-numeric-literals': 'error',

        /*
         * ===== ENTERPRISE-GRADE JSON/JSONC STANDARDS (Google/Microsoft/Meta) =====
         * SECURITY & DATA INTEGRITY (CRITICAL)
         */
        'jsonc/no-comments': ['error'],

        // ERROR PREVENTION (Microsoft Standards)
        'jsonc/no-dupe-keys': 'error',

        // +1 should be 1
        'jsonc/no-floating-decimal': 'error',

        // JSONC/JSON5 SPECIFIC (When using JSONC files)
        'jsonc/no-hexadecimal-numeric-literals': 'error',

        // NaN breaks JSON parsers
        'jsonc/no-infinity': 'error',

        // Remove unnecessary escapes
        'jsonc/no-irregular-whitespace': [
            'error',
            {
                skipComments: false,
                skipRegExps: false,
                skipStrings: false,
                skipTemplates: false
            }
        ],

        // Undefined is not valid JSON
        'jsonc/no-nan': 'error',

        // 0o755 not valid
        'jsonc/no-numeric-separators': 'error',

        // [1,,3] is invalid JSON
        'jsonc/no-octal-escape': 'error',

        // 0b1010 not valid
        'jsonc/no-octal-numeric-literals': 'error',

        // 1_000 not valid
        'jsonc/no-plus-sign': 'error',

        // Duplicate keys cause data loss
        'jsonc/no-sparse-arrays': 'error',

        // BigInt not supported in JSON standard
        'jsonc/no-undefined-value': 'error',

        // Octal escapes not supported
        'jsonc/no-useless-escape': 'error',

        //
        'jsonc/object-curly-newline': [
            'error',
            {
                ExportDeclaration: {
                    consistent: true,
                    minProperties: 3,
                    multiline: true
                },
                ImportDeclaration: {
                    consistent: false,
                    minProperties: 3
                },
                ObjectExpression: {
                    consistent: true,
                    minProperties: 2,
                    multiline: true
                },
                ObjectPattern: {
                    consistent: false,
                    minProperties: 3,
                    multiline: true
                }
            }
        ],

        'jsonc/object-curly-spacing': [
            'error',
            'always'
        ],

        'jsonc/object-property-newline': [
            'error',
            {
                // Each property on new line
                allowAllPropertiesOnSameLine: false
            }
        ],

        // JSON standard requires double quotes
        'jsonc/quote-props': [
            'error',
            'always'
        ],

        // No trailing commas in JSON
        'jsonc/quotes': [
            'error',
            'double'
        ],

        'jsonc/sort-array-values': 'off',

        /*
         * Google/Microsoft standard: 2 spaces for JSON
         * SORTING & ORGANIZATION (Enterprise Maintainability)
         */
        'jsonc/sort-keys': [
            'error',
            'asc',
            {
                allowLineSeparatedGroups: true,
                caseSensitive: false,
                minKeys: 2,

                // Allow logical grouping
                natural: true
            }
        ]
    }
}

/**
 * Creates the base JSONC configuration.
 *
 * @returns The base JSONC configuration.
 */
const createJsoncBase = (): TSESLint.FlatConfig.ConfigArray => [
    ...eslintPluginJsonc.configs['flat/all'],
    {
        name: 'enterprise/file-formats/jsonc-overrides',
        rules: jsoncRules.rules
    }
]

/**
 * Creates the complete JSONC configuration.
 *
 * @returns The complete JSONC configuration.
 */
const createJsoncAll = (): TSESLint.FlatConfig.ConfigArray => createJsoncBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade JSON/JSONC Configuration based on Google/Microsoft/Meta standards.
     * Combines security, data integrity, and formatting standards for JSON and JSONC files.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-jsonc-config}
     */
    all: createJsoncAll(),

    /**
     * Base JSONC configuration without additional overrides.
     */
    base: createJsoncBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createJsoncAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
