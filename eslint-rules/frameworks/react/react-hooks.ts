/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ██║   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== IMPORTS ====
import reactHooksPlugin from 'eslint-plugin-react-hooks'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced React Hooks rules configuration
const reactHooksRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== HOOKS DEPENDENCY TRACKING (ENTERPRISE CRITICAL) =====
         * Prevents infinite loops and ensures correct dependency arrays
         */
        'react-hooks/exhaustive-deps': [
            'error',
            {
                // Disable dangerous autofixes that could cause infinite loops
                enableDangerousAutofixThisMayCauseInfiniteLoops: false
            }
        ],

        /*
         * ===== HOOKS BEST PRACTICES (ENTERPRISE STANDARD) =====
         * Enforces Rules of Hooks - critical for React consistency
         */
        'react-hooks/rules-of-hooks': 'error'
    }
}

/**
 * Creates the base React Hooks configuration.
 * @returns The base React Hooks configuration.
 */
const createReactHooksBase = (): TSESLint.FlatConfig.ConfigArray => [
    {
        name: 'enterprise/frameworks/react/react-hooks-base',
        plugins: {
            'react-hooks': reactHooksPlugin
        },
        rules: reactHooksRules.rules
    }
]

/**
 * Creates the complete React Hooks configuration.
 * @returns The complete React Hooks configuration.
 */
const createReactHooksAll = (): TSESLint.FlatConfig.ConfigArray => createReactHooksBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade React Hooks Configuration based on Google/Microsoft/Meta standards.
     * Enforces proper hooks usage patterns and dependency array management.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-react-hooks-config}
     */
    all: createReactHooksAll(),

    /**
     * Base React Hooks configuration without additional overrides.
     */
    base: createReactHooksBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createReactHooksAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
