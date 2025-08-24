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
import { rules as stylisticRulesSet } from './rules'

import type { TSESLint } from '@typescript-eslint/utils'

// Stylistic rules configuration (composed)
const stylisticRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: stylisticRulesSet
}

/**
 * Creates the base Stylistic configuration.
 *
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
 *
 * @returns The complete Stylistic configuration.
 */
const createStylisticAll = (): TSESLint.FlatConfig.ConfigArray => createStylisticBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Code Formatting Configuration based on Google/Microsoft/Meta standards.
     * Combines consistent indentation, spacing, line breaks, and modern JavaScript/TypeScript formatting.
     *
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
