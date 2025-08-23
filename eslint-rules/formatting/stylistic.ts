/* eslint-disable max-lines */
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
import stylistic from '@stylistic/eslint-plugin'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enterprise Code Formatting Standards Constants
const ENTERPRISE_INDENT_SIZE = 4
const ENTERPRISE_MAX_LINE_LENGTH = 120
const ENTERPRISE_MAX_STATEMENTS_PER_LINE = 1
const CHAIN_DEPTH_LIMIT = 2

// ✅ ==== VERIFIED ====
const MIN_ARRAY_ITEMS_FOR_NEWLINE = 2

const MIN_OBJECT_PROPERTIES_FOR_NEWLINE = 2
const MIN_IMPORT_PROPERTIES_FOR_NEWLINE = 3
const NEWLINE_CONSISTENT_COUNT = 1
const JSX_MAX_PROPS_PER_LINE = 1
const JSX_MULTILINE_THRESHOLD = 1

// Stylistic rules configuration
const stylisticRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== ARRAYS =====
         */

        // ✅ ==== VERIFIED ====
        '@stylistic/array-bracket-newline': [
            'error',
            {
                minItems: MIN_ARRAY_ITEMS_FOR_NEWLINE,
                multiline: true
            }
        ],

        '@stylistic/array-bracket-spacing': ['error', 'never'],

        // ✅ ==== VERIFIED ====
        '@stylistic/array-element-newline': [
            'error',
            {
                minItems: MIN_ARRAY_ITEMS_FOR_NEWLINE,
                multiline: true
            }
        ],

        '@stylistic/arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: true
            }
        ],

        '@stylistic/arrow-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ],

        '@stylistic/block-spacing': ['error', 'always'],

        // ===== BLOCKS & BRACES =====
        '@stylistic/brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: false
            }
        ],

        /*
         * ✅ ==== VERIFIED ====
         */
        '@stylistic/comma-dangle': [
            'error',
            {
                arrays: 'never',
                exports: 'never',
                functions: 'never',
                imports: 'never',
                objects: 'never'
            }
        ],

        '@stylistic/comma-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],

        '@stylistic/comma-style': ['error', 'last'],

        // ===== MISC FORMATTING =====
        '@stylistic/computed-property-spacing': ['error', 'never'],

        '@stylistic/curly-newline': ['error'],

        '@stylistic/dot-location': ['error', 'property'],

        '@stylistic/eol-last': ['error', 'always'],

        // We use custom rules for formatting function definitions
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],

        '@stylistic/function-call-spacing': ['error', 'never'],

        // ===== FUNCTIONS =====
        '@stylistic/function-paren-newline': ['error', 'consistent'],

        '@stylistic/generator-star-spacing': [
            'error',
            {
                after: false,
                before: true
            }
        ],

        '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

        // ===== SPACING & INDENTATION =====
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

        '@stylistic/indent-binary-ops': ['error', ENTERPRISE_INDENT_SIZE],

        '@stylistic/jsx-child-element-spacing': ['error'],

        '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

        '@stylistic/jsx-closing-tag-location': ['error'],

        '@stylistic/jsx-curly-brace-presence': [
            'error',
            {
                children: 'never',
                props: 'never'
            }
        ],

        '@stylistic/jsx-curly-newline': [
            'error',
            {
                multiline: 'consistent',
                singleline: 'forbid'
            }
        ],

        '@stylistic/jsx-curly-spacing': [
            'error',
            {
                children: true,
                when: 'never'
            }
        ],

        '@stylistic/jsx-equals-spacing': ['error', 'never'],

        '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],

        '@stylistic/jsx-function-call-newline': ['error', 'multiline'],

        '@stylistic/jsx-indent-props': ['error', ENTERPRISE_INDENT_SIZE],

        '@stylistic/jsx-max-props-per-line': [
            'error',
            {
                maximum: JSX_MAX_PROPS_PER_LINE,
                when: 'multiline'
            }
        ],

        '@stylistic/jsx-one-expression-per-line': [
            'error',
            {
                allow: 'single-child'
            }
        ],

        '@stylistic/jsx-pascal-case': [
            'error',
            {
                allowAllCaps: false,
                allowNamespace: true
            }
        ],

        '@stylistic/jsx-props-no-multi-spaces': ['error'],

        // ===== JSX/REACT SPECIFIC (only essential for future React support) =====
        '@stylistic/jsx-quotes': ['error', 'prefer-double'],

        '@stylistic/jsx-self-closing-comp': [
            'error',
            {
                component: true,
                html: true
            }
        ],

        '@stylistic/jsx-sort-props': [
            'error',
            {
                callbacksLast: true,
                ignoreCase: true,
                multiline: 'last',
                reservedFirst: true,
                shorthandFirst: true
            }
        ],

        '@stylistic/jsx-tag-spacing': [
            'error',
            {
                afterOpening: 'never',
                beforeClosing: 'never',
                beforeSelfClosing: 'always',
                closingSlash: 'never'
            }
        ],

        '@stylistic/jsx-wrap-multilines': [
            'error',
            {
                arrow: 'parens-new-line',
                assignment: 'parens-new-line',
                condition: 'parens-new-line',
                declaration: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
                return: 'parens-new-line'
            }
        ],

        '@stylistic/key-spacing': [
            'error',
            {
                afterColon: true,
                beforeColon: false,
                mode: 'strict'
            }
        ],

        '@stylistic/keyword-spacing': [
            'error',
            {
                after: true,
                before: true,
                overrides: {
                    case: { after: true },
                    return: { after: true },
                    throw: { after: true }
                }
            }
        ],

        // ===== COMMENTS & DOCUMENTATION =====
        '@stylistic/line-comment-position': [
            'error',
            {
                applyDefaultIgnorePatterns: true,
                ignorePattern: 'eslint|jshint|global',
                position: 'above'
            }
        ],

        '@stylistic/linebreak-style': ['error', 'unix'],

        // ✅ ==== VERIFIED ====
        '@stylistic/lines-around-comment': [
            'error',
            {
                afterBlockComment: false,
                afterHashbangComment: true,
                afterLineComment: false,
                allowArrayEnd: true,

                allowArrayStart: true,
                allowBlockEnd: true,
                allowBlockStart: true,
                allowClassEnd: true,
                allowClassStart: true,
                allowEnumEnd: true,
                allowEnumStart: true,
                allowInterfaceEnd: true,

                // TypeScript structures
                allowInterfaceStart: true,

                allowModuleEnd: true,

                allowModuleStart: true,

                allowObjectEnd: true,

                allowObjectStart: true,
                allowTypeEnd: true,
                allowTypeStart: true,
                applyDefaultIgnorePatterns: true,

                beforeBlockComment: true,
                beforeLineComment: true,
                ignorePattern: String.raw`^(?:region|endregion|#region|#endregion)\b`
            }
        ],

        // ===== CLASS MEMBERS =====
        '@stylistic/lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterOverload: true,
                exceptAfterSingleLine: false
            }
        ],

        // ===== LINE BREAKS & WRAPPING =====
        '@stylistic/max-len': [
            'error',
            {
                code: ENTERPRISE_MAX_LINE_LENGTH,
                ignoreComments: true,
                ignorePattern: String.raw`^import\s.+\sfrom\s.+;$`,
                ignoreRegExpLiterals: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreUrls: true,
                tabWidth: ENTERPRISE_INDENT_SIZE
            }
        ],

        '@stylistic/max-statements-per-line': ['error', { max: ENTERPRISE_MAX_STATEMENTS_PER_LINE }],

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

        '@stylistic/multiline-comment-style': ['error', 'starred-block'],

        // ===== TERNARY =====
        '@stylistic/multiline-ternary': ['error', 'always-multiline'],

        '@stylistic/new-parens': ['error', 'always'],

        '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: CHAIN_DEPTH_LIMIT }],

        '@stylistic/no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
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

        '@stylistic/no-floating-decimal': ['error'],

        '@stylistic/no-mixed-operators': [
            'error',
            {
                allowSamePrecedence: true,
                groups: [
                    ['%', '**'],
                    ['%', '+'],
                    ['%', '-'],
                    ['%', '*'],
                    ['%', '/'],
                    ['/', '*'],
                    [
                        '&',
                        '|',
                        '<<',
                        '>>',
                        '>>>'
                    ],
                    [
                        '==',
                        '!=',
                        '===',
                        '!=='
                    ],
                    ['&&', '||']
                ]
            }
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

        '@stylistic/nonblock-statement-body-position': ['error', 'below'],

        // ===== OBJECTS =====
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

        '@stylistic/object-curly-spacing': ['error', 'always'],

        '@stylistic/object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: false
            }
        ],

        '@stylistic/one-var-declaration-per-line': ['error', 'always'],

        '@stylistic/operator-linebreak': [
            'error',
            'before',
            {
                overrides: {
                    '%=': 'none',
                    '*=': 'none',
                    '+=': 'none',
                    '-=': 'none',
                    '/=': 'none',
                    '=': 'none'
                }
            }
        ],

        '@stylistic/padded-blocks': [
            'error',
            'never',
            {
                allowSingleLineBlocks: false
            }
        ],

        '@stylistic/padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                next: '*',
                prev: 'directive'
            },
            {
                blankLine: 'any',
                next: 'directive',
                prev: 'directive'
            },
            {
                blankLine: 'always',
                next: '*',
                prev: [
                    'const',
                    'let',
                    'var'
                ]
            },
            {
                blankLine: 'any',
                next: [
                    'const',
                    'let',
                    'var'
                ],
                prev: [
                    'const',
                    'let',
                    'var'
                ]
            },
            {
                blankLine: 'always',
                next: 'return',
                prev: '*'
            },
            {
                blankLine: 'always',
                next: [
                    'if',
                    'try',
                    'class',
                    'export'
                ],
                prev: '*'
            },
            {
                blankLine: 'always',
                next: '*',
                prev: [
                    'if',
                    'try',
                    'class',
                    'export'
                ]
            },
            {
                blankLine: 'any',
                next: ['export'],
                prev: ['export']
            }
        ],

        '@stylistic/quote-props': [
            'error',
            'as-needed',
            {
                keywords: false,
                numbers: false,
                unnecessary: true
            }
        ],

        '@stylistic/quotes': [
            'error',
            'single',
            {
                allowTemplateLiterals: 'never',
                avoidEscape: true
            }
        ],

        '@stylistic/rest-spread-spacing': ['error', 'never'],

        '@stylistic/semi': [
            'error',
            'never',
            {
                beforeStatementContinuationChars: 'never'
            }
        ],

        '@stylistic/semi-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],

        '@stylistic/semi-style': ['error', 'last'],

        '@stylistic/space-before-blocks': ['error', 'always'],

        '@stylistic/space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                asyncArrow: 'always',
                named: 'never'
            }
        ],

        '@stylistic/space-in-parens': ['error', 'never'],

        '@stylistic/space-infix-ops': ['error', { int32Hint: false }],

        '@stylistic/space-unary-ops': [
            'error',
            {
                nonwords: false,
                overrides: {},
                words: true
            }
        ],

        '@stylistic/spaced-comment': [
            'error',
            'always',
            {
                block: {
                    balanced: true,
                    exceptions: ['-', '+'],
                    markers: [
                        '=',
                        '!',
                        ':',
                        '::'
                    ]
                },
                line: {
                    exceptions: ['-', '+'],
                    markers: [
                        '=',
                        '!',
                        '/'
                    ]
                }
            }
        ],

        '@stylistic/switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],

        '@stylistic/template-curly-spacing': ['error', 'never'],

        '@stylistic/template-tag-spacing': ['error', 'never'],

        // ===== TYPESCRIPT SPECIFIC =====
        '@stylistic/type-annotation-spacing': [
            'error',
            {
                after: true,
                before: false,
                overrides: {
                    arrow: {
                        after: true,
                        before: true
                    }
                }
            }
        ],

        '@stylistic/type-generic-spacing': ['error'],

        '@stylistic/type-named-tuple-spacing': ['error'],

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
    }
}

/**
 * Creates the base Stylistic configuration.
 * @returns The base Stylistic configuration.
 */
const createStylisticBase = (): TSESLint.FlatConfig.ConfigArray => [
    stylistic.configs.all,
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.js',
            '**/*.jsx'
        ],
        name: 'enterprise/formatting/stylistic-overrides',
        plugins: {
            '@stylistic': stylistic
        },
        rules: stylisticRules.rules
    }
]

/**
 * Creates the complete Stylistic configuration.
 * @returns The complete Stylistic configuration.
 */
const createStylisticAll = (): TSESLint.FlatConfig.ConfigArray => createStylisticBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Code Formatting Configuration based on Google/Microsoft/Meta standards.
     * Combines consistent indentation, spacing, line breaks, and modern JavaScript/TypeScript formatting.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-stylistic-config}
     */
    all: createStylisticAll(),

    /**
     * Base Stylistic configuration without additional overrides.
     */
    base: createStylisticBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createStylisticAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
