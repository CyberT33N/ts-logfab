import type { TSESLint } from '@typescript-eslint/utils'

export const ariaRules = {
    // ===== ARIA BEST PRACTICES =====
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    'jsx-a11y/aria-props': 'error',

    // ARIA attributes müssen korrekt sein
    'jsx-a11y/aria-proptypes': 'error',

    // ARIA prop values müssen valid sein
    'jsx-a11y/aria-role': [
        'error',
        {
            allowedInvalidRoles: [],

            // Keine invaliden Roles erlaubt
            ignoreNonDOM: true
        }
    ],

    'jsx-a11y/aria-unsupported-elements': 'error'
} satisfies TSESLint.Linter.RulesRecord
