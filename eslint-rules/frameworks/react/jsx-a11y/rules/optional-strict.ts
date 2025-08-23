import type { TSESLint } from '@typescript-eslint/utils'

export const optionalStrict = {
    // ===== OPTIONAL STRICT RULES (Consider for AAA compliance) =====
    'jsx-a11y/anchor-ambiguous-text': [
        'warn',
        {
            words: [
                'click here',
                'here',
                'link',
                'a link',
                'learn more',
                'more',
                'read more',
                'mehr',
                'hier',
                'klicken'
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
