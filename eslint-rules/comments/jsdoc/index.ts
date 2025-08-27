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

        // ✅ ==== VERIFIED ====
        'jsdoc/check-tag-names': [
            'error',
            {
                definedTags: [
                    'alpha',
                    'beta',
                    'decorator',
                    'deprecated',
                    'defaultValue',
                    'eventProperty',
                    'example',
                    'experimental',
                    'inheritDoc',
                    'internal',
                    'label',
                    'link',
                    'linkcode',
                    'linkplain',
                    'override',
                    'packageDocumentation',
                    'param',
                    'privateRemarks',
                    'public',
                    'readonly',
                    'remarks',
                    'returns',
                    'sealed',
                    'see',
                    'throws',
                    'typeParam',
                    'virtual'
                ],
                typed: true
            }
        ],

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

        /**
         * ✅ ==== VERIFIED ====
         * Enterporise no types because anti pattern in ts.
         */
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
        'jsdoc/require-param': [
            'error',
            {

                // Starting index for auto-numbered roots (e.g., options0, options1).
                autoIncrementBase: 0,

                // Enforce documenting constructor parameters (part of public API).
                checkConstructors: true,

                // Require docs for destructured properties inside parameters.
                checkDestructured: false,

                // Require a root @param for destructured params (e.g., @param options).
                checkDestructuredRoots: false,

                // Getters have no parameters; keep disabled to avoid noise.
                checkGetters: false,

                // Do not auto-document object rest properties; describe in prose if needed.
                checkRestProperty: false,

                // Require documenting setter inputs (they accept a value).
                checkSetters: true,

                // Only require destructured subdocs for generic container types; skip for specific types.
                checkTypesPattern: '/^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array)|Record|Map|Set)$/v',

                // Allow safe auto-insertion of missing @param entries.
                enableFixer: true,

                // Avoid auto-inserting rest array params as {...any}; require explicit docs.
                enableRestElementFixer: false,

                // Auto-add root entries for destructured params when missing.
                enableRootFixer: true,

                // Tags that exempt this rule (inheritance/type-only blocks).
                exemptedBy: [
                    'inheritdoc',
                    'inheritDoc',
                    'type'
                ],

                // Still report when all params are missing to enforce coverage.
                ignoreWhenAllParamsMissing: false,

                // Base names used when auto-naming anonymous destructured roots.
                unnamedRootBase: [
                    'options',
                    'config',
                    'arg'
                ],

                // Do not require docs for properties of default object literals.
                useDefaultObjectProperties: false
            }
        ],

        /**
         * ✅ ==== VERIFIED ====.
         */
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

        // ✅ ==== VERIFIED ====
        'jsdoc/require-throws': ['error'],

        'jsdoc/require-yields': 'error',
        'jsdoc/require-yields-check': 'error',

        /**
         * ✅ ==== VERIFIED ====
         * Enterporise new lines between tags.
         */
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

            // Treat @augments/@extends as replacing docs to avoid redundant per-member tags.
            augmentsExtendsReplacesDocs: true,

            // Skip items marked @internal in doc enforcement.
            ignoreInternal: true,

            // Skip @private or @access private items in doc enforcement.
            ignorePrivate: true,

            // Treat @ignore as replacing docs; do not require params/returns.
            ignoreReplacesDocs: true,

            // Treat @implements as replacing docs on implementing classes/members.
            implementsReplacesDocs: true,

            // Enable TypeScript-flavored mode for parsing and rules.
            mode: 'typescript',

            // Treat @override as replacing docs for overridden members.
            overrideReplacesDocs: true,

            // Normalize common type names to preferred, precise forms.
            preferredTypes: {

                // Prefer primitive boolean over boxed Boolean.
                Boolean: 'boolean',

                // Prefer explicit callable signature over broad Function.
                Function: '(...args: unknown[]) => unknown',

                // Prefer primitive number over boxed Number.
                Number: 'number',

                // Prefer explicit key/value record over broad Object.
                Object: 'Record<string, unknown>',

                // Prefer primitive string over boxed String.
                String: 'string',

                // Keep 'symbol' primitive as-is.
                Symbol: 'symbol',

                // Prefer explicit key/value record over broad 'object'.
                object: 'Record<string, unknown>'
            },

            // Normalize tag names and provide guidance for aliases.
            tagNamePreference: {

                // Prefer @extends (TSDoc-aligned) instead of @augments.
                augments: {

                    // Message shown when auto-replacing deprecated alias.
                    message: 'Use @extends for inheritance (TSDoc-aligned).',

                    // Actual alias replacement.
                    replacement: 'extends'
                },

                // Normalize to @returns (instead of @return).
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
