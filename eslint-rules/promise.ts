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
import pluginPromise from 'eslint-plugin-promise'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced Promise rules configuration
const promiseRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * Nur Standard Promise Methods (keine Bluebird etc.)
         * PRAGMATISCHE AUSNAHMEN
         */
        'promise/avoid-new': 'off',

        /*
         * ===== ENTERPRISE PROMISE STANDARDS (Google/Microsoft/Meta) =====
         * UPGRADE: Warnings zu Errors (Zero-Tolerance für Promise Anti-Patterns)
         */
        'promise/no-callback-in-promise': 'error',

        // Enterprise: Callbacks sind Legacy
        'promise/no-multiple-resolved': 'error',

        // Manchmal notwendig für Custom Promise Wrapping
        'promise/no-native': 'off',

        // War 'warn' - Callback-Promise-Mixing verhindert Clean Architecture
        'promise/no-nesting': 'error',

        // War 'warn' - Mixing Callbacks/Promises ist Enterprise Anti-Pattern
        'promise/no-promise-in-callback': 'error',

        // War 'warn' - Nested Promises = Code Smell (use async/await)
        'promise/no-return-in-finally': 'error',

        // Google/MS Standard: async/await > then/catch
        'promise/prefer-await-to-callbacks': 'error',

        /*
         * War 'warn' - Falsche Promise-Parameter = Runtime Errors
         * NEUE REGELN: Modern JavaScript Best Practices
         */
        'promise/prefer-await-to-then': 'error',

        // Verhindert Promise Race Conditions
        'promise/spec-only': 'error',

        /*
         * War 'warn' - Finally sollte NIEMALS returnen
         * TypeScript Projekte nutzen immer native Promises
         */
        'promise/valid-params': 'error'
    }
}

/**
 * Creates the base Promise configuration.
 *
 * @returns The base Promise configuration.
 */
const createPromiseBase = (): TSESLint.FlatConfig.ConfigArray => [
    pluginPromise.configs['flat/recommended'],
    {
        name: 'enterprise/promise-overrides',
        rules: promiseRules.rules
    }
]

/**
 * Creates the complete Promise configuration.
 *
 * @returns The complete Promise configuration.
 */
const createPromiseAll = (): TSESLint.FlatConfig.ConfigArray => createPromiseBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Promise Configuration based on Google/Microsoft/Meta standards.
     * Combines promise best practices with zero-tolerance for anti-patterns.
     */
    all: createPromiseAll(),

    /**
     * Base Promise configuration without additional overrides.
     */
    base: createPromiseBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createPromiseAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
