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
import perfectionist from 'eslint-plugin-perfectionist'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Perfectionist rules configuration (Enterprise overrides)
const perfectionistRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // New Map([...]) entries
        'perfectionist/sort-array-includes': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // ===== CLASS & INHERITANCE SORTING =====
        'perfectionist/sort-classes': 'off',

        // Module member sorting - decorators
        'perfectionist/sort-decorators': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Abgedeckt durch ESLint Core sort-keys
        'perfectionist/sort-enums': 'off',

        // Export/Import module sorting
        'perfectionist/sort-exports': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Heritage clauses
        'perfectionist/sort-heritage-clauses': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Deaktiviert: von anderen Plugins abgedeckt
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-interfaces': 'off',

        'perfectionist/sort-intersection-types': [
            'error',
            {
                groups: [
                    'conditional',
                    'function',
                    'import',
                    'intersection',
                    'keyword',
                    'literal',
                    'named',
                    'object',
                    'operator',
                    'tuple',
                    'union',
                    'nullish'
                ],
                order: 'asc',
                type: 'natural'
            }
        ],

        // Abgedeckt durch typescript-sort-keys/interface
        'perfectionist/sort-jsx-props': 'off',

        // New Set([...]) values
        'perfectionist/sort-maps': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Export { a, b, c }
        'perfectionist/sort-modules': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Export statements sorting
        'perfectionist/sort-named-exports': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Deaktiviert: import/order übernimmt
        'perfectionist/sort-named-imports': 'off',

        // Deaktiviert: @typescript-eslint/object-type + andere Regeln
        'perfectionist/sort-object-types': 'off',
        'perfectionist/sort-objects': 'off',

        // Extends/implements clauses
        'perfectionist/sort-sets': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Control flow sorting
        'perfectionist/sort-switch-case': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ],

        // Typescript type sorting
        'perfectionist/sort-union-types': [
            'error',
            {
                groups: [
                    // A extends B ? C : D
                    'conditional',

                    // () => void
                    'function',

                    // Import('module')
                    'import',

                    // A & B
                    'intersection',

                    // String, number, boolean
                    'keyword',

                    // 'literal', 123, true
                    'literal',

                    // CustomType, Interface
                    'named',

                    // { key: value }
                    'object',

                    // Keyof, typeof
                    'operator',

                    // [string, number]
                    'tuple',

                    // A | B
                    'union',

                    // Null, undefined
                    'nullish'
                ],
                order: 'asc',
                type: 'natural'
            }
        ],

        // Variable & declaration sorting
        'perfectionist/sort-variable-declarations': [
            'error',
            {
                order: 'asc',
                type: 'natural'
            }
        ]
    }
}

/**
 * Creates the base Perfectionist configuration.
 *
 * @returns The base Perfectionist configuration.
 */
const createPerfectionistBase = (): TSESLint.FlatConfig.ConfigArray => [
    perfectionist.configs['recommended-natural'],
    {
        name: 'enterprise/formatting/perfectionist-overrides',
        rules: perfectionistRules.rules
    }
]

/**
 * Creates the complete Perfectionist configuration.
 *
 * @returns The complete Perfectionist configuration.
 */
const createPerfectionistAll = (): TSESLint.FlatConfig.ConfigArray => createPerfectionistBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Perfectionist configuration for sorting and natural ordering.
     */
    all: createPerfectionistAll(),

    /**
     * Base Perfectionist configuration without additional overrides.
     */
    base: createPerfectionistBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createPerfectionistAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
