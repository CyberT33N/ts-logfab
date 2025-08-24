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
import importPlugin from 'eslint-plugin-import'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced Import/Export rules configuration
const importRules: {
    rules: TSESLint.Linter.RulesRecord
    settings: Record<string, unknown>
} = {
    rules: {
        // ===== TYPE IMPORTS (TypeScript Specific) =====
        /*
         *✅ ==== VERIFIED ====
         *Import type { Foo } - Enterprise Standard für TypeScript 5.0+
         */
        'import/consistent-type-specifier-style': [
            'error',
            'prefer-top-level'
        ],

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

        // ✅ ==== VERIFIED ====
        'import/max-dependencies': [
            'error',
            {
                // Maximale Dependencies pro File
                ignoreTypeImports: true,
                max: 10
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
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx'
            ]
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
}

/**
 * Creates the base Import/Export configuration.
 *
 * @returns The base Import/Export configuration.
 */
const createImportsBase = (): TSESLint.FlatConfig.ConfigArray => [
    importPlugin.configs.typescript,
    {
        name: 'enterprise/modules/imports-overrides',
        plugins: {
            import: importPlugin
        },
        rules: importRules.rules,
        settings: importRules.settings
    }
]

/**
 * Creates the overrides for Import/Export configuration.
 *
 * @returns The overrides config for barrel-like files.
 */
const createImportsOverrides = (): TSESLint.FlatConfig.Config => ({
    files: [
        '**/index.*',
        '**/barrel.*',
        '**/exports.*'
    ],
    name: 'enterprise/modules/imports-overrides:barrel-files',
    rules: { 'import/max-dependencies': 'off' }
})

/**
 * Creates the complete Import/Export configuration.
 *
 * @returns The complete Import/Export configuration.
 */
const createImportsAll = (): TSESLint.FlatConfig.ConfigArray => [
    ...createImportsBase(),
    createImportsOverrides()
]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Import/Export Configuration based on Google/Microsoft/Meta standards.
     * Combines import resolution, module boundaries, dependency management, and TypeScript integration.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-imports-config}
     */
    all: createImportsAll(),

    /**
     * Base Import/Export configuration without additional overrides.
     */
    base: createImportsBase(),

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createImportsAll(),

    /**
     * File-specific overrides for barrel-like files to relax dependency limits.
     */
    overrides: [createImportsOverrides()]

} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
