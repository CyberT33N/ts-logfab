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
import nodePlugin from 'eslint-plugin-n'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced Node rules configuration
const nodeRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // Enterprise: Force explicit imports
        'n/file-extension-in-import': 'off',

        'n/no-missing-import': 'off',

        'n/no-unpublished-import': 'off',

        // Already handled by unicorn/prefer-node-protocol
        'n/prefer-global/process': [
            'error',
            'never'
        ],

        // Off because we use the .ts extension in the imports
        'n/prefer-node-protocol': 'off'
    }
}

/**
 * Creates the base Node configuration.
 *
 * @returns The base Node configuration.
 */
const createNodeBase = (): TSESLint.FlatConfig.ConfigArray => [
    nodePlugin.configs['flat/all'],
    {
        name: 'enterprise/node-overrides',
        plugins: {
            n: nodePlugin
        },
        rules: nodeRules.rules
    }
]

/**
 * Creates the complete Node configuration.
 *
 * @returns The complete Node configuration.
 */
const createNodeAll = (): TSESLint.FlatConfig.ConfigArray => createNodeBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Node Configuration based on Google/Microsoft/Meta standards.
     */
    all: createNodeAll(),

    /**
     * Base Node configuration without additional overrides.
     */
    base: createNodeBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createNodeAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
