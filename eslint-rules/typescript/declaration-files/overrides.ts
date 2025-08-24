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
 * Creates the base configuration for TypeScript declaration files.
 *
 * @returns The base configuration for d.ts files.
 */
const createTsDeclarationOverridesBase = (): TSESLint.FlatConfig.ConfigArray => [
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'off',

            // ✅ ==== VERIFIED ====
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    interfaces: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    },
                    typeLiterals: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    }
                }
            ],

            // ✅ ==== VERIFIED ====
            'perfectionist/sort-object-types': 'off',

            // ✅ ==== VERIFIED ====
            'typescript-sort-keys/interface': 'error'
        }
    }
]

/**
 * Creates the complete configuration for TypeScript declaration files.
 *
 * @returns The complete configuration.
 */
const createTsDeclarationOverridesAll = (): TSESLint.FlatConfig.ConfigArray => createTsDeclarationOverridesBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade overrides for TypeScript declaration files.
     */
    all: createTsDeclarationOverridesAll(),

    /**
     * Base configuration without additional overrides.
     */
    base: createTsDeclarationOverridesBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createTsDeclarationOverridesAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
