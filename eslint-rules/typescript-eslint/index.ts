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
import { configs as tseslintConfigs } from 'typescript-eslint'

// ==== TYPES ====
import {
    asyncAndPromisesRules,
    baseProhibitionsAndCoreRules,
    classAndMembersRules,
    collectionsAndExpressionsRules,
    enumsAndControlFlowRules,
    modernSyntaxAndPreferencesRules,
    namingAndIdentifiersRules,
    typesAndSafetyRules
} from './rules'

import type { TSESLint } from '@typescript-eslint/utils'

/**
 * ===== TYPESCRIPT-ESLINT CONFIGURATIONS =====
 * Include ALL strict TypeScript rules (includes recommended).
 */
const typescriptStrictAndStylistic: TSESLint.FlatConfig.ConfigArray = [
    ...tseslintConfigs.strictTypeChecked,
    ...tseslintConfigs.stylisticTypeChecked
]

// ===== ADDITIONAL TYPESCRIPT RULES =====
export const additionalTypescriptRulesConfig: TSESLint.FlatConfig.Config = {
    files: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.mts',
        '**/*.cts'
    ],
    rules: {
        ...baseProhibitionsAndCoreRules,
        ...classAndMembersRules,
        ...modernSyntaxAndPreferencesRules,
        ...namingAndIdentifiersRules,
        ...typesAndSafetyRules,
        ...collectionsAndExpressionsRules,
        ...asyncAndPromisesRules,
        ...enumsAndControlFlowRules
    }
}

/**
 * Creates overrides for TypeScript-ESLint to exclude non-TS data files.
 *
 * @returns The overrides configuration array.
 */
const createTypescriptEslintOverrides = (): TSESLint.FlatConfig.ConfigArray => [
    {
        files: [
            '**/*.json',
            '**/*.jsonc',
            '**/*.json5'
        ],
        name: 'typescript-eslint/overrides:exclude-json',
        ...tseslintConfigs.disableTypeChecked
    }
]

/**
 * Creates a configuration array for TypeScript-ESLint with all rules.
 *
 * @returns The configuration array.
 */
const createTypescriptEslintAll = (): TSESLint.FlatConfig.ConfigArray => [
    ...typescriptStrictAndStylistic,
    additionalTypescriptRulesConfig,
    ...createTypescriptEslintOverrides()
]

export const configs = {
    /**
     * Enterprise-grade TypeScript-ESLint configuration with type-checked rules, parser settings,
     * TypeScript sort-keys integration, and additional enterprise rules.
     */
    all: createTypescriptEslintAll(),

    /**
     * Base configuration without additional overrides.
     */
    base: createTypescriptEslintAll(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createTypescriptEslintAll(),

    /**
     * File-specific overrides (e.g., excluding JSON/JSONC from typed rules).
     */
    overrides: createTypescriptEslintOverrides()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
