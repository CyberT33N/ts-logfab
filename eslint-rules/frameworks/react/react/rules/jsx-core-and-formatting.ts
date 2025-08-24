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

export const jsxCoreAndFormatting = {
    // Abgedeckt durch @stylistic/jsx-self-closing-comp
    'react/jsx-boolean-value': [
        'error',
        'never'
    ],

    // Zu restriktiv
    'react/jsx-child-element-spacing': 'off',

    /*
     * ===== JSX FORMATTING =====
     * WICHTIG: Alle JSX-Formatting-Regeln werden durch @stylistic/* abgedeckt
     * Diese React-spezifischen Formatting-Regeln sind deaktiviert, um Konflikte zu vermeiden
     */
    'react/jsx-closing-bracket-location': 'off',

    // Abgedeckt durch @stylistic/jsx-closing-bracket-location
    'react/jsx-closing-tag-location': 'off',

    'react/jsx-curly-brace-presence': 'off',

    // Abgedeckt durch @stylistic/jsx-wrap-multilines
    'react/jsx-curly-spacing': 'off',

    // Abgedeckt durch @stylistic/jsx-curly-spacing
    'react/jsx-equals-spacing': 'off',

    // Edge cases existieren
    'react/jsx-filename-extension': 'off',

    // Abgedeckt durch @stylistic/jsx-closing-tag-location
    'react/jsx-first-prop-new-line': 'off',

    // Abgedeckt durch @stylistic/jsx-pascal-case
    'react/jsx-fragments': [
        'error',
        'syntax'
    ],

    'react/jsx-handler-names': [
        'error',
        {
            // Zu restriktiv
            checkInlineFunction: false,

            checkLocalVariables: false,

            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on'
        }
    ],

    // Abgedeckt durch @stylistic/jsx-first-prop-new-line
    'react/jsx-indent': 'off',

    // Abgedeckt durch @stylistic/indent (JSX wird mit abgedeckt)
    'react/jsx-indent-props': 'off',

    'react/jsx-key': [
        'error',
        {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true
        }
    ],

    // Utility components oft in gleicher Datei
    'react/jsx-max-depth': 'off',

    // Abgedeckt durch @stylistic/jsx-indent-props
    'react/jsx-max-props-per-line': 'off',

    // .tsx ist Standard
    'react/jsx-newline': 'off',

    // SetState manchmal notwendig
    'react/jsx-no-bind': 'off',

    'react/jsx-no-comment-textnodes': 'error',

    'react/jsx-no-constructed-context-values': 'error',

    'react/jsx-no-duplicate-props': [
        'error',
        {
            ignoreCase: true
        }
    ],

    'react/jsx-no-leaked-render': [
        'error',
        {
            validStrategies: [
                'coerce',
                'ternary'
            ]
        }
    ],

    // Zu arbiträr
    'react/jsx-no-literals': 'off',

    'react/jsx-no-script-url': 'error',

    // ===== SECURITY & BUG PREVENTION (CRITICAL) =====
    'react/jsx-no-target-blank': [
        'error',
        {
            enforceDynamicLinks: 'always',
            warnOnSpreadAttributes: true
        }
    ],

    'react/jsx-no-undef': [
        'error',
        {
            allowGlobals: true
        }
    ],

    // Abgedeckt durch @stylistic/jsx-curly-brace-presence
    'react/jsx-no-useless-fragment': [
        'error',
        {
            allowExpressions: true
        }
    ],

    // Nicht nützlich mit TypeScript
    'react/jsx-one-expression-per-line': 'off',

    // ===== CODE QUALITY & CONSISTENCY =====
    'react/jsx-pascal-case': 'off',

    // Zu restriktiv für JSX
    'react/jsx-props-no-multi-spaces': 'off',

    // Zu opinion-based
    'react/jsx-props-no-spread-multi': 'off',

    // Zu opinion-based
    'react/jsx-props-no-spreading': 'off',

    // React 17+ JSX Transform
    'react/jsx-sort-default-props': 'off',

    // Mit TypeScript redundant
    'react/jsx-sort-props': 'off',

    // Prettier handled das
    'react/jsx-space-before-closing': 'off',

    // Abgedeckt durch @stylistic/jsx-max-props-per-line
    'react/jsx-tag-spacing': 'off',

    'react/jsx-uses-react': 'error',

    'react/jsx-uses-vars': 'error',

    // Abgedeckt durch @stylistic/jsx-tag-spacing
    'react/jsx-wrap-multilines': 'off'
} satisfies TSESLint.Linter.RulesRecord
