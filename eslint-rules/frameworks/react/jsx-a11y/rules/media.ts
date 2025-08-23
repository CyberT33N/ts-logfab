import type { TSESLint } from '@typescript-eslint/utils'

export const mediaRules = {
    'jsx-a11y/media-has-caption': [
        'error',
        {
            audio: ['Audio'],
            track: ['Track'],
            video: ['Video']
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
