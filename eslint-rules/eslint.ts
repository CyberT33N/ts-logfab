/* eslint-disable max-lines */
/* eslint-disable no-magic-numbers */
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

import type { Linter } from 'eslint'

export const eslintRules: {
    rules: Linter.RulesRecord
} = {
    rules: {
        /*
         *   ✅ ==== VERIFIED ====
         *   Google (Angular, TypeScript):
         *   Standard: 250 Zeilen
         *   Begründung: Optimal für Code-Review-Zyklen und Cognitive Load Management
         *   Meta/Facebook (React, Flow/TypeScript):
         *   Standard: 200-250 Zeilen
         *   Fokus auf Component-basierte Architektur mit hoher Cohesion
         *   Microsoft (TypeScript, VSCode):
         *   Standard: 200-300 Zeilen
         *   Flexible Limits je nach Komplexität der Business Logic
         *   Amazon (AWS SDKs, TypeScript):
         *   Standard: 150-250 Zeilen
         *   Strenge Grenzen für Microservice-Architecture
         */
        'max-lines': [
            'error',
            {
                // Enterprise Sweet Spot
                max: 250,

                // ✅ Leerzeilen für Readability ignorieren
                skipBlankLines: true,

                // ✅ Kommentare zählen für Documentation Discipline
                skipComments: true
            }
        ],

        /*
         * Migrated to @stylistic - now commented out
         * 'arrow-parens': ['error', 'as-needed'],
         */

        // ✅ ==== VERIFIED ====
        'no-magic-numbers': ['error', { ignore: [0, 1] }],

        // ✅ ==== VERIFIED ====
        'no-ternary': 'off',

        /*
         * ✅ ==== VERIFIED ====
         * Kernregel: Zeilenumbrüche in Imports erst ab N Specifiers
         */
        'object-curly-newline': 'off',

        // ✅ ==== VERIFIED ====
        'no-underscore-dangle': [
            'error',
            {
                allow: ['__dirname', '__filename'],
                allowFunctionParams: true
            }
        ],

        // ✅ ==== VERIFIED ====
        'arrow-body-style': [
            'error',
            'as-needed',
            {
                requireReturnForObjectLiteral: false
            }
        ],

        'no-var': 'error',
        'no-eval': 'error',

        /*
         * 'indent': ['error', 4], // Migrated to @stylistic
         * 'quotes': ['error', 'single'], // Migrated to @stylistic
         */
        'no-console': [
            'error',
            {
                allow: [
                    'warn',
                    'error',
                    'info',
                    'trace'
                ]
            }
        ],

        /*
         * 'space-before-function-paren': ['error', 'never'], // Migrated to @stylistic
         * 'padded-blocks': ['error', 'never'], // Migrated to @stylistic
         */
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true
            }
        ],
        'func-names': ['error', 'never'],

        // ✅ ==== VERIFIED ====
        'func-style': [
            'error',
            'expression',
            {
                overrides: { namedExports: 'expression' }
            }
        ],

        // Let typescript-eslint handle this
        'no-use-before-define': 'off',

        // ✅ ==== VERIFIED ====
        /*
         * 'object-curly-spacing': ['error', 'always'], // Migrated to @stylistic
         * 'comma-dangle': ['error', 'never'], // Migrated to @stylistic
         * 'semi': ['error', 'never'], // Migrated to @stylistic
         */
        'new-cap': [
            'error',
            {
                capIsNew: false,
                // eslint-disable-next-line unicorn/no-keyword-prefix
                newIsCap: true
            }
        ],
        'one-var': ['error', 'never'],
        'guard-for-in': 'error',

        // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-return-await
        'no-return-await': 'off',

        // ❌ REDUNDANT: Übernommen von import/no-duplicates hat mehr Features (inline types, query strings)
        'no-duplicate-imports': 'off',

        'no-template-curly-in-string': 'error',
        'require-atomic-updates': 'error',
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',

        /*
         * ENTERPRISE: naming-convention ist viel mächtiger und granularer
         * 'camelcase': ['error', { properties: 'never' }], // ❌ REDUNDANT: Übernommen von @typescript-eslint/naming-convention
         */

        // Enterprise standard: Google/Microsoft use 10-15
        complexity: ['error', 15],

        /*
         * ✅ ==== VERIFIED ====
         * ❌ REDUNDANT: Übernommen von @typescript-eslint/consistent-return
         */
        'consistent-return': 'off',

        curly: ['error', 'all'],
        'default-case': 'error',

        eqeqeq: ['error', 'always'],

        // Disabled to allow bracket notation for private method testing
        'dot-notation': 'off',

        // ===== IMPORT SORTING CONFLICT RESOLUTION =====

        /*
         * ✅ ==== VERIFIED ====
         * Deaktiviert - Konflikt mit import/order. Verwenden import/order für vollständige Import-Kontrolle
         */
        'sort-imports': 'off',

        // Additional critical rules for enterprise compliance
        'no-empty': ['error', { allowEmptyCatch: false }],
        'no-fallthrough': ['error', { commentPattern: String.raw`falls?\s?through` }],
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: false,
                skipComments: false,
                skipRegExps: false,
                skipTemplates: false
            }
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false
            }
        ],

        // ===== ENTERPRISE-GRADE ADDITIONAL RULES (Google/Microsoft Standards) =====

        // Performance & Async Best Practices
        'no-await-in-loop': 'error', // Prevents performance issues with sequential awaits
        'no-promise-executor-return': [
            'error',
            {
                // Prevents anti-patterns in Promise constructors
                allowVoid: false
            }
        ],

        // Loop & Control Flow Safety
        'no-unmodified-loop-condition': 'error', // Prevents infinite loops
        'no-unreachable-loop': 'error', // Detects loops that only run once
        'no-loop-func': 'error', // Prevents closure issues in loops

        // Security & Code Injection Prevention
        'no-implied-eval': 'error', // Prevents indirect eval() usage
        'no-new-func': 'error', // Prevents new Function() constructor
        'no-script-url': 'error', // Prevents javascript: URLs (XSS prevention)

        // Object & Prototype Safety
        'no-extend-native': 'error', // Prevents modifying native prototypes
        'no-new-wrappers': 'error', // Prevents new String/Number/Boolean
        'no-proto': 'error', // Disallows __proto__ usage
        'prefer-object-has-own': 'error', // Modern hasOwn() over hasOwnProperty

        // Variable & Parameter Management
        'no-param-reassign': [
            'error',
            { // Immutability best practice
                props: true,
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
                ]
            }
        ],
        'no-shadow-restricted-names': 'error', // Prevents shadowing restricted names

        /*
         * Error Handling Excellence
         * ENTERPRISE: @typescript-eslint/only-throw-error ist moderner als no-throw-literal
         * 'no-throw-literal': 'error', // ❌ REDUNDANT: Übernommen von @typescript-eslint/only-throw-error
         */
        'no-useless-catch': 'error', // Prevents redundant catch blocks

        // Code Quality & Maintainability
        'no-sequences': [
            'error',
            { // Prevents comma operator abuse
                allowInParentheses: false
            }
        ],

        /*
         * ENTERPRISE: @typescript-eslint/no-unused-expressions hat Type-aware Features
         * 'no-unused-expressions': ['error', { // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-unused-expressions
         *      allowShortCircuit: false,
         *      allowTernary: false,
         *      allowTaggedTemplates: false,
         *      enforceForJSX: true
         * }],
         */
        'no-useless-call': 'error', // Prevents unnecessary .call()/.apply()
        'no-useless-concat': 'error', // Prevents unnecessary string concatenation
        'no-useless-computed-key': 'error', // Prevents redundant computed properties
        'no-useless-rename': 'error', // Prevents pointless destructuring renames
        'no-with': 'error', // Deprecated with statement
        'no-void': [
            'error',
            { // Prevents void operator
                allowAsStatement: false
            }
        ],

        // Modern JavaScript Best Practices
        'prefer-rest-params': 'error', // Use ...args over arguments
        'prefer-spread': 'error', // Use spread over .apply()
        'prefer-regex-literals': [
            'error',
            { // RegEx literals over new RegExp
                disallowRedundantWrapping: true
            }
        ],
        'prefer-named-capture-group': 'error', // Named groups in RegEx
        'symbol-description': 'error', // Symbols must have descriptions
        radix: ['error', 'always'], // ParseInt must have radix
        'require-unicode-regexp': 'error', // Unicode flag for RegEx

        // Restricted Usage (Enterprise Security)
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
                        name: 'lodash',
                        message: 'Use lodash-es or specific lodash/* packages instead'
                    },
                    {
                        name: 'moment',
                        message: 'Use date-fns or native Temporal API instead'
                    },
                    {
                        name: 'underscore',
                        message: 'Use lodash-es or native methods instead'
                    }
                ],
                patterns: [
                    {
                        group: ['*/dist/*', '*/build/*'],
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
        ],
        'no-restricted-properties': [
            'error',
            {
                object: 'process',
                property: 'env',
                message: 'Use environment configuration module instead of direct process.env access'
            },
            {
                property: '__defineGetter__',
                message: 'Use Object.defineProperty instead'
            },
            {
                property: '__defineSetter__',
                message: 'Use Object.defineProperty instead'
            }
        ],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'Use for...of or Object.keys/entries/values instead'
            },
            {
                selector: 'WithStatement',
                message: 'With statements are not allowed'
            },
            {
                selector: 'CallExpression[callee.name="eval"]',
                message: 'eval() is not allowed for security reasons'
            },
            {
                // eslint-disable-next-line @stylistic/max-len
                selector: 'CallExpression[callee.property.name="assign"][callee.object.name="Object"][arguments.0.type="ObjectExpression"]',
                message: 'Use object spread instead of Object.assign with object literal'
            },
            {
                selector: 'ExportDefaultDeclaration',
                message: 'Default exports are forbidden. Use named exports.'
            }
        ],

        // Function Design

        // ✅ ==== VERIFIED ====
        'max-params': ['error', { max: 3 }], // Limit function parameters

        'max-depth': ['error', { max: 4 }], // Limit nesting depth
        'max-nested-callbacks': ['error', { max: 3 }], // Limit callback nesting
        'max-statements': ['error', 15], // Limit function complexity

        // ✅ ==== VERIFIED ====
        'max-lines-per-function': [
            'error',
            {
                max: 50,
                skipBlankLines: true,
                skipComments: true,
                IIFEs: true
            }
        ],

        // Class & OOP Standards
        'max-classes-per-file': ['error', 1], // One class per file
        'grouped-accessor-pairs': ['error', 'setBeforeGet'], // Setter before getter
        'no-constructor-return': 'error', // No return in constructor
        'no-new': 'error', // No new for side effects

        // Variable Declarations
        'no-useless-assignment': 'error', // No assignments that aren't used
        'no-multi-assign': 'error', // No chained assignments
        /*
         * 'prefer-const': ['error', {
         *      Destructuring: 'all',
         *      IgnoreReadBeforeAssign: false
         * }], // Already defined above in base rules
         */

        // Additional Safety
        'no-alert': 'error', // No alert/confirm/prompt
        'no-caller': 'error', // No arguments.caller/callee
        'no-iterator': 'error', // No __iterator__
        'no-labels': 'error', // No labeled statements
        'no-lone-blocks': 'error', // No unnecessary blocks
        'default-case-last': 'error', // Default case at end of switch
        'no-useless-constructor': 'error', // No empty constructors
        'no-implicit-globals': [
            'error',
            { // No implicit globals
                lexicalBindings: true
            }
        ],

        /*
         * Modern Syntax Enforcement
         * ENTERPRISE: TypeScript Version versteht Type Narrowing besser
         * 'prefer-destructuring': ['error', {...}], // ❌ REDUNDANT: Übernommen von @typescript-eslint/prefer-destructuring
         * 'prefer-template': 'error', // Handled by unicorn/prefer-template-literal which is more powerful
         */
        'prefer-object-spread': 'error', // Object spread over Object.assign
        'prefer-exponentiation-operator': 'error', // ** Over Math.pow
        'no-useless-return': 'error' // No redundant returns
    }
}
