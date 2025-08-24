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
import type { TSESLint } from '@typescript-eslint/utils'

// Modern syntax and preference rules
export const modernSyntaxAndPreferences = {

    // ❌ REDUNDANT: Übernommen von import/no-duplicates hat mehr Features (inline types, query strings)
    'no-duplicate-imports': 'off',

    /*
     * ✅ ==== VERIFIED ====
     * Kernregel: Zeilenumbrüche in Imports erst ab N Specifiers
     */
    'object-curly-newline': 'off',

    'one-var': [
        'error',
        'never'
    ],

    /*
     * 'space-before-function-paren': ['error', 'never'], // Migrated to @stylistic
     * 'padded-blocks': ['error', 'never'], // Migrated to @stylistic
     */
    'prefer-arrow-callback': [
        'error',
        {
            allowNamedFunctions: true
        }
    ],

    'prefer-const': [
        'error',
        {
            destructuring: 'all',
            ignoreReadBeforeAssign: false
        }
    ],

    // Object spread over Object.assign
    'prefer-exponentiation-operator': 'error',

    'prefer-named-capture-group': 'error',

    // Disallows __proto__ usage
    'prefer-object-has-own': 'error',

    /*
     * Modern Syntax Enforcement
     * ENTERPRISE: TypeScript Version versteht Type Narrowing besser
     * 'prefer-destructuring': ['error', {...}], // ❌ REDUNDANT: Übernommen von @typescript-eslint/prefer-destructuring
     * 'prefer-template': 'error', // Handled by unicorn/prefer-template-literal which is more powerful
     */
    'prefer-object-spread': 'error',

    // Use spread over .apply()
    'prefer-regex-literals': [
        'error',
        {
            // RegEx literals over new RegExp
            disallowRedundantWrapping: true
        }
    ],

    // Modern JavaScript Best Practices
    'prefer-rest-params': 'error',

    // Use ...args over arguments
    'prefer-spread': 'error',

    // Symbols must have descriptions
    radix: [
        'error',
        'always'
    ],

    // ParseInt must have radix
    'require-unicode-regexp': 'error',

    // ===== IMPORT SORTING CONFLICT RESOLUTION =====
    /*
     * ✅ ==== VERIFIED ====
     * Deaktiviert - Konflikt mit import/order. Verwenden import/order für vollständige Import-Kontrolle
     */
    'sort-imports': 'off',

    // Named groups in RegEx
    'symbol-description': 'error'
} satisfies TSESLint.Linter.RulesRecord
