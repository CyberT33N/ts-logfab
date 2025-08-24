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
import type { TSESLint } from '@typescript-eslint/utils'

export const qualityConsistencyAndMisc = {
    'react/jsx-pascal-case': 'off',

    // Mit modernen Engines kein Performance-Problem
    'react/prop-types': 'off',

    // DevTools zeigen meist richtige Namen
    'react/react-in-jsx-scope': 'off',

    // Spreading oft nützlich
    'react/require-default-props': 'off',

    // Deprecated
    'react/require-optimization': 'off',

    // Prefer <> over React.Fragment
    'react/self-closing-comp': 'off',

    // Kein echter Mehrwert
    'react/sort-comp': 'off',

    // Deprecated
    'react/sort-default-props': 'off',

    // TypeScript handled das
    'react/sort-prop-types': 'off',

    'react/state-in-constructor': [
        'error',
        'never'
    ],

    'react/static-property-placement': [
        'error',
        'static public field'
    ],

    'react/style-prop-object': 'error',

    // Warn für Flexibilität
    'react/void-dom-elements-no-children': 'error'
} satisfies TSESLint.Linter.RulesRecord
