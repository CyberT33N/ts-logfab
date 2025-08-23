/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== IMPORTS ====
import a11yPlugin from 'eslint-plugin-jsx-a11y'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

/*
 * ===== JSX ACCESSIBILITY (A11Y) RULES =====
 * Enterprise-Grade Accessibility Standards
 * Based on WCAG 2.1 AA, Google/Microsoft/Meta Accessibility Guidelines
 */
const jsxA11yRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
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
        ],

        /*
         * ===== DEPRECATED BUT STILL IN DOCS =====
         * 'jsx-a11y/accessible-emoji': 'off', // Deprecated - modern emoji sind accessible
         * 'jsx-a11y/label-has-for': 'off', // Deprecated - use label-has-associated-control
         * 'jsx-a11y/no-onchange': 'off', // Deprecated - onchange ist jetzt accessible
         */
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
        ],

        'jsx-a11y/anchor-has-content': [
            'error',
            {
                components: [
                    'Link',
                    'NavLink',
                    'RouterLink'
                ]
            }
        ],

        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                aspects: [
                    'noHref',
                    'invalidHref',
                    'preferButton'
                ],
                components: [
                    'Link',
                    'NavLink',
                    'RouterLink'
                ],
                specialLink: ['to', 'href']
            }
        ],

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

        'jsx-a11y/aria-unsupported-elements': 'error',

        /*
         * Kein tabindex > 0 (stört keyboard navigation)
         * ===== WCAG 2.1 LEVEL AA (ENTERPRISE STANDARD) =====
         */
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

        /*
         * Focusable elements nicht mit aria-hidden verstecken
         * ===== INTERACTION ACCESSIBILITY =====
         */
        'jsx-a11y/click-events-have-key-events': 'error',

        // ===== FORM ACCESSIBILITY =====
        'jsx-a11y/control-has-associated-label': [
            'error',
            {
                controlComponents: ['Button', 'IconButton'],
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
                components: ['Image', 'Picture'],
                words: [
                    'image',
                    'photo',
                    'picture',
                    'bild',
                    'foto'
                ]
            }
        ],

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
                labelComponents: ['Label', 'FormLabel']
            }
        ],

        'jsx-a11y/lang': 'error',

        /*
         * Semantic HTML > ARIA roles
         * ===== MEDIA ACCESSIBILITY =====
         */
        'jsx-a11y/media-has-caption': [
            'error',
            {
                audio: ['Audio'],
                track: ['Track'],
                video: ['Video']
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

        // ===== FOCUS MANAGEMENT =====
        'jsx-a11y/no-autofocus': [
            'warn',
            {
                ignoreNonDOM: true
            }
        ],

        // AccessKey conflicts mit Screen Reader shortcuts
        'jsx-a11y/no-distracting-elements': [
            'error',
            {
                elements: ['marquee', 'blink']
            }
        ],

        'jsx-a11y/no-interactive-element-to-noninteractive-role': [
            'error',
            {
                canvas: ['img'],

                // Canvas kann als img behandelt werden
                tr: ['none', 'presentation']
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
                body: ['onError', 'onLoad'],
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
                iframe: ['onError', 'onLoad'],
                img: ['onError', 'onLoad']
            }
        ],

        // ===== SEMANTIC HTML ENFORCEMENT =====
        'jsx-a11y/no-noninteractive-element-to-interactive-role': [
            'error',
            {
                fieldset: ['radiogroup', 'presentation'],
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

        // Warn level - manchmal für UX notwendig
        'jsx-a11y/no-noninteractive-tabindex': [
            'error',
            {
                allowExpressionValues: true,
                roles: ['tabpanel', 'dialog'],
                tags: []
            }
        ],

        'jsx-a11y/no-redundant-roles': [
            'error',
            {
                nav: ['navigation']

                // Weitere redundante roles werden automatisch erkannt
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
        ],

        'jsx-a11y/prefer-tag-over-role': 'error',

        'jsx-a11y/role-has-required-aria-props': 'error',

        // Roles brauchen required ARIA props
        'jsx-a11y/role-supports-aria-props': 'error',

        // Nur supported ARIA props für roles
        'jsx-a11y/scope': 'error',

        /*
         * Scope nur auf th elements
         * Warn level - manchmal design requirements
         */
        'jsx-a11y/tabindex-no-positive': 'error'
    }
}

// JSX A11Y settings configuration
const jsxA11ySettings = {
    'jsx-a11y': {

        // Attribute Mapping für verschiedene Prop-Namen
        attributes: {
            for: ['htmlFor', 'for'],
            id: ['id', 'htmlId']
        },

        // Custom Component Mapping für Enterprise UI Libraries
        components: {

            ActionButton: 'button',

            Article: 'article',

            Aside: 'aside',

            Audio: 'audio',

            // Buttons
            Button: 'button',

            Checkbox: 'input',

            Dropdown: 'select',

            ExternalLink: 'a',

            Fab: 'button',

            FloatingActionButton: 'button',

            Footer: 'footer',

            FormField: 'input',

            Header: 'header',

            IconButton: 'button',

            // Media
            Image: 'img',

            // Form Controls
            Input: 'input',

            // Links
            Link: 'a',

            // Lists
            List: 'ul',

            ListItem: 'li',

            Main: 'main',

            // Structure
            Nav: 'nav',

            NavLink: 'a',

            Navigation: 'nav',

            NumberInput: 'input',

            OrderedList: 'ol',

            Picture: 'img',

            PrimaryButton: 'button',

            Radio: 'input',

            RouterLink: 'a',

            SecondaryButton: 'button',

            Section: 'section',

            Select: 'select',

            SubmitButton: 'button',

            Switch: 'input',

            // Tables
            Table: 'table',

            TableCell: 'td',

            TableHeader: 'th',

            TableRow: 'tr',

            TextArea: 'textarea',

            TextField: 'input',
            TextInput: 'input',
            Toggle: 'input',
            Video: 'video'
        },

        // Polymorphe Komponenten-Unterstützung (Material-UI, Chakra UI, etc.)
        polymorphicPropName: 'as'
    }
}

/**
 * Creates the base JSX A11Y configuration.
 * @returns The base JSX A11Y configuration.
 */
const createJsxA11yBase = (): TSESLint.FlatConfig.ConfigArray => [
    a11yPlugin.flatConfigs.strict,
    {
        name: 'enterprise/frameworks/react/jsx-a11y-overrides',
        rules: jsxA11yRules.rules,
        settings: jsxA11ySettings
    }
]

/**
 * Creates the complete JSX A11Y configuration.
 * @returns The complete JSX A11Y configuration.
 */
const createJsxA11yAll = (): TSESLint.FlatConfig.ConfigArray => createJsxA11yBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade JSX Accessibility Configuration based on WCAG 2.1 AA standards.
     * Based on Google/Microsoft/Meta Accessibility Guidelines for enterprise-grade web applications.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-jsx-a11y-config}
     */
    all: createJsxA11yAll(),

    /**
     * Base JSX A11Y configuration without additional overrides.
     */
    base: createJsxA11yBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createJsxA11yAll()

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
