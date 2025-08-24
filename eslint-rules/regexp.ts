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
import { configs as regexpConfigs } from 'eslint-plugin-regexp'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced RegExp rules configuration
const regexpRules: {
    /**
     * Enterprise-grade Regular Expression Standards based on Google RE2,
     * Microsoft .NET Regex Guidelines, and Meta Pattern Standards.
     * Combines performance optimization, security (ReDoS prevention), and readability.
     */
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // Octal escapes manchmal nützlich
        'regexp/confusing-quantifier': 'warn',

        // Manche flags zur Klarheit ok
        'regexp/control-character-escape': 'warn',

        // /v flag zu neu
        'regexp/grapheme-string-literal': 'off',

        /*
         * [a-zA-Z] → [a-z]/i
         * ===== CONSISTENCY & STYLE (Google Style Guide) =====
         */
        'regexp/hexadecimal-escape': [
            'error',
            'never'
        ],

        'regexp/letter-case': [
            'error',
            {
                // Lowercase mit /i flag
                caseInsensitive: 'lowercase',

                // \u{1F600} mit Uppercase
                unicodeEscape: 'uppercase'
            }
        ],

        /*
         * ✅ ==== VERIFIED ====
         */
        'regexp/match-any': [
            'error',
            {
                // . mit /s flag für multiline matching
                allows: ['dotAll']
            }
        ],

        // Quadratische Moves verhindern
        'regexp/no-contradiction-with-assertion': 'error',

        // Logische Widersprüche
        'regexp/no-control-character': 'error',

        // ===== ERROR PREVENTION =====
        'regexp/no-empty-alternative': 'error',

        // (a|) ist verwirrend
        'regexp/no-empty-capturing-group': 'error',

        // () ohne Inhalt
        'regexp/no-empty-character-class': 'error',

        // [] matcht nichts
        'regexp/no-empty-group': 'error',

        // (?:) ist nutzlos
        'regexp/no-empty-lookarounds-assertion': 'error',

        // (?=) ist nutzlos
        'regexp/no-invalid-regexp': 'error',

        // Ungültige RegExp
        'regexp/no-lazy-ends': 'error',

        // $<name> in replace()
        'regexp/no-misleading-capturing-group': 'error',

        // Verwirrende Gruppen
        'regexp/no-misleading-unicode-character': 'error',

        // Multi-codepoint chars
        'regexp/no-obscure-range': 'error',

        // Match() für truthy check ist ok
        'regexp/no-octal': 'off',

        // A+?$ ist ineffizient
        'regexp/no-optional-assertion': 'error',

        // Lookarounds sind oft komplexer
        'regexp/no-standalone-backslash': 'error',

        /*
         * ===== PERFORMANCE & SECURITY (CRITICAL) =====
         * Diese Regeln verhindern ReDoS (Regular Expression Denial of Service)
         */

        /*
         * ✅ ==== VERIFIED ====
         */
        'regexp/no-super-linear-backtracking': [
            'error',
            { report: 'certain' }
        ],

        /*
         * ✅ ==== VERIFIED ====
         * Use it together with sonarjs/slow-regex
         */
        'regexp/no-super-linear-move': [
            'error',
            {
                ignorePartial: false,
                ignoreSticky: false,
                report: 'certain'
            }
        ],

        /*
         * A{0} ist nutzlos
         * ===== SPEZIELLE ANPASSUNGEN =====
         */
        'regexp/no-unused-capturing-group': [
            'error',
            {
                // Ungenutzte Gruppen entfernen, außer für named groups
                allowNamed: false
            }
        ],

        // ^? macht keinen Sinn
        'regexp/no-useless-assertions': 'error',

        // ^\b ist redundant
        'regexp/no-useless-backreference': 'error',

        // Nur Warnung, nicht Error
        'regexp/no-useless-flag': 'warn',

        // A+a* → a+
        'regexp/no-useless-lazy': 'error',

        // Unnötige non-greedy quantifiers
        'regexp/no-useless-quantifier': 'error',

        // A{1} → a
        'regexp/no-useless-range': 'error',

        // Referenz zu nicht-existenter Gruppe
        'regexp/no-zero-quantifier': 'error',

        /*
         * Sortiere Alternativen für Konsistenz
         * ===== BEST PRACTICES (Enterprise Consensus) =====
         */
        'regexp/optimal-lookaround-quantifier': 'error',

        // Optimierte Lookarounds
        'regexp/optimal-quantifier-concatenation': 'error',

        // [a-a] → a
        'regexp/prefer-character-class': 'error',

        // (a|b|c) → [abc]
        'regexp/prefer-d': 'error',

        // Einzelne \ sind Fehler
        'regexp/prefer-escape-replacement-dollar-char': 'error',

        // .groups ist optional
        'regexp/prefer-lookaround': 'off',

        // (?<name>...) für Klarheit
        'regexp/prefer-named-backreference': 'error',

        /*
         * Korrekte Unicode Property Nutzung
         * ===== WARTBARKEIT & LESBARKEIT (Meta Standards) =====
         */
        'regexp/prefer-named-capture-group': 'error',

        // \k<name> statt \1
        'regexp/prefer-named-replacement': 'error',

        // $$ in replace
        'regexp/prefer-predefined-assertion': 'error',

        // [A-z] ist verwirrend
        'regexp/prefer-quantifier': 'error',

        // A{1,} → a+
        'regexp/prefer-question-quantifier': 'error',

        // [a-zA-Z0-9_] → \w
        'regexp/prefer-range': 'error',

        // Zu spezifisch
        'regexp/prefer-regexp-exec': 'off',

        // Match() ist oft klarer
        'regexp/prefer-regexp-test': 'off',

        'regexp/prefer-result-array-groups': 'off',

        // [abcdef] → [a-f]
        'regexp/prefer-set-operation': 'error',

        // [0-9] → \d
        'regexp/prefer-w': 'error',

        /*
         * Strenge RegExp Validierung
         * ===== UNICODE & MODERN PATTERNS (Google/MS Standard) =====
         */
        'regexp/require-unicode-regexp': 'error',

        // /u flag ist Pflicht für Unicode
        'regexp/require-unicode-sets-regexp': 'off',

        // Moderne Set Operations
        'regexp/simplify-set-operations': 'error',

        // A{0,1} → a?
        'regexp/sort-alternatives': 'error',

        // ==== ✅ VERIFIED ====
        'regexp/sort-character-class-elements': [
            'error',
            {
                /*
                 * ✅ ENTERPRISE STANDARD: Default order optimiert für Readability & Security
                 * Folgt Google/Meta/Microsoft Standards für Character Class Organization
                 */
                order: [
                    // Whitespace (\s, \S) - grundlegendste Kategorie
                    String.raw`\s`,

                    // Word chars (\w, \W) - häufigste Verwendung
                    String.raw`\w`,

                    // Digits (\d, \D) - spezifischer als \w
                    String.raw`\d`,

                    // Unicode properties (\p{...}, \P{...}) - moderne Features
                    String.raw`\p`,
                    '*',

                    // Quoted sequences (\q{...}) - ES2024 Features
                    String.raw`\q`,

                    // Nested character classes - komplexeste Strukturen
                    '[]'
                ]
            }
        ],

        // Sortiere Zeichen in character classes
        'regexp/sort-flags': 'error',

        // Keine Control Characters
        'regexp/strict': 'error',

        // /v flag noch zu neu (ES2024)
        'regexp/unicode-escape': 'error',

        // \u{1F600} statt \uD83D\uDE00
        'regexp/unicode-property': 'error',

        /*
         * Vereinfache Set Ops
         * \n ist klarer als \x0a
         */
        'regexp/use-ignore-case': 'error'
    }
}

/**
 * Creates the base RegExp configuration.
 *
 * @returns The base RegExp configuration.
 */
const createRegExpBase = (): TSESLint.FlatConfig.Config => {
    const rules: TSESLint.Linter.RulesRecord = {
        ...regexpConfigs['flat/all'].rules,
        ...regexpRules.rules
    }

    return {
        name: 'enterprise/regexp/base',
        ...regexpConfigs['flat/all'],
        rules
    }
}

/**
 * Creates the complete RegExp configuration.
 *
 * @returns The complete RegExp configuration.
 */
const createRegExpAll = (): TSESLint.FlatConfig.ConfigArray => [createRegExpBase()]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Regular Expression Standards based on Google RE2,
     * Microsoft .NET Regex Guidelines, and Meta Pattern Standards.
     * Combines performance optimization, security (ReDoS prevention), and readability.
     */
    all: createRegExpAll(),

    /**
     * Base RegExp configuration without additional overrides.
     */
    base: [createRegExpBase()],

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createRegExpAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
