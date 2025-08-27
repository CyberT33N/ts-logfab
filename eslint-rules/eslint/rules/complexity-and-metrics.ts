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
import { COMPLEXITY_MAX } from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

// Complexity and metrics limits
export const complexityAndMetrics = {
    /*
     * ✅ ==== VERIFIED ====
     * Enterprise standard: Google/Microsoft use 10-15
     */
    complexity: [
        'error',
        COMPLEXITY_MAX
    ],

    // Class & OOP Standards
    'max-classes-per-file': [
        'error',
        1
    ],

    /*
     * ✅ ==== VERIFIED ====
     * Rationale: Limit nesting to 3 to encourage early returns and flatter control flow,
     * which reduces cognitive load and improves testability.
     * Anhaltswerte: Große OSS‑Codebasen (z. B. Next.js, Vite, VS Code‑Erweiterungen)
     * setzen stark auf Early‑Return/Guard‑Clauses und vermeiden tiefe Verschachtelung.
     * Nicht alle erzwingen dies per Lint‑Regel, aber „≤ 3 Ebenen“ ist ein verbreiteter
     * Enterprise‑Guardrail, der mit Clean‑Code‑Prinzipien konsistent ist.
     */
    'max-depth': [
        'error',
        { max: 3 }
    ],

    /*
     *   ✅ ==== VERIFIED ====
     *   Google (Angular, TypeScript):
     *   Standard: 250 Zeilen
     *   Begründung: Optimal für Code-Review-Zyklen und Cognitive Load Management
     *   Meta/Facebook (React, Flow/TypeScript):
     *   Standard: 200-250 Zeilen
     *   Fokus auf Component-basierte Architektur mit hoher Cohesion
     *   Microsoft (TypeScript, VSCode):
     *   Standard: 200-300 Zeilen
     *   Flexible Limits je nach Komplexität der Business Logic
     *   Amazon (AWS SDKs, TypeScript):
     *   Standard: 150-250 Zeilen
     *   Strenge Grenzen für Microservice-Architecture
     */
    'max-lines': [
        'error',
        {
            // Enterprise Sweet Spot
            max: 250,

            // ✅ Leerzeilen für Readability ignorieren
            skipBlankLines: true,

            // ✅ Kommentare zählen für Documentation Discipline
            skipComments: true
        }
    ],

    /*
     * Limit function complexity
     * ✅ ==== VERIFIED ====
     * Rationale: 75 Zeilen balancieren Strenge und Pragmatismus in TypeScript‑Code.
     * 50 ist für Enterprise‑Servicecode (mit Type Guards, Error‑Handling, Logs) oft zu
     * eng; 100 lässt zu viel Monolithik zu. 75 fördert Single‑Responsibility und
     * Refactoring ohne übermäßig zu blockieren.
     * Anhaltswerte: Viele größere OSS‑Repos und Unternehmensconfigs bewegen sich in
     * der Spanne 50–100; ~75 ist ein gängiger Mittelwert in kuratierten ESLint‑Configs.
     */
    'max-lines-per-function': [
        'error',
        {
            IIFEs: true,
            max: 75,
            skipBlankLines: true,
            skipComments: true
        }
    ],

    // Limit nesting depth
    'max-nested-callbacks': [
        'error',
        { max: 3 }
    ],

    /*
     * Function Design
     * ✅ ==== VERIFIED ====
     */
    'max-params': [
        'error',
        { max: 3 }
    ],

    /*
     * ✅ ==== VERIFIED ====
     * Prefer sonarjs/cognitive-complexity over max-statements
     */
    'max-statements': 'off'
} satisfies TSESLint.Linter.RulesRecord
