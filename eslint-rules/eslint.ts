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

// ==== IMPORTS ====
import { configs as eslintConfigs } from '@eslint/js'
import { z } from 'zod'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Needed for type safety
const rulesRecordSchema = z.custom<TSESLint.Linter.RulesRecord>(
    (data): data is TSESLint.Linter.RulesRecord => typeof data === 'object' && data !== null,
    { message: 'Invalid ESLint rules configuration' }
)

// Custom rules
const eslintRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        'accessor-pairs': 'error',

        'array-callback-return': 'error',

        // ✅ ==== VERIFIED ====
        'arrow-body-style': [
            'error',
            'as-needed',
            {
                requireReturnForObjectLiteral: false
            }
        ],

        'block-scoped-var': 'error',

        /*
         * ❌ REDUNDANT: Übernommen von @typescript-eslint/naming-convention
         * 'camelcase': ['error', { properties: 'never' }],
         */

        /*
         * ✅ ==== VERIFIED ====
         * Enterprise standard: Google/Microsoft use 10-15
         */
        complexity: ['error', 15],

        /*
         * ✅ ==== VERIFIED ====
         * ❌ REDUNDANT: Übernommen von @typescript-eslint/consistent-return
         */
        'consistent-return': 'off',

        curly: ['error', 'all'],

        'default-case': 'error',

        // No unnecessary blocks
        'default-case-last': 'error',

        // Disabled to allow bracket notation for private method testing
        'dot-notation': 'off',

        eqeqeq: ['error', 'always'],

        'func-names': ['error', 'never'],

        // ✅ ==== VERIFIED ====
        'func-style': [
            'error',
            'expression',
            {
                overrides: { namedExports: 'expression' }
            }
        ],

        // One class per file
        'grouped-accessor-pairs': ['error', 'setBeforeGet'],

        'guard-for-in': 'error',

        // Class & OOP Standards
        'max-classes-per-file': ['error', 1],

        // Limit function parameters
        'max-depth': ['error', { max: 4 }],

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
         * Limit function complexity
         * ✅ ==== VERIFIED ====
         */
        'max-lines-per-function': [
            'error',
            {
                IIFEs: true,
                max: 50,
                skipBlankLines: true,
                skipComments: true
            }
        ],

        // Limit nesting depth
        'max-nested-callbacks': ['error', { max: 3 }],

        /*
         * Function Design
         * ✅ ==== VERIFIED ====
         */
        'max-params': ['error', { max: 3 }],

        // Limit callback nesting
        'max-statements': ['error', 15],

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

        // No chained assignments
        /*
         * 'prefer-const': ['error', {
         *      Destructuring: 'all',
         *      IgnoreReadBeforeAssign: false
         * }], // Already defined above in base rules
         */
        // Additional Safety
        'no-alert': 'error',

        /*
         * ===== ENTERPRISE-GRADE ADDITIONAL RULES (Google/Microsoft Standards) =====
         * Performance & Async Best Practices
         */
        'no-await-in-loop': 'error',

        // No alert/confirm/prompt
        'no-caller': 'error',

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

        // Setter before getter
        'no-constructor-return': 'error',

        // ❌ REDUNDANT: Übernommen von import/no-duplicates hat mehr Features (inline types, query strings)
        'no-duplicate-imports': 'off',

        // Additional critical rules for enterprise compliance
        'no-empty': ['error', { allowEmptyCatch: false }],

        'no-eval': 'error',

        /*
         * Prevents javascript: URLs (XSS prevention)
         * Object & Prototype Safety
         */
        'no-extend-native': 'error',

        'no-fallthrough': ['error', { commentPattern: String.raw`falls?\s?through` }],

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

        /*
         * Migrated to @stylistic - now commented out
         * 'arrow-parens': ['error', 'as-needed'],
         */
        // ✅ ==== VERIFIED ====
        'no-magic-numbers': ['error', { ignore: [0, 1] }],

        // No assignments that aren't used
        'no-multi-assign': 'error',

        // No return in constructor
        'no-new': 'error',

        // Prevents indirect eval() usage
        'no-new-func': 'error',

        // Prevents modifying native prototypes
        'no-new-wrappers': 'error',

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

        // Prevents performance issues with sequential awaits
        'no-promise-executor-return': [
            'error',
            {
                // Prevents anti-patterns in Promise constructors
                allowVoid: false
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
                message: 'Use environment configuration module instead of direct process.env access',
                object: 'process',
                property: 'env'
            },
            {
                message: 'Use Object.defineProperty instead',
                property: '__defineGetter__'
            },
            {
                message: 'Use Object.defineProperty instead',
                property: '__defineSetter__'
            }
        ],

        'no-restricted-syntax': [
            'error',
            {
                message: 'Use for...of or Object.keys/entries/values instead',
                selector: 'ForInStatement'
            },
            {
                message: 'With statements are not allowed',
                selector: 'WithStatement'
            },
            {
                message: 'eval() is not allowed for security reasons',
                selector: 'CallExpression[callee.name="eval"]'
            },
            {

                message: 'Use object spread instead of Object.assign with object literal',
                // eslint-disable-next-line @stylistic/max-len
                selector: 'CallExpression[callee.property.name="assign"][callee.object.name="Object"][arguments.0.type="ObjectExpression"]'
            },
            {
                message: 'Default exports are forbidden. Use named exports.',
                selector: 'ExportDefaultDeclaration'
            }
        ],

        // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-return-await
        'no-return-await': 'off',

        // Prevents new Function() constructor
        'no-script-url': 'error',

        /*
         * Prevents redundant catch blocks
         * Code Quality & Maintainability
         */
        'no-sequences': [
            'error',
            {
                // Prevents comma operator abuse
                allowInParentheses: false
            }
        ],

        'no-shadow-restricted-names': 'error',

        'no-template-curly-in-string': 'error',

        // ✅ ==== VERIFIED ====
        'no-ternary': 'off',

        // ✅ ==== VERIFIED ====
        'no-underscore-dangle': [
            'error',
            {
                allow: ['__dirname', '__filename'],
                allowFunctionParams: true
            }
        ],

        // Loop & Control Flow Safety
        'no-unmodified-loop-condition': 'error',

        // Prevents infinite loops
        'no-unreachable-loop': 'error',

        // Let typescript-eslint handle this
        'no-use-before-define': 'off',

        /*
         * No new for side effects
         * Variable Declarations
         */
        'no-useless-assignment': 'error',

        /*
         * ENTERPRISE: @typescript-eslint/no-unused-expressions hat Type-aware Features
         * 'no-unused-expressions': ['error', { // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-unused-expressions
         *      allowShortCircuit: false,
         *      allowTernary: false,
         *      allowTaggedTemplates: false,
         *      enforceForJSX: true
         * }],
         */

        'no-useless-call': 'error',

        // Prevents shadowing restricted names
        /*
         * Error Handling Excellence
         * ENTERPRISE: @typescript-eslint/only-throw-error ist moderner als no-throw-literal
         * 'no-throw-literal': 'error', // ❌ REDUNDANT: Übernommen von @typescript-eslint/only-throw-error
         */
        'no-useless-catch': 'error',

        // Prevents unnecessary string concatenation
        'no-useless-computed-key': 'error',

        // Prevents unnecessary .call()/.apply()
        'no-useless-concat': 'error',

        // Default case at end of switch
        'no-useless-constructor': 'error',

        // Prevents redundant computed properties
        'no-useless-rename': 'error',

        // ** Over Math.pow
        'no-useless-return': 'error',

        'no-var': 'error',

        // Deprecated with statement
        'no-void': [
            'error',
            {
                // Prevents void operator
                allowAsStatement: false
            }
        ],

        // Prevents pointless destructuring renames
        'no-with': 'error',

        /*
         * ✅ ==== VERIFIED ====
         * Kernregel: Zeilenumbrüche in Imports erst ab N Specifiers
         */
        'object-curly-newline': 'off',

        'one-var': ['error', 'never'],

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

        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false
            }
        ],

        // Object spread over Object.assign
        'prefer-exponentiation-operator': 'error',

        'prefer-named-capture-group': 'error',

        // Disallows __proto__ usage
        'prefer-object-has-own': 'error',

        /*
         * Modern Syntax Enforcement
         * ENTERPRISE: TypeScript Version versteht Type Narrowing besser
         * 'prefer-destructuring': ['error', {...}], // ❌ REDUNDANT: Übernommen von @typescript-eslint/prefer-destructuring
         * 'prefer-template': 'error', // Handled by unicorn/prefer-template-literal which is more powerful
         */
        'prefer-object-spread': 'error',

        // Use spread over .apply()
        'prefer-regex-literals': [
            'error',
            {
                // RegEx literals over new RegExp
                disallowRedundantWrapping: true
            }
        ],

        // Modern JavaScript Best Practices
        'prefer-rest-params': 'error',

        // Use ...args over arguments
        'prefer-spread': 'error',

        // Symbols must have descriptions
        radix: ['error', 'always'],

        'require-atomic-updates': 'error',

        // ParseInt must have radix
        'require-unicode-regexp': 'error',

        // ===== IMPORT SORTING CONFLICT RESOLUTION =====
        /*
         * ✅ ==== VERIFIED ====
         * Deaktiviert - Konflikt mit import/order. Verwenden import/order für vollständige Import-Kontrolle
         */
        'sort-imports': 'off',

        // Named groups in RegEx
        'symbol-description': 'error'
    }
}

/**
 * Creates the base enterprise ESLint rules.
 * @returns The base enterprise ESLint rules.
 */
const createEnterpriseBase = (): TSESLint.FlatConfig.Config => {
    // We validate here because of missing types in eslint/js
    const validatedRules = rulesRecordSchema.parse(eslintConfigs.all.rules)

    const rules: TSESLint.Linter.RulesRecord = {
        ...validatedRules,
        ...eslintRules.rules
    }

    return {
        name: 'enterprise/base',
        rules
    }
}

/**
 * Creates the overrides for the enterprise ESLint rules.
 * @returns The overrides for the enterprise ESLint rules.
 */
const createEnterpriseOverrides = (): TSESLint.FlatConfig.Config => ({
    files: [
        'src/**/index.ts',
        'test/**/*.{ts,tsx,js,mjs,cjs}',
        '**/*.test.{ts,tsx,js}',
        '**/*.spec.{ts,tsx,js}'
    ],
    name: 'enterprise/overrides:tests-and-index',
    rules: { 'no-restricted-imports': 'off' }
})

/**
 * Creates the all enterprise ESLint rules.
 * @returns The all enterprise ESLint rules.
 */
const createEnterpriseAll = (): TSESLint.FlatConfig.ConfigArray => [createEnterpriseBase(), createEnterpriseOverrides()]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade ESLint rules based on Google/Microsoft/Meta standards.
     * Combines {@link https://github.com/eslint/eslint/tree/main/packages/eslint/eslint.js} all rules with additional enterprise-specific rules.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-eslint-config}
     */
    all: createEnterpriseAll(),

    /**
     * Base enterprise ESLint rules without file-specific overrides.
     */
    base: createEnterpriseBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createEnterpriseAll(),

    /**
     * File-specific rule overrides for test files and index files.
     */
    overrides: createEnterpriseOverrides()
} satisfies Record<string, TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray>
