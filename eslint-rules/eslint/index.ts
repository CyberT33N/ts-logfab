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
import { configs as eslintConfigs } from '@eslint/js'

// ==== TYPES ====
import {
    generalBestPractices,
    complexityAndMetrics,
    constructorsAndFunctions,
    asyncAndPerformance,
    restrictionsCore,
    restrictionsExtended,
    modernSyntaxAndPreferences
} from './rules'

import type { TSESLint } from '@typescript-eslint/utils'

// ==== GROUPED RULES ====

// Custom rules (modularized)
const eslintRules: {
    /**
     *
     */
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        ...generalBestPractices,
        ...complexityAndMetrics,
        ...constructorsAndFunctions,
        ...asyncAndPerformance,
        ...restrictionsCore,
        ...restrictionsExtended,
        ...modernSyntaxAndPreferences
    }
}

/**
 * Creates the base enterprise ESLint rules.
 *
 * @returns The base enterprise ESLint rules.
 */
const createEnterpriseBase = (): TSESLint.FlatConfig.Config => {
    const rules: TSESLint.Linter.RulesRecord = {
        ...eslintConfigs.all.rules,
        ...eslintRules.rules
    }

    return {
        name: 'enterprise/base',
        rules
    }
}

/**
 * Creates the overrides for the enterprise ESLint rules.
 *
 * @returns The overrides for the enterprise ESLint rules.
 */
const createEnterpriseOverrides = (): TSESLint.FlatConfig.ConfigArray => [
    {
        files: [
            'src/**/index.ts',
            'test/**/*.{ts,tsx,js,mjs,cjs}',
            '**/*.test.{ts,tsx,js}',
            '**/*.spec.{ts,tsx,js}'
        ],
        name: 'enterprise/overrides:tests-and-index',
        rules: { 'no-restricted-imports': 'off' }
    },
    {
        files: ['eslint.config.*'],
        name: 'enterprise/overrides:eslint-config-id-length',
        rules: { 'id-length': 'off' }
    }
]

/**
 * Creates the all enterprise ESLint rules.
 *
 * @returns The all enterprise ESLint rules.
 */
const createEnterpriseAll = (): TSESLint.FlatConfig.ConfigArray => [
    createEnterpriseBase(),
    ...createEnterpriseOverrides()
]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade ESLint rules based on Google/Microsoft/Meta standards.
     * Combines {@link https://github.com/eslint/eslint/tree/main/packages/eslint/eslint.js} all rules with additional enterprise-specific rules.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-eslint-config}
     */
    all: createEnterpriseAll(),

    /**
     * Base enterprise ESLint rules without file-specific overrides.
     */
    base: [createEnterpriseBase()],

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createEnterpriseAll(),

    /**
     * File-specific rule overrides for test files and index files.
     */
    overrides: createEnterpriseOverrides()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
