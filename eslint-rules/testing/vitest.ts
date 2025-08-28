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
import vitest from 'eslint-plugin-vitest'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enterprise-grade Vitest rules configuration
const vitestRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== ENTERPRISE REGEL-ANPASSUNGEN (Überschreibt vitest.configs.all) =====
         * HINWEIS: vitest.configs.all setzt alle Regeln auf 'warn' (🌐)
         * Wir upgraden kritische Regeln auf 'error' und konfigurieren Enterprise-Standards
         */

        // ===== TEST STRUCTURE & ORGANIZATION (Google Testing Standards) =====
        'vitest/consistent-test-filename': [
            'error',
            {
                pattern: String.raw`\.(test|spec)\.[jt]sx?$`
            }
        ],
        'vitest/consistent-test-it': [
            'error',
            {
                // Google/MS Standard: 'test' über 'it'
                fn: 'test',
                withinDescribe: 'test'
            }
        ],

        // ===== TEST QUALITY & ASSERTIONS =====
        'vitest/expect-expect': [
            'error',
            {
                // Type assertions
                additionalTestBlockFunctions: [
                    'test.concurrent',
                    'test.each',
                    'test.failing'
                ],
                assertFunctionNames: [
                    'expect',
                    'assert',
                    'expectTypeOf'
                ]
            }
        ],

        'vitest/max-expects': [
            'error',
            {
                // Strenger als default
                max: 5
            }
        ],

        // Upgrade von warn zu error
        'vitest/max-nested-describe': [
            'error',
            {
                // Maximum 3 Ebenen (default ist höher)
                max: 3
            }
        ],

        'vitest/no-alias-methods': 'error',

        // War warn in all
        'vitest/no-commented-out-tests': 'error',

        // ===== UPGRADES VON WARN ZU ERROR (Enterprise Critical) =====
        'vitest/no-conditional-expect': 'error',

        // War warn in all
        'vitest/no-conditional-in-test': 'error',

        // War warn in all
        'vitest/no-conditional-tests': 'error',

        // Team-spezifisch
        'vitest/no-disabled-tests': 'warn',

        /*
         * Bleibt warn für Flexibilität
         * ===== DEPRECATED REGEL EXPLIZIT AUS =====
         */
        'vitest/no-done-callback': 'off',

        // War warn in all
        'vitest/no-duplicate-hooks': 'error',

        // War warn in all
        'vitest/no-focused-tests': 'error',

        // Zu restriktiv
        'vitest/no-hooks': 'off',

        'vitest/no-identical-title': 'error',

        // Recommended only
        'vitest/no-import-node-test': 'error',

        // War warn in all
        'vitest/no-interpolation-in-snapshots': 'error',

        'vitest/no-large-snapshots': [
            'error',
            {
                inlineMaxSize: 10,

                // Strenger als default warn
                maxSize: 50
            }
        ],

        // War warn in all
        'vitest/no-mocks-import': 'error',

        // 'test' prefix ist okay
        'vitest/no-restricted-matchers': 'off',

        /*
         * War warn in all
         * ===== ENTERPRISE-SPEZIFISCHE KONFIGURATIONEN =====
         */
        'vitest/no-restricted-vi-methods': [
            'error',
            {
                'vi.resetModules': 'Use isolated test environments instead',
                'vi.unmock': 'Use explicit mock restoration in afterEach'
            }
        ],

        // War warn in all
        'vitest/no-standalone-expect': 'error',

        // Hooks sind notwendig
        'vitest/no-test-prefixes': 'off',

        // War warn in all
        'vitest/no-test-return-statement': 'error',

        'vitest/prefer-called-with': 'error',

        'vitest/prefer-comparison-matcher': 'error',

        /*
         * Enterprise: Snapshot hints für bessere Test-Dokumentation
         * ===== MATCHER PREFERENCES (Alle von warn zu error) =====
         */
        'vitest/prefer-each': 'error',

        'vitest/prefer-equality-matcher': 'error',

        // ===== EXPLIZIT DEAKTIVIERTE REGELN (Zu restriktiv) =====
        'vitest/prefer-expect-assertions': 'off',

        // War warn in all
        'vitest/prefer-hooks-in-order': 'error',

        // War warn in all
        'vitest/prefer-hooks-on-top': 'error',

        'vitest/prefer-lowercase-title': [
            'error',
            {
                // Describe darf PascalCase
                ignore: ['describe']
            }
        ],

        // War warn in all
        'vitest/prefer-mock-promise-shorthand': 'error',

        'vitest/prefer-snapshot-hint': 'error',

        // War warn in all
        'vitest/prefer-spy-on': 'error',

        'vitest/prefer-strict-equal': 'error',

        'vitest/prefer-to-be': 'error',

        'vitest/prefer-to-be-falsy': 'error',

        'vitest/prefer-to-be-object': 'error',

        'vitest/prefer-to-be-truthy': 'error',

        'vitest/prefer-to-contain': 'error',

        'vitest/prefer-to-have-length': 'error',

        'vitest/prefer-todo': 'error',

        // War warn in all
        'vitest/require-hook': 'error',

        // Recommended only
        'vitest/require-to-throw-message': 'error',

        'vitest/require-top-level-describe': 'error',

        'vitest/valid-expect': [
            'error',
            {
                alwaysAwait: true,
                maxArgs: 2,
                minArgs: 1
            }
        ],

        // ✅ ==== VERIFIED ====
        'vitest/valid-title': [
            'error',
            {
                mustMatch: {
                    describe: String.raw`^(?:[A-Z]\w*|when |with |without )`,
                    test: String.raw`^(?:returns|throws|calls|handles|processes|validates|transforms|creates|updates|deletes)`
                },
                mustNotMatch: {
                    // Google style
                    describe: String.raw`^(?:should|must|can)`,
                    it: String.raw`^(?:should|must|can)`,
                    test: String.raw`^(?:should|must|can)`
                }
            }
        ]
    }
}

/**
 * Creates the base Vitest testing configuration.
 *
 * @returns The base Vitest testing configuration.
 */
const createVitestBase = (): TSESLint.FlatConfig.Config => {
    const rules: TSESLint.Linter.RulesRecord = {
        ...vitest.configs.all.rules,
        ...vitestRules.rules
    }

    return {
        name: 'enterprise/testing/vitest-base',
        ...vitest.configs.all,
        files: [
            '**/*.test.{ts,tsx,js,jsx}',
            '**/*.spec.{ts,tsx,js,jsx}',
            '**/*.suite.{ts,tsx,js,jsx}',
            '**/*.spec.shared.{ts,tsx,js,jsx}',
            '**/*.test.shared.{ts,tsx,js,jsx}'
        ],
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals
            }
        },
        plugins: {
            vitest
        },
        rules,
        settings: {
            vitest: {
                // Enable type-testing support for better type assertions
                typecheck: true
            }
        }
    }
}

/**
 * Creates the complete Vitest testing configuration.
 *
 * @returns The complete Vitest testing configuration.
 */
const createVitestAll = (): TSESLint.FlatConfig.ConfigArray => [createVitestBase()]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Vitest Testing Configuration based on Google Testing Blog,
     * Microsoft Testing Guidelines, and Meta Jest Best Practices.
     * Upgrades critical rules from warn to error and configures Enterprise-Standards.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-vitest-config}
     */
    all: createVitestAll(),

    /**
     * Base Vitest testing configuration without additional overrides.
     */
    base: [createVitestBase()],

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createVitestAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
