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
import sonarjs from 'eslint-plugin-sonarjs'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced SonarJS rules configuration
const sonarjsRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // Prüft implizite Dependencies
        'sonarjs/arguments-usage': 'error',

        // Erzwingt else-Block für Vollständigkeit
        'sonarjs/bool-param-default': 'error',

        /*
         * Verhindert unsichere 'arguments' Nutzung
         * ===== DEFENSIVE PROGRAMMING (Enterprise Best Practice) =====
         */
        'sonarjs/elseif-without-else': 'error',

        /*
         * ===== ENTERPRISE-CRITICAL COMPLEXITY RULES =====
         * 'sonarjs/cyclomatic-complexity': 'off', // REDUNDANT: Bereits durch ESLint Core 'complexity' abgedeckt
         * 'sonarjs/max-lines-per-function': 'off', // REDUNDANT: Bereits durch ESLint Core abgedeckt
         */
        /*
         * ===== CODE MAINTAINABILITY (Google/Microsoft Standards) =====
         * 'sonarjs/max-lines': ['error', { maximum: 400 }], // covered by eslint/max-lines
         */
        'sonarjs/expression-complexity': 'error',

        /*
         * Return direkt statt Variable
         * ===== FUNCTION DESIGN (Clean Code) =====
         */
        'sonarjs/function-name': [
            'error',
            {
                // CamelCase enforcement
                format: '^[a-z][a-zA-Z0-9]*$'
            }
        ],

        // Funktionen sollten nicht immer dasselbe returnen
        /*
         * ===== REACT SPECIFIC (Falls React verwendet wird) =====
         * Diese sind NICHT redundant mit react-plugin, da sie andere Aspekte prüfen
         */
        'sonarjs/jsx-no-leaked-render': 'error',

        // Keine verschachtelten switch
        'sonarjs/nested-control-flow': ['error', { maximumNestingLevel: 3 }],

        /*
         * Boolean Parameter brauchen Defaults
         * ===== CODE CLARITY & MODERN SYNTAX =====
         */
        'sonarjs/no-collapsible-if': 'error',

        // Verhindert überkomplexe Ausdrücke
        'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

        /*
         * Identische Funktionen verhindern
         * ===== LOOP & CONTROL FLOW SAFETY =====
         */
        'sonarjs/no-for-in-iterable': 'error',

        // Verhindert && mit non-boolean
        'sonarjs/no-hook-setter-in-body': 'error',

        // ===== TESTING BEST PRACTICES =====
        'sonarjs/no-identical-functions': 'error',

        /*
         * Variable naming conventions
         * ===== ASYNC/PROMISE PATTERNS =====
         */
        'sonarjs/no-ignored-return': 'error',

        /*
         * String darf max 2x vorkommen
         * ===== TYPE SAFETY & ARCHITECTURE =====
         */
        'sonarjs/no-implicit-dependencies': 'error',

        // Return values müssen verwendet werden
        'sonarjs/no-invariant-returns': 'error',

        // For...in nicht für Iterables
        'sonarjs/no-nested-switch': 'error',

        /*
         * ✅ UNIQUE: SonarJS-spezifische Regel
         * 'sonarjs/no-control-regex': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-control-character
         * ===== VARIABLE & PARAMETER HYGIENE =====
         */
        'sonarjs/no-parameter-reassignment': 'error',

        // Moderne Object-Literal Syntax
        'sonarjs/prefer-immediate-return': 'error',

        // Vereinfacht verschachtelte if-Statements
        'sonarjs/prefer-object-literal': 'error',

        // Max 3 Ebenen Verschachtelung
        /*
         * ===== REGEX SAFETY (Performance & Security) =====
         * ENTERPRISE: regexp Plugin hat spezialisiertere Regex-Prüfungen
         * 'sonarjs/no-empty-character-class': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-empty-character-class
         */
        'sonarjs/single-char-in-character-classes': 'error',

        /*
         * Parameter Reassignment verhindern
         * UseState nicht direkt in render
         */
        'sonarjs/variable-name': 'error'
    }
}

/**
 * Creates the base SonarJS configuration.
 * @returns The base SonarJS configuration.
 */
const createSonarjsBase = (): TSESLint.FlatConfig.ConfigArray => [
    sonarjs.configs.recommended,
    {
        name: 'enterprise/clean-code/sonarjs-overrides',
        rules: sonarjsRules.rules
    }
]

/**
 * Creates the complete SonarJS configuration.
 * @returns The complete SonarJS configuration.
 */
const createSonarjsAll = (): TSESLint.FlatConfig.ConfigArray => createSonarjsBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade SonarJS Configuration based on Google/Microsoft/Meta standards.
     * Combines clean code principles with code quality and maintainability standards.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-sonarjs-config}
     */
    all: createSonarjsAll(),

    /**
     * Base SonarJS configuration without additional overrides.
     */
    base: createSonarjsBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createSonarjsAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
