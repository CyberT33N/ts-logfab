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
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Enhanced Unicorn rules configuration.
 */
const unicornRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // ✅ ==== VERIFIED ====
        'unicorn/filename-case': [
            'error',
            {
                case: 'kebabCase',
                ignore: [
                    String.raw`^README\.md$`,
                    String.raw`^CHANGELOG\.md$`,

                    // Next/Nuxt dynamic routes
                    String.raw`^\[.+\]\.(ts|tsx)$`

                    // Keep index.* as-is (plugin already ignores index.*)
                ],
                multipleFileExtensions: true
            }
        ],

        // ✅ ==== VERIFIED ====
        'unicorn/no-keyword-prefix': 'off',

        // ✅ ==== VERIFIED ====
        'unicorn/no-null': 'error',

        // ✅ ==== VERIFIED ====
        'unicorn/prevent-abbreviations': [
            'warn',
            {
                allowList: {
                    API: true,
                    JWT: true,
                    URL: true,
                    ctx: true,
                    db: true,
                    i18n: true,
                    id: true,
                    next: true,
                    props: true,
                    req: true,
                    res: true
                },
                checkDefaultAndNamespaceImports: 'internal',
                checkFilenames: false,
                checkProperties: false,
                checkShorthandImports: 'internal',
                checkShorthandProperties: false,
                extendDefaultReplacements: false,
                ignore: [
                    String.raw`\.e2e$`,
                    String.raw`\.spec$`,
                    String.raw`\.d\.ts$`
                ],
                replacements: {
                    cb: { callback: true },
                    cmd: { command: true },
                    e: { event: true },
                    err: { error: true }
                }
            }
        ]
    }
}

/**
 * Creates the base Unicorn configuration.
 *
 * @returns The base Unicorn configuration.
 */
const createUnicornBase = (): TSESLint.FlatConfig.ConfigArray => [
    eslintPluginUnicorn.configs.all,
    {
        name: 'enterprise/clean-code/unicorn-overrides',
        rules: unicornRules.rules
    }
]

/**
 * Creates the overrides for the Unicorn rules.
 *
 * @returns The overrides for the Unicorn rules.
 */
const createUnicornOverrides = (): TSESLint.FlatConfig.ConfigArray => [
    {
        files: ['eslint-rules/**/*.ts'],
        name: 'enterprise/clean-code/unicorn-overrides:eslint-rules',
        rules: { 'unicorn/no-null': 'off' }
    },
    {
        files: ['**/*.json'],
        name: 'enterprise/clean-code/unicorn-overrides:eslint-rules',
        rules: { 'unicorn/prefer-string-raw': 'off' }
    }
]

/**
 * Creates the complete Unicorn configuration.
 *
 * @returns The complete Unicorn configuration.
 */
const createUnicornAll = (): TSESLint.FlatConfig.ConfigArray => [
    ...createUnicornBase(),
    ...createUnicornOverrides()
]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Unicorn Configuration based on Google/Microsoft/Meta standards.
     */
    all: createUnicornAll(),

    /**
     * Base Unicorn configuration without additional overrides.
     */
    base: createUnicornBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createUnicornAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
