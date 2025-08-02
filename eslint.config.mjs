/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        // Global ignores for other directories, but not for eslint.config.mjs itself regarding naming conventions
        ignores: ['eslint.config.mjs', 'coverage/**']
    },
    // ===== ESLINT BASE RULES =====
    eslint.configs.recommended,
    
    // ===== TYPESCRIPT-ESLINT CONFIGURATIONS =====
    // Include ALL strict TypeScript rules (includes recommended)
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    
    // ===== ESLINT CORE RULES CUSTOMIZATION =====
    {
        rules: {
            'arrow-parens': ['error', 'as-needed'],
            'no-var': 'error',
            'no-eval': 'error',
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'no-console': ['error', { allow: ['warn', 'error', 'info', 'trace' ] }], // Stricter than original
            'space-before-function-paren': ['error', 'never'],
            'padded-blocks': ['error', 'never'],
            'prefer-arrow-callback': ['error', { // Stricter than original
                allowNamedFunctions: true
            }],
            'func-names': ['error', 'never'],
            'no-use-before-define': 'off', // Let typescript-eslint handle this
            'object-curly-spacing': ['error', 'always'], // Stricter than original
            'comma-dangle': ['error', 'never'],
            'semi': ['error', 'never'],
            'new-cap': ['error', { // Stricter than original
                newIsCap: true,
                capIsNew: false
            }],
            'one-var': ['error', 'never'], // Stricter than original
            'guard-for-in': 'error', // Stricter than original
            'no-duplicate-imports': 'error',
            'no-return-await': 'error',
            'no-template-curly-in-string': 'error',
            'require-atomic-updates': 'error',
            'accessor-pairs': 'error',
            'array-callback-return': 'error',
            'block-scoped-var': 'error',
            'camelcase': ['error', { properties: 'never' }],
            'complexity': ['error', 20],
            'consistent-return': 'error',
            'curly': ['error', 'all'],
            'default-case': 'error',
            'eqeqeq': ['error', 'always'],
            'dot-notation': 'off' // Disabled to allow bracket notation for private method testing
        }
    },
    
    // ===== IMPORT PLUGIN =====
    {
        plugins: {
            import: importPlugin
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                    extensions: ['.ts', '.tsx', '.js', '.jsx'],
                    paths: {
                        '@main/*': ['./src/main/*'],
                        '@/*': ['./src/*']
                    }
                },
                node: {
                    extensions: ['.ts', '.tsx', '.js', '.jsx'],
                    paths: ['src']
                }
            }
        },
        rules: {
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'import/order': ['error', {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                }
            }],
            'import/no-unresolved': 'error',
            'import/no-cycle': 'error',
            'import/no-unused-modules': 'error'
        }
    },
    
    // ===== STYLISTIC PLUGIN FOR FUNCTION PARAMETER MULTILINE FORMATTING =====
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/max-len': ['error', {
                'code': 80
            }],
            '@stylistic/function-paren-newline': ['error', { 
                "minItems": 2
            }],
            // ===== NODE_TS_CODEQUALITY_MULTILINE_RETURNS_001 IMPLEMENTIERUNG =====
            '@stylistic/object-curly-newline': ['error', {
                'ObjectExpression': { 'multiline': true, 'minProperties': 2 }, // Erzwingt mehrzeilige Objektliterale
                'ObjectPattern': { 'multiline': true, 'minProperties': 2 },
                'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
                'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
            }],
            '@stylistic/object-property-newline': ['error', { 
                'allowAllPropertiesOnSameLine': false // Jede Objekteigenschaft auf eigener Zeile
            }],
            '@stylistic/brace-style': ['error', 'stroustrup', { 
                'allowSingleLine': false // Erzwingt mehrzeilige geschweifte Klammern
            }],
            '@stylistic/nonblock-statement-body-position': ['error', 'below'], // Return-Statements in eigener Zeile
            'curly': ['error', 'all'], // Erzwingt geschweifte Klammern bei allen if-statements
        }
    },
    
    // ===== REACT RULES =====
    {
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': a11yPlugin
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            // React rules
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error', // Stricter than original
            'react/no-access-state-in-setstate': 'error',
            'react/no-array-index-key': 'error',
            'react/no-danger': 'error',
            'react/no-did-mount-set-state': 'error',
            'react/no-did-update-set-state': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-redundant-should-component-update': 'error',
            'react/no-typos': 'error',
            'react/no-this-in-sfc': 'error',
            'react/no-unescaped-entities': 'error',
            'react/no-unknown-property': 'error',
            'react/no-unused-state': 'error',
            'react/no-will-update-set-state': 'error',
            'react/prefer-es6-class': ['error', 'always'],
            'react/prefer-stateless-function': 'error',
            'react/self-closing-comp': 'error',
            'react/sort-comp': 'error',
            'react/jsx-no-bind': ['error', {
                'allowArrowFunctions': true
            }],
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-pascal-case': 'error',
            
            // A11y rules
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-has-content': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-role': 'error',
            'jsx-a11y/heading-has-content': 'error',
            'jsx-a11y/no-autofocus': 'error',
            'jsx-a11y/no-redundant-roles': 'error'
        }
    },
    
    // ===== TYPESCRIPT PARSER CONFIG =====
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                /*
                - https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/#project-service
                The project service will automatically find the closest tsconfig.json for each file (like project: true)
                */
                projectService: true,

                /* 
                - https://typescript-eslint.io/packages/parser/#tsconfigrootdir
                The root directory for the tsconfig.json file (https://typescript-eslint.io/packages/parser/#tsconfigrootdir) */
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    
    // ===== ADDITIONAL TYPESCRIPT RULES =====
    {
        rules: {
            // Additional typescript-eslint rules not included in strict
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/dot-notation': 'off', // Disabled to allow bracket notation for private method testing
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    'selector': 'default',
                    'format': ['camelCase']
                },
                {
                    'selector': 'variable',
                    'format': ['camelCase', 'UPPER_CASE']
                },
                {
                    'selector': 'parameter',
                    'format': ['camelCase'],
                    'leadingUnderscore': 'allow'
                },
                {
                    'selector': 'memberLike',
                    'modifiers': ['private'],
                    'format': ['camelCase'],
                    'leadingUnderscore': 'require'
                },
                {
                    'selector': 'typeLike',
                    'format': ['PascalCase']
                },
                {
                    'selector': 'interface',
                    'format': ['PascalCase'],
                    'prefix': ['I']
                },
                {
                    'selector': 'enum',
                    'format': ['PascalCase'],
                    'prefix': ['E']
                },
                // ANPASSUNG FÜR OBJEKT-PROPERTIES (wie _errors oder Zods required_error)
                {
                    'selector': ['objectLiteralProperty', 'typeProperty'], // Gilt für Properties in Objektliteralen und Typdefinitionen
                    'format': ['camelCase', 'snake_case', 'PascalCase'], // Erlaube verschiedene Formate
                    'leadingUnderscore': 'allow' // WICHTIG: Erlaube hier führende Unterstriche
                // Optional: Wenn du es *nur* für spezifische Namen wie '_errors' erlauben willst:
                // 'filter': { 'regex': '^_errors$', 'match': true }
                // Aber 'allow' ist oft einfacher, wenn mehrere solcher Fälle von externen Bibliotheken kommen.
                }
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/prefer-readonly-parameter-types': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/restrict-template-expressions': 'error',
            '@typescript-eslint/unbound-method': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/prefer-enum-initializers': 'error',
            '@typescript-eslint/prefer-literal-enum-member': 'error'
        }
    }
)