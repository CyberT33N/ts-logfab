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
import { configs as packageJsonConfigs } from 'eslint-plugin-package-json'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced Package.json rules configuration
const packageJsonRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== DISABLE ALL JSONC RULES FOR PACKAGE.JSON =====
         * Only eslint-plugin-package-json should handle package.json files
         */
        'jsonc/array-bracket-newline': 'off',
        'jsonc/array-bracket-spacing': 'off',
        'jsonc/array-element-newline': 'off',
        'jsonc/auto': 'off',
        'jsonc/comma-dangle': 'off',
        'jsonc/comma-style': 'off',
        'jsonc/indent': 'off',
        'jsonc/key-name-casing': 'off',
        'jsonc/key-spacing': 'off',
        'jsonc/no-bigint-literals': 'off',
        'jsonc/no-binary-numeric-literals': 'off',
        'jsonc/no-comments': 'off',
        'jsonc/no-dupe-keys': 'off',
        'jsonc/no-floating-decimal': 'off',
        'jsonc/no-hexadecimal-numeric-literals': 'off',
        'jsonc/no-infinity': 'off',
        'jsonc/no-irregular-whitespace': 'off',
        'jsonc/no-nan': 'off',
        'jsonc/no-numeric-separators': 'off',
        'jsonc/no-octal-escape': 'off',
        'jsonc/no-octal-numeric-literals': 'off',
        'jsonc/no-plus-sign': 'off',
        'jsonc/no-sparse-arrays': 'off',
        'jsonc/no-undefined-value': 'off',
        'jsonc/no-useless-escape': 'off',
        'jsonc/object-curly-newline': 'off',
        'jsonc/object-curly-spacing': 'off',
        'jsonc/object-property-newline': 'off',
        'jsonc/quote-props': 'off',
        'jsonc/quotes': 'off',
        'jsonc/sort-array-values': 'off',
        'jsonc/sort-keys': 'off',

        /*
         * ===== ENTERPRISE PACKAGE.JSON STANDARDS =====
         * Based on industry best practices for Node.js projects
         */
        // RECOMMENDED: Explicit file inclusion for security
        'package-json/no-redundant-files': 'error',

        // MANDATORY: Node.js version constraints for reproducible builds
        'package-json/require-author': 'error',

        // ===== ENTERPRISE SECURITY & COMPLIANCE =====
        'package-json/require-engines': 'error',

        // MANDATORY: Clear ownership and accountability
        'package-json/require-files': 'warn',

        // ===== METADATA COMPLETENESS =====
        'package-json/require-keywords': 'warn',

        /*
         * SECURITY: Prevent accidental sensitive data exposure
         * ===== DEPENDENCY MANAGEMENT EXCELLENCE =====
         */
        'package-json/restrict-dependency-ranges': [
            'error',
            [
                // BASE RULE: All dependencies should use tilde (~) for Enterprise-controlled updates
                {
                    rangeType: 'tilde'
                },

                // SECURITY: Pin unstable versions (0.x.x) for production dependencies
                {
                    forDependencyTypes: ['dependencies'],
                    forVersions: '<1',
                    rangeType: 'pin'
                },

                // FLEXIBILITY: Allow any valid range for peer dependencies
                {
                    forDependencyTypes: ['peerDependencies'],
                    rangeType: [
                        'caret',
                        'tilde',
                        'pin'
                    ]
                }
            ]
        ]
    }
}

/**
 * Creates the base Package.json configuration.
 *
 * @returns The base Package.json configuration.
 */
const createPackageJsonBase = (): TSESLint.FlatConfig.ConfigArray => [
    packageJsonConfigs.recommended,
    {
        files: ['**/package.json'],
        name: 'enterprise/package-json-overrides',
        rules: packageJsonRules.rules
    }
]

/**
 * Creates the complete Package.json configuration.
 *
 * @returns The complete Package.json configuration.
 */
const createPackageJsonAll = (): TSESLint.FlatConfig.ConfigArray => createPackageJsonBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Package.json Configuration based on Node.js best practices.
     * Combines package.json validation with JSONC rule overrides for package.json files.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-package-json-config}
     */
    all: createPackageJsonAll(),

    /**
     * Base Package.json configuration without additional overrides.
     */
    base: createPackageJsonBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    recommended: createPackageJsonAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
