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

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Creates the base Overrides configuration containing the Default Export Override block.
 *
 * @returns The base Overrides configuration.
 */
const createOverridesBase = (): TSESLint.FlatConfig.ConfigArray => [
    {
        files: [
            // Build tools
            '**/{vite,webpack,rollup,esbuild,turbo}.config.{ts,js,mts,cts,mjs,cjs}',

            // Test frameworks
            '**/{jest,vitest,playwright,cypress}.config.{ts,js,mts,cts,mjs,cjs}',

            // Linting tools
            '**/{eslint,prettier,stylelint}.config.{ts,js,mts,cts,mjs,cjs}',

            // Next.js, Nuxt, etc.
            '**/{next,nuxt,astro}.config.{ts,js,mts,cts,mjs,cjs}',

            // Legacy configs
            '**/.{eslintrc,prettierrc}.{js,cjs,mjs,ts}'
        ],
        rules: {

            // ✅ ==== VERIFIED ====
            'import/no-default-export': 'off',

            // ✅ ==== VERIFIED ====
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
                    selector: "CallExpression[callee.name='eval']"
                },
                {
                    message: 'Use object spread instead of Object.assign with object literal',
                    selector: "CallExpression[callee.property.name='assign'][callee.object.name='Object'][arguments.0.type='ObjectExpression']"
                }
            ]
        }
    }
]

/**
 * Creates the complete Overrides configuration.
 *
 * @returns The complete Overrides configuration.
 */
const createOverridesAll = (): TSESLint.FlatConfig.ConfigArray => createOverridesBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Overrides (file-specific) Configuration.
     */
    all: createOverridesAll(),

    /**
     * Base Overrides configuration without additional overrides.
     */
    base: createOverridesBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createOverridesAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
