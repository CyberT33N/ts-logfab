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

export const statementRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/nonblock-statement-body-position': [
        'error',
        'below'
    ],

    /*
     * ✅ ==== VERIFIED ====
     * Padding between statements (Enterprise/OSS best practice)
     * Rationale: Klare visuelle Abschnitte erhöhen Lesbarkeit und Review‑Geschwindigkeit.
     * Anhaltswerte: Weit verbreitet in kuratierten ESLint‑Configs (Airbnb‑ähnlich),
     * große OSS‑Repos (Next.js, Vite, TypeScript/VS Code‑Extensions) trennen
     * Import‑Blöcke, Deklarationen, Kontrollfluss und Rückgaben durch Leerzeilen.
     */
    '@stylistic/padding-line-between-statements': [
        'error',

        // Directives: Leerzeile nach dem Prolog, keine zwischen mehreren Directives
        {
            blankLine: 'always',
            next: '*',
            prev: 'directive'
        },
        {
            blankLine: 'any',
            next: 'directive',
            prev: 'directive'
        },

        // Imports: Leerzeile nach Import‑Gruppe, keine zwischen Imports
        {
            blankLine: 'always',
            next: '*',
            prev: 'import'
        },
        {
            blankLine: 'any',
            next: 'import',
            prev: 'import'
        },
        {
            blankLine: 'always',
            next: '*',
            prev: [
                'const',
                'let',
                'var'
            ]
        },
        {
            blankLine: 'any',
            next: [
                'const',
                'let',
                'var'
            ],
            prev: [
                'const',
                'let',
                'var'
            ]
        },
        {
            blankLine: 'always',
            next: 'return',
            prev: '*'
        },

        // Kontrollfluss/Strukturen: Blöcke visuell absetzen (vor und nach)
        {
            blankLine: 'always',
            next: [
                'if',
                'for',
                'while',
                'switch',
                'try',
                'class',
                'function',
                'export'
            ],
            prev: '*'
        },
        {
            blankLine: 'always',
            next: '*',
            prev: [
                'if',
                'for',
                'while',
                'switch',
                'try',
                'class',
                'function',
                'export'
            ]
        },

        // Switch‑Zweige trennen (besser lesbare Fallblöcke)
        {
            blankLine: 'always',
            next: '*',
            prev: [
                'case',
                'default'
            ]
        },
        {
            blankLine: 'any',
            next: ['export'],
            prev: ['export']
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
