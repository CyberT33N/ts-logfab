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
import jsdoc from 'eslint-plugin-jsdoc'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced JSDoc rules configuration
const jsdocRules: {
    rules: TSESLint.Linter.RulesRecord
    settings: Record<string, unknown>
} = {
    rules: {
        // Core correctness
        'jsdoc/check-access': 'error',
        'jsdoc/check-alignment': 'error',
        'jsdoc/check-line-alignment': 'error',
        'jsdoc/check-param-names': [
            'error',
            { enableFixer: true }
        ],
        'jsdoc/check-property-names': [
            'error',
            { enableFixer: true }
        ],
        'jsdoc/check-tag-names': 'error',
        'jsdoc/check-template-names': 'error',
        'jsdoc/check-types': 'error',
        'jsdoc/check-values': 'error',

        // Style & structure
        'jsdoc/empty-tags': 'error',
        'jsdoc/implements-on-classes': 'error',

        // ✅ ==== VERIFIED ====
        'jsdoc/multiline-blocks': [
            'error',
            {
                noMultilineBlocks: false,
                noSingleLineBlocks: false
            }
        ],

        'jsdoc/no-defaults': 'error',
        'jsdoc/no-multi-asterisks': 'error',
        'jsdoc/no-types': 'error',
        'jsdoc/no-undefined-types': 'off',
        'jsdoc/require-asterisk-prefix': [
            'error',
            'always'
        ],

        // Content quality
        'jsdoc/require-description': [
            'warn',
            {
                contexts: [
                    'FunctionDeclaration',
                    'ClassDeclaration',
                    'MethodDefinition'
                ]
            }
        ],

        // ✅ ==== VERIFIED ====
        'jsdoc/require-description-complete-sentence': [
            'error',
            {
                tags: [
                    'param',
                    'returns',
                    'property'
                ]
            }
        ],

        // Consistent spacing between tags
        'jsdoc/require-hyphen-before-param-description': [
            'error',
            'always'
        ],

        /**
         * ✅ ==== VERIFIED ====
         * Documentation surface (public API only).
         */
        'jsdoc/require-jsdoc': [
            'error',
            {
                checkConstructors: true,
                contexts: [
                    'TSDeclareFunction',
                    'TSEnumDeclaration',
                    'TSInterfaceDeclaration',
                    'TSMethodSignature',
                    'TSTypeAliasDeclaration',
                    'PropertyDefinition',

                    // Nur Properties in echten Typdefinitionen (nicht inline)
                    'TSInterfaceDeclaration > TSInterfaceBody > TSPropertySignature',
                    'TSTypeAliasDeclaration > TSTypeLiteral > TSPropertySignature'
                ],
                enableFixer: false,
                exemptEmptyConstructors: true,
                exemptEmptyFunctions: true,
                publicOnly: false,
                require: {
                    ArrowFunctionExpression: true,
                    ClassDeclaration: true,
                    ClassExpression: true,
                    FunctionDeclaration: true,
                    FunctionExpression: true,
                    MethodDefinition: true
                }
            }
        ],

        // Params & returns (TS disables type requirements)
        'jsdoc/require-param': 'error',
        'jsdoc/require-param-description': 'error',
        'jsdoc/require-param-name': 'error',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property': 'error',
        'jsdoc/require-property-description': 'error',
        'jsdoc/require-property-name': 'error',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns': [
            'error',
            { exemptedBy: ['constructor'] }
        ],

        // ✅ ==== VERIFIED ====
        'jsdoc/require-returns-check': 'error',
        'jsdoc/require-returns-description': 'error',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-template': 'error',
        'jsdoc/require-throws': ['warn'],
        'jsdoc/require-yields': 'error',
        'jsdoc/require-yields-check': 'error',

        // ✅ ==== VERIFIED ====
        'jsdoc/tag-lines': [
            'error',
            'never',
            {
                applyToEndTag: true,
                count: 1,
                endLines: 0,
                startLines: 1
            }
        ],

        // Type/namepath validity
        'jsdoc/valid-types': 'error'
    },
    settings: {
        jsdoc: {
            mode: 'typescript',
            preferredTypes: {
                Boolean: 'boolean',
                Function: '(...args: unknown[]) => unknown',
                Number: 'number',
                Object: 'Record<string, unknown>',
                String: 'string',
                Symbol: 'symbol',
                object: 'Record<string, unknown>'
            },
            tagNamePreference: {
                augments: {
                    message: 'Use @extends for inheritance (TSDoc-aligned).',
                    replacement: 'extends'
                },
                returns: 'returns'
            }
        }
    }
}

/**
 * Creates the base JSDoc configuration.
 *
 * @returns The base JSDoc configuration.
 */
const createJsdocBase = (): TSESLint.FlatConfig.ConfigArray => [
    jsdoc.configs['flat/recommended-typescript-error'],
    {
        name: 'enterprise/comments/jsdoc-overrides',
        rules: jsdocRules.rules,
        settings: jsdocRules.settings
    }
]

/**
 * Creates the complete JSDoc configuration.
 *
 * @returns The complete JSDoc configuration.
 */
const createJsdocAll = (): TSESLint.FlatConfig.ConfigArray => createJsdocBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade JSDoc configuration for TypeScript projects.
     * Aligns with TSDoc and enforces documentation quality and consistency.
     */
    all: createJsdocAll(),

    /**
     * Base JSDoc configuration without additional overrides.
     */
    base: createJsdocBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createJsdocAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
