import type { TSESLint } from '@typescript-eslint/utils'

export const wcagLevelA = {
    // ===== WCAG 2.1 LEVEL A (MANDATORY) =====
    'jsx-a11y/alt-text': [
        'error',
        {
            area: [],
            elements: [
                'img',
                'object',
                'area',
                'input[type="image"]'
            ],
            img: [],
            'input[type="image"]': [],
            object: []
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
