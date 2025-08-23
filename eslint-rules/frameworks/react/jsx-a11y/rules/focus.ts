import type { TSESLint } from '@typescript-eslint/utils'

export const focusRules = {
    // ===== FOCUS MANAGEMENT =====
    'jsx-a11y/no-autofocus': [
        'warn',
        {
            ignoreNonDOM: true
        }
    ],

    // Warn level - manchmal für UX notwendig
    'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
            allowExpressionValues: true,
            roles: [
                'tabpanel',
                'dialog'
            ],
            tags: []
        }
    ],

    /*
     * Scope nur auf th elements
     * Warn level - manchmal design requirements
     */
    'jsx-a11y/tabindex-no-positive': 'error'
} satisfies TSESLint.Linter.RulesRecord
