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

export const classAndMembersRules: TSESLint.Linter.RulesRecord = {
    /*
     * Konsistente Method Signatures
     * Class Design (Enterprise OOP Standards)
     */
    '@typescript-eslint/class-methods-use-this': [
        'error',
        {
            enforceForClassFields: true,

            // Statische Methoden wenn kein "this"
            exceptMethods: [
                'render',
                'componentDidMount',
                'componentDidUpdate',
                'componentWillUnmount'
            ]
        }
    ],

    // ✅ ==== VERIFIED ====
    '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
            accessibility: 'explicit',
            overrides: {
                accessors: 'explicit',
                constructors: 'no-public',
                methods: 'explicit',
                parameterProperties: 'explicit',
                properties: 'explicit'
            }
        }
    ],

    /*
     * ✅ ==== VERIFIED ====
     * Klassen: gruppen + alphabetisch; Interfaces/Type-Literals: nur alphabetisch, KEIN optionalityOrder
     */
    '@typescript-eslint/member-ordering': [
        'error',
        {
            default: {
                memberTypes: [
                    // Index signatures
                    'signature',
                    'call-signature',

                    // Fields
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    '#private-static-field',

                    'public-decorated-field',
                    'protected-decorated-field',
                    'private-decorated-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    '#private-instance-field',

                    'public-abstract-field',
                    'protected-abstract-field',

                    'public-field',
                    'protected-field',
                    'private-field',
                    '#private-field',

                    'static-field',
                    'instance-field',
                    'abstract-field',

                    'decorated-field',

                    'field',

                    // Static initialization
                    'static-initialization',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',
                    'constructor',

                    // Accessors (aggregate)
                    'public-static-accessor',
                    'protected-static-accessor',
                    'private-static-accessor',
                    '#private-static-accessor',

                    'public-decorated-accessor',
                    'protected-decorated-accessor',
                    'private-decorated-accessor',

                    'public-instance-accessor',
                    'protected-instance-accessor',
                    'private-instance-accessor',
                    '#private-instance-accessor',

                    'public-abstract-accessor',
                    'protected-abstract-accessor',

                    'public-accessor',
                    'protected-accessor',
                    'private-accessor',
                    '#private-accessor',

                    'static-accessor',
                    'instance-accessor',
                    'abstract-accessor',

                    'decorated-accessor',

                    'accessor',

                    // Getters
                    'public-static-get',
                    'protected-static-get',
                    'private-static-get',
                    '#private-static-get',

                    'public-decorated-get',
                    'protected-decorated-get',
                    'private-decorated-get',

                    'public-instance-get',
                    'protected-instance-get',
                    'private-instance-get',
                    '#private-instance-get',

                    'public-abstract-get',
                    'protected-abstract-get',

                    'public-get',
                    'protected-get',
                    'private-get',
                    '#private-get',

                    'static-get',
                    'instance-get',
                    'abstract-get',

                    'decorated-get',

                    'get',

                    // Setters
                    'public-static-set',
                    'protected-static-set',
                    'private-static-set',
                    '#private-static-set',

                    'public-decorated-set',
                    'protected-decorated-set',
                    'private-decorated-set',

                    'public-instance-set',
                    'protected-instance-set',
                    'private-instance-set',
                    '#private-instance-set',

                    'public-abstract-set',
                    'protected-abstract-set',

                    'public-set',
                    'protected-set',
                    'private-set',
                    '#private-set',

                    'static-set',
                    'instance-set',
                    'abstract-set',

                    'decorated-set',

                    'set',

                    // Methods
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    '#private-static-method',

                    'public-decorated-method',
                    'protected-decorated-method',
                    'private-decorated-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    '#private-instance-method',

                    'public-abstract-method',
                    'protected-abstract-method',

                    'public-method',
                    'protected-method',
                    'private-method',
                    '#private-method',

                    'static-method',
                    'instance-method',
                    'abstract-method',

                    'decorated-method',

                    'method'
                ],
                order: 'as-written'
            },

            // Keep interface/type literal ordering simple and readable
            interfaces: [
                'signature',
                'method',
                'constructor',
                'field'
            ],
            typeLiterals: [
                'signature',
                'method',
                'constructor',
                'field'
            ]
        }
    ],

    // Method Signature Enforcement
    '@typescript-eslint/method-signature-style': [
        'error',
        'property'
    ],

    '@typescript-eslint/parameter-properties': [
        'error',
        {
            // Explizite Parameter Properties
            prefer: 'parameter-property'
        }
    ],

    // Type Annotation Requirements (für kritische Bereiche)
    '@typescript-eslint/typedef': [
        'error',
        {
            // Array Destructuring müssen typisiert sein
            arrayDestructuring: false,

            // Funktionsparameter müssen typisiert sein
            arrowParameter: false,

            // Klassen-Member müssen typisiert sein
            memberVariableDeclaration: true,

            // Funktionsparameter müssen typisiert sein
            objectDestructuring: false,

            // Funktionsparameter müssen typisiert sein
            parameter: true,

            // Properties müssen typisiert sein
            propertyDeclaration: true,

            // Kann durch Type Inference abgeleitet werden
            variableDeclaration: false,

            // Kann durch Type Inference abgeleitet werden
            variableDeclarationIgnoreFunction: true
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
