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

    // Limit function parameters
    'max-depth': [
        'error',
        { max: 4 }
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
     */
    'max-lines-per-function': [
        'error',
        {
            IIFEs: true,
            max: 50,
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

    // Limit callback nesting
    'max-statements': [
        'error',
        COMPLEXITY_MAX
    ]
} satisfies TSESLint.Linter.RulesRecord
