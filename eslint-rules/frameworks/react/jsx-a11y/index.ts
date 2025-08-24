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

// ==== RULE FRAGMENTS ====
import { anchorRules } from './rules/anchors'
import { ariaRules } from './rules/aria'
import { focusRules } from './rules/focus'
import { formRules } from './rules/forms'
import { interactionRules } from './rules/interaction'
import { mediaRules } from './rules/media'
import { optionalStrict } from './rules/optional-strict'
import { semanticRules } from './rules/semantics'
import { structureRules } from './rules/structure'
import { wcagLevelA } from './rules/wcag-level-a'

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
        ...wcagLevelA,

        // ===== OPTIONAL STRICT RULES (Consider for AAA compliance) =====
        ...optionalStrict,

        ...anchorRules,

        // ===== ARIA BEST PRACTICES =====
        ...ariaRules,

        /*
         * Kein tabindex > 0 (stört keyboard navigation)
         * ===== WCAG 2.1 LEVEL AA (ENTERPRISE STANDARD) =====
         */
        ...formRules,

        /*
         * Focusable elements nicht mit aria-hidden verstecken
         * ===== INTERACTION ACCESSIBILITY =====
         */
        ...interactionRules,

        // ===== FORM ACCESSIBILITY =====
        ...structureRules,

        /*
         * Semantic HTML > ARIA roles
         * ===== MEDIA ACCESSIBILITY =====
         */
        ...mediaRules,

        // ===== FOCUS MANAGEMENT =====
        ...focusRules,

        // ===== SEMANTIC HTML ENFORCEMENT =====
        ...semanticRules
    }
}

// JSX A11Y settings configuration
const jsxA11ySettings = {
    'jsx-a11y': {

        // Attribute Mapping für verschiedene Prop-Namen
        attributes: {
            for: [
                'htmlFor',
                'for'
            ],
            id: [
                'id',
                'htmlId'
            ]
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
 *
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
 *
 * @returns The complete JSX A11Y configuration.
 */
const createJsxA11yAll = (): TSESLint.FlatConfig.ConfigArray => createJsxA11yBase()

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade JSX Accessibility Configuration based on WCAG 2.1 AA standards.
     * Based on Google/Microsoft/Meta Accessibility Guidelines for enterprise-grade web applications.
     *
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
