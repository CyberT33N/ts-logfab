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

export const modernSyntaxAndPreferencesRules: TSESLint.Linter.RulesRecord = {
    /*
     * Performance: Verhindert Side Effects bei Type Imports
     * ✅ ==== VERIFIED ====
     */
    '@typescript-eslint/consistent-type-exports': 'error',

    // Konsistente Type Exports
    /*
     * ✅ ==== VERIFIED ====
     * ✅ Erzwingt Konsistenz in TypeScript und steuert den Auto-Fixer.
     *    prefer: 'type-imports'          → immer `import type` statt Wert-Import für Typen.
     *    fixStyle: 'separate-type-imports' → separater Top-Level-Block für Typen (kein Inline-Mixing).
     */
    '@typescript-eslint/consistent-type-imports': [
        'error',
        {
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports'
        }
    ],

    /*
     * Verhindert redundante Zuweisungen
     * Import/Export Hygiene (Google/Microsoft Standards)
     * ✅ ==== VERIFIED ====
     */
    '@typescript-eslint/no-import-type-side-effects': 'error',

    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-readonly-parameter-types': 'error'
} satisfies TSESLint.Linter.RulesRecord
