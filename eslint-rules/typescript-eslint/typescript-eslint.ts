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
import { configs as tseslintConfigs } from 'typescript-eslint'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * ===== TYPESCRIPT-ESLINT CONFIGURATIONS =====
 * Include ALL strict TypeScript rules (includes recommended).
 */
const typescriptStrictAndStylistic: TSESLint.FlatConfig.ConfigArray = [
    ...tseslintConfigs.strictTypeChecked,
    ...tseslintConfigs.stylisticTypeChecked
]

const ALPHABETICALLY_CASE_INSENSITIVE = 'alphabetically-case-insensitive'

// ===== ADDITIONAL TYPESCRIPT RULES =====
const additionalTypescriptRulesConfig: TSESLint.FlatConfig.Config = {
    files: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.mts',
        '**/*.cts'
    ],
    rules: {

        '@typescript-eslint/ban-ts-comment': 'error',

        /*
         * Konsistente Method Signatures
         * Class Design (Enterprise OOP Standards)
         */
        '@typescript-eslint/class-methods-use-this': [
            'error',
            {
                enforceForClassFields: true,

                // Statische Methoden wenn kein "this"
                exceptMethods: [
                    'render',
                    'componentDidMount',
                    'componentDidUpdate',
                    'componentWillUnmount'
                ]
            }
        ],

        // Verhindert unnötige Type Conversions
        /*
         * ✅ ==== VERIFIED ====
         * If possible, it is recommended to use tsconfig's noImplicitReturns option rather than this rule. noImplicitReturns is powered by TS's type information and control-flow analysis so it has better coverage than this rule.
         */
        '@typescript-eslint/consistent-return': 'off',

        /*
         * Performance: Verhindert Side Effects bei Type Imports
         * ✅ ==== VERIFIED ====
         */
        '@typescript-eslint/consistent-type-exports': 'error',

        // Konsistente Type Exports
        /*
         * ✅ ==== VERIFIED ====
         * ✅ Erzwingt Konsistenz in TypeScript und steuert den Auto-Fixer.
         *    prefer: 'type-imports'          → immer `import type` statt Wert-Import für Typen.
         *    fixStyle: 'separate-type-imports' → separater Top-Level-Block für Typen (kein Inline-Mixing).
         */
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                fixStyle: 'separate-type-imports',
                prefer: 'type-imports'
            }
        ],

        '@typescript-eslint/dot-notation': 'off',

        // Additional typescript-eslint rules not included in strict
        '@typescript-eslint/explicit-function-return-type': 'error',

        // ✅ ==== VERIFIED ====
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    parameterProperties: 'explicit',
                    properties: 'explicit'
                }
            }
        ],

        /*
         * ✅ ==== VERIFIED ====
         * Klassen: gruppen + alphabetisch; Interfaces/Type-Literals: nur alphabetisch, KEIN optionalityOrder
         */
        '@typescript-eslint/member-ordering': [
            'error',
            {
                classes: {
                // Z.B. sinnvoll für Klassen
                    optionalityOrder: 'required-first',
                    order: ALPHABETICALLY_CASE_INSENSITIVE
                },
                interfaces: {
                    memberTypes: 'never',
                    order: ALPHABETICALLY_CASE_INSENSITIVE
                },
                typeLiterals: {
                    memberTypes: 'never',
                    order: ALPHABETICALLY_CASE_INSENSITIVE
                }
            }
        ],

        // Method Signature Enforcement
        '@typescript-eslint/method-signature-style': [
            'error',
            'property'
        ],

        /*
         * Disabled to allow bracket notation for private method testing
         * ✅ ==== VERIFIED ====
         */
        '@typescript-eslint/naming-convention': [
            'error',

            // ===== BIG TECH ENTERPRISE STANDARDS (Google, Meta, Microsoft) =====

            // 🚫 KRITISCH: Verbiete I-Prefix für Interfaces (veraltetes Anti-Pattern)
            {
                custom: {
                    match: false,
                    regex: '^I[A-Z]'
                },
                format: ['PascalCase'],
                selector: 'interface'
            },

            // 🚫 KRITISCH: Verbiete E-Prefix für Enums (veraltetes Anti-Pattern)
            {
                custom: {
                    match: false,
                    regex: '^E[A-Z]'
                },
                format: ['PascalCase'],
                selector: 'enum'
            },

            // ✅ Type-Like (Interfaces, Classes, Types, Enums) - PascalCase
            {
                format: ['PascalCase'],
                selector: 'typeLike'
            },

            // ✅ Type Parameters (Generics) - T-Prefix (Google/MS Standard)
            {
                format: ['PascalCase'],
                prefix: ['T'],
                selector: 'typeParameter'
            },

            // 🚀 MODERN ONLY: # Private Fields (ECMA Standard) - Enterprise Future
            {
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                modifiers: ['#private'],
                selector: 'classProperty'
            },

            // 🚀 MODERN ONLY: # Private Methods (ECMA Standard)
            {
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                modifiers: ['#private'],
                selector: 'classMethod'
            },

            // 🚫 VERBIETE Legacy underscore für private (erzwinge # private fields)
            {
                custom: {
                    match: false,
                    regex: '^_'
                },
                format: ['camelCase'],
                leadingUnderscore: 'forbid',
                modifiers: ['private'],
                selector: 'memberLike'
            },

            // ✅ Protected Members - underscore optional
            {
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                modifiers: ['protected'],
                selector: 'memberLike'
            },

            // ✅ Static Readonly Constants - UPPER_CASE (Google Standard)
            {
                format: ['UPPER_CASE'],
                modifiers: [
                    'static',
                    'readonly'
                ],
                selector: 'classProperty'
            },

            // ✅ Global Primitive Constants - UPPER_CASE (Google/Meta Standard)
            {
                format: ['UPPER_CASE'],
                modifiers: [
                    'const',
                    'global'
                ],
                selector: 'variable',
                types: [
                    'string',
                    'number',
                    'boolean'
                ]
            },

            // ✅ Global Function Constants - camelCase (Enterprise Standard)
            {
                format: ['camelCase'],
                modifiers: [
                    'const',
                    'global'
                ],
                selector: 'variable',
                types: ['function']
            },

            // ✅ Enum Members - PascalCase (Meta/React Standard)
            {
                format: [
                    'PascalCase',
                    'UPPER_CASE'
                ],
                selector: 'enumMember'
            },

            // ✅ Boolean Variables - Verb Prefixes (Google Best Practice)
            {
                filter: {

                    match: false,

                    // Erlaube auch normale camelCase für destructured oder spezielle Fälle
                    regex: '^(__|_)'
                },
                format: ['PascalCase'],
                prefix: [
                    'is',
                    'has',
                    'can',
                    'should',
                    'will',
                    'did',
                    'does',
                    'was',
                    'were'
                ],
                selector: 'variable',
                types: ['boolean']
            },

            // ✅ Variables - camelCase oder UPPER_CASE
            {
                format: [
                    'camelCase',
                    'UPPER_CASE'
                ],
                leadingUnderscore: 'allow',
                selector: 'variable'
            },

            // ✅ Functions - camelCase oder PascalCase (für React Components)
            {
                format: [
                    'camelCase',
                    'PascalCase'
                ],
                selector: 'function'
            },

            // ✅ Parameters - camelCase mit underscore erlaubt
            {
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                selector: 'parameter'
            },

            // ✅ Destructured Variables - flexible Naming (externe APIs)
            {
                format: null,
                modifiers: ['destructured'],
                selector: 'variable'
            },

            // ✅ Object/Type Properties - verschiedene Formate für externe Libraries (Zod, etc.)
            {
                format: [
                    'camelCase',
                    'snake_case',
                    'PascalCase'
                ],
                leadingUnderscore: 'allow',
                selector: [
                    'objectLiteralProperty',
                    'typeProperty'
                ]
            },

            // ✅ Properties die Quotes brauchen - keine Format-Checks
            {
                format: null,
                modifiers: ['requiresQuotes'],
                selector: [
                    'classProperty',
                    'objectLiteralProperty',
                    'typeProperty',
                    'classMethod',
                    'objectLiteralMethod',
                    'typeMethod',
                    'accessor',
                    'enumMember'
                ]
            },

            // ✅ Default Fallback - camelCase
            {
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                selector: 'default',
                trailingUnderscore: 'forbid'
            }
        ],

        // Enhanced Type Checking für Edge Cases
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            {
                ignoreArrowShorthand: false,
                ignoreVoidOperator: false
            }
        ],

        // Verhindert redundante Union/Intersection Types
        '@typescript-eslint/no-duplicate-type-constituents': 'error',

        '@typescript-eslint/no-explicit-any': 'error',

        '@typescript-eslint/no-floating-promises': 'error',

        /*
         * Verhindert redundante Zuweisungen
         * Import/Export Hygiene (Google/Microsoft Standards)
         * ✅ ==== VERIFIED ====
         */
        '@typescript-eslint/no-import-type-side-effects': 'error',

        // Explizites await für besseres Stack Tracing
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksConditionals: true,
                checksSpreads: true,
                checksVoidReturn: {
                    arguments: true,
                    attributes: true,
                    properties: true,
                    returns: true,
                    variables: true
                }
            }
        ],

        '@typescript-eslint/no-non-null-assertion': 'error',

        /*
         * ===== ENTERPRISE-GRADE NEUE REGELN (VERIFIZIERT) =====
         * Type Safety Enhancement
         */
        '@typescript-eslint/no-redundant-type-constituents': 'error',

        // Restricted Types (Security & Type Safety)
        '@typescript-eslint/no-restricted-types': [
            'error',
            {
                types: {
                    Function: {
                        message: 'Use a specific function type instead',
                        suggest: [
                            '() => void',
                            '(...args: unknown[]) => unknown'
                        ]
                    },
                    Object: {
                        fixWith: 'Record<string, unknown>',
                        message: 'Use Record<string, unknown> or a specific interface instead'
                    },
                    '{}': {
                        fixWith: 'Record<string, never>',
                        message: 'Use Record<string, never> for empty object, unknown for any value, or a specific interface'
                    }
                }
            }
        ],

        '@typescript-eslint/no-unnecessary-condition': [
            'error',
            {
                allowConstantLoopConditions: false,
                allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
            }
        ],

        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

        /*
         * Verhindert leere Exports
         * Code Quality & Maintainability
         */
        '@typescript-eslint/no-unnecessary-qualifier': 'error',

        // Keine doppelten Type Constituents
        '@typescript-eslint/no-unnecessary-template-expression': 'error',

        // Verhindert unsichere Type Assertions
        '@typescript-eslint/no-unnecessary-type-conversion': 'error',

        /*
         * Includes() > indexOf() !== -1
         * TypeScript 5.x Features
         */
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',

        // TypeScript 5.x Declaration Merging Safety
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',

        /*
         * ===== ENTERPRISE-GRADE ZUSÄTZLICHE REGELN =====
         * Type Safety Enhancement
         */
        '@typescript-eslint/no-unsafe-type-assertion': 'error',

        // ✅ ==== VERIFIED ====
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                allowShortCircuit: false,
                allowTaggedTemplates: false,
                allowTernary: false,
                enforceForJSX: true
            }
        ],

        '@typescript-eslint/no-useless-empty-export': 'error',

        '@typescript-eslint/parameter-properties': [
            'error',
            { // Explizite Parameter Properties
                prefer: 'parameter-property'
            }
        ],

        // Entfernt unnötige Namespace Qualifier
        '@typescript-eslint/prefer-destructuring': [
            'error',
            { // Erzwingt Destructuring (moderne Syntax)
                array: true,
                object: true
            }
        ],

        '@typescript-eslint/prefer-enum-initializers': 'error',

        // Korrekter Name (nicht no-useless-template-literals)
        '@typescript-eslint/prefer-find': 'error',

        // Array.find() > filter()[0]
        '@typescript-eslint/prefer-includes': 'error',

        '@typescript-eslint/prefer-literal-enum-member': 'error',

        '@typescript-eslint/prefer-nullish-coalescing': 'error',

        '@typescript-eslint/prefer-optional-chain': 'error',

        '@typescript-eslint/prefer-readonly': 'error',

        '@typescript-eslint/prefer-readonly-parameter-types': 'error',

        '@typescript-eslint/promise-function-async': 'error',

        '@typescript-eslint/require-array-sort-compare': 'error',

        '@typescript-eslint/restrict-template-expressions': 'error',

        // Async/Promise Best Practices
        '@typescript-eslint/return-await': [
            'error',
            'always'
        ],

        // ✅ ==== VERIFIED ====
        '@typescript-eslint/strict-boolean-expressions': 'error',

        '@typescript-eslint/switch-exhaustiveness-check': 'error',

        // Type Annotation Requirements (für kritische Bereiche)
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: false,
                memberVariableDeclaration: true, // Klassen-Member müssen typisiert sein
                objectDestructuring: false,
                parameter: true, // Funktionsparameter müssen typisiert sein
                propertyDeclaration: true, // Properties müssen typisiert sein
                variableDeclaration: false, // Kann durch Type Inference abgeleitet werden
                variableDeclarationIgnoreFunction: true
            }
        ],

        '@typescript-eslint/unbound-method': 'error' // TypeScript 5.x Enum Comparison Safety
    }
}

// ==== SHARED CONFIGS (Plugin Pattern) ====
const createTypescriptEslintAll = (): TSESLint.FlatConfig.ConfigArray => [
    ...typescriptStrictAndStylistic,
    additionalTypescriptRulesConfig
]

export const configs = {
    /**
     * Enterprise-grade TypeScript-ESLint configuration with type-checked rules, parser settings,
     * TypeScript sort-keys integration, and additional enterprise rules.
     */
    all: createTypescriptEslintAll(),

    /**
     * Base configuration without additional overrides.
     */
    base: createTypescriptEslintAll(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createTypescriptEslintAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
