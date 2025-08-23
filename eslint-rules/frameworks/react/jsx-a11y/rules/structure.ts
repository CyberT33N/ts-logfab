import type { TSESLint } from '@typescript-eslint/utils'

export const structureRules = {
    // Keine ARIA auf unsupported elements
    'jsx-a11y/heading-has-content': [
        'error',
        {
            components: [
                'Heading',
                'H1',
                'H2',
                'H3',
                'H4',
                'H5',
                'H6'
            ]
        }
    ],

    'jsx-a11y/html-has-lang': 'error',

    // Html element muss lang attribute haben
    'jsx-a11y/iframe-has-title': 'error',

    // Iframes brauchen title
    'jsx-a11y/img-redundant-alt': [
        'error',
        {
            components: [
                'Image',
                'Picture'
            ],
            words: [
                'image',
                'photo',
                'picture',
                'bild',
                'foto'
            ]
        }
    ],

    'jsx-a11y/lang': 'error'
} satisfies TSESLint.Linter.RulesRecord
