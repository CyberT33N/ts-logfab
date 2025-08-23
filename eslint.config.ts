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

/*
 * ===== [REACT & JSX ECOSYSTEM] =====
 * https://www.npmjs.com/package/eslint-plugin-react
 */

// https://www.npmjs.com/package/eslint-plugin-react-hooks

// https://www.npmjs.com/package/eslint-plugin-react-perf

/*
 * ===== TESTING FRAMEWORKS =====
 * https://www.npmjs.com/package/eslint-plugin-vitest
 */

/*
 * ===== [CODE QUALITY & BEST PRACTICES] =====
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 */

// https://www.npmjs.com/package/eslint-plugin-sonarjs

// https://www.npmjs.com/package/eslint-plugin-promise

// https://www.npmjs.com/package/eslint-plugin-prefer-arrow-functions

// https://www.npmjs.com/package/eslint-plugin-unused-imports

/*
 * ===== [NODE.JS SPECIFIC] =====
 * https://github.com/eslint-community/eslint-plugin-n
 */

/*
 * ===== [SECURITY] =====
 * https://www.npmjs.com/package/eslint-plugin-security
 */

// https://www.npmjs.com/package/eslint-plugin-no-secrets

/*
 * ===== [REGULAR EXPRESSIONS] =====
 * https://github.com/ota-meshi/eslint-plugin-regexp
 */

import eslintPluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import jsdoc from 'eslint-plugin-jsdoc'

/*
 * ===== [FILE FORMAT SPECIFIC] =====
 * https://www.npmjs.com/package/eslint-plugin-jsonc
 */
import nodePlugin from 'eslint-plugin-n'

/*
 * ===== [SORTING & ORDERING] =====
 * https://github.com/infctr/eslint-plugin-typescript-sort-keys
 */

// https://perfectionist.dev
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow-functions'
import reactPerfPlugin from 'eslint-plugin-react-perf'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import tsdoc from 'eslint-plugin-tsdoc'
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

// ------------------------------------------------

// ⚠️ INCOMPATIBLE WITH ESLINT 9 - DO NOT USE
// eslint-plugin-xss uses deprecated APIs (getComments) removed in ESLint 9
/*
 * Last updated: 2019 - NOT MAINTAINED
 * Alternative: Use eslint-plugin-security for XSS prevention
 * https://www.npmjs.com/package/eslint-plugin-xss
 * import eslintPluginXss from 'eslint-plugin-xss'
 */

// ------------------------------------------------

/*
 * ===== ENTERPRISE DECISION: BOUNDARIES PLUGIN DEAKTIVIERT =====
 * BEGRÜNDUNG: Nach Analyse der Big Tech Standards (Google, Meta, Microsoft, Amazon)
 * wird eslint-plugin-boundaries in KEINEM der großen Open Source Projekte verwendet.
 *
 * ENTERPRISE ANTI-PATTERN EVIDENZ:
 * ❌ Hoher Maintenance Overhead: Jede neue Datei = ESLint Config Update
 * ❌ Developer Friction: Team-Blockierung bei undefinierten Strukturen
 * ❌ Over-Engineering: Zu granulare Kontrolle für Library-Entwicklung
 * ❌ Performance Impact: Zusätzliche Linter-Rules verlangsamen Build
 *
 * BIG TECH PROVEN ALTERNATIVES IMPLEMENTIERT:
 * ✅ import/no-restricted-paths: Für kritische Architectural Boundaries
 * ✅ TypeScript-native Boundaries: Compiler-enforced statt Linter-enforced
 * ✅ Konventionsbasierte Architektur: Self-documenting Code Structure
 * ✅ Code Review Governance: Human-in-the-loop für Architecture Decisions
 */

/*
 * ENTERPRISE STANDARD: Focus auf Developer Experience + Produktivität
 * Ref: Google Angular (konventionsbasiert), Meta React (feature-based),
 *      Microsoft TypeScript (type-driven), Amazon AWS SDK (service-oriented)
 * https://github.com/mxschmitt/eslint-plugin-boundaries
 * import boundaries from "eslint-plugin-boundaries";
 */

// ==== CUSTOM ====
import { configs as sonarjsConfigs } from './eslint-rules/clean-code/sonarjs'
import { functionDefinitionParenNewlinePlugin } from './eslint-rules/custom/function-definition-paren-newline'
import { eslintCommentsTypescriptPlugin } from './eslint-rules/custom/typescript-eslint/comments'

// ==== ENTERPRISE ====
import { configs as enterpriseConfigs } from './eslint-rules/eslint'

// ==== FILE FORMATS ====
import { configs as jsoncConfigs } from './eslint-rules/file-formats/jsonc'

// Import Module Management Configuration

// ==== FORMATTING ====
import { configs as stylisticConfigs } from './eslint-rules/formatting/stylistic'

// ==== FRAMEWORKS ====
import { configs as jsxA11yConfigs } from './eslint-rules/frameworks/react/jsx-a11y'
import { configs as reactConfigs } from './eslint-rules/frameworks/react/react'
import { configs as reactHooksConfigs } from './eslint-rules/frameworks/react/react-hooks'
import { configs as importConfigs } from './eslint-rules/modules/imports'

// ==== PACKAGE.JSON ====
import { configs as packageJsonSharedConfigs } from './eslint-rules/package-json'

// ==== PROMISE ====
import { configs as promiseConfigs } from './eslint-rules/promise'

// ==== CLEAN CODE ====

// ==== REGEXP ====
import { configs as regexpConfigs } from './eslint-rules/regexp'

// ==== SECURITY ====
import { configs as noSecretsConfigs } from './eslint-rules/security/eslint-plugin-no-secrets'
import { configs as securityConfigs } from './eslint-rules/security/eslint-plugin-security'

// ==== TESTING ====
import { configs as vitestConfigs } from './eslint-rules/testing/vitest'

const config = tseslint.config(
    {
        // Global ignores for other directories, but not for eslint.config.mjs itself regarding naming conventions
        ignores: ['coverage/**']
    },

    // ===== ESLINT CORE =====
    enterpriseConfigs.all,

    // ===== SORTING & ORDERING =====
    {
        plugins: {
            'sort-keys-fix': sortKeysFix
        },
        rules: {
            'sort-keys-fix/sort-keys-fix': 'warn'
        }
    },

    // ===== TSDOC PLUGIN =====
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ],
        plugins: {
            tsdoc
        },
        rules: {
            'tsdoc/syntax': 'error'
        }
    },

    // ===== JSDOC PLUGIN =====
    jsdoc.configs['flat/recommended-typescript-error'],
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ],
        plugins: {
            jsdoc
        },
        rules: {
            // Core correctness
            'jsdoc/check-access': 'error',
            'jsdoc/check-alignment': 'error',
            'jsdoc/check-line-alignment': 'error',
            'jsdoc/check-param-names': [
                'error',
                { enableFixer: true }
            ],
            'jsdoc/check-property-names': [
                'error',
                { enableFixer: true }
            ],
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-template-names': 'error',
            'jsdoc/check-types': 'error',
            'jsdoc/check-values': 'error',

            // Style & structure
            'jsdoc/empty-tags': 'error',
            'jsdoc/implements-on-classes': 'error',

            // ✅ ==== VERIFIED ====
            'jsdoc/multiline-blocks': [
                'error',
                {
                    noMultilineBlocks: false,
                    noSingleLineBlocks: false
                }
            ],

            'jsdoc/no-defaults': 'error',
            'jsdoc/no-multi-asterisks': 'error',
            'jsdoc/no-types': 'error', // Redundant types in TS code
            'jsdoc/no-undefined-types': 'off', // Off in TS flavor
            'jsdoc/require-asterisk-prefix': [
                'error',
                'always'
            ],

            // Content quality
            'jsdoc/require-description': [
                'warn',
                {
                    contexts: [
                        'FunctionDeclaration',
                        'ClassDeclaration',
                        'MethodDefinition'
                    ]
                }
            ],

            // ✅ ==== VERIFIED ====
            'jsdoc/require-description-complete-sentence': [
                'error',
                {
                    tags: [
                        'param',
                        'returns',
                        'property'
                    ]
                }
            ],

            // Consistent spacing between tags
            'jsdoc/require-hyphen-before-param-description': [
                'error',
                'always'
            ],

            /**
             * ✅ ==== VERIFIED ====
             * Documentation surface (public API only).
             */
            'jsdoc/require-jsdoc': [
                'error',
                {
                    checkConstructors: true,
                    contexts: [
                        'TSDeclareFunction',
                        'TSEnumDeclaration',
                        'TSInterfaceDeclaration',
                        'TSMethodSignature',
                        'TSTypeAliasDeclaration',
                        'PropertyDefinition',

                        // Nur Properties in echten Typdefinitionen (nicht inline)
                        'TSInterfaceDeclaration > TSInterfaceBody > TSPropertySignature',
                        'TSTypeAliasDeclaration > TSTypeLiteral > TSPropertySignature'
                    ],
                    exemptEmptyConstructors: true,
                    exemptEmptyFunctions: true,
                    publicOnly: false,
                    require: {
                        ArrowFunctionExpression: true,
                        ClassDeclaration: true,
                        ClassExpression: true,
                        FunctionDeclaration: true,
                        FunctionExpression: true,
                        MethodDefinition: true
                    }
                }
            ],

            // Params & returns (TS disables type requirements)
            'jsdoc/require-param': 'error',

            'jsdoc/require-param-description': 'error',

            'jsdoc/require-param-name': 'error',

            'jsdoc/require-param-type': 'off',

            'jsdoc/require-property': 'error',

            'jsdoc/require-property-description': 'error',

            'jsdoc/require-property-name': 'error',

            'jsdoc/require-property-type': 'off',

            'jsdoc/require-returns': [
                'error',
                { exemptedBy: ['constructor'] }
            ],

            // ✅ ==== VERIFIED ====
            'jsdoc/require-returns-check': 'error',

            'jsdoc/require-returns-description': 'error',

            'jsdoc/require-returns-type': 'off',

            'jsdoc/require-template': 'error',

            'jsdoc/require-throws': ['warn'],

            'jsdoc/require-yields': 'error',

            'jsdoc/require-yields-check': 'error',

            // ✅ ==== VERIFIED ====
            "jsdoc/tag-lines": ["error", "never", {
               "startLines": 1,
               "endLines": 0,
               "count": 1,
               "applyToEndTag": true
          }],

            // Type/namepath validity
            'jsdoc/valid-types': 'error'
        },
        settings: {
            jsdoc: {
                mode: 'typescript',
                preferredTypes: {
                    Boolean: 'boolean',
                    Function: '(...args: unknown[]) => unknown',
                    Number: 'number',
                    Object: 'Record<string, unknown>',
                    String: 'string',
                    Symbol: 'symbol',
                    object: 'Record<string, unknown>'
                },
                tagNamePreference: {
                    augments: {
                        message: 'Use @extends for inheritance (TSDoc-aligned).',
                        replacement: 'extends'
                    },
                    returns: 'returns'
                }
            }
        }
    },

    // ===== SECURITY PLUGIN =====
    securityConfigs.all,

    // ===== NO SECRETS PLUGIN (ENTERPRISE SECURITY COMPLIANCE) =====
    noSecretsConfigs.all,

    /*
     * ===== VITEST TESTING STANDARDS =====
     * Enterprise-Grade Testing Configuration
     * Based on Google Testing Blog, Microsoft Testing Guidelines, Meta Jest Best Practices
     */
    vitestConfigs.all,

    /*
     * ===== REGEXP PLUGIN =====
     * Enterprise-Grade Regular Expression Standards
     * Based on Google RE2, Microsoft .NET Regex Guidelines, Meta Pattern Standards
     */
    regexpConfigs.all,

    // ===== JSONC PLUGIN =====
    jsoncConfigs.all,

    // ===== PACKAGE JSON PLUGIN =====
    packageJsonSharedConfigs.all,

    // ===== PROMISE PLUGIN =====
    promiseConfigs.all,

    /*
     * ===== ESLINT COMMENTS PLUGIN =====
     * **Not working for typescript-eslint specific rules**
     */
    {
        files: [
            '*.js',
            '*.jsx'
        ],
        plugins: {
            '@eslint-community/eslint-comments': eslintPluginEslintComments
        },
        rules: {

            // ✅ ==== VERIFIED ====
            '@eslint-community/eslint-comments/no-restricted-disable': [
                'error',
                '*'
            ],

            // ✅ ==== VERIFIED ====
            '@eslint-community/eslint-comments/no-use': [
                'error',
                {
                    allow: []
                }
            ]
        }
    },

    // ===== PREFER ARROW PLUGIN (MODERN JAVASCRIPT STANDARDS) =====
    {
        plugins: {
            'prefer-arrow-functions': eslintPluginPreferArrow
        },
        rules: {
            /*
             * ✅ ==== VERIFIED ====
             * ===== ENTERPRISE ARROW FUNCTION STANDARDS (Google/Airbnb/Meta) =====
             */
            'prefer-arrow-functions/prefer-arrow-functions': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowObjectProperties: true,
                    allowedNames: [],
                    // eslint-disable-next-line unicorn/no-keyword-prefix
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    returnStyle: 'unchanged',
                    singleReturnOnly: false
                }
            ]
        }
    },

    // ===== SONARJS PLUGIN =====
    sonarjsConfigs.all,

    // ===== UNICORN PLUGIN =====
    eslintPluginUnicorn.configs.all,
    {
        rules: {
            // ✅ ==== VERIFIED ====
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                    ignore: [
                        String.raw`^README\.md$`,
                        String.raw`^CHANGELOG\.md$`,

                        // Next/Nuxt dynamic routes
                        String.raw`^\[.+\]\.(ts|tsx)$`

                        // Keep index.* as-is (plugin already ignores index.*)
                    ],
                    multipleFileExtensions: true
                }
            ]
        }
    },

    // ===== NODE PLUGIN =====
    nodePlugin.configs['flat/all'],
    {
        plugins: {
            // eslint-disable-next-line id-length
            n: nodePlugin
        },
        rules: {
            // Enterprise: Force explicit imports
            'n/file-extension-in-import': 'off',

            'n/no-missing-import': 'off',

            'n/no-unpublished-import': 'off',

            // Already handled by unicorn/prefer-node-protocol
            'n/prefer-global/process': [
                'error',
                'never'
            ],

            // Off because we use the .ts extension in the imports
            'n/prefer-node-protocol': 'off'
        }
    },

    // ===== UNUSED IMPORTS PLUGIN =====
    {
        plugins: {
            'unused-imports': unusedImports
        }
    },

    // ===== IMPORT/EXPORT MODULE MANAGEMENT =====
    importConfigs.all,

    // ===== @STYLISTIC CONFIGURATION =====
    stylisticConfigs.all,

    /*
     * ===== FUNCTION DEFINITION =====
     * FunctionDefinitionPlugin.configs.flat.all,
     */
    {
        plugins: {
            'local-rules': functionDefinitionParenNewlinePlugin
        },
        rules: {
            'local-rules/function-definition-paren-newline': [
                'error',
                { minParams: 2 }
            ]
        }
    },

    // Apply custom restriction for @typescript-eslint/* disables in TS files
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ],
        plugins: {
            'local-ts-eslint-comments': eslintCommentsTypescriptPlugin
        },
        rules: {
            'local-ts-eslint-comments/no-restricted-typescript-eslint-disable': [
                'error',
                {
                    // Sometime you can not control external types
                    allow: [
                        '@typescript-eslint/prefer-readonly-parameter-types',
                        '@typescript-eslint/naming-convention'
                    ]
                }
            ]
        }
    },

    // ===== REACT PERFORMANCE =====
    reactPerfPlugin.configs.flat.all,

    // ===== REACT HOOKS =====
    reactHooksConfigs.all,

    // ===== REACT RULES =====
    reactConfigs.all,

    /*
     * ===== JSX ACCESSIBILITY (A11Y) RULES =====
     */
    jsxA11yConfigs.all,

    /*
     * ===== TYPESCRIPT-ESLINT CONFIGURATIONS =====
     * Include ALL strict TypeScript rules (includes recommended)
     */
    ...tseslint.configs.strictTypeChecked.map(config => ({
        ...config,
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ] // Only apply to TypeScript files
    })),
    ...tseslint.configs.stylisticTypeChecked.map(config => ({
        ...config,
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ] // Only apply to TypeScript files
    })),

    // ===== TYPESCRIPT PARSER CONFIG =====
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ], // Only apply to TypeScript files
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                /*
                 *===== PERFORMANCE & CACHING OPTIONS =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#cachelifetime
                 *Controls the internal cache expiry lengths. Can be specified as seconds (number) or 'Infinity'.
                 *Default: 30 seconds (or infinite for single runs).
                 *Performance optimization for long-running processes like editors.
                 */
                /*
                 * CacheLifetime: {
                 *     Glob: 30 // Cache glob patterns for 30 seconds
                 * },
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#disallowautomaticsingleruninference
                 *Default: process.env.TSESTREE_SINGLE_RUN or true
                 *Disables automatic performance optimization for single runs vs persistent sessions.
                 *When false, uses faster immutable Programs for CI/single runs.
                 *When true, always uses Watch Programs (slower but needed for editors).
                 *Enterprise: Leave default for 10-20% faster CI performance.
                 */
                // DisallowAutomaticSingleRunInference: false,

                /*
                 *===== ECMA SCRIPT FEATURES =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#ecmafeatures
                 *Additional options for raw syntax parsing
                 */
                // EcmaFeatures: {
                /*
                 *- https://typescript-eslint.io/packages/parser/#jsx
                 *Default: false
                 *Enable JSX parsing. Auto-detected for .jsx/.tsx files.
                 *Note: .ts files always parse as false, .jsx/.tsx always as true
                 *Only affects unknown extensions (.md, .vue) when project is not provided
                 */
                jsx: true,

                /*
                 *- https://typescript-eslint.io/packages/parser/#globalreturn
                 *Default: false
                 *Allow global return statements in codebase (useful for scripts)
                 */
                /*
                 * GlobalReturn: false
                 * },
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#ecmaversion
                 *Default: 2018
                 *ECMAScript version: number (es3, es5, es6, es7...) or year (es2015, es2016...) or 'latest'
                 *Used for scope analysis, affects default behavior
                 */
                // EcmaVersion: 'latest',

                /*
                 *===== TYPESCRIPT COMPILER OPTIONS =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#emitdecoratormetadata
                 *Default: undefined
                 *Act as if emitDecoratorMetadata: true in tsconfig.json, but without type-aware linting.
                 *Enables decorator metadata without requiring parserOptions.project (faster linting).
                 *Enterprise: Use for decorator-heavy codebases without full type checking.
                 */
                // EmitDecoratorMetadata: true,

                /*
                 *- https://typescript-eslint.io/packages/parser/#experimentaldecorators
                 *Default: undefined
                 *Act as if experimentalDecorators: true in tsconfig.json, but without type-aware linting.
                 *Enables experimental decorators without requiring parserOptions.project (faster linting).
                 *Enterprise: Essential for Angular, NestJS, or any decorator-based framework.
                 */
                // ExperimentalDecorators: true,

                /*
                 *- https://typescript-eslint.io/packages/parser/#isolateddeclarations
                 *Default: undefined
                 *Act as if isolatedDeclarations: true in tsconfig.json, but without type-aware linting.
                 *Requires explicit type annotations for exports (faster compilation).
                 *Enterprise: Recommended for libraries and monorepos for better build performance.
                 */
                // IsolatedDeclarations: true,

                /*
                 *===== FILE HANDLING OPTIONS =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#extrafileextensions
                 *Default: undefined
                 *Additional file extensions to include in TypeScript Program compilation.
                 *Default extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.mts', '.cts', '.tsx']
                 *Add extensions starting with dot, e.g., ['.vue', '.svelte']
                 *Performance Warning: See "Changes to extraFileExtensions with projectService"
                 */
                // ExtraFileExtensions: ['.vue', '.svelte'],

                /*
                 *===== JSDOC PARSING OPTIONS =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#jsdocparsingmode
                 *Default: 'all' when project is set, 'none' otherwise
                 *Controls JSDoc comment parsing for performance optimization (TypeScript >=5.3)
                 *- 'all': Parse all JSDoc comments always
                 *- 'none': Never parse JSDoc comments (best performance)
                 *- 'type-info': Parse only JSDoc required for type information
                 *Enterprise: Use 'none' if not using JSDoc-dependent rules like eslint-plugin-deprecation
                 */
                // JsDocParsingMode: 'type-info',

                /*
                 *===== JSX CONFIGURATION =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#jsxfragmentname
                 *Default: null
                 *JSX fragment identifier (after transpilation). If null, uses member of jsxPragma.
                 *Use root identifier only (e.g., 'h' not 'h.Fragment').
                 *Auto-detected when parserOptions.project is provided.
                 */
                // JsxFragmentName: 'Fragment',

                /*
                 *- https://typescript-eslint.io/packages/parser/#jsxpragma
                 *Default: 'React'
                 *JSX Elements creation identifier (after transpilation).
                 *Set to null for new JSX transform. Use root identifier only (e.g., 'React' not 'React.createElement').
                 *Auto-detected when parserOptions.project is provided.
                 *Enterprise: Configure for React alternatives (Preact, Solid, etc.)
                 */
                // JsxPragma: 'React',

                /*
                 *===== TYPESCRIPT LIBRARY CONFIGURATION =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#lib
                 *Default: ['es2018']
                 *TypeScript libs available for scope analysis. Ensures global variables are declared.
                 *See TypeScript compiler options for valid values.
                 *Auto-detected when parserOptions.project is provided.
                 */
                // Lib: ['es2022', 'dom', 'dom.iterable'],

                /*
                 *===== ADVANCED PROGRAM MANAGEMENT =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#programs
                 *Default: undefined
                 *Programmatically provided TypeScript Program instances with type information.
                 *Overrides any programs computed from parserOptions.project.
                 *All linted files must be part of provided program(s).
                 *Enterprise: For custom build systems or advanced TypeScript Program management.
                 */
                // Programs: [/* TypeScript Program instances */],

                /*
                 *- https://typescript-eslint.io/packages/parser/#project
                 *Default: undefined
                 *DEPRECATED: Use projectService instead for easier configuration and faster linting.
                 *Path to TSConfig for type information. Required for type-aware rules.
                 *Supports: true (nearest tsconfig), string path, glob pattern, array of paths/globs
                 *Performance Warning: Avoid wide globs (**) - prefer single * patterns.
                 */
                // Project: './tsconfig.json',

                /*
                 *- https://typescript-eslint.io/packages/parser/#projectfolderignorelist
                 *Default: ["node_modules"]
                 *Folders to ignore from project glob patterns.
                 *Useful when using glob patterns but wanting to exclude specific directories.
                 *Performance optimization for large monorepos.
                 */
                // ProjectFolderIgnoreList: ['**/node_modules/**', '**/dist/**', '**/build/**'],

                /*
                 *===== PROJECT SERVICE CONFIGURATION (RECOMMENDED) =====
                 */

                /*
                 *- https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/#project-service
                 *- https://typescript-eslint.io/packages/parser/#projectservice
                 *Default: false
                 *RECOMMENDED: Use instead of 'project' for simpler configuration and faster linting.
                 *Automatically finds nearest tsconfig.json (like project: true).
                 *Benefits: Simpler configs, predictable (matches editor type info), allows JS without allowJs.
                 *Can be boolean or ProjectServiceOptions object for advanced configuration.
                 */
                projectService: true,

                // ProjectService: {
                /*
                 *- https://typescript-eslint.io/packages/parser/#allowdefaultproject
                 *Default: [] (none)
                 *Globs for files to run with default project despite not being in tsconfig.
                 *For config files like eslint.config.js not in sibling tsconfig.json.
                 *Performance Warning: Each file incurs non-trivial overhead - use sparingly.
                 *Restrictions: No ** globs, files can't be in nearest tsconfig.json
                 */
                // AllowDefaultProject: ['*.js', '*.mjs'],

                /*
                 *- https://typescript-eslint.io/packages/parser/#defaultproject
                 *Default: 'tsconfig.json'
                 *TSConfig path for default project instead of TypeScript defaults.
                 *Only affects files included by allowDefaultProject.
                 *Resolved relative to tsconfigRootDir.
                 */
                // DefaultProject: './tsconfig.eslint.json',

                /*
                 *- https://typescript-eslint.io/packages/parser/#loadtypescriptplugins
                 *Default: false
                 *Allow project service to load TypeScript plugins.
                 *False by default to prevent persistent watchers that block ESLint exit.
                 *Useful for custom rules interacting with TypeScript plugins.
                 *Enterprise: Enable conditionally (e.g., only in VS Code)
                 */
                // LoadTypeScriptPlugins: !!process.env.VSCODE_PID,

                /*
                 *- https://typescript-eslint.io/packages/parser/#maximumdefaultprojectfilematchcount_this_will_slow_down_linting
                 *Default: 8
                 *Maximum files allowDefaultProject may match.
                 *Each match slows linting significantly.
                 *Enterprise: File issue explaining need if you must increase this.
                 */
                /*
                 * MaximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 8
                 * },
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#tsconfigrootdir
                 *The root directory for relative TSConfig paths in project option.
                 *Ensures ESLint finds TSConfig when run from different directories.
                 *Critical for monorepos and CI/CD pipelines.
                 */
                tsconfigRootDir: import.meta.dirname

                /*
                 *===== VERSION COMPATIBILITY =====
                 */

                /*
                 *- https://typescript-eslint.io/packages/parser/#warnonunsupportedtypescriptversion
                 *Default: true
                 *Show warning when using unsupported TypeScript version.
                 *Warning format shows supported vs current version.
                 *Enterprise: Keep enabled for version compliance monitoring.
                 *Set to false to suppress warnings in bleeding-edge environments.
                 */
                // WarnOnUnsupportedTypeScriptVersion: true
            }
        }
    },

    // ===== TYPESCRIPT SORT KEYS =====
    {
        plugins: {
            'typescript-sort-keys': eslintPluginTypescriptSortKeys
        },
        rules: {
            /*
             * ✅ ==== VERIFIED ====
             * Autorität für Interfaces/Type-Literals: alphabetisch
             */
            'typescript-sort-keys/interface': 'error',

            'typescript-sort-keys/string-enum': 'error'
        }
    },

    /*
     * ===== PERFECTIONIST PLUGIN =====
     * Enterprise-Grade Sorting Standards
     * Based on Google/Microsoft/Meta Natural Sorting Preferences
     */
    perfectionist.configs['recommended-natural'], // Natural sorting (human-readable)
    {
        rules: {

            // New Map([...]) entries
            'perfectionist/sort-array-includes': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            /*
             * ===== CLASS & INHERITANCE SORTING =====
             * ✅ ==== VERIFIED ====
             */
            'perfectionist/sort-classes': 'off',

            /*
             * Module member sorting
             * ===== DECORATOR SORTING (ENTERPRISE TYPESCRIPT) =====
             */
            'perfectionist/sort-decorators': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // ✅ Abgedeckt durch ESLint Core sort-keys
            'perfectionist/sort-enums': 'off',

            /*
             * Switch case statements (alphabetical für bessere Lesbarkeit)
             * ===== EXPORT/IMPORT MODULE SORTING =====
             */
            'perfectionist/sort-exports': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // We use @typescript-eslint/member-ordering
            'perfectionist/sort-heritage-clauses': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            /*
             * ===== DEAKTIVIERTE REGELN (BEREITS ABGEDECKT) =====
             * Diese Regeln sind bereits durch andere Plugins mit besserer Konfiguration abgedeckt
             */
            'perfectionist/sort-imports': 'off',

            // ✅ Abgedeckt durch import/order
            'perfectionist/sort-interfaces': 'off',

            'perfectionist/sort-intersection-types': [
                'error',
                {
                    groups: [
                        'conditional',
                        'function',
                        'import',
                        'intersection',
                        'keyword',
                        'literal',
                        'named',
                        'object',
                        'operator',
                        'tuple',
                        'union',
                        'nullish'
                    ],
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // ✅ Abgedeckt durch typescript-sort-keys/interface
            'perfectionist/sort-jsx-props': 'off',

            // New Set([...]) values
            'perfectionist/sort-maps': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // Export { a, b, c }
            'perfectionist/sort-modules': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // Export statements sorting
            'perfectionist/sort-named-exports': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            // ✅ Abgedeckt durch import/order (komplexere Enterprise-Konfiguration)
            'perfectionist/sort-named-imports': 'off',

            // ✅ ==== VERIFIED ====
            'perfectionist/sort-object-types': 'off',

            // ✅ Abgedeckt durch @stylistic/jsx-sort-props (bessere JSX-Integration)
            'perfectionist/sort-objects': 'off',

            /*
             * Extends/implements clauses
             * ===== MODERN JAVASCRIPT FEATURES =====
             */
            'perfectionist/sort-sets': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            /*
             * Const a, b, c = destructuring
             * ===== CONTROL FLOW SORTING =====
             */
            'perfectionist/sort-switch-case': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ],

            /*
             * ✅ Abgedeckt durch typescript-sort-keys/string-enum
             * ===== ENTERPRISE-AKTIVIERTE REGELN (NOCH NICHT ABGEDECKT) =====
             * ===== TYPESCRIPT TYPE SORTING =====
             */
            'perfectionist/sort-union-types': [
                'error',
                {
                    groups: [
                        'conditional', // A extends B ? C : D
                        'function', // () => void
                        'import', // Import('module')
                        'intersection', // A & B
                        'keyword', // String, number, boolean
                        'literal', // 'literal', 123, true
                        'named', // CustomType, Interface
                        'object', // { key: value }
                        'operator', // Keyof, typeof
                        'tuple', // [string, number]
                        'union', // A | B
                        'nullish' // Null, undefined
                    ],
                    order: 'asc',
                    type: 'natural'
                }
            ],

            /*
             * Array.includes() arguments
             * ===== VARIABLE & DECLARATION SORTING =====
             */
            'perfectionist/sort-variable-declarations': [
                'error',
                {
                    order: 'asc',
                    type: 'natural'
                }
            ] // @decorator sorting für Enterprise TypeScript Apps
        }
    },

    // ===== ADDITIONAL TYPESCRIPT RULES =====
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ], // Only apply to TypeScript files
        rules: {

            '@typescript-eslint/ban-ts-comment': 'error',

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

            // Verhindert unnötige Type Conversions
            /*
             * ✅ ==== VERIFIED ====
             * If possible, it is recommended to use tsconfig's noImplicitReturns option rather than this rule. noImplicitReturns is powered by TS's type information and control-flow analysis so it has better coverage than this rule.
             */
            '@typescript-eslint/consistent-return': 'off',

            /*
             * Performance: Verhindert Side Effects bei Type Imports
             * ✅ ==== VERIFIED ====
             */
            '@typescript-eslint/consistent-type-exports': 'error',

            // Konsistente Type Exports
            /*
             * ✅ ==== VERIFIED ====
             * ✅ Erzwingt Konsistenz in TypeScript und steuert den Auto-Fixer.
             *    prefer: 'type-imports'          → immer `import type` statt Wert-Import für Typen.
             *    fixStyle: 'separate-type-imports' → separater Top-Level-Block für Typen (kein Inline-Mixing).
             */
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    fixStyle: 'separate-type-imports',
                    prefer: 'type-imports'
                }
            ],

            '@typescript-eslint/dot-notation': 'off',

            // Additional typescript-eslint rules not included in strict
            '@typescript-eslint/explicit-function-return-type': 'error',

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
                    classes: {
                    // Z.B. sinnvoll für Klassen
                        optionalityOrder: 'required-first',
                        order: 'alphabetically-case-insensitive'
                    },
                    interfaces: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    },
                    typeLiterals: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    }
                }
            ],

            // Method Signature Enforcement
            '@typescript-eslint/method-signature-style': [
                'error',
                'property'
            ],

            /*
             * Disabled to allow bracket notation for private method testing
             * ✅ ==== VERIFIED ====
             */
            '@typescript-eslint/naming-convention': [
                'error',

                // ===== BIG TECH ENTERPRISE STANDARDS (Google, Meta, Microsoft) =====

                // 🚫 KRITISCH: Verbiete I-Prefix für Interfaces (veraltetes Anti-Pattern)
                {
                    custom: {
                        match: false,
                        regex: '^I[A-Z]'
                    },
                    format: ['PascalCase'],
                    selector: 'interface'
                },

                // 🚫 KRITISCH: Verbiete E-Prefix für Enums (veraltetes Anti-Pattern)
                {
                    custom: {
                        match: false,
                        regex: '^E[A-Z]'
                    },
                    format: ['PascalCase'],
                    selector: 'enum'
                },

                // ✅ Type-Like (Interfaces, Classes, Types, Enums) - PascalCase
                {
                    format: ['PascalCase'],
                    selector: 'typeLike'
                },

                // ✅ Type Parameters (Generics) - T-Prefix (Google/MS Standard)
                {
                    format: ['PascalCase'],
                    prefix: ['T'],
                    selector: 'typeParameter'
                },

                // 🚀 MODERN ONLY: # Private Fields (ECMA Standard) - Enterprise Future
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'forbid',
                    modifiers: ['#private'],
                    selector: 'classProperty'
                },

                // 🚀 MODERN ONLY: # Private Methods (ECMA Standard)
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'forbid',
                    modifiers: ['#private'],
                    selector: 'classMethod'
                },

                // 🚫 VERBIETE Legacy underscore für private (erzwinge # private fields)
                {
                    custom: {
                        match: false,
                        regex: '^_'
                    },
                    format: ['camelCase'],
                    leadingUnderscore: 'forbid',
                    modifiers: ['private'],
                    selector: 'memberLike'
                },

                // ✅ Protected Members - underscore optional
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                    modifiers: ['protected'],
                    selector: 'memberLike'
                },

                // ✅ Static Readonly Constants - UPPER_CASE (Google Standard)
                {
                    format: ['UPPER_CASE'],
                    modifiers: [
                        'static',
                        'readonly'
                    ],
                    selector: 'classProperty'
                },

                // ✅ Global Primitive Constants - UPPER_CASE (Google/Meta Standard)
                {
                    format: ['UPPER_CASE'],
                    modifiers: [
                        'const',
                        'global'
                    ],
                    selector: 'variable',
                    types: [
                        'string',
                        'number',
                        'boolean'
                    ]
                },

                // ✅ Global Function Constants - camelCase (Enterprise Standard)
                {
                    format: ['camelCase'],
                    modifiers: [
                        'const',
                        'global'
                    ],
                    selector: 'variable',
                    types: ['function']
                },

                // ✅ Enum Members - PascalCase (Meta/React Standard)
                {
                    format: [
                        'PascalCase',
                        'UPPER_CASE'
                    ],
                    selector: 'enumMember'
                },

                // ✅ Boolean Variables - Verb Prefixes (Google Best Practice)
                {
                    filter: {

                        match: false,

                        // Erlaube auch normale camelCase für destructured oder spezielle Fälle
                        regex: '^(__|_)'
                    },
                    format: ['PascalCase'],
                    prefix: [
                        'is',
                        'has',
                        'can',
                        'should',
                        'will',
                        'did',
                        'does',
                        'was',
                        'were'
                    ],
                    selector: 'variable',
                    types: ['boolean']
                },

                // ✅ Variables - camelCase oder UPPER_CASE
                {
                    format: [
                        'camelCase',
                        'UPPER_CASE'
                    ],
                    leadingUnderscore: 'allow',
                    selector: 'variable'
                },

                // ✅ Functions - camelCase oder PascalCase (für React Components)
                {
                    format: [
                        'camelCase',
                        'PascalCase'
                    ],
                    selector: 'function'
                },

                // ✅ Parameters - camelCase mit underscore erlaubt
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                    selector: 'parameter'
                },

                // ✅ Destructured Variables - flexible Naming (externe APIs)
                {
                    format: null,
                    modifiers: ['destructured'],
                    selector: 'variable'
                },

                // ✅ Object/Type Properties - verschiedene Formate für externe Libraries (Zod, etc.)
                {
                    format: [
                        'camelCase',
                        'snake_case',
                        'PascalCase'
                    ],
                    leadingUnderscore: 'allow',
                    selector: [
                        'objectLiteralProperty',
                        'typeProperty'
                    ]
                },

                // ✅ Properties die Quotes brauchen - keine Format-Checks
                {
                    format: null,
                    modifiers: ['requiresQuotes'],
                    selector: [
                        'classProperty',
                        'objectLiteralProperty',
                        'typeProperty',
                        'classMethod',
                        'objectLiteralMethod',
                        'typeMethod',
                        'accessor',
                        'enumMember'
                    ]
                },

                // ✅ Default Fallback - camelCase
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                    selector: 'default',
                    trailingUnderscore: 'forbid'
                }
            ],

            // Enhanced Type Checking für Edge Cases
            '@typescript-eslint/no-confusing-void-expression': [
                'error',
                {
                    ignoreArrowShorthand: false,
                    ignoreVoidOperator: false
                }
            ],

            // Verhindert redundante Union/Intersection Types
            '@typescript-eslint/no-duplicate-type-constituents': 'error',

            '@typescript-eslint/no-explicit-any': 'error',

            '@typescript-eslint/no-floating-promises': 'error',

            /*
             * Verhindert redundante Zuweisungen
             * Import/Export Hygiene (Google/Microsoft Standards)
             * ✅ ==== VERIFIED ====
             */
            '@typescript-eslint/no-import-type-side-effects': 'error',

            // Explizites await für besseres Stack Tracing
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksConditionals: true,
                    checksSpreads: true,
                    checksVoidReturn: {
                        arguments: true,
                        attributes: true,
                        properties: true,
                        returns: true,
                        variables: true
                    }
                }
            ],

            '@typescript-eslint/no-non-null-assertion': 'error',

            /*
             * ===== ENTERPRISE-GRADE NEUE REGELN (VERIFIZIERT) =====
             * Type Safety Enhancement
             */
            '@typescript-eslint/no-redundant-type-constituents': 'error',

            // Restricted Types (Security & Type Safety)
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        Function: {
                            message: 'Use a specific function type instead',
                            suggest: [
                                '() => void',
                                '(...args: unknown[]) => unknown'
                            ]
                        },
                        Object: {
                            fixWith: 'Record<string, unknown>',
                            message: 'Use Record<string, unknown> or a specific interface instead'
                        },
                        '{}': {
                            fixWith: 'Record<string, never>',
                            message: 'Use Record<string, never> for empty object, unknown for any value, or a specific interface'
                        }
                    }
                }
            ],

            '@typescript-eslint/no-unnecessary-condition': [
                'error',
                {
                    allowConstantLoopConditions: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
                }
            ],

            '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

            /*
             * Verhindert leere Exports
             * Code Quality & Maintainability
             */
            '@typescript-eslint/no-unnecessary-qualifier': 'error',

            // Keine doppelten Type Constituents
            '@typescript-eslint/no-unnecessary-template-expression': 'error',

            // Verhindert unsichere Type Assertions
            '@typescript-eslint/no-unnecessary-type-conversion': 'error',

            /*
             * Includes() > indexOf() !== -1
             * TypeScript 5.x Features
             */
            '@typescript-eslint/no-unsafe-declaration-merging': 'error',

            // TypeScript 5.x Declaration Merging Safety
            '@typescript-eslint/no-unsafe-enum-comparison': 'error',

            /*
             * ===== ENTERPRISE-GRADE ZUSÄTZLICHE REGELN =====
             * Type Safety Enhancement
             */
            '@typescript-eslint/no-unsafe-type-assertion': 'error',

            // ✅ ==== VERIFIED ====
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: false,
                    allowTaggedTemplates: false,
                    allowTernary: false,
                    enforceForJSX: true
                }
            ],

            '@typescript-eslint/no-useless-empty-export': 'error',

            '@typescript-eslint/parameter-properties': [
                'error',
                { // Explizite Parameter Properties
                    prefer: 'parameter-property'
                }
            ],

            // Entfernt unnötige Namespace Qualifier
            '@typescript-eslint/prefer-destructuring': [
                'error',
                { // Erzwingt Destructuring (moderne Syntax)
                    array: true,
                    object: true
                }
            ],

            '@typescript-eslint/prefer-enum-initializers': 'error',

            // Korrekter Name (nicht no-useless-template-literals)
            '@typescript-eslint/prefer-find': 'error',

            // Array.find() > filter()[0]
            '@typescript-eslint/prefer-includes': 'error',

            '@typescript-eslint/prefer-literal-enum-member': 'error',

            '@typescript-eslint/prefer-nullish-coalescing': 'error',

            '@typescript-eslint/prefer-optional-chain': 'error',

            '@typescript-eslint/prefer-readonly': 'error',

            '@typescript-eslint/prefer-readonly-parameter-types': 'error',

            '@typescript-eslint/promise-function-async': 'error',

            '@typescript-eslint/require-array-sort-compare': 'error',

            '@typescript-eslint/restrict-template-expressions': 'error',

            // Async/Promise Best Practices
            '@typescript-eslint/return-await': [
                'error',
                'always'
            ],

            // ✅ ==== VERIFIED ====
            '@typescript-eslint/strict-boolean-expressions': 'error',

            '@typescript-eslint/switch-exhaustiveness-check': 'error',

            // Type Annotation Requirements (für kritische Bereiche)
            '@typescript-eslint/typedef': [
                'error',
                {
                    arrayDestructuring: false,
                    arrowParameter: false,
                    memberVariableDeclaration: true, // Klassen-Member müssen typisiert sein
                    objectDestructuring: false,
                    parameter: true, // Funktionsparameter müssen typisiert sein
                    propertyDeclaration: true, // Properties müssen typisiert sein
                    variableDeclaration: false, // Kann durch Type Inference abgeleitet werden
                    variableDeclarationIgnoreFunction: true
                }
            ],

            '@typescript-eslint/unbound-method': 'error' // TypeScript 5.x Enum Comparison Safety
        }
    },

    // ===== JS-ONLY FALLBACK =====
    {
        // Optional: JS-only fallback if you lint JS files
        files: [
            '**/*.js',
            '**/*.cjs',
            '**/*.mjs'
        ],
        rules: {
            // ✅ ==== VERIFIED ====
            'consistent-return': [
                'error',
                { treatUndefinedAsUnspecified: true }
            ]
        }
    },

    /*
     * ===== DEFAULT EXPORT OVERRIDE =====
     *
     * ✅ ==== VERIFIED ====
     * Deaktiviert default- und anonymous-default-exports für JS-only-Konfigurationen
     * (wird von eslint-plugin-import automatisch aktiviert)
     */
    {
        files: [
            // Build tools
            '**/{vite,webpack,rollup,esbuild,turbo}.config.{ts,js,mts,cts,mjs,cjs}',

            // Test frameworks
            '**/{jest,vitest,playwright,cypress}.config.{ts,js,mts,cts,mjs,cjs}',

            // Linting tools
            '**/{eslint,prettier,stylelint}.config.{ts,js,mts,cts,mjs,cjs}',

            // Next.js, Nuxt, etc.
            '**/{next,nuxt,astro}.config.{ts,js,mts,cts,mjs,cjs}',

            // Legacy configs
            '**/.{eslintrc,prettierrc}.{js,cjs,mjs,ts}'
        ],
        rules: {

            // ✅ ==== VERIFIED ====
            'import/no-default-export': 'off',

            // ✅ ==== VERIFIED ====
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
                    selector: 'CallExpression[callee.name=\"eval\"]'
                },
                {
                    message: 'Use object spread instead of Object.assign with object literal',
                    selector: 'CallExpression[callee.property.name=\"assign\"][callee.object.name=\"Object\"][arguments.0.type=\"ObjectExpression\"]'
                }
            ]
        }
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'off',

            // ✅ ==== VERIFIED ====
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    interfaces: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    },
                    typeLiterals: {
                        memberTypes: 'never',
                        order: 'alphabetically-case-insensitive'
                    }
                }
            ],

            // ✅ ==== VERIFIED ====
            'perfectionist/sort-object-types': 'off',

            // ✅ ==== VERIFIED ====
            'typescript-sort-keys/interface': 'error'
        }
    }
)

export default config
