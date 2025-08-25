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

export const namingAndIdentifiersRules: TSESLint.Linter.RulesRecord = {
    /*
     * Disabled to allow bracket notation for private method testing
     * ✅ ==== VERIFIED ====
     */
    '@typescript-eslint/naming-convention': [
        'error',

        // ===== BIG TECH ENTERPRISE STANDARDS (Google, Meta, Microsoft) =====

        // 🚫 KRITISCH: Verbiete I-Prefix für Interfaces (veraltetes Anti-Pattern)
        {
            custom: {
                match: false,
                regex: '^I[A-Z]'
            },
            format: ['PascalCase'],
            selector: 'interface'
        },

        // 🚫 KRITISCH: Verbiete E-Prefix für Enums (veraltetes Anti-Pattern)
        {
            custom: {
                match: false,
                regex: '^E[A-Z]'
            },
            format: ['PascalCase'],
            selector: 'enum'
        },

        // ✅ Type-Like (Interfaces, Classes, Types, Enums) - PascalCase
        {
            format: ['PascalCase'],
            selector: 'typeLike'
        },

        // ✅ Type Parameters (Generics) - T-Prefix (Google/MS Standard)
        {
            format: ['PascalCase'],
            prefix: ['T'],
            selector: 'typeParameter'
        },

        // 🚀 MODERN ONLY: # Private Fields (ECMA Standard) - Enterprise Future
        {
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            modifiers: ['#private'],
            selector: 'classProperty'
        },

        // 🚀 MODERN ONLY: # Private Methods (ECMA Standard)
        {
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            modifiers: ['#private'],
            selector: 'classMethod'
        },

        // 🚫 VERBIETE Legacy underscore für private (erzwinge # private fields)
        {
            custom: {
                match: false,
                regex: '^_'
            },
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            modifiers: ['private'],
            selector: 'memberLike'
        },

        // ✅ Protected Members - underscore optional
        {
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            modifiers: ['protected'],
            selector: 'memberLike'
        },

        // ✅ Static Readonly Constants - UPPER_CASE (Google Standard)
        {
            format: ['UPPER_CASE'],
            modifiers: [
                'static',
                'readonly'
            ],
            selector: 'classProperty'
        },

        // ✅ Global Primitive Constants - UPPER_CASE (Google/Meta Standard)
        {
            format: ['UPPER_CASE'],
            modifiers: [
                'const',
                'global'
            ],
            selector: 'variable',
            types: [
                'string',
                'number',
                'boolean'
            ]
        },

        // ✅ Global Function Constants - camelCase (Enterprise Standard)
        {
            format: ['camelCase'],
            modifiers: [
                'const',
                'global'
            ],
            selector: 'variable',
            types: ['function']
        },

        // ✅ Enum Members - PascalCase (Meta/React Standard)
        {
            format: [
                'PascalCase',
                'UPPER_CASE'
            ],
            selector: 'enumMember'
        },

        // ✅ Boolean Variables - Verb Prefixes (Google Best Practice)
        {
            filter: {
                match: false,

                // Erlaube auch normale camelCase für destructured oder spezielle Fälle
                regex: '^(__|_)'
            },
            format: ['PascalCase'],
            prefix: [
                'is',
                'has',
                'can',
                'should',
                'will',
                'did',
                'does',
                'was',
                'were'
            ],
            selector: 'variable',
            types: ['boolean']
        },

        // ✅ Variables - camelCase oder UPPER_CASE
        {
            format: [
                'camelCase',
                'UPPER_CASE'
            ],
            leadingUnderscore: 'allow',
            selector: 'variable'
        },

        // ✅ Functions - camelCase oder PascalCase (für React Components)
        {
            format: [
                'camelCase',
                'PascalCase'
            ],
            selector: 'function'
        },

        // ✅ Parameters - camelCase mit underscore erlaubt
        {
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            selector: 'parameter'
        },

        // ✅ Destructured Variables - flexible Naming (externe APIs)
        {
            format: null,
            modifiers: ['destructured'],
            selector: 'variable'
        },

        // ✅ Object/Type Properties - verschiedene Formate für externe Libraries (Zod, etc.)
        {
            format: [
                'camelCase',
                'snake_case',
                'PascalCase'
            ],
            leadingUnderscore: 'allow',
            selector: [
                'objectLiteralProperty',
                'typeProperty'
            ]
        },

        // ✅ Properties die Quotes brauchen - keine Format-Checks
        {
            format: null,
            modifiers: ['requiresQuotes'],
            selector: [
                'classProperty',
                'objectLiteralProperty',
                'typeProperty',
                'classMethod',
                'objectLiteralMethod',
                'typeMethod',
                'accessor',
                'enumMember'
            ]
        },

        // ✅ Default Fallback - camelCase
        {
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            selector: 'default',
            trailingUnderscore: 'forbid'
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
