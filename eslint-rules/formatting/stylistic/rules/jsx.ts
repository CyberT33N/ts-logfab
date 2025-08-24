// ===== JSX / REACT SPECIFIC =====
import { ENTERPRISE_INDENT_SIZE, JSX_MAX_PROPS_PER_LINE } from '../constants'

import type { TSESLint } from '@typescript-eslint/utils'

export const jsxRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/jsx-child-element-spacing': ['error'],

    '@stylistic/jsx-closing-bracket-location': [
        'error',
        'line-aligned'
    ],

    '@stylistic/jsx-closing-tag-location': ['error'],

    '@stylistic/jsx-curly-brace-presence': [
        'error',
        {
            children: 'never',
            props: 'never'
        }
    ],

    '@stylistic/jsx-curly-newline': [
        'error',
        {
            multiline: 'consistent',
            singleline: 'forbid'
        }
    ],

    '@stylistic/jsx-curly-spacing': [
        'error',
        {
            children: true,
            when: 'never'
        }
    ],

    '@stylistic/jsx-equals-spacing': [
        'error',
        'never'
    ],

    '@stylistic/jsx-first-prop-new-line': [
        'error',
        'multiline'
    ],

    '@stylistic/jsx-function-call-newline': [
        'error',
        'multiline'
    ],

    '@stylistic/jsx-indent-props': [
        'error',
        ENTERPRISE_INDENT_SIZE
    ],

    '@stylistic/jsx-max-props-per-line': [
        'error',
        {
            maximum: JSX_MAX_PROPS_PER_LINE,
            when: 'multiline'
        }
    ],

    '@stylistic/jsx-one-expression-per-line': [
        'error',
        {
            allow: 'single-child'
        }
    ],

    '@stylistic/jsx-pascal-case': [
        'error',
        {
            allowAllCaps: false,
            allowNamespace: true
        }
    ],

    '@stylistic/jsx-props-no-multi-spaces': ['error'],

    '@stylistic/jsx-quotes': [
        'error',
        'prefer-double'
    ],

    '@stylistic/jsx-self-closing-comp': [
        'error',
        {
            component: true,
            html: true
        }
    ],

    '@stylistic/jsx-sort-props': [
        'error',
        {
            callbacksLast: true,
            ignoreCase: true,
            multiline: 'last',
            reservedFirst: true,
            shorthandFirst: true
        }
    ],

    '@stylistic/jsx-tag-spacing': [
        'error',
        {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never'
        }
    ],

    '@stylistic/jsx-wrap-multilines': [
        'error',
        {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'parens-new-line',
            declaration: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'ignore',
            propertyValue: 'parens-new-line',
            return: 'parens-new-line'
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
