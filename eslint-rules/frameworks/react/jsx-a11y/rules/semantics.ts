import type { TSESLint } from '@typescript-eslint/utils'

export const semanticRules = {
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
            fieldset: [
                'radiogroup',
                'presentation'
            ],
            li: [
                'menuitem',
                'option',
                'row',
                'tab',
                'treeitem'
            ],
            ol: [
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'tablist',
                'tree',
                'treegrid'
            ],
            table: ['grid'],
            td: ['gridcell'],
            ul: [
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'tablist',
                'tree',
                'treegrid'
            ]
        }
    ],

    'jsx-a11y/no-redundant-roles': [
        'error',
        {
            nav: ['navigation']

            // Weitere redundante roles werden automatisch erkannt
        }
    ],

    'jsx-a11y/prefer-tag-over-role': 'error',

    'jsx-a11y/role-has-required-aria-props': 'error',

    // Roles brauchen required ARIA props
    'jsx-a11y/role-supports-aria-props': 'error',

    // Nur supported ARIA props für roles
    'jsx-a11y/scope': 'error'
} satisfies TSESLint.Linter.RulesRecord
