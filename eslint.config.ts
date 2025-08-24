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

// ═══╡ 🧩 IMPORTS ╞═══
import eslintPluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow-functions'
import reactPerfPlugin from 'eslint-plugin-react-perf'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import tsdoc from 'eslint-plugin-tsdoc'
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint, { parser as tseslintParser } from 'typescript-eslint'

import { configs as sonarjsConfigs } from './eslint-rules/clean-code/sonarjs'
import { configs as unicornConfigs } from './eslint-rules/clean-code/unicorn'
import { configs as jsdocConfigs } from './eslint-rules/comments/jsdoc'
import { configs as configOverrides } from './eslint-rules/configs/overrides'
import { functionDefinitionParenNewlinePlugin } from './eslint-rules/custom/function-definition-paren-newline'
import { eslintCommentsTypescriptPlugin } from './eslint-rules/custom/typescript-eslint/comments'
import { configs as eslintConfigs } from './eslint-rules/eslint'
import { configs as jsoncConfigs } from './eslint-rules/file-formats/jsonc'
import { configs as perfectionistConfigs } from './eslint-rules/formatting/perfectionist'
import { configs as stylisticConfigs } from './eslint-rules/formatting/stylistic'
import { configs as jsxA11yConfigs } from './eslint-rules/frameworks/react/jsx-a11y'
import { configs as reactConfigs } from './eslint-rules/frameworks/react/react'
import { configs as reactHooksConfigs } from './eslint-rules/frameworks/react/react-hooks'
import { configs as importConfigs } from './eslint-rules/modules/imports'
import { configs as nodeConfigs } from './eslint-rules/node/eslint-plugin-n'
import { configs as packageJsonSharedConfigs } from './eslint-rules/package-json'
import { configs as promiseConfigs } from './eslint-rules/promise'
import { configs as regexpConfigs } from './eslint-rules/regexp'
import { configs as noSecretsConfigs } from './eslint-rules/security/eslint-plugin-no-secrets'
import { configs as securityConfigs } from './eslint-rules/security/eslint-plugin-security'
import { configs as vitestConfigs } from './eslint-rules/testing/vitest'
import { configs as tsDeclarationOverrides } from './eslint-rules/typescript/declaration-files/overrides'
import { configs as typescriptEslintConfigs } from './eslint-rules/typescript-eslint/typescript-eslint'

/**
 * Enterprise-Grade ESLint Configuration
 * Based on Google/Microsoft/Meta Best Practices
 * https://github.com/typescript-eslint/typescript-eslint.
 */
const config = tseslint.config(

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🌍 GLOBAL   ►  Universal ignores, root-level rules & shared directives
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */
    {
        // Global ignores for other directories, but not for eslint.config.mjs itself regarding naming conventions
        ignores: ['coverage/**']
    },

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🔍 PARSER   ►  ECMAScript awareness, TS nodes & syntax scanner
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
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
                 *- https://typescript-eslint.io/packages/parser/#ecmaversion
                 *Default: 2018
                 *ECMAScript version: number (es3, es5, es6, es7...) or year (es2015, es2016...) or 'latest'
                 *Used for scope analysis, affects default behavior
                 */
                ecmaVersion: 'latest',

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

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧹 ESLINT   ►  ESLint rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    // ═══╡ 🧹 ESLINT CORE ╞═══
    eslintConfigs.all,

    /* ═══╡ 💬 ESLINT COMMENTS PLUGIN ╞═══
     * Not working for typescript-eslint specific rules
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

          /* ✅ ==== VERIFIED ==== */
          '@eslint-community/eslint-comments/no-restricted-disable': [
               'error',
               '*'
          ],

          /* ✅ ==== VERIFIED ==== */
          '@eslint-community/eslint-comments/no-use': [
               'error',
               {
                    allow: []
               }
          ]
          }
     },

     /*
      *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
      *🧹 SORTING   ►  Sorting rules and configuration
      *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
      */

    // ═══╡ 🔡 SORTING & ORDERING ╞═══
    {
        plugins: {
            'sort-keys-fix': sortKeysFix
        },
        rules: {
            'sort-keys-fix/sort-keys-fix': 'warn'
        }
    },

    /* ═══╡ 🔡 TYPESCRIPT SORT KEYS ╞═══ */
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

     /* ═══╡ 🎯 PERFECTIONIST PLUGIN ╞═══ */
     perfectionistConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *📚 Documentations   ►  TSDoc and JSDoc rules
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    // ═══╡ 📚 TSDOC PLUGIN ╞═══
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

    /* ═══╡ 📚 JSDOC PLUGIN ╞═══ */
    jsdocConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🔒 SECURITY   ►  Security rules and secret scanning
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🔒 SECURITY PLUGIN ╞═══ */
    securityConfigs.all,

    /* ═══╡ 🔒 NO SECRETS (COMPLIANCE) ╞═══ */
    noSecretsConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧪 TESTING   ►  Testing rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🧪 VITEST TESTING STANDARDS ╞═══ */
    vitestConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧪 REGEXP   ►  Regular expression rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🔤 REGEXP PLUGIN ╞═══ */
    regexpConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧪 JSON   ►  JSON rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🧩 JSONC PLUGIN ╞═══ */
    jsoncConfigs.all,

    /* ═══╡ 🧩 PACKAGE JSON PLUGIN ╞═══ */
    packageJsonSharedConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧪 PROMISE   ►  Promise rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🧩 PROMISE PLUGIN ╞═══ */
    promiseConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧹 CLEAN CODE   ►  Clean code rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ ➡️ PREFER ARROW FUNCTIONS ╞═══ */
    {
        plugins: {
            'prefer-arrow-functions': eslintPluginPreferArrow
        },
        rules: {
            /*
             * ✅ ==== VERIFIED ====
             * ENTERPRISE ARROW FUNCTION STANDARDS (Google/Airbnb/Meta)
             */
            'prefer-arrow-functions/prefer-arrow-functions': [
                'error',
                {
                    allowNamedFunctions: false,
                    allowObjectProperties: true,
                    allowedNames: [],
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    returnStyle: 'unchanged',
                    singleReturnOnly: false
                }
            ]
        }
    },

    /* ═══╡ 🧠 SONARJS PLUGIN ╞═══ */
    sonarjsConfigs.all,

    /* ═══╡ 🦄 UNICORN PLUGIN ╞═══ */
    unicornConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧹 NODE   ►  Node.js rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🟩 NODE PLUGIN ╞═══ */
    nodeConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧹 MODULES   ►  Module rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🧹 UNUSED IMPORTS ╞═══ */
    {
        plugins: {
            'unused-imports': unusedImports
        }
    },

    /* ═══╡ 📦 MODULE IMPORTS ╞═══ */
    importConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🧹 STYLISTIC   ►  Stylistic rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🎨 @STYLISTIC CONFIGURATION ╞═══ */
    stylisticConfigs.all,

    /* ═══╡ 🧩 LOCAL RULES: FUNCTION DEFINITION ╞═══ */
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

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🔧 REACT   ►  React ecosystem rules: performance, hooks, core, a11y
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */
    /* ═══╡ ⚛️ REACT PERFORMANCE ╞═══ */
    reactPerfPlugin.configs.flat.all,

    /* ═══╡ ⚛️ REACT HOOKS ╞═══ */
    reactHooksConfigs.all,

    /* ═══╡ ⚛️ REACT CORE RULES ╞═══ */
    reactConfigs.all,

    /* ═══╡ ♿ JSX ACCESSIBILITY (A11y) ╞═══ */
    jsxA11yConfigs.all,

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🔧 TYPESCRIPT ESLINT   ►  Typescript rules and configuration
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 📘 ADDITIONAL TYPESCRIPT RULES ╞═══ */
    typescriptEslintConfigs.all,

    /* ═══╡ 🛡️ TYPESCRIPT-ESLINT DISABLE RESTRICTIONS ╞═══ */
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

    /*
     *╭───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     *🔧 OVERRIDE CONFIGS   ►  Override configs
     *╰───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───═══◎◎◎═══───
     */

    /* ═══╡ 🟨 JS-ONLY FALLBACK ╞═══ */
    {
        /* Optional: JS-only fallback if you lint JS files */
        files: [
            '**/*.js',
            '**/*.cjs',
            '**/*.mjs'
        ],
        rules: {
            /* ✅ ==== VERIFIED ==== */
            'consistent-return': [
                'error',
                { treatUndefinedAsUnspecified: true }
            ]
        }
    },

    /* ═══╡ ⚙️ CONFIGS OVERRIDES ╞═══ */
    configOverrides.all,

    /* ═══╡ 📘 TYPESCRIPT DECLARATION OVERRIDES ╞═══ */
    tsDeclarationOverrides.all
)

export default config
