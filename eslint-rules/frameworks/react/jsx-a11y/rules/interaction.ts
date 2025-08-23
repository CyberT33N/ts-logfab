import type { TSESLint } from '@typescript-eslint/utils'

export const interactionRules = {
    'jsx-a11y/click-events-have-key-events': 'error',

    // Click handlers brauchen keyboard support
    'jsx-a11y/interactive-supports-focus': [
        'error',
        {
            tabbable: [
                'button',
                'checkbox',
                'link',
                'searchbox',
                'spinbutton',
                'switch',
                'textbox'
            ]
        }
    ],

    'jsx-a11y/mouse-events-have-key-events': [
        'error',
        {
            hoverInHandlers: [
                'onMouseOver',
                'onMouseEnter',
                'onPointerOver',
                'onPointerEnter'
            ],
            hoverOutHandlers: [
                'onMouseOut',
                'onMouseLeave',
                'onPointerOut',
                'onPointerLeave'
            ]
        }
    ],

    'jsx-a11y/no-access-key': 'error',

    // Lang attribute muss valid language code sein
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',

    // AccessKey conflicts mit Screen Reader shortcuts
    'jsx-a11y/no-distracting-elements': [
        'error',
        {
            elements: [
                'marquee',
                'blink'
            ]
        }
    ],

    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
            canvas: ['img'],

            // Canvas kann als img behandelt werden
            tr: [
                'none',
                'presentation'
            ]
        }
    ],

    // Elements mit aria-activedescendant müssen tabbable sein
    'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
            alert: [
                'onKeyUp',
                'onKeyDown',
                'onKeyPress'
            ],
            body: [
                'onError',
                'onLoad'
            ],
            dialog: [
                'onKeyUp',
                'onKeyDown',
                'onKeyPress'
            ],
            handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp'
            ],
            iframe: [
                'onError',
                'onLoad'
            ],
            img: [
                'onError',
                'onLoad'
            ]
        }
    ],

    'jsx-a11y/no-static-element-interactions': [
        'error',
        {
            allowExpressionValues: true,
            handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp'
            ]
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
