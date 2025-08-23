import type { TSESLint } from '@typescript-eslint/utils'

export const formRules = {
    // ===== WCAG 2.1 LEVEL AA (ENTERPRISE STANDARD) =====
    'jsx-a11y/autocomplete-valid': [
        'error',
        {
            inputComponents: [
                'Input',
                'TextField',
                'TextInput'
            ]
        }
    ],

    // ===== FORM ACCESSIBILITY =====
    'jsx-a11y/control-has-associated-label': [
        'error',
        {
            controlComponents: [
                'Button',
                'IconButton'
            ],
            depth: 3,
            ignoreElements: [
                'audio',
                'canvas',
                'embed',
                'input',
                'textarea',
                'tr',
                'video'
            ],
            ignoreRoles: [
                'grid',
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'row',
                'tablist',
                'toolbar',
                'tree',
                'treegrid'
            ]
        }
    ],

    'jsx-a11y/label-has-associated-control': [
        'error',
        {
            assert: 'either',
            controlComponents: [
                'Input',
                'Select',
                'TextArea',
                'TextField',
                'Checkbox',
                'Radio',
                'Switch'
            ],

            // Either nesting or htmlFor
            depth: 3,
            labelAttributes: ['label'],

            // Wie tief nach control component suchen
            labelComponents: [
                'Label',
                'FormLabel'
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
