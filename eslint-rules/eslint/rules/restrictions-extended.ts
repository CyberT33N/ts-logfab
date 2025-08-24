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

// Extended restrictions and advanced safety
export const restrictionsExtended = {
    'no-restricted-properties': [
        'error',
        {
            message: 'Use environment configuration module instead of direct process.env access',
            object: 'process',
            property: 'env'
        },
        {
            message: 'Use Object.defineProperty instead',
            property: '__defineGetter__'
        },
        {
            message: 'Use Object.defineProperty instead',
            property: '__defineSetter__'
        }
    ],

    'no-restricted-syntax': [
        'error',
        {
            message: 'Use for...of or Object.keys/entries/values instead',
            selector: 'ForInStatement'
        },
        {
            message: 'With statements are not allowed',
            selector: 'WithStatement'
        },
        {
            message: 'eval() is not allowed for security reasons',
            selector: 'CallExpression[callee.name="eval"]'
        },
        {
            message: 'Use object spread instead of Object.assign with object literal',
            selector: 'CallExpression[callee.property.name="assign"][callee.object.name="Object"][arguments.0.type="ObjectExpression"]'
        },
        {
            message: 'Default exports are forbidden. Use named exports.',
            selector: 'ExportDefaultDeclaration'
        }
    ],

    // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-return-await
    'no-return-await': 'off',

    // Prevents new Function() constructor
    'no-script-url': 'error',

    /*
     * Prevents redundant catch blocks
     * Code Quality & Maintainability
     */
    'no-sequences': [
        'error',
        {
            // Prevents comma operator abuse
            allowInParentheses: false
        }
    ],

    'no-shadow-restricted-names': 'error',

    'no-template-curly-in-string': 'error',

    // ✅ ==== VERIFIED ====
    'no-ternary': 'off',

    /*
     * ✅ ==== VERIFIED ====
     * Prevents undefined usage
     */
    'no-undefined': 'error',

    // ✅ ==== VERIFIED ====
    'no-underscore-dangle': [
        'error',
        {
            allow: [
                '__dirname',
                '__filename'
            ],
            allowFunctionParams: true
        }
    ],

    // Loop & Control Flow Safety
    'no-unmodified-loop-condition': 'error',

    // Prevents infinite loops
    'no-unreachable-loop': 'error',

    // Let typescript-eslint handle this
    'no-use-before-define': 'off',

    /*
     * No new for side effects
     * Variable Declarations
     */
    'no-useless-assignment': 'error',

    /*
     * ENTERPRISE: @typescript-eslint/no-unused-expressions hat Type-aware Features
     * 'no-unused-expressions': ['error', { // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-unused-expressions
     *      allowShortCircuit: false,
     *      allowTernary: false,
     *      allowTaggedTemplates: false,
     *      enforceForJSX: true
     * }],
     */

    'no-useless-call': 'error',

    // Prevents shadowing restricted names
    /*
     * Error Handling Excellence
     * ENTERPRISE: @typescript-eslint/only-throw-error ist moderner als no-throw-literal
     * 'no-throw-literal': 'error', // ❌ REDUNDANT: Übernommen von @typescript-eslint/only-throw-error
     */
    'no-useless-catch': 'error',

    // Prevents unnecessary string concatenation
    'no-useless-computed-key': 'error',

    // Prevents unnecessary .call()/.apply()
    'no-useless-concat': 'error',

    // Prevents redundant computed properties
    'no-useless-rename': 'error',

    // ** Over Math.pow
    'no-useless-return': 'error',

    'no-var': 'error',

    // Deprecated with statement
    'no-void': [
        'error',
        {
            // Prevents void operator
            allowAsStatement: false
        }
    ],

    // Prevents pointless destructuring renames
    'no-with': 'error'
} satisfies TSESLint.Linter.RulesRecord
