/* eslint-disable max-lines */
/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ██║   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== IMPORTS ====
import reactPlugin from 'eslint-plugin-react'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced React rules configuration  
const reactRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        // Nicht relevant mit TypeScript
        'react/boolean-prop-naming': 'off',

        /*
         * Abgedeckt durch @stylistic/jsx-equals-spacing
         * ===== ZUSÄTZLICHE ENTERPRISE STANDARDS =====
         */
        'react/button-has-type': [
            'error',
            {
                button: true,
                reset: true,
                submit: true
            }
        ],

        // Warn für graduelle Adoption
        'react/checked-requires-onchange-or-readonly': 'warn',

        // Zu opinion-based
        'react/default-props-match-prop-types': 'off',

        /*
         * ===== DISABLED RULES (ENTERPRISE FLEXIBILITY) =====
         * Diese Regeln sind aus flat.all übernommen, aber für Enterprise zu restriktiv
         */
        'react/destructuring-assignment': 'off',

        // TypeScript macht PropTypes obsolet
        'react/display-name': 'off',

        // Zu restriktiv
        'react/forbid-component-props': 'off',

        // Zu restriktiv
        'react/forbid-dom-props': 'off',

        // Zu restriktiv
        'react/forbid-elements': 'off',

        // Zu restriktiv
        'react/forbid-foreign-prop-types': 'off',

        // Zu arbiträr, moderne IDEs helfen
        'react/forbid-prop-types': 'off',

        'react/forward-ref-uses-ref': 'error',

        // ===== MODERN REACT PATTERNS =====
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function'
            }
        ],

        'react/hook-use-state': [
            'error',
            {
                allowDestructuredState: true
            }
        ],

        // Warn statt error - manchmal notwendig
        'react/iframe-missing-sandbox': 'warn',

        // Abgedeckt durch @stylistic/jsx-self-closing-comp
        'react/jsx-boolean-value': ['error', 'never'],

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
        'react/jsx-fragments': ['error', 'syntax'],

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
                validStrategies: ['coerce', 'ternary']
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
        'react/jsx-wrap-multilines': 'off',

        /*
         * Modern class fields
         * ===== LIFECYCLE & STATE MANAGEMENT =====
         */
        'react/no-access-state-in-setstate': 'error',

        // Nicht immer notwendig
        'react/no-adjacent-inline-elements': 'off',

        // ===== PERFORMANCE OPTIMIZATIONS =====
        'react/no-array-index-key': 'warn',

        // Prettier handled das
        'react/no-arrow-function-lifecycle': 'off',

        'react/no-children-prop': 'error',

        // Zu restriktiv
        'react/no-danger': 'warn',

        'react/no-danger-with-children': 'error',

        'react/no-deprecated': 'error',

        'react/no-did-mount-set-state': 'error',

        'react/no-did-update-set-state': 'error',

        'react/no-direct-mutation-state': 'error',

        'react/no-find-dom-node': 'error',

        // Moderne Patterns erlauben das
        'react/no-invalid-html-attribute': 'off',

        'react/no-is-mounted': 'error',

        // Zu restriktiv
        'react/no-multi-comp': 'off',

        // Spread patterns sind oft valid
        'react/no-namespace': 'off',

        // Zu viele false positives
        'react/no-object-type-as-default-prop': 'off',

        'react/no-redundant-should-component-update': 'error',

        'react/no-render-return-value': 'error',

        // Zu restriktiv für i18n
        'react/no-set-state': 'off',

        'react/no-string-refs': 'error',

        'react/no-this-in-sfc': 'error',

        'react/no-typos': 'error',

        'react/no-unescaped-entities': [
            'error',
            {
                forbid: [
                    '>',
                    '"',
                    '\'',
                    '}'
                ]
            }
        ],

        // Warn statt error für Flexibilität
        'react/no-unstable-nested-components': [
            'error',
            {
                allowAsProps: false
            }
        ],

        'react/no-unused-class-component-methods': 'error',

        'react/no-unused-prop-types': [
            'error',
            {
                skipShapeProps: true // Shape props oft nur teilweise genutzt
            }
        ],

        'react/no-unused-state': 'error',

        'react/no-will-update-set-state': 'error',

        'react/prefer-es6-class': ['error', 'always'],

        // TypeScript redundant
        'react/prefer-exact-props': 'off',

        // Namespaces manchmal nötig
        'react/prefer-read-only-props': 'off',

        'react/prefer-stateless-function': 'error',

        // Mit modernen Engines kein Performance-Problem
        'react/prop-types': 'off',

        // DevTools zeigen meist richtige Namen
        'react/react-in-jsx-scope': 'off',

        // Spreading oft nützlich
        'react/require-default-props': 'off',

        // Deprecated
        'react/require-optimization': 'off',

        // Prefer <> over React.Fragment
        'react/self-closing-comp': 'off',

        // Kein echter Mehrwert
        'react/sort-comp': 'off',

        // Deprecated
        'react/sort-default-props': 'off',

        // TypeScript handled das
        'react/sort-prop-types': 'off',

        'react/state-in-constructor': ['error', 'never'],

        'react/static-property-placement': ['error', 'static public field'],

        'react/style-prop-object': 'error',

        'react/void-dom-elements-no-children': 'error' // Warn für Flexibilität
    }
}

// React settings configuration
const reactSettings = {
    // PropTypes wrapper functions (for teams still using PropTypes)
    propWrapperFunctions: [
        'forbidExtraProps',
        {
            object: 'Object',
            property: 'freeze'
        },
        { property: 'myFavoriteWrapper' }
    ],

    react: {

        // Support for common HOCs and wrappers
        componentWrapperFunctions: [
            'observer', // MobX
            'memo', // React.memo
            'forwardRef', // React.forwardRef
            { property: 'styled' }, // Styled-components
            { property: 'connect' } // Redux
        ],

        // Enterprise settings for better component detection
        createClass: 'createReactClass',

        // Form component detection
        formComponents: [
            'Form',
            {
                formAttribute: 'onSubmit',
                name: 'Formik'
            }
        ],

        fragment: 'Fragment',

        // Link component detection
        linkComponents: [
            'Link',
            {
                linkAttribute: 'to',
                name: 'NavLink'
            },
            {
                linkAttribute: 'to',
                name: 'RouterLink'
            }
        ],

        pragma: 'React',

        version: 'detect'
    }
}

/**
 * Creates the base React configuration.
 * @returns The base React configuration.
 */
const createReactBase = (): TSESLint.FlatConfig.ConfigArray => [
    reactPlugin.configs.flat.all,
    {
        name: 'enterprise/frameworks/react/react-overrides',
        rules: reactRules.rules,
        settings: reactSettings
    }
]

/**
 * Creates the complete React configuration.
 * @returns The complete React configuration.  
 */
const createReactAll = (): TSESLint.FlatConfig.ConfigArray => createReactBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade React Configuration based on Google/Microsoft/Meta standards.
     * Combines modern React patterns with enterprise flexibility and TypeScript integration.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-react-config}
     */
    all: createReactAll(),

    /**
     * Base React configuration without additional overrides.
     */
    base: createReactBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createReactAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
