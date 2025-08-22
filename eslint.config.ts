/* eslint-disable import/max-dependencies */
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

// https://github.com/eslint-stylistic/eslint-stylistic
import stylistic from '@stylistic/eslint-plugin'

// https://tsdoc.org/pages/packages/eslint-plugin-tsdoc/

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

/*
 * ===== IMPORTS & MODULES =====
 * https://www.npmjs.com/package/eslint-plugin-import
 */
import importPlugin from 'eslint-plugin-import'

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

/*
 * ===== [FILE FORMAT SPECIFIC] =====
 * https://www.npmjs.com/package/eslint-plugin-jsonc
 */
// https://www.npmjs.com/package/eslint-plugin-jsx-a11y
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import nodePlugin from 'eslint-plugin-n'

// https://www.npmjs.com/package/eslint-plugin-package-json

/*
 * ===== [SORTING & ORDERING] =====
 * https://github.com/infctr/eslint-plugin-typescript-sort-keys
 */

// https://perfectionist.dev
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow-functions'
import pluginPromise from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPerfPlugin from 'eslint-plugin-react-perf'
import sonarjs from 'eslint-plugin-sonarjs'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import pluginTsDoc from 'eslint-plugin-tsdoc'
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
import { functionDefinitionParenNewlinePlugin } from './eslint-rules/custom/function-definition-paren-newline'

// ==== ENTERPRISE ====
import { configs as enterpriseConfigs } from './eslint-rules/eslint'

// ==== FILE FORMATS ====
import { configs as jsoncConfigs } from './eslint-rules/file-formats/jsonc'

// ==== PACKAGE.JSON ====
import { configs as packageJsonSharedConfigs } from './eslint-rules/package-json'

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
    pluginPromise.configs['flat/recommended'],
    {
        rules: {

            /*
             * Nur Standard Promise Methods (keine Bluebird etc.)
             * PRAGMATISCHE AUSNAHMEN
             */
            'promise/avoid-new': 'off',

            /*
             * ===== ENTERPRISE PROMISE STANDARDS (Google/Microsoft/Meta) =====
             * UPGRADE: Warnings zu Errors (Zero-Tolerance für Promise Anti-Patterns)
             */
            'promise/no-callback-in-promise': 'error',

            // Enterprise: Callbacks sind Legacy
            'promise/no-multiple-resolved': 'error',

            // Manchmal notwendig für Custom Promise Wrapping
            'promise/no-native': 'off',

            // War 'warn' - Callback-Promise-Mixing verhindert Clean Architecture
            'promise/no-nesting': 'error',

            // War 'warn' - Mixing Callbacks/Promises ist Enterprise Anti-Pattern
            'promise/no-promise-in-callback': 'error',

            // War 'warn' - Nested Promises = Code Smell (use async/await)
            'promise/no-return-in-finally': 'error',

            // Google/MS Standard: async/await > then/catch
            'promise/prefer-await-to-callbacks': 'error',

            /*
             * War 'warn' - Falsche Promise-Parameter = Runtime Errors
             * NEUE REGELN: Modern JavaScript Best Practices
             */
            'promise/prefer-await-to-then': 'error',

            // Verhindert Promise Race Conditions
            'promise/spec-only': 'error',

            // War 'warn' - Finally sollte NIEMALS returnen
            'promise/valid-params': 'error' // TypeScript Projekte nutzen immer native Promises
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
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    returnStyle: 'unchanged',
                    singleReturnOnly: false
                }
            ]
        }
    },

    // ===== SONARJS PLUGIN =====
    sonarjs.configs.recommended,
    {
        rules: {

            // Prüft implizite Dependencies
            'sonarjs/arguments-usage': 'error',

            // Erzwingt else-Block für Vollständigkeit
            'sonarjs/bool-param-default': 'error',

            /*
             * Verhindert unsichere 'arguments' Nutzung
             * ===== DEFENSIVE PROGRAMMING (Enterprise Best Practice) =====
             */
            'sonarjs/elseif-without-else': 'error',

            /*
             * ===== ENTERPRISE-CRITICAL COMPLEXITY RULES =====
             * 'sonarjs/cyclomatic-complexity': 'off', // REDUNDANT: Bereits durch ESLint Core 'complexity' abgedeckt
             * 'sonarjs/max-lines-per-function': 'off', // REDUNDANT: Bereits durch ESLint Core abgedeckt
             */
            /*
             * ===== CODE MAINTAINABILITY (Google/Microsoft Standards) =====
             * 'sonarjs/max-lines': ['error', { maximum: 400 }], // covered by eslint/max-lines
             */
            'sonarjs/expression-complexity': 'error',

            /*
             * Return direkt statt Variable
             * ===== FUNCTION DESIGN (Clean Code) =====
             */
            'sonarjs/function-name': [
                'error',
                {
                    format: '^[a-z][a-zA-Z0-9]*$' // CamelCase enforcement
                }
            ],

            // Funktionen sollten nicht immer dasselbe returnen
            /*
             * ===== REACT SPECIFIC (Falls React verwendet wird) =====
             * Diese sind NICHT redundant mit react-plugin, da sie andere Aspekte prüfen
             */
            'sonarjs/jsx-no-leaked-render': 'error',

            // Keine verschachtelten switch
            'sonarjs/nested-control-flow': ['error', { maximumNestingLevel: 3 }],

            /*
             * Boolean Parameter brauchen Defaults
             * ===== CODE CLARITY & MODERN SYNTAX =====
             */
            'sonarjs/no-collapsible-if': 'error',

            // Verhindert überkomplexe Ausdrücke
            'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],

            /*
             * Identische Funktionen verhindern
             * ===== LOOP & CONTROL FLOW SAFETY =====
             */
            'sonarjs/no-for-in-iterable': 'error',

            // Verhindert && mit non-boolean
            'sonarjs/no-hook-setter-in-body': 'error',

            // ===== TESTING BEST PRACTICES =====
            'sonarjs/no-identical-functions': 'error',

            /*
             * Variable naming conventions
             * ===== ASYNC/PROMISE PATTERNS =====
             */
            'sonarjs/no-ignored-return': 'error',

            /*
             * String darf max 2x vorkommen
             * ===== TYPE SAFETY & ARCHITECTURE =====
             */
            'sonarjs/no-implicit-dependencies': 'error',

            // Return values müssen verwendet werden
            'sonarjs/no-invariant-returns': 'error',

            // For...in nicht für Iterables
            'sonarjs/no-nested-switch': 'error',

            /*
             * ✅ UNIQUE: SonarJS-spezifische Regel
             * 'sonarjs/no-control-regex': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-control-character
             * ===== VARIABLE & PARAMETER HYGIENE =====
             */
            'sonarjs/no-parameter-reassignment': 'error',

            // Moderne Object-Literal Syntax
            'sonarjs/prefer-immediate-return': 'error',

            // Vereinfacht verschachtelte if-Statements
            'sonarjs/prefer-object-literal': 'error',

            // Max 3 Ebenen Verschachtelung
            /*
             * ===== REGEX SAFETY (Performance & Security) =====
             * ENTERPRISE: regexp Plugin hat spezialisiertere Regex-Prüfungen
             * 'sonarjs/no-empty-character-class': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-empty-character-class
             */
            'sonarjs/single-char-in-character-classes': 'error',

            // Parameter Reassignment verhindern
            'sonarjs/variable-name': 'error' // UseState nicht direkt in render
        }
    },

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
            n: nodePlugin
        },
        rules: {
            // Enterprise: Force explicit imports
            'n/file-extension-in-import': 'off',

            'n/no-missing-import': 'off',

            'n/no-unpublished-import': 'off',

            // Already handled by unicorn/prefer-node-protocol
            'n/prefer-global/process': ['error', 'never'],
            'n/prefer-node-protocol': 'off' // Off because we use the .ts extension in the imports
        }
    },

    // ===== UNUSED IMPORTS PLUGIN =====
    {
        plugins: {
            'unused-imports': unusedImports
        }
    },

    // ===== IMPORT PLUGIN =====
    importPlugin.flatConfigs.typescript,
    {
        rules: {

            // ===== TYPE IMPORTS (TypeScript Specific) =====
            /*
             *✅ ==== VERIFIED ====
             *Import type { Foo } - Enterprise Standard für TypeScript 5.0+
             */
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

            /*
             * Kein dynamisches require()
             * ===== EXPORT CONSISTENCY =====
             */
            'import/export': 'error',

            /*
             * Group value exports together
             * ✅ ==== VERIFIED ====
             */
            'import/exports-last': 'off',

            /*
             * Import {} from 'foo' verhindert
             * ===== FILE EXTENSIONS (Enterprise Barrel Pattern Standard) =====
             */
            /*
             * ✅ ==== VERIFIED ====
             * Optimal für Enterprise: Barrel Pattern + direkte .ts Imports
             */
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    // Daten: ./config.json (explizit)
                    css: 'always',

                    js: 'never',

                    // React TS: ./Component (Barrel Pattern)
                    json: 'always',

                    // JavaScript: ./file (ohne .js für Node-Kompatibilität)
                    jsx: 'never',

                    // Styles: ./styles.css (explizit)
                    scss: 'always',

                    // React JS: ./Component (ohne .jsx)
                    ts: 'never',

                    // TypeScript: ./core (Barrel) - Enterprise Standard
                    tsx: 'never' // Sass: ./styles.scss (explizit)
                }
            ],

            // ===== IMPORT ORDER & STYLE (Google/Airbnb Standards) =====
            'import/first': 'error',

            /*
             * ===== ENTERPRISE EXPORT STRATEGY =====
             * Types/Interfaces: Export at definition site (Enterprise Standard)
             * Values/Functions: Group exports at end when beneficial
             * Bessere Co-Location/Lesbarkeit, weniger Churn/Merge-Konflikte, einfachere Refactors. Praktiken großer OSS‑Codebasen (React/Next.js/Node-Core) nutzen überwiegend mehrere Export-Statements statt Zwangs-Gruppierung. Tree‑Shaking bleibt in beiden Varianten gleich gut.
             * ✅ ==== VERIFIED ====
             */
            'import/group-exports': 'off',

            // Google/Microsoft Standard: NEVER use default exports
            'import/max-dependencies': [
                'error',
                {
                    // Maximale Dependencies pro File
                    ignoreTypeImports: true,
                    max: 15
                }
            ],

            // ===== CODE STYLE =====
            'import/newline-after-import': [
                'error',
                {
                    considerComments: true,
                    count: 1
                }
            ],

            'import/no-absolute-path': 'error',

            // Pure ES Modules (für Tree-shaking)
            'import/no-amd': 'error',

            /*
             * Named exports bevorzugt
             * ✅ ==== VERIFIED ====
             */
            'import/no-anonymous-default-export': [
                'error',
                {
                    allowAnonymousClass: false,

                    allowAnonymousFunction: false,

                    // Named Defaults
                    allowArray: false,
                    allowArrowFunction: false,
                    allowCallExpression: false,
                    allowLiteral: false,
                    allowNew: false,
                    allowObject: false
                }
            ],

            // Immutable Exports
            'import/no-commonjs': 'error',

            // ===== PERFORMANCE & TREE-SHAKING =====
            'import/no-cycle': [
                'error',
                {

                    allowUnsafeDynamicCyclicDependency: false,

                    // Tiefere Analyse für komplexe Projekte
                    ignoreExternal: true,
                    maxDepth: 5
                }
            ],

            // ✅ ==== VERIFIED ====
            'import/no-default-export': 'error',

            // 'import/no-unused-modules': 'off', // Inkompatibel mit Flat Config - siehe https://github.com/import-js/eslint-plugin-import/issues/3079
            'import/no-deprecated': 'error',

            /*
             * ✅ ==== VERIFIED ====
             * ✅ Ersetzt die Kernregel und erlaubt bewusst getrennte Type-/Value-Imports.
             *    prefer-inline: false  → verhindert erzwungenes Zusammenführen in ein Statement (erlaubt zwei Imports).
             *    considerQueryString: true → unterstützt Importe mit Query-Strings/Loadern korrekt.
             */
            /*
             * ===== ENTERPRISE STANDARD: Type- und Wert-Importe strikt trennen (Top-Level `import type`) =====
             * Warum (Rationale):
             * - Klare Semantik: Typen sind Compile-Time, Werte sind Runtime – vermeidet mentale Last und Fehlerquellen.
             * - Side-Effect-Sicherheit: Keine unbeabsichtigten Side-Effects beim Import von reinen Typen.
             * - Tree-Shaking/Bundling: Typen werden vom TS-Compiler entfernt; bessere Paketgröße und Dead-Code-Elimination.
             * - Lesbarkeit & Tooling: Entspricht TS-ESLint-Empfehlungen und verbreiteter Praxis in großen TS-Codebases.
             * Policy (Was wir erzwingen):
             * - Typen ausschließlich über Top-Level `import type { ... } from 'pkg'`.
             * - Werte über reguläre `import { ... } from 'pkg'`.
             * - Zwei Import-Statements aus demselben Modul sind gewollt und kein Fehler.
             * - Inline-Type-Spezifizierer (z. B. `import { type Foo }`) vermeiden wir zugunsten der Top-Level-Variante.
             * Hinweis zur Sortierung/Gruppe:
             * - In `import/order` soll `type` als eigene Gruppe konfiguriert sein. Außerdem `pathGroupsExcludedImportTypes: ['type']`,
             *   Damit Typ-Imports separat gruppiert und alphabetisiert werden (bereits in deiner Config vorhanden).
             */
            'import/no-duplicates': [
                'error',
                {
                    considerQueryString: true,
                    'prefer-inline': false
                }
            ],

            // Kein AMD
            'import/no-dynamic-require': 'error',

            // Kein Mix von import/module.exports
            'import/no-empty-named-blocks': 'error',

            // ✅ ==== VERIFIED ====
            'import/no-import-module-exports': 'error',

            // Verhindert Nutzung veralteter APIs
            'import/no-mutable-exports': 'error',

            // Validiert alle Exports
            'import/no-named-as-default': 'error',

            // Verhindert Konfusion
            'import/no-named-as-default-member': 'error',

            // Keine relativen Package-Imports
            //   'import/no-internal-modules': ['error', {
            //       'allow': [
            //           '**/src/**', // Erlaubt interne src imports
            //           '**/*.types', // Erlaubt .types imports
            //           '**/constants/*',
            //           '**/utils/*'
            //       ]
            //   }],
            // ===== NAMING CONVENTIONS =====
            'import/no-named-export': 'off',

            // Named exports sind erwünscht
            'import/no-namespace': [
                'error',
                { // Wildcard imports vermeiden
                    ignore: ['*.d.ts'] // Außer für Type Definitions
                }
            ],

            // ===== MONOREPO & NAMESPACE SUPPORT =====
            'import/no-relative-packages': 'error',

            // ===== DEPENDENCY MANAGEMENT (Enterprise Boundaries) =====
            // Ref: https://github.com/import-js/eslint-plugin-import/issues/496
            //   'import/no-extraneous-dependencies': ['error', {
            //       'devDependencies': [
            //           '**/*.test.ts',
            //           '**/*.spec.ts',
            //           '**/test/**',
            //           '**/tests/**',
            //           '**/spec/**',
            //           '**/__tests__/**',
            //           '**/__mocks__/**',
            //           '**/test.tsx',
            //           '**/test-setup.ts',
            //           '**/*.config.ts',
            //           '**/*.config.js',
            //           '**/vitest.*.ts',
            //           '**/setupTests.ts',
            //           '**/setupFiles.ts'
            //       ],
            //       'optionalDependencies': false,
            //       'peerDependencies': true,
            //       'includeTypes': true, // TypeScript @types/* packages
            //       'includeInternal': true,
            //       // ===== ENTERPRISE FIX: TypeScript Aliases Resolution =====
            //       // Ref: https://github.com/import-js/eslint-plugin-import/issues/496
            //       // Force ESLint to resolve dependencies from project root, not from nested directories
            //       'packageDir': './' // Use project root package.json for TypeScript alias resolution
            //   }],
            //   'import/no-nodejs-modules': ['error', {
            //       'allow': ['path', 'fs', 'os', 'crypto', 'util', 'stream'] // Erlaubte Node.js Module
            //   }],
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        // Domain Boundaries (Clean Architecture)
                        {
                            from: './src/infrastructure',
                            message: 'Domain should not depend on Infrastructure',
                            target: './src/domain'
                        },
                        {
                            from: './src/application',
                            message: 'Domain should not depend on Application',
                            target: './src/domain'
                        }
                    ]
                }
            ],

            // Keine Webpack-spezifische Syntax
            'import/no-self-import': 'error',

            'import/no-unassigned-import': [
                'error',
                {
                    allow: [
                        '**/*.css',
                        '**/*.scss',
                        '**/*.less',
                        'reflect-metadata', // Decorators
                        'core-js/**',
                        '@babel/polyfill'
                    ]
                }
            ],

            // ===== RESOLUTION & SECURITY (Critical for Enterprise) =====
            'import/no-unresolved': [
                'error',
                {
                    amd: true,
                    caseSensitive: true,

                    // Linux/Windows Kompatibilität
                    caseSensitiveStrict: true,
                    commonjs: true
                }
            ],

            // Verhindert Selbst-Imports
            'import/no-useless-path-segments': [
                'error',
                {
                    // Enterprise Standard: ./core statt ./core/index.ts
                    commonjs: true,
                    noUselessIndex: true
                }
            ],

            // Security: Keine absoluten Pfade
            'import/no-webpack-loader-syntax': 'error',

            /*
             * ✅ ==== VERIFIED ====
             * https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/order.md
             */
            'import/order': [
                'error',
                {

                    /*
                     * ✅ ==== VERIFIED ====
                     * Alphabetische Sortierung; Import-Kinds (type/typeof) aufsteigend
                     */
                    alphabetize: {
                        caseInsensitive: true,
                        order: 'asc',
                        orderImportKind: 'asc'
                    },

                    /*
                     * Verhindert "Sub-Group"-Leerzeilen bei pathGroups + newlines-between=always
                     * (Default wird sich künftig ändern -> explizit setzen für Stabilität)
                     */
                    distinctGroup: false,

                    /*
                     * ✅ ==== VERIFIED ====
                     * Reihenfolge der Gruppen (Type-Imports als eigener Block am Ende)
                     */
                    // Reihenfolge der Gruppen (Type-Imports als eigener Block am Ende)
                    groups: [
                        'builtin', // Node.js built-ins
                        'external', // Npm packages
                        'internal', // Aliases (z. B. @/**, ~/**)
                        'parent', // ../
                        'sibling', // ./
                        'index', // ./index
                        'object', // TS: import log = console.log
                        'type' // TS/Flow: import type { Foo } from 'foo'
                    ],

                    /*
                     * ✅ ==== VERIFIED ====
                     * Eine Leerzeile zwischen den Hauptgruppen; keine Leerzeilen innerhalb
                     */
                    'newlines-between': 'always-and-inside-groups',

                    // Aliase zuerst innerhalb der "internal"-Gruppe
                    pathGroups: [
                        {
                            group: 'internal',
                            pattern: '@/**',
                            position: 'before'
                        },
                        {
                            group: 'internal',
                            pattern: '~/**',
                            position: 'before'
                        }
                    ],

                    /*
                     * Wichtig: PathGroups nicht auf builtins/external/object/type anwenden
                     * (verhindert Overreach, entspricht gängiger Praxis)
                     */
                    pathGroupsExcludedImportTypes: [
                        'builtin',
                        'external',
                        'object',
                        'type'
                    ],

                    // Unassigned (Side-Effect) Imports nicht bewegen, aber warnen
                    warnOnUnassignedImports: true
                }
            ],

            // ✅ ==== VERIFIED ====
            'import/prefer-default-export': 'off'
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            },
            'import/resolver': {
                node: {
                    extensions: [
                        '.ts',
                        '.tsx',
                        '.js',
                        '.jsx'
                    ],
                    paths: ['src']
                },
                typescript: {
                    alwaysTryTypes: true,
                    extensions: [
                        '.ts',
                        '.tsx',
                        '.js',
                        '.jsx'
                    ],
                    paths: {
                        '@/*': ['./src/*'],
                        '@main/*': ['./src/main/*']
                    },
                    project: './tsconfig.json'
                }
            }
        }
    },

    // ===== @STYLISTIC CONFIGURATION =====
    stylistic.configs.all,
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.js',
            '**/*.jsx'
        ],
        plugins: {
            '@stylistic': stylistic
        },
        rules: {

            /*
             * ===== ARRAYS =====
             * ✅ ==== VERIFIED ====
             */
            '@stylistic/array-bracket-newline': [
                'error',
                {
                    minItems: 3,
                    multiline: true
                }
            ],

            '@stylistic/array-bracket-spacing': ['error', 'never'],

            '@stylistic/array-element-newline': [
                'error',
                {
                    minItems: 3,
                    multiline: true
                }
            ],

            '@stylistic/arrow-parens': [
                'error',
                'as-needed',
                {
                    requireForBlockBody: true
                }
            ],

            '@stylistic/arrow-spacing': [
                'error',
                {
                    after: true,
                    before: true
                }
            ],

            '@stylistic/block-spacing': ['error', 'always'],

            // ===== BLOCKS & BRACES =====
            /*
             * ✅ ==== VERIFIED ====
             * 1tbs: One True Brace Style (Enterprise Standard)
             * Stroustrup: Stroustrup Style (Legacy)
             */
            '@stylistic/brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: false
                }
            ],

            // ===== PUNCTUATION =====
            '@stylistic/comma-dangle': [
                'error',
                {
                    arrays: 'never',
                    exports: 'never',
                    functions: 'never',
                    imports: 'never',
                    objects: 'never'
                }
            ],

            '@stylistic/comma-spacing': [
                'error',
                {
                    after: true,
                    before: false
                }
            ],

            '@stylistic/comma-style': ['error', 'last'],

            // ===== MISC FORMATTING =====
            '@stylistic/computed-property-spacing': ['error', 'never'],

            '@stylistic/curly-newline': ['error'],

            '@stylistic/dot-location': ['error', 'property'],

            // ✅ ==== VERIFIED ====
            '@stylistic/eol-last': ['error', 'always'],

            // We use custom rules for formatting function definitions
            '@stylistic/function-call-argument-newline': ['error', 'consistent'],

            '@stylistic/function-call-spacing': ['error', 'never'],

            /*
             * ===== FUNCTIONS =====
             * ✅ ==== VERIFIED ====
             */
            '@stylistic/function-paren-newline': ['error', 'consistent'],

            '@stylistic/generator-star-spacing': [
                'error',
                {
                    after: false,
                    before: true
                }
            ],

            // ✅ ==== VERIFIED ====
            '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

            // ===== SPACING & INDENTATION =====
            '@stylistic/indent': [
                'error',
                4,
                {
                    ArrayExpression: 1,
                    CallExpression: {
                        arguments: 1
                    },
                    FunctionDeclaration: {
                        body: 1,
                        parameters: 1
                    },
                    FunctionExpression: {
                        body: 1,
                        parameters: 1
                    },
                    ImportDeclaration: 1,
                    MemberExpression: 1,
                    ObjectExpression: 1,
                    SwitchCase: 1,
                    VariableDeclarator: 1,
                    flatTernaryExpressions: false,
                    ignoreComments: false,
                    offsetTernaryExpressions: true,
                    outerIIFEBody: 1
                }
            ],

            '@stylistic/indent-binary-ops': ['error', 4],

            '@stylistic/jsx-child-element-spacing': ['error'],

            '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

            '@stylistic/jsx-closing-tag-location': ['error'],

            '@stylistic/jsx-curly-brace-presence': [
                'error',
                {
                    children: 'never',
                    props: 'never'
                }
            ],

            '@stylistic/jsx-curly-newline': [
                'error',
                {
                    multiline: 'consistent',
                    singleline: 'forbid'
                }
            ],

            '@stylistic/jsx-curly-spacing': [
                'error',
                {
                    children: true,
                    when: 'never'
                }
            ],

            '@stylistic/jsx-equals-spacing': ['error', 'never'],

            '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],

            '@stylistic/jsx-function-call-newline': ['error', 'multiline'],

            // '@stylistic/jsx-indent': deprecated - use '@stylistic/indent' instead
            '@stylistic/jsx-indent-props': ['error', 4],

            '@stylistic/jsx-max-props-per-line': [
                'error',
                {
                    maximum: 1,
                    when: 'multiline'
                }
            ],

            '@stylistic/jsx-one-expression-per-line': [
                'error',
                {
                    allow: 'single-child'
                }
            ],

            '@stylistic/jsx-pascal-case': [
                'error',
                {
                    allowAllCaps: false,
                    allowNamespace: true
                }
            ],

            '@stylistic/jsx-props-no-multi-spaces': ['error'],

            // ===== JSX/REACT SPECIFIC (only essential for future React support) =====
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],

            '@stylistic/jsx-self-closing-comp': [
                'error',
                {
                    component: true,
                    html: true
                }
            ],

            '@stylistic/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    ignoreCase: true,
                    multiline: 'last',
                    reservedFirst: true,
                    shorthandFirst: true
                }
            ],

            '@stylistic/jsx-tag-spacing': [
                'error',
                {
                    afterOpening: 'never',
                    beforeClosing: 'never',
                    beforeSelfClosing: 'always',
                    closingSlash: 'never'
                }
            ],

            '@stylistic/jsx-wrap-multilines': [
                'error',
                {
                    arrow: 'parens-new-line',
                    assignment: 'parens-new-line',
                    condition: 'parens-new-line',
                    declaration: 'parens-new-line',
                    logical: 'parens-new-line',
                    prop: 'parens-new-line',
                    return: 'parens-new-line'
                }
            ],

            '@stylistic/key-spacing': [
                'error',
                {
                    afterColon: true,
                    beforeColon: false,
                    mode: 'strict'
                }
            ],

            '@stylistic/keyword-spacing': [
                'error',
                {
                    after: true,
                    before: true,
                    overrides: {
                        case: { after: true },
                        return: { after: true },
                        throw: { after: true }
                    }
                }
            ],

            /*
             * Note: jsx-newline rule removed due to compatibility issues
             * ===== COMMENTS & DOCUMENTATION =====
             */
            '@stylistic/line-comment-position': [
                'error',
                {
                    applyDefaultIgnorePatterns: true,
                    ignorePattern: 'eslint|jshint|global',
                    position: 'above'
                }
            ],

            // ✅ ==== VERIFIED ====
            '@stylistic/linebreak-style': ['error', 'unix'],

            '@stylistic/lines-around-comment': [
                'error',
                {
                    afterBlockComment: false,
                    afterLineComment: false,
                    allowArrayEnd: true,
                    allowArrayStart: true,
                    allowBlockEnd: true,
                    allowBlockStart: true,
                    allowClassEnd: true,
                    allowClassStart: true,
                    allowObjectEnd: true,
                    allowObjectStart: true,
                    applyDefaultIgnorePatterns: true,
                    beforeBlockComment: true,
                    beforeLineComment: true
                }
            ],

            // ===== CLASS MEMBERS =====
            '@stylistic/lines-between-class-members': [
                'error',
                'always',
                {
                    exceptAfterOverload: true,
                    exceptAfterSingleLine: false
                }
            ],

            // ===== LINE BREAKS & WRAPPING =====
            '@stylistic/max-len': [
                'error',
                {
                    code: 120,
                    ignoreComments: true,

                    ignorePattern: String.raw`^import\s.+\sfrom\s.+;$`,

                    ignoreRegExpLiterals: true,

                    ignoreStrings: false,

                    ignoreTemplateLiterals: false,

                    ignoreUrls: true,

                    // Enterprise Standard: 100 ist der moderne Sweet Spot
                    tabWidth: 4 // Allow long import statements
                }
            ],

            '@stylistic/max-statements-per-line': ['error', { max: 1 }],

            '@stylistic/member-delimiter-style': [
                'error',
                {
                    multiline: {
                        delimiter: 'none',
                        requireLast: false
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: false
                    }
                }
            ],

            // ✅ ==== VERIFIED ====
            '@stylistic/multiline-comment-style': ['error', 'starred-block'],

            // ===== TERNARY =====
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],

            '@stylistic/new-parens': ['error', 'always'],

            '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],

            '@stylistic/no-confusing-arrow': [
                'error',
                {
                    allowParens: true
                }
            ],

            '@stylistic/no-extra-parens': [
                'error',
                'all',
                {
                    conditionalAssign: false,
                    enforceForArrowConditionals: false,
                    enforceForFunctionPrototypeMethods: false,
                    enforceForNewInMemberExpressions: false,
                    enforceForSequenceExpressions: false,
                    ignoreJSX: 'all',
                    nestedBinaryExpressions: false,
                    returnAssign: false
                }
            ],

            '@stylistic/no-extra-semi': ['error'],

            '@stylistic/no-floating-decimal': ['error'],

            '@stylistic/no-mixed-operators': [
                'error',
                {
                    allowSamePrecedence: true,
                    groups: [
                        ['%', '**'],
                        ['%', '+'],
                        ['%', '-'],
                        ['%', '*'],
                        ['%', '/'],
                        ['/', '*'],
                        [
                            '&',
                            '|',
                            '<<',
                            '>>',
                            '>>>'
                        ],
                        [
                            '==',
                            '!=',
                            '===',
                            '!=='
                        ],
                        ['&&', '||']
                    ]
                }
            ],

            '@stylistic/no-mixed-spaces-and-tabs': ['error'],

            '@stylistic/no-multi-spaces': [
                'error',
                {
                    exceptions: {},
                    ignoreEOLComments: false
                }
            ],

            /*
             * ✅ ==== VERIFIED ====
             * Begründung: Minimales, konsistentes Whitespace; verhindert visuelles Rauschen
             * und harmoniert mit @stylistic/eol-last: "always" (genau eine Abschluss‑Newline, aber keine „zusätzlichen“ Leerzeilen)
             */
            '@stylistic/no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxBOF: 0,
                    maxEOF: 0
                }
            ],

            '@stylistic/no-tabs': ['error'],

            '@stylistic/no-trailing-spaces': [
                'error',
                {
                    ignoreComments: false,
                    skipBlankLines: false
                }
            ],

            '@stylistic/no-whitespace-before-property': ['error'],

            '@stylistic/nonblock-statement-body-position': ['error', 'below'],

            // ✅ ==== VERIFIED ====
            '@stylistic/object-curly-newline': [
                'error',
                {
                    ExportDeclaration: {
                        consistent: true,
                        minProperties: 3,
                        multiline: true
                    },
                    ImportDeclaration: {
                        consistent: false,
                        minProperties: 3
                    },
                    ObjectExpression: {
                        consistent: true,
                        minProperties: 2,
                        multiline: true
                    },
                    ObjectPattern: {
                        consistent: false,
                        minProperties: 3,
                        multiline: true
                    },

                    TSEnumBody: {
                        // CONSISTENT: Gleiche Regeln für Enum Bodies
                        consistent: true,

                        minProperties: 1,
                        multiline: true
                    },

                    TSInterfaceBody: {
                        // CONSISTENT: Gleiche Regeln für Interface Bodies
                        consistent: true,

                        minProperties: 1,
                        multiline: true
                    },

                    // ===== ENTERPRISE TYPE SAFETY: TypeScript Return-Type Formatting =====
                    TSTypeLiteral: {
                        // STRICT: Schon ab 1 Property neue Zeilen erzwingen
                        consistent: true,

                        minProperties: 1,
                        multiline: true
                    }
                }
            ],

            /*
             * ===== OBJECTS =====
             * ✅ ==== VERIFIED ====
             */
            '@stylistic/object-curly-spacing': ['error', 'always'],

            '@stylistic/object-property-newline': [
                'error',
                {
                    allowAllPropertiesOnSameLine: false
                }
            ],

            '@stylistic/one-var-declaration-per-line': ['error', 'always'],

            '@stylistic/operator-linebreak': [
                'error',
                'before',
                {
                    overrides: {
                        '%=': 'none',
                        '*=': 'none',
                        '+=': 'none',
                        '-=': 'none',
                        '/=': 'none',
                        '=': 'none'
                    }
                }
            ],

            '@stylistic/padded-blocks': [
                'error',
                'never',
                {
                    allowSingleLineBlocks: false
                }
            ],

            '@stylistic/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    next: '*',
                    prev: 'directive'
                },
                {
                    blankLine: 'any',
                    next: 'directive',
                    prev: 'directive'
                },
                {
                    blankLine: 'always',
                    next: '*',
                    prev: [
                        'const',
                        'let',
                        'var'
                    ]
                },
                {
                    blankLine: 'any',
                    next: [
                        'const',
                        'let',
                        'var'
                    ],
                    prev: [
                        'const',
                        'let',
                        'var'
                    ]
                },
                {
                    blankLine: 'always',
                    next: 'return',
                    prev: '*'
                },
                {
                    blankLine: 'always',
                    next: [
                        'if',
                        'try',
                        'class',
                        'export'
                    ],
                    prev: '*'
                },
                {
                    blankLine: 'always',
                    next: '*',
                    prev: [
                        'if',
                        'try',
                        'class',
                        'export'
                    ]
                },
                {
                    blankLine: 'any',
                    next: ['export'],
                    prev: ['export']
                }
            ],

            '@stylistic/quote-props': [
                'error',
                'as-needed',
                {
                    keywords: false,
                    numbers: false,
                    unnecessary: true
                }
            ],

            '@stylistic/quotes': [
                'error',
                'single',
                {
                    allowTemplateLiterals: 'never',
                    avoidEscape: true
                }
            ],

            '@stylistic/rest-spread-spacing': ['error', 'never'],

            '@stylistic/semi': [
                'error',
                'never',
                {
                    beforeStatementContinuationChars: 'never'
                }
            ],

            '@stylistic/semi-spacing': [
                'error',
                {
                    after: true,
                    before: false
                }
            ],

            '@stylistic/semi-style': ['error', 'last'],

            '@stylistic/space-before-blocks': ['error', 'always'],

            '@stylistic/space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    asyncArrow: 'always',
                    named: 'never'
                }
            ],

            '@stylistic/space-in-parens': ['error', 'never'],

            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],

            '@stylistic/space-unary-ops': [
                'error',
                {
                    nonwords: false,
                    overrides: {},
                    words: true
                }
            ],

            '@stylistic/spaced-comment': [
                'error',
                'always',
                {
                    block: {
                        balanced: true,
                        exceptions: ['-', '+'],
                        markers: [
                            '=',
                            '!',
                            ':',
                            '::'
                        ]
                    },
                    line: {
                        exceptions: ['-', '+'],
                        markers: [
                            '=',
                            '!',
                            '/'
                        ]
                    }
                }
            ],

            '@stylistic/switch-colon-spacing': [
                'error',
                {
                    after: true,
                    before: false
                }
            ],

            '@stylistic/template-curly-spacing': ['error', 'never'],

            '@stylistic/template-tag-spacing': ['error', 'never'],

            // ===== TYPESCRIPT SPECIFIC =====
            '@stylistic/type-annotation-spacing': [
                'error',
                {
                    after: true,
                    before: false,
                    overrides: {
                        arrow: {
                            after: true,
                            before: true
                        }
                    }
                }
            ],

            '@stylistic/type-generic-spacing': ['error'],

            '@stylistic/type-named-tuple-spacing': ['error'],

            '@stylistic/wrap-iife': [
                'error',
                'inside',
                {
                    functionPrototypeMethods: true
                }
            ],
            '@stylistic/wrap-regex': ['error'],
            '@stylistic/yield-star-spacing': [
                'error',
                {
                    after: true,
                    before: false
                }
            ]
        }
    },

    /*
     * ===== FUNCTION DEFINITION =====
     * FunctionDefinitionPlugin.configs.flat.all,
     */
    {
        plugins: {
            'local-rules': functionDefinitionParenNewlinePlugin
        },
        rules: {
            'local-rules/function-definition-paren-newline': ['error', { minParams: 2 }]
        }
    },

    // ===== REACT PERFORMANCE =====
    reactPerfPlugin.configs.flat.all,

    // ===== REACT HOOKS =====
    reactHooksPlugin.configs['recommended-latest'],

    // ===== REACT RULES =====
    reactPlugin.configs.flat.all,

    // ReactPlugin.configs.flat['jsx-runtime'],
    {
        rules: {

            'react-hooks/exhaustive-deps': [
                'error',
                {
                    enableDangerousAutofixThisMayCauseInfiniteLoops: false
                }
            ],

            // ===== HOOKS BEST PRACTICES (ENTERPRISE STANDARD) =====
            'react-hooks/rules-of-hooks': 'error',

            // Nicht relevant mit TypeScript
            'react/boolean-prop-naming': 'off',

            /*
             * Abgedeckt durch @stylistic/jsx-equals-spacing
             * ===== ZUSÄTZLICHE ENTERPRISE STANDARDS =====
             */
            'react/button-has-type': [
                'error',
                {
                    button: true,
                    reset: true,
                    submit: true
                }
            ],

            // Warn für graduelle Adoption
            'react/checked-requires-onchange-or-readonly': 'warn',

            // Zu opinion-based
            'react/default-props-match-prop-types': 'off',

            /*
             * ===== DISABLED RULES (ENTERPRISE FLEXIBILITY) =====
             * Diese Regeln sind aus flat.all übernommen, aber für Enterprise zu restriktiv
             */
            'react/destructuring-assignment': 'off',

            // TypeScript macht PropTypes obsolet
            'react/display-name': 'off',

            // Zu restriktiv
            'react/forbid-component-props': 'off',

            // Zu restriktiv
            'react/forbid-dom-props': 'off',

            // Zu restriktiv
            'react/forbid-elements': 'off',

            // Zu restriktiv
            'react/forbid-foreign-prop-types': 'off',

            // Zu arbiträr, moderne IDEs helfen
            'react/forbid-prop-types': 'off',

            'react/forward-ref-uses-ref': 'error',

            // ===== MODERN REACT PATTERNS =====
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function'
                }
            ],

            'react/hook-use-state': [
                'error',
                {
                    allowDestructuredState: true
                }
            ],

            // Warn statt error - manchmal notwendig
            'react/iframe-missing-sandbox': 'warn',

            // Abgedeckt durch @stylistic/jsx-self-closing-comp
            'react/jsx-boolean-value': ['error', 'never'],

            // Zu restriktiv
            'react/jsx-child-element-spacing': 'off',

            /*
             * ===== JSX FORMATTING =====
             * WICHTIG: Alle JSX-Formatting-Regeln werden durch @stylistic/* abgedeckt
             * Diese React-spezifischen Formatting-Regeln sind deaktiviert, um Konflikte zu vermeiden
             */
            'react/jsx-closing-bracket-location': 'off',

            // Abgedeckt durch @stylistic/jsx-closing-bracket-location
            'react/jsx-closing-tag-location': 'off',

            'react/jsx-curly-brace-presence': 'off',

            // Abgedeckt durch @stylistic/jsx-wrap-multilines
            'react/jsx-curly-spacing': 'off',

            // Abgedeckt durch @stylistic/jsx-curly-spacing
            'react/jsx-equals-spacing': 'off',

            // Edge cases existieren
            'react/jsx-filename-extension': 'off',

            // Abgedeckt durch @stylistic/jsx-closing-tag-location
            'react/jsx-first-prop-new-line': 'off',

            // Abgedeckt durch @stylistic/jsx-pascal-case
            'react/jsx-fragments': ['error', 'syntax'],

            'react/jsx-handler-names': [
                'error',
                {
                    // Zu restriktiv
                    checkInlineFunction: false,

                    checkLocalVariables: false,

                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on'
                }
            ],

            // Abgedeckt durch @stylistic/jsx-first-prop-new-line
            'react/jsx-indent': 'off',

            // Abgedeckt durch @stylistic/indent (JSX wird mit abgedeckt)
            'react/jsx-indent-props': 'off',

            'react/jsx-key': [
                'error',
                {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true
                }
            ],

            // Utility components oft in gleicher Datei
            'react/jsx-max-depth': 'off',

            // Abgedeckt durch @stylistic/jsx-indent-props
            'react/jsx-max-props-per-line': 'off',

            // .tsx ist Standard
            'react/jsx-newline': 'off',

            // SetState manchmal notwendig
            'react/jsx-no-bind': 'off',

            'react/jsx-no-comment-textnodes': 'error',

            'react/jsx-no-constructed-context-values': 'error',

            'react/jsx-no-duplicate-props': [
                'error',
                {
                    ignoreCase: true
                }
            ],

            'react/jsx-no-leaked-render': [
                'error',
                {
                    validStrategies: ['coerce', 'ternary']
                }
            ],

            // Zu arbiträr
            'react/jsx-no-literals': 'off',

            'react/jsx-no-script-url': 'error',

            // ===== SECURITY & BUG PREVENTION (CRITICAL) =====
            'react/jsx-no-target-blank': [
                'error',
                {
                    enforceDynamicLinks: 'always',
                    warnOnSpreadAttributes: true
                }
            ],

            'react/jsx-no-undef': [
                'error',
                {
                    allowGlobals: true
                }
            ],

            // Abgedeckt durch @stylistic/jsx-curly-brace-presence
            'react/jsx-no-useless-fragment': [
                'error',
                {
                    allowExpressions: true
                }
            ],

            // Nicht nützlich mit TypeScript
            'react/jsx-one-expression-per-line': 'off',

            // ===== CODE QUALITY & CONSISTENCY =====
            'react/jsx-pascal-case': 'off',

            // Zu restriktiv für JSX
            'react/jsx-props-no-multi-spaces': 'off',

            // Zu opinion-based
            'react/jsx-props-no-spread-multi': 'off',

            // Zu opinion-based
            'react/jsx-props-no-spreading': 'off',

            // React 17+ JSX Transform
            'react/jsx-sort-default-props': 'off',

            // Mit TypeScript redundant
            'react/jsx-sort-props': 'off',

            // Prettier handled das
            'react/jsx-space-before-closing': 'off',

            // Abgedeckt durch @stylistic/jsx-max-props-per-line
            'react/jsx-tag-spacing': 'off',

            'react/jsx-uses-react': 'error',

            'react/jsx-uses-vars': 'error',

            // Abgedeckt durch @stylistic/jsx-tag-spacing
            'react/jsx-wrap-multilines': 'off',

            /*
             * Modern class fields
             * ===== LIFECYCLE & STATE MANAGEMENT =====
             */
            'react/no-access-state-in-setstate': 'error',

            // Nicht immer notwendig
            'react/no-adjacent-inline-elements': 'off',

            // ===== PERFORMANCE OPTIMIZATIONS =====
            'react/no-array-index-key': 'warn',

            // Prettier handled das
            'react/no-arrow-function-lifecycle': 'off',

            'react/no-children-prop': 'error',

            // Zu restriktiv
            'react/no-danger': 'warn',

            'react/no-danger-with-children': 'error',

            'react/no-deprecated': 'error',

            'react/no-did-mount-set-state': 'error',

            'react/no-did-update-set-state': 'error',

            'react/no-direct-mutation-state': 'error',

            'react/no-find-dom-node': 'error',

            // Moderne Patterns erlauben das
            'react/no-invalid-html-attribute': 'off',

            'react/no-is-mounted': 'error',

            // Zu restriktiv
            'react/no-multi-comp': 'off',

            // Spread patterns sind oft valid
            'react/no-namespace': 'off',

            // Zu viele false positives
            'react/no-object-type-as-default-prop': 'off',

            'react/no-redundant-should-component-update': 'error',

            'react/no-render-return-value': 'error',

            // Zu restriktiv für i18n
            'react/no-set-state': 'off',

            'react/no-string-refs': 'error',

            'react/no-this-in-sfc': 'error',

            'react/no-typos': 'error',

            'react/no-unescaped-entities': [
                'error',
                {
                    forbid: [
                        '>',
                        '"',
                        '\'',
                        '}'
                    ]
                }
            ],

            // Warn statt error für Flexibilität
            'react/no-unstable-nested-components': [
                'error',
                {
                    allowAsProps: false
                }
            ],

            'react/no-unused-class-component-methods': 'error',

            'react/no-unused-prop-types': [
                'error',
                {
                    skipShapeProps: true // Shape props oft nur teilweise genutzt
                }
            ],

            'react/no-unused-state': 'error',

            'react/no-will-update-set-state': 'error',

            'react/prefer-es6-class': ['error', 'always'],

            // TypeScript redundant
            'react/prefer-exact-props': 'off',

            // Namespaces manchmal nötig
            'react/prefer-read-only-props': 'off',

            'react/prefer-stateless-function': 'error',

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

            'react/state-in-constructor': ['error', 'never'],

            'react/static-property-placement': ['error', 'static public field'],

            'react/style-prop-object': 'error',

            'react/void-dom-elements-no-children': 'error' // Warn für Flexibilität
        },
        settings: {
            // PropTypes wrapper functions (for teams still using PropTypes)
            propWrapperFunctions: [
                'forbidExtraProps',
                {
                    object: 'Object',
                    property: 'freeze'
                },
                { property: 'myFavoriteWrapper' }
            ],

            react: {

                // Support for common HOCs and wrappers
                componentWrapperFunctions: [
                    'observer', // MobX
                    'memo', // React.memo
                    'forwardRef', // React.forwardRef
                    { property: 'styled' }, // Styled-components
                    { property: 'connect' } // Redux
                ],

                // Enterprise settings for better component detection
                createClass: 'createReactClass',

                // Form component detection
                formComponents: [
                    'Form',
                    {
                        formAttribute: 'onSubmit',
                        name: 'Formik'
                    }
                ],

                fragment: 'Fragment',

                // Link component detection
                linkComponents: [
                    'Link',
                    {
                        linkAttribute: 'to',
                        name: 'NavLink'
                    },
                    {
                        linkAttribute: 'to',
                        name: 'RouterLink'
                    }
                ],

                pragma: 'React',

                version: 'detect'
            }
        }
    },

    /*
     * ===== JSX ACCESSIBILITY (A11Y) RULES =====
     * Enterprise-Grade Accessibility Standards
     * Based on WCAG 2.1 AA, Google/Microsoft/Meta Accessibility Guidelines
     */
    a11yPlugin.flatConfigs.strict, // Basiert auf strict config
    {
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
                    ignoreNonDOM: true // Keine invaliden Roles erlaubt
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
                    ], // Either nesting or htmlFor
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
                    tr: ['none', 'presentation'] // Canvas kann als img behandelt werden
                }
            ],

            // Elements mit aria-activedescendant müssen tabbable sein
            'jsx-a11y/no-interactive-element-to-noninteractive-role': [
                'error',
                {
                    canvas: ['img', 'presentation'] // Canvas exceptions
                }
            ],

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

            // Scope nur auf th elements
            'jsx-a11y/tabindex-no-positive': 'error' // Warn level - manchmal design requirements
        },
        settings: {
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
    },

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

            'perfectionist/sort-object-types': [
                'error',
                {
                    groups: [
                        'multiline', // Komplexe Properties zuerst
                        'method', // Methods nach Properties (Airbnb Standard)
                        'property' // Einfache Properties zuletzt
                    ],
                    order: 'asc',
                    type: 'natural'
                }
            ],

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

    // ===== TSDOC PLUGIN =====
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.mts',
            '**/*.cts'
        ], // Only apply to TypeScript files
        plugins: {
            tsdoc: pluginTsDoc
        },
        rules: {
            'tsdoc/syntax': 'error' // Enterprise: TSDoc compliance ist Pflicht
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
            '@typescript-eslint/explicit-member-accessibility': ['error', {
               accessibility: 'explicit',
               overrides: {
                   'accessors': 'explicit',
                   'methods': 'explicit',
                   'properties': 'explicit',
                   'parameterProperties': 'explicit',
                   'constructors': 'no-public'
               }
             }],

            // ✅ ==== VERIFIED ====
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: {

                        // ADD: Optional members preference (Enterprise consistency)
                        optionalityOrder: 'required-first',

                        /*
                         * Keep all default memberTypes (sie sind enterprise-optimal!)
                         * ADD: Alphabetical sorting within groups
                         */
                        order: 'alphabetically-case-insensitive'
                    }
                }
            ],

            // Method Signature Enforcement
            '@typescript-eslint/method-signature-style': ['error', 'property'],

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
                    modifiers: ['static', 'readonly'],
                    selector: 'classProperty'
                },

                // ✅ Global Primitive Constants - UPPER_CASE (Google/Meta Standard)
                {
                    format: ['UPPER_CASE'],
                    modifiers: ['const', 'global'],
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
                    modifiers: ['const', 'global'],
                    selector: 'variable',
                    types: ['function']
                },

                // ✅ Enum Members - PascalCase (Meta/React Standard)
                {
                    format: ['PascalCase', 'UPPER_CASE'],
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
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    selector: 'variable'
                },

                // ✅ Functions - camelCase oder PascalCase (für React Components)
                {
                    format: ['camelCase', 'PascalCase'],
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
                    selector: ['objectLiteralProperty', 'typeProperty']
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
                            suggest: ['() => void', '(...args: unknown[]) => unknown']
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
            '@typescript-eslint/return-await': ['error', 'always'],

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
            'consistent-return': ['error', { treatUndefinedAsUnspecified: true }]
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
            '@typescript-eslint/consistent-type-imports': 'off'
        }
    }
)

export default config
