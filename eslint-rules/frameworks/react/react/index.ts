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
import reactPlugin from 'eslint-plugin-react'

// ==== TYPES ====
import {
    classPreferences,
    deprecationsAndTypos,
    disabledEnterpriseFlexibility,
    jsxCoreAndFormatting,
    lifecycleAndState,
    modernPatterns,
    namespaceObjectAndMiscDisables,
    performanceAndSafety,
    preludeAndOpinions,
    tsRedundantAndCompat
} from './rules'

import type { TSESLint } from '@typescript-eslint/utils'

// ==== RULE FRAGMENTS ====

// Enhanced React rules configuration (composed)
const reactRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        ...preludeAndOpinions,
        ...disabledEnterpriseFlexibility,
        ...modernPatterns,
        ...jsxCoreAndFormatting,
        ...lifecycleAndState,
        ...performanceAndSafety,
        ...deprecationsAndTypos,
        ...classPreferences,
        ...namespaceObjectAndMiscDisables,
        ...tsRedundantAndCompat
    }
}

// React settings configuration (verbatim preserved)
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
            'observer',
            'memo',
            'forwardRef',
            { property: 'styled' },
            { property: 'connect' }
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
 *
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
 *
 * @returns The complete React configuration.
 */
const createReactAll = (): TSESLint.FlatConfig.ConfigArray => createReactBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade React Configuration based on Google/Microsoft/Meta standards.
     * Combines modern React patterns with enterprise flexibility and TypeScript integration.
     *
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
