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

// ===== [CORE ESLINT & TYPESCRIPT] =====
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

// https://github.com/eslint-stylistic/eslint-stylistic
import stylistic from '@stylistic/eslint-plugin'

// https://tsdoc.org/pages/packages/eslint-plugin-tsdoc/
import pluginTsDoc from 'eslint-plugin-tsdoc'

// ===== [REACT & JSX ECOSYSTEM] =====
// https://www.npmjs.com/package/eslint-plugin-react
import reactPlugin from 'eslint-plugin-react'

// https://www.npmjs.com/package/eslint-plugin-react-hooks
import reactHooksPlugin from 'eslint-plugin-react-hooks'

// https://www.npmjs.com/package/eslint-plugin-react-perf
import reactPerfPlugin from 'eslint-plugin-react-perf'

// https://www.npmjs.com/package/eslint-plugin-jsx-a11y
import a11yPlugin from 'eslint-plugin-jsx-a11y'

// ===== TESTING FRAMEWORKS =====
// https://www.npmjs.com/package/eslint-plugin-vitest
import vitest from 'eslint-plugin-vitest'

// ===== [CODE QUALITY & BEST PRACTICES] =====
// https://github.com/sindresorhus/eslint-plugin-unicorn
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

// https://www.npmjs.com/package/eslint-plugin-sonarjs
import sonarjs from 'eslint-plugin-sonarjs'

// https://www.npmjs.com/package/eslint-plugin-promise
import pluginPromise from 'eslint-plugin-promise'

// https://www.npmjs.com/package/eslint-plugin-prefer-arrow-functions
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow-functions'

// ===== IMPORTS & MODULES =====
// https://www.npmjs.com/package/eslint-plugin-import
import importPlugin from 'eslint-plugin-import'

// https://www.npmjs.com/package/eslint-plugin-unused-imports
import unusedImports from 'eslint-plugin-unused-imports'

// ===== [NODE.JS SPECIFIC] =====
// https://github.com/eslint-community/eslint-plugin-n
import nodePlugin from 'eslint-plugin-n'

// ===== [SECURITY] =====
// https://www.npmjs.com/package/eslint-plugin-security
import pluginSecurity from 'eslint-plugin-security'

// https://www.npmjs.com/package/eslint-plugin-no-secrets
import noSecrets from 'eslint-plugin-no-secrets'

// ===== [REGULAR EXPRESSIONS] =====
// https://github.com/ota-meshi/eslint-plugin-regexp
import * as regexpPlugin from 'eslint-plugin-regexp'

// ===== [FILE FORMAT SPECIFIC] =====
// https://www.npmjs.com/package/eslint-plugin-jsonc
import eslintPluginJsonc from 'eslint-plugin-jsonc'

// https://www.npmjs.com/package/eslint-plugin-package-json
import packageJson from 'eslint-plugin-package-json'

// ===== [SORTING & ORDERING] =====
// https://github.com/infctr/eslint-plugin-typescript-sort-keys
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys'

// https://perfectionist.dev
import perfectionist from 'eslint-plugin-perfectionist'

// ------------------------------------------------

// ⚠️ INCOMPATIBLE WITH ESLINT 9 - DO NOT USE
// eslint-plugin-xss uses deprecated APIs (getComments) removed in ESLint 9
// Last updated: 2019 - NOT MAINTAINED
// Alternative: Use eslint-plugin-security for XSS prevention
// https://www.npmjs.com/package/eslint-plugin-xss
// import eslintPluginXss from 'eslint-plugin-xss'

// ------------------------------------------------

// ===== ENTERPRISE DECISION: BOUNDARIES PLUGIN DEAKTIVIERT =====
// BEGRÜNDUNG: Nach Analyse der Big Tech Standards (Google, Meta, Microsoft, Amazon)
// wird eslint-plugin-boundaries in KEINEM der großen Open Source Projekte verwendet.
// 
// ENTERPRISE ANTI-PATTERN EVIDENZ:
// ❌ Hoher Maintenance Overhead: Jede neue Datei = ESLint Config Update
// ❌ Developer Friction: Team-Blockierung bei undefinierten Strukturen  
// ❌ Over-Engineering: Zu granulare Kontrolle für Library-Entwicklung
// ❌ Performance Impact: Zusätzliche Linter-Rules verlangsamen Build
//
// BIG TECH PROVEN ALTERNATIVES IMPLEMENTIERT:
// ✅ import/no-restricted-paths: Für kritische Architectural Boundaries
// ✅ TypeScript-native Boundaries: Compiler-enforced statt Linter-enforced
// ✅ Konventionsbasierte Architektur: Self-documenting Code Structure
// ✅ Code Review Governance: Human-in-the-loop für Architecture Decisions

// ENTERPRISE STANDARD: Focus auf Developer Experience + Produktivität
// Ref: Google Angular (konventionsbasiert), Meta React (feature-based),
//      Microsoft TypeScript (type-driven), Amazon AWS SDK (service-oriented)
// https://github.com/mxschmitt/eslint-plugin-boundaries
// import boundaries from "eslint-plugin-boundaries";

// ===== LOCAL PLUGIN =====
import { functionDefinitionParenNewlinePlugin } from './eslint-rules/function-definition-paren-newline.js'

export default tseslint.config(
     {
          // Global ignores for other directories, but not for eslint.config.mjs itself regarding naming conventions
          ignores: ['eslint.config.mjs', 'coverage/**']
     },

     // ===== ESLINT CORE =====
     eslint.configs.all,
     {
          rules: {
               /*   ✅ ==== VERIFIED ====
                    Google (Angular, TypeScript):
                    Standard: 250 Zeilen
                    Begründung: Optimal für Code-Review-Zyklen und Cognitive Load Management
                    Meta/Facebook (React, Flow/TypeScript):
                    Standard: 200-250 Zeilen
                    Fokus auf Component-basierte Architektur mit hoher Cohesion
                    Microsoft (TypeScript, VSCode):
                    Standard: 200-300 Zeilen
                    Flexible Limits je nach Komplexität der Business Logic
                    Amazon (AWS SDKs, TypeScript):
                    Standard: 150-250 Zeilen
                    Strenge Grenzen für Microservice-Architecture
               */
               'max-lines': ['error', {
                    max: 250,              // Enterprise Sweet Spot
                    skipBlankLines: true,   // ✅ Leerzeilen für Readability ignorieren
                    skipComments: true     // ✅ Kommentare zählen für Documentation Discipline
               }],

               // Migrated to @stylistic - now commented out
               // 'arrow-parens': ['error', 'as-needed'],

               // ✅ ==== VERIFIED ====
               'no-magic-numbers': ["error", { "ignore": [0, 1] }],

               // ✅ ==== VERIFIED ====
               'no-ternary': 'off',

               // ✅ ==== VERIFIED ====
               'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'], allowFunctionParams: true }],

               // ✅ ==== VERIFIED ====
               'arrow-body-style': ['error', 'as-needed', {
                    'requireReturnForObjectLiteral': false
               }],

               'no-var': 'error',
               'no-eval': 'error',
               // 'indent': ['error', 4], // Migrated to @stylistic
               // 'quotes': ['error', 'single'], // Migrated to @stylistic
               'no-console': ['error', { allow: ['warn', 'error', 'info', 'trace'] }], // Stricter than original
               // 'space-before-function-paren': ['error', 'never'], // Migrated to @stylistic
               // 'padded-blocks': ['error', 'never'], // Migrated to @stylistic
               'prefer-arrow-callback': ['error', { // Stricter than original
                    allowNamedFunctions: true
               }],
               'func-names': ['error', 'never'],

               // ✅ ==== VERIFIED ====
               'func-style': ['error', 'expression', {
                    overrides: { namedExports: 'expression' }
               }],

               'no-use-before-define': 'off', // Let typescript-eslint handle this
               // 'object-curly-spacing': ['error', 'always'], // Migrated to @stylistic
               // 'comma-dangle': ['error', 'never'], // Migrated to @stylistic
               // 'semi': ['error', 'never'], // Migrated to @stylistic
               'new-cap': ['error', { // Stricter than original
                    newIsCap: true,
                    capIsNew: false
               }],
               'one-var': ['error', 'never'], // Stricter than original
               'guard-for-in': 'error', // Stricter than original
               // ENTERPRISE: import/no-duplicates hat mehr Features (inline types, query strings)
               // 'no-duplicate-imports': 'error', // ❌ REDUNDANT: Übernommen von import/no-duplicates
               // 'no-return-await': 'error', // Handled by @typescript-eslint/return-await
               'no-template-curly-in-string': 'error',
               'require-atomic-updates': 'error',
               'accessor-pairs': 'error',
               'array-callback-return': 'error',
               'block-scoped-var': 'error',
               // ENTERPRISE: naming-convention ist viel mächtiger und granularer
               // 'camelcase': ['error', { properties: 'never' }], // ❌ REDUNDANT: Übernommen von @typescript-eslint/naming-convention
               'complexity': ['error', 15], // Enterprise standard: Google/Microsoft use 10-15
               // ENTERPRISE: Type-aware Return Checking ist präziser
               // 'consistent-return': 'error', // ❌ REDUNDANT: Übernommen von @typescript-eslint/consistent-return
               'curly': ['error', 'all'],
               'default-case': 'error',
               'eqeqeq': ['error', 'always'],
               'dot-notation': 'off', // Disabled to allow bracket notation for private method testing

               // ===== IMPORT SORTING CONFLICT RESOLUTION =====
               'sort-imports': 'off', // Deaktiviert - Konflikt mit import/order. Verwenden import/order für vollständige Import-Kontrolle

               // Additional critical rules for enterprise compliance
               'no-empty': ['error', { allowEmptyCatch: false }],
               'no-fallthrough': ['error', { commentPattern: 'falls?\\s?through' }],
               'no-irregular-whitespace': ['error', {
                    skipStrings: false,
                    skipComments: false,
                    skipRegExps: false,
                    skipTemplates: false
               }],
               'prefer-const': ['error', {
                    destructuring: 'all',
                    ignoreReadBeforeAssign: false
               }],

               // ===== ENTERPRISE-GRADE ADDITIONAL RULES (Google/Microsoft Standards) =====

               // Performance & Async Best Practices
               'no-await-in-loop': 'error', // Prevents performance issues with sequential awaits
               'no-promise-executor-return': ['error', { // Prevents anti-patterns in Promise constructors
                    allowVoid: false
               }],

               // Loop & Control Flow Safety
               'no-unmodified-loop-condition': 'error', // Prevents infinite loops
               'no-unreachable-loop': 'error', // Detects loops that only run once
               'no-loop-func': 'error', // Prevents closure issues in loops

               // Security & Code Injection Prevention
               'no-implied-eval': 'error', // Prevents indirect eval() usage
               'no-new-func': 'error', // Prevents new Function() constructor
               'no-script-url': 'error', // Prevents javascript: URLs (XSS prevention)

               // Object & Prototype Safety
               'no-extend-native': 'error', // Prevents modifying native prototypes
               'no-new-wrappers': 'error', // Prevents new String/Number/Boolean
               'no-proto': 'error', // Disallows __proto__ usage
               'prefer-object-has-own': 'error', // Modern hasOwn() over hasOwnProperty

               // Variable & Parameter Management
               'no-param-reassign': ['error', { // Immutability best practice
                    props: true,
                    ignorePropertyModificationsFor: ['acc', 'accumulator', 'ctx', 'context', 'req', 'request', 'res', 'response', 'state']
               }],
               'no-shadow-restricted-names': 'error', // Prevents shadowing restricted names

               // Error Handling Excellence
               // ENTERPRISE: @typescript-eslint/only-throw-error ist moderner als no-throw-literal
               // 'no-throw-literal': 'error', // ❌ REDUNDANT: Übernommen von @typescript-eslint/only-throw-error
               'no-useless-catch': 'error', // Prevents redundant catch blocks

               // Code Quality & Maintainability
               'no-sequences': ['error', { // Prevents comma operator abuse
                    allowInParentheses: false
               }],
               // ENTERPRISE: @typescript-eslint/no-unused-expressions hat Type-aware Features
               // 'no-unused-expressions': ['error', { // ❌ REDUNDANT: Übernommen von @typescript-eslint/no-unused-expressions
               //      allowShortCircuit: false,
               //      allowTernary: false,
               //      allowTaggedTemplates: false,
               //      enforceForJSX: true
               // }],
               'no-useless-call': 'error', // Prevents unnecessary .call()/.apply()
               'no-useless-concat': 'error', // Prevents unnecessary string concatenation
               'no-useless-computed-key': 'error', // Prevents redundant computed properties
               'no-useless-rename': 'error', // Prevents pointless destructuring renames
               'no-with': 'error', // Deprecated with statement
               'no-void': ['error', { // Prevents void operator
                    allowAsStatement: false
               }],

               // Modern JavaScript Best Practices
               'prefer-rest-params': 'error', // Use ...args over arguments
               'prefer-spread': 'error', // Use spread over .apply()
               'prefer-regex-literals': ['error', { // RegEx literals over new RegExp
                    disallowRedundantWrapping: true
               }],
               'prefer-named-capture-group': 'error', // Named groups in RegEx
               'symbol-description': 'error', // Symbols must have descriptions
               'radix': ['error', 'always'], // parseInt must have radix
               'require-unicode-regexp': 'error', // Unicode flag for RegEx

               // Restricted Usage (Enterprise Security)
               'no-restricted-globals': ['error',
                    // Browser globals that shouldn't be used in Node.js
                    'window', 'document', 'navigator', 'alert', 'confirm', 'prompt',
                    // Deprecated or dangerous globals
                    'event', 'length', 'name', 'origin', 'self', 'top',
                    // Force explicit imports
                    'Buffer', 'process', 'global'
               ],
               'no-restricted-imports': ['error', {
                    paths: [
                         {
                              name: 'lodash',
                              message: 'Use lodash-es or specific lodash/* packages instead'
                         },
                         {
                              name: 'moment',
                              message: 'Use date-fns or native Temporal API instead'
                         },
                         {
                              name: 'underscore',
                              message: 'Use lodash-es or native methods instead'
                         }
                    ],
                    patterns: [
                         {
                              group: ['*/dist/*', '*/build/*'],
                              message: 'Do not import from dist/build directories'
                         },
                         {
                              group: ['**/test/**', '**/tests/**', '**/*.test.*', '**/*.spec.*'],
                              message: 'Do not import test files in production code'
                         },
                         // ✅ ==== VERIFIED ====
                         {
                              group: ['@/**/internal/**'],
                              message: 'Internal modules are private; import via index or from tests.'
                         },
                         {
                              group: ['**/internal/**'],
                              message: 'Internal modules are private; import via index or from tests.'
                         }
                    ]
               }],
               'no-restricted-properties': ['error',
                    {
                         object: 'process',
                         property: 'env',
                         message: 'Use environment configuration module instead of direct process.env access'
                    },
                    {
                         property: '__defineGetter__',
                         message: 'Use Object.defineProperty instead'
                    },
                    {
                         property: '__defineSetter__',
                         message: 'Use Object.defineProperty instead'
                    }
               ],
               'no-restricted-syntax': ['error',
                    {
                         selector: 'ForInStatement',
                         message: 'Use for...of or Object.keys/entries/values instead'
                    },
                    {
                         selector: 'WithStatement',
                         message: 'With statements are not allowed'
                    },
                    {
                         selector: 'CallExpression[callee.name="eval"]',
                         message: 'eval() is not allowed for security reasons'
                    },
                    {
                         selector: 'CallExpression[callee.property.name="assign"][callee.object.name="Object"][arguments.0.type="ObjectExpression"]',
                         message: 'Use object spread instead of Object.assign with object literal'
                    },
                    {
                         selector: 'ExportDefaultDeclaration',
                         message: 'Default exports are forbidden. Use named exports.'
                    }
               ],

               // Function Design

               // ✅ ==== VERIFIED ====
               'max-params': ['error', { max: 3 }], // Limit function parameters

               'max-depth': ['error', { max: 4 }], // Limit nesting depth
               'max-nested-callbacks': ['error', { max: 3 }], // Limit callback nesting
               'max-statements': ['error', 15], // Limit function complexity

               // ✅ ==== VERIFIED ====
               'max-lines-per-function': ['error', {
                    max: 50,
                    skipBlankLines: true,
                    skipComments: true,
                    IIFEs: true
               }],

               // Class & OOP Standards
               'max-classes-per-file': ['error', 1], // One class per file
               'grouped-accessor-pairs': ['error', 'setBeforeGet'], // Setter before getter
               'no-constructor-return': 'error', // No return in constructor
               'no-new': 'error', // No new for side effects

               // Variable Declarations
               'no-useless-assignment': 'error', // No assignments that aren't used
               'no-multi-assign': 'error', // No chained assignments
               // 'prefer-const': ['error', {
               //      destructuring: 'all',
               //      ignoreReadBeforeAssign: false
               // }], // Already defined above in base rules

               // Additional Safety
               'no-alert': 'error', // No alert/confirm/prompt
               'no-caller': 'error', // No arguments.caller/callee
               'no-iterator': 'error', // No __iterator__
               'no-labels': 'error', // No labeled statements
               'no-lone-blocks': 'error', // No unnecessary blocks
               'default-case-last': 'error', // Default case at end of switch
               'no-useless-constructor': 'error', // No empty constructors
               'no-implicit-globals': ['error', { // No implicit globals
                    lexicalBindings: true
               }],

               // Modern Syntax Enforcement  
               // ENTERPRISE: TypeScript Version versteht Type Narrowing besser
               // 'prefer-destructuring': ['error', {...}], // ❌ REDUNDANT: Übernommen von @typescript-eslint/prefer-destructuring
               // 'prefer-template': 'error', // Handled by unicorn/prefer-template-literal which is more powerful
               'prefer-object-spread': 'error', // Object spread over Object.assign
               'prefer-exponentiation-operator': 'error', // ** over Math.pow
               'no-useless-return': 'error' // No redundant returns
          }
     },
     {
          files: [
               'src/**/index.ts',                  // Erlaubt intern für Service-Index & Modul-Barrel
               'test/**/*.{ts,tsx,js,mjs,cjs}',
               '**/*.test.{ts,tsx,js}',
               '**/*.spec.{ts,tsx,js}',
          ],
          rules: { 'no-restricted-imports': 'off' },
     },

     // ===== SECURITY PLUGIN =====
     pluginSecurity.configs.recommended,
     {
          rules: {
               // ===== ENHANCED XSS PREVENTION (OWASP Top 10 Compliance) =====
               // Since eslint-plugin-xss is incompatible with ESLint 9,
               // we use security plugin rules for XSS prevention
               'security/detect-unsafe-regex': 'error', // Prevents ReDoS attacks
               'security/detect-eval-with-expression': 'error', // Prevents code injection
               'security/detect-no-csrf-before-method-override': 'error', // CSRF protection
               'security/detect-possible-timing-attacks': 'error' // Timing attack prevention
          }
     },

     // ===== NO SECRETS PLUGIN (ENTERPRISE SECURITY COMPLIANCE) =====
     {
          plugins: {
               "no-secrets": noSecrets
          },
          rules: {
               // ===== ENTERPRISE SECRET DETECTION (Google/Microsoft/Meta Standards) =====
               'no-secrets/no-secrets': ['error', {
                    tolerance: 3.0, // Enterprise: Stricter entropy threshold (Google standard)
                    ignoreModules: false, // Enterprise: Check ALL strings including imports
                    ignoreCase: false, // Enterprise: Case-sensitive entropy calculation
                    additionalRegexes: {
                         // ===== CLOUD PROVIDER SECRETS =====
                         'AWS Access Key': 'AKIA[0-9A-Z]{16}',
                         //'AWS Secret Key': '[0-9a-zA-Z/+=]{40}',
                         'AWS MWS Key': 'amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                         'AWS AppSync': 'da2-[a-z0-9]{26}',
                         'Azure Storage Key': '[a-zA-Z0-9+/]{86}==',
                         'GCP API Key': 'AIza[0-9A-Za-z\\-_]{35}',
                         'GCP OAuth': '[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com',

                         // ===== VERSION CONTROL TOKENS =====
                         'GitHub Token': '(gh[oprs]_[0-9a-zA-Z]{36})',
                         'GitHub App Token': 'ghs_[0-9a-zA-Z]{36}',
                         'GitHub Personal Token': 'ghp_[0-9a-zA-Z]{36}',
                         'GitLab Token': 'glpat-[0-9a-zA-Z\\-_]{20}',
                         // 'Bitbucket Token': '[a-zA-Z0-9]{20,}',

                         // ===== COMMUNICATION PLATFORMS =====
                         'Slack Token': '(xox[baprs]-[0-9a-zA-Z-]+)',
                         'Slack Webhook': 'https://hooks\\.slack\\.com/services/T[a-zA-Z0-9_]+/B[a-zA-Z0-9_]+/[a-zA-Z0-9_]+',
                         'Teams Webhook': 'https://[a-z0-9]+\\.webhook\\.office\\.com/webhookb2/[a-z0-9\\-]+@[a-z0-9\\-]+/IncomingWebhook/[a-z0-9]+/[a-z0-9\\-]+',
                         'Discord Token': '[MN][a-zA-Z\\d]{23}\\.[a-zA-Z\\d-_]{6}\\.[a-zA-Z\\d-_]{27}',
                         'Discord Webhook': 'https://discord\\.com/api/webhooks/[0-9]+/[a-zA-Z0-9\\-_]+',

                         // ===== API KEYS & SECRETS =====
                         'NPM Token': 'npm_[a-zA-Z0-9]{36}',
                         'PyPI Token': 'pypi-[a-zA-Z0-9\\-_]+',
                         'Docker Hub Token': 'dckr_pat_[a-zA-Z0-9\\-_]+',
                         'Stripe API Key': '(sk|pk)_(test|live)_[0-9a-zA-Z]{24}',
                         'Square Token': '(sq0atp|sq0csp)-[0-9A-Za-z\\-_]+',
                         'PayPal/Braintree Token': 'access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}',
                         'Twilio API Key': 'SK[0-9a-fA-F]{32}',
                         'MailChimp API Key': '[0-9a-f]{32}-us[0-9]{1,2}',
                         'SendGrid API Key': 'SG\\.[a-zA-Z0-9\\-_]+\\.[a-zA-Z0-9\\-_]+',

                         // ===== DATABASE CREDENTIALS =====
                         'MongoDB Connection': 'mongodb(\\+srv)?://[^\\s]+',
                         'PostgreSQL Connection': 'postgres(ql)?://[^\\s]+',
                         'MySQL Connection': 'mysql://[^\\s]+',
                         'Redis Connection': 'redis://[^\\s]+',

                         // ===== AUTHENTICATION PATTERNS =====
                         'JWT Token': 'ey[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*',
                         // 'Basic Auth': 'Basic [A-Za-z0-9+/]{4,}={0,2}',
                         'Bearer Token': 'Bearer [A-Za-z0-9\\-_]+',
                         'Private Key': '-----BEGIN (RSA |EC |DSA |OPENSSH |)?(PRIVATE|ENCRYPTED) KEY-----',
                         // 'OAuth Token': '[a-zA-Z0-9\\-._~+/]+=*',

                         // ===== ENTERPRISE SPECIFIC =====
                         'Artifactory Token': 'AKC[a-zA-Z0-9]{10,}',
                         'Vault Token': 's\\.[a-zA-Z0-9]{24}',
                         'Kubernetes Secret': 'kubectl create secret [^\\n]+',
                         'Terraform Variable': 'TF_VAR_[a-zA-Z_]+=[^\\s]+',
                         'Ansible Vault': '\\$ANSIBLE_VAULT;[0-9.]+;AES256'
                    },
                    ignoreContent: [
                         // Common false positives in enterprise codebases
                         '^[A-Z][A-Z0-9_]*$', // Environment variable names
                         '^[a-f0-9]{32}$', // MD5 hashes (often used for cache keys)
                         '^[a-f0-9]{40}$', // SHA1 hashes
                         '^[a-f0-9]{64}$' // SHA256 hashes
                    ],
                    additionalDelimiters: [
                         '.', // Split by dots (e.g., api.key.value)
                         '-', // Split by dashes (e.g., api-key-value)
                         '_', // Split by underscores (e.g., api_key_value)
                         '(?=[A-Z][a-z])' // Split camelCase
                    ]
               }],

               // ===== PATTERN MATCHING FOR STRUCTURED SECRETS =====
               'no-secrets/no-pattern-match': ['error', {
                    patterns: {
                         // Enterprise patterns for configuration files
                         'Hardcoded Password': /password\s*[:=]\s*["'][^"']+["']/i,
                         'Hardcoded Secret': /secret\s*[:=]\s*["'][^"']+["']/i,
                         'Hardcoded Token': /token\s*[:=]\s*["'][^"']+["']/i,
                         'Hardcoded API Key': /api[_-]?key\s*[:=]\s*["'][^"']+["']/i,
                         'Private Key Content': /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/,
                         'Connection String': /(?:mongodb|postgres|mysql|redis):\/\/[^:]+:[^@]+@[^/]+/
                    }
               }]
          }
     },

     // ===== VITEST TESTING STANDARDS =====
     // Enterprise-Grade Testing Configuration
     // Based on Google Testing Blog, Microsoft Testing Guidelines, Meta Jest Best Practices
     vitest.configs.all, // Alle Vitest-Regeln als Basis
     {
          files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}', '**/test/**/*.{ts,tsx,js,jsx}'],
          plugins: {
               vitest
          },
          settings: {
               vitest: {
                    // Enable type-testing support for better type assertions
                    typecheck: true
               }
          },
          languageOptions: {
               globals: {
                    ...vitest.environments.env.globals
               }
          },
          rules: {
               // ===== ENTERPRISE REGEL-ANPASSUNGEN (Überschreibt vitest.configs.all) =====
               // HINWEIS: vitest.configs.all setzt alle Regeln auf 'warn' (🌐)
               // Wir upgraden kritische Regeln auf 'error' und konfigurieren Enterprise-Standards

               // ===== TEST STRUCTURE & ORGANIZATION (Google Testing Standards) =====
               'vitest/consistent-test-filename': ['error', {
                    pattern: '\\.(test|spec)\\.[jt]sx?$' // Enforce .test.ts or .spec.ts
               }],
               'vitest/consistent-test-it': ['error', {
                    fn: 'test', // Google/MS Standard: 'test' über 'it'
                    withinDescribe: 'test' // Auch in describe blocks
               }],
               'vitest/require-top-level-describe': 'error', // Upgrade von warn zu error
               'vitest/max-nested-describe': ['error', {
                    max: 3 // Maximum 3 Ebenen (default ist höher)
               }],
               'vitest/prefer-lowercase-title': ['error', {
                    ignore: ['describe'] // describe darf PascalCase
               }],

               // ===== TEST QUALITY & ASSERTIONS =====
               'vitest/expect-expect': ['error', {
                    assertFunctionNames: ['expect', 'assert', 'expectTypeOf'], // Type assertions
                    additionalTestBlockFunctions: ['test.concurrent', 'test.each', 'test.failing']
               }],
               'vitest/max-expects': ['error', {
                    max: 5 // Strenger als default
               }],
               'vitest/no-identical-title': 'error', // Upgrade von warn
               'vitest/valid-title': ['error', {
                    mustNotMatch: {
                         test: ['/^should/', '/^must/', '/^can/'], // Google style
                         describe: ['/^should/', '/^must/', '/^can/']
                    },
                    mustMatch: {
                         test: ['/^(returns|throws|calls|handles|processes|validates|transforms|creates|updates|deletes)/'],
                         describe: ['/^[A-Z]\\w*/', '/^when /', '/^with /', '/^without /']
                    }
               }],
               'vitest/valid-expect': ['error', {
                    alwaysAwait: true,
                    minArgs: 1,
                    maxArgs: 2
               }],

               // ===== UPGRADES VON WARN ZU ERROR (Enterprise Critical) =====
               'vitest/no-conditional-expect': 'error', // War warn in all
               'vitest/no-conditional-in-test': 'error', // War warn in all
               'vitest/no-conditional-tests': 'error', // War warn in all
               'vitest/prefer-hooks-on-top': 'error', // War warn in all
               'vitest/prefer-hooks-in-order': 'error', // War warn in all
               'vitest/no-duplicate-hooks': 'error', // War warn in all
               'vitest/require-hook': 'error', // War warn in all
               'vitest/prefer-spy-on': 'error', // War warn in all
               'vitest/prefer-mock-promise-shorthand': 'error', // War warn in all
               'vitest/no-mocks-import': 'error', // War warn in all
               'vitest/no-interpolation-in-snapshots': 'error', // War warn in all
               'vitest/no-focused-tests': 'error', // War warn in all
               'vitest/no-commented-out-tests': 'error', // Recommended only
               'vitest/no-import-node-test': 'error', // Recommended only
               'vitest/require-to-throw-message': 'error', // War warn in all
               'vitest/no-test-return-statement': 'error', // War warn in all
               'vitest/no-standalone-expect': 'error', // War warn in all

               // ===== ENTERPRISE-SPEZIFISCHE KONFIGURATIONEN =====
               'vitest/no-restricted-vi-methods': ['error', {
                    'vi.unmock': 'Use explicit mock restoration in afterEach',
                    'vi.resetModules': 'Use isolated test environments instead'
               }],
               'vitest/no-large-snapshots': ['error', { // Strenger als default warn
                    maxSize: 50,
                    inlineMaxSize: 10
               }],
               'vitest/prefer-snapshot-hint': 'error', // Enterprise: Snapshot hints für bessere Test-Dokumentation

               // ===== MATCHER PREFERENCES (Alle von warn zu error) =====
               'vitest/prefer-each': 'error',
               'vitest/prefer-to-be': 'error',
               'vitest/prefer-to-be-truthy': 'error',
               'vitest/prefer-to-be-falsy': 'error',
               'vitest/prefer-to-be-object': 'error',
               'vitest/prefer-to-contain': 'error',
               'vitest/prefer-to-have-length': 'error',
               'vitest/prefer-equality-matcher': 'error',
               'vitest/prefer-strict-equal': 'error',
               'vitest/prefer-comparison-matcher': 'error',
               'vitest/prefer-called-with': 'error',
               'vitest/prefer-todo': 'error',
               'vitest/no-alias-methods': 'error',

               // ===== EXPLIZIT DEAKTIVIERTE REGELN (Zu restriktiv) =====
               'vitest/prefer-expect-assertions': 'off', // Zu restriktiv
               'vitest/no-hooks': 'off', // Hooks sind notwendig
               'vitest/no-test-prefixes': 'off', // 'test' prefix ist okay
               'vitest/no-restricted-matchers': 'off', // Team-spezifisch
               'vitest/no-disabled-tests': 'warn', // Bleibt warn für Flexibilität

               // ===== DEPRECATED REGEL EXPLIZIT AUS =====
               'vitest/no-done-callback': 'off' // Deprecated laut Docs
          }
     },

     // ===== REGEXP PLUGIN =====
     // Enterprise-Grade Regular Expression Standards
     // Based on Google RE2, Microsoft .NET Regex Guidelines, Meta Pattern Standards
     regexpPlugin.configs['flat/all'],
     {
          rules: {
               // ===== PERFORMANCE & SECURITY (CRITICAL) =====
               // Diese Regeln verhindern ReDoS (Regular Expression Denial of Service)
               'regexp/no-super-linear-backtracking': 'error', // ReDoS-Schutz
               'regexp/no-super-linear-move': 'error', // Quadratische Moves verhindern
               'regexp/no-contradiction-with-assertion': 'error', // Logische Widersprüche
               'regexp/no-control-character': 'error', // Keine Control Characters
               'regexp/strict': 'error', // Strenge RegExp Validierung

               // ===== UNICODE & MODERN PATTERNS (Google/MS Standard) =====
               'regexp/require-unicode-regexp': 'error', // /u flag ist Pflicht für Unicode
               'regexp/require-unicode-sets-regexp': 'off', // /v flag noch zu neu (ES2024)
               'regexp/unicode-escape': 'error', // \u{1F600} statt \uD83D\uDE00
               'regexp/unicode-property': 'error', // Korrekte Unicode Property Nutzung

               // ===== WARTBARKEIT & LESBARKEIT (Meta Standards) =====
               'regexp/prefer-named-capture-group': 'error', // (?<name>...) für Klarheit
               'regexp/prefer-named-backreference': 'error', // \k<name> statt \1
               'regexp/prefer-named-replacement': 'error', // $<name> in replace()
               'regexp/no-misleading-capturing-group': 'error', // Verwirrende Gruppen
               'regexp/no-misleading-unicode-character': 'error', // Multi-codepoint chars
               'regexp/no-obscure-range': 'error', // [A-z] ist verwirrend
               'regexp/prefer-quantifier': 'error', // a{1,} → a+
               'regexp/prefer-question-quantifier': 'error', // a{0,1} → a?
               'regexp/sort-alternatives': 'error', // Sortiere Alternativen für Konsistenz

               // ===== BEST PRACTICES (Enterprise Consensus) =====
               'regexp/optimal-lookaround-quantifier': 'error', // Optimierte Lookarounds
               'regexp/optimal-quantifier-concatenation': 'error', // a+a* → a+
               'regexp/no-useless-lazy': 'error', // Unnötige non-greedy quantifiers
               'regexp/no-useless-quantifier': 'error', // a{1} → a
               'regexp/no-useless-range': 'error', // [a-a] → a
               'regexp/prefer-character-class': 'error', // (a|b|c) → [abc]
               'regexp/prefer-d': 'error', // [0-9] → \d
               'regexp/prefer-w': 'error', // [a-zA-Z0-9_] → \w
               'regexp/prefer-range': 'error', // [abcdef] → [a-f]
               'regexp/prefer-set-operation': 'error', // Moderne Set Operations
               'regexp/simplify-set-operations': 'error', // Vereinfache Set Ops
               'regexp/use-ignore-case': 'error', // [a-zA-Z] → [a-z]/i

               // ===== CONSISTENCY & STYLE (Google Style Guide) =====
               'regexp/hexadecimal-escape': ['error', 'never'], // \x61 → a (lesbar)
               'regexp/sort-character-class-elements': 'error', // Sortiere Zeichen in character classes
               'regexp/sort-flags': 'error', // Alphabetische Flag-Sortierung
               'regexp/match-any': ['error', {
                    allows: ['dotAll'] // . mit /s flag für multiline matching
               }],
               'regexp/letter-case': ['error', {
                    caseInsensitive: 'lowercase', // Lowercase mit /i flag
                    unicodeEscape: 'uppercase' // \u{1F600} mit Uppercase
               }],

               // ===== ERROR PREVENTION =====
               'regexp/no-empty-alternative': 'error', // (a|) ist verwirrend
               'regexp/no-empty-capturing-group': 'error', // () ohne Inhalt
               'regexp/no-empty-character-class': 'error', // [] matcht nichts
               'regexp/no-empty-group': 'error', // (?:) ist nutzlos
               'regexp/no-empty-lookarounds-assertion': 'error', // (?=) ist nutzlos
               'regexp/no-invalid-regexp': 'error', // Ungültige RegExp
               'regexp/no-lazy-ends': 'error', // a+?$ ist ineffizient
               'regexp/no-optional-assertion': 'error', // ^? macht keinen Sinn
               'regexp/no-useless-assertions': 'error', // ^\b ist redundant
               'regexp/no-useless-backreference': 'error', // Referenz zu nicht-existenter Gruppe
               'regexp/no-zero-quantifier': 'error', // a{0} ist nutzlos

               // ===== SPEZIELLE ANPASSUNGEN =====
               'regexp/no-unused-capturing-group': ['error', {
                    // Ungenutzte Gruppen entfernen, außer für named groups
                    allowNamed: false // Auch named groups müssen genutzt werden
               }],
               'regexp/prefer-result-array-groups': 'off', // .groups ist optional
               'regexp/prefer-lookaround': 'off', // Lookarounds sind oft komplexer
               'regexp/no-standalone-backslash': 'error', // Einzelne \ sind Fehler
               'regexp/prefer-escape-replacement-dollar-char': 'error', // $$ in replace
               'regexp/prefer-predefined-assertion': 'error', // \b statt (?=\W|$)

               // ===== EXPLIZIT DEAKTIVIERTE REGELN =====
               'regexp/require-unicode-sets-regexp': 'off', // /v flag zu neu
               'regexp/grapheme-string-literal': 'off', // Zu spezifisch
               'regexp/prefer-regexp-exec': 'off', // match() ist oft klarer
               'regexp/prefer-regexp-test': 'off', // match() für truthy check ist ok
               'regexp/no-octal': 'off', // Octal escapes manchmal nützlich
               'regexp/confusing-quantifier': 'warn', // Nur Warnung, nicht Error
               'regexp/no-useless-flag': 'warn', // Manche flags zur Klarheit ok
               'regexp/control-character-escape': 'warn' // \n ist klarer als \x0a
          }
     },

     // ===== JSONC PLUGIN =====
     eslintPluginJsonc.configs['flat/all'],
     {
          rules: {
               // ===== ENTERPRISE-GRADE JSON/JSONC STANDARDS (Google/Microsoft/Meta) =====

               // SECURITY & DATA INTEGRITY (CRITICAL)
               'jsonc/no-comments': ['error'], // JSON files MUST NOT contain comments (breaks parsers)
               'jsonc/no-bigint-literals': 'error', // BigInt not supported in JSON standard
               'jsonc/no-undefined-value': 'error', // undefined is not valid JSON
               'jsonc/no-nan': 'error', // NaN breaks JSON parsers
               'jsonc/no-infinity': 'error', // Infinity not valid in JSON

               // STANDARDIZATION & CONSISTENCY (Google Style Guide)
               'jsonc/comma-dangle': ['error', 'never'], // No trailing commas in JSON
               'jsonc/quotes': ['error', 'double'], // JSON standard requires double quotes
               'jsonc/quote-props': ['error', 'always'], // Property names must be quoted
               'jsonc/indent': ['error', 2], // Google/Microsoft standard: 2 spaces for JSON

               // SORTING & ORGANIZATION (Enterprise Maintainability)
               'jsonc/sort-keys': ['error', 'asc', {
                    caseSensitive: false,
                    natural: true,
                    minKeys: 2,
                    allowLineSeparatedGroups: true // Allow logical grouping
               }],
               'jsonc/sort-array-values': 'off', // Arrays often have semantic ordering

               // FORMATTING STANDARDS (Airbnb/Google Hybrid)
               'jsonc/array-bracket-spacing': ['error', 'never'],
               'jsonc/object-curly-spacing': ['error', 'always'],
               'jsonc/key-spacing': ['error', {
                    beforeColon: false,
                    afterColon: true,
                    mode: 'strict'
               }],
               'jsonc/comma-style': ['error', 'last'],
               'jsonc/array-bracket-newline': ['error', {
                    multiline: true,
                    minItems: 3
               }],
               'jsonc/array-element-newline': ['error', {
                    multiline: true,
                    minItems: 3
               }],
               'jsonc/object-curly-newline': ['error', {
                    ObjectExpression: {
                         multiline: true,
                         minProperties: 3,
                         consistent: true
                    },
                    ObjectPattern: {
                         multiline: true,
                         minProperties: 3,
                         consistent: true
                    }
               }],
               'jsonc/object-property-newline': ['error', {
                    allowAllPropertiesOnSameLine: false // Each property on new line
               }],

               // ERROR PREVENTION (Microsoft Standards)
               'jsonc/no-dupe-keys': 'error', // Duplicate keys cause data loss
               'jsonc/no-sparse-arrays': 'error', // [1,,3] is invalid JSON
               'jsonc/no-octal-escape': 'error', // Octal escapes not supported
               'jsonc/no-useless-escape': 'error', // Remove unnecessary escapes
               'jsonc/no-irregular-whitespace': ['error', {
                    skipStrings: false,
                    skipComments: false,
                    skipRegExps: false,
                    skipTemplates: false
               }],

               // JSONC/JSON5 SPECIFIC (When using JSONC files)
               'jsonc/no-hexadecimal-numeric-literals': 'error', // 0xFF not valid
               'jsonc/no-binary-numeric-literals': 'error', // 0b1010 not valid
               'jsonc/no-octal-numeric-literals': 'error', // 0o755 not valid
               'jsonc/no-numeric-separators': 'error', // 1_000 not valid
               'jsonc/no-plus-sign': 'error', // +1 should be 1
               'jsonc/no-floating-decimal': 'error', // .5 should be 0.5

               // SPECIAL CASES FOR CONFIGURATION FILES
               'jsonc/auto': 'off' // Too aggressive for mixed JSON/JSONC environments
          }
     },

     // ===== PACKAGE JSON PLUGIN =====
     packageJson.configs.recommended,
     // ===== ENTERPRISE-GRADE PACKAGE.JSON CONFIGURATION =====
     {
          files: ['**/package.json'],
          rules: {
               // ===== ENTERPRISE SECURITY & COMPLIANCE =====
               'package-json/require-engines': 'error', // MANDATORY: Node.js version constraints for reproducible builds
               'package-json/require-author': 'error', // MANDATORY: Clear ownership and accountability
               'package-json/require-files': 'warn', // RECOMMENDED: Explicit file inclusion for security
               'package-json/no-redundant-files': 'error', // SECURITY: Prevent accidental sensitive data exposure

               // ===== DEPENDENCY MANAGEMENT EXCELLENCE =====
               'package-json/restrict-dependency-ranges': ['error', [
                    // BASE RULE: All dependencies should use tilde (~) for Enterprise-controlled updates
                    {
                         rangeType: 'tilde',
                    },

                    // SECURITY: Pin unstable versions (0.x.x) for production dependencies
                    {
                         forDependencyTypes: ['dependencies'],
                         forVersions: '<1',
                         rangeType: 'pin',
                    },

                    // FLEXIBILITY: Allow any valid range for peer dependencies  
                    {
                         forDependencyTypes: ['peerDependencies'],
                         rangeType: ['caret', 'tilde', 'pin'], // All acceptable
                    },
               ]],

               // ===== METADATA COMPLETENESS =====
               'package-json/require-keywords': 'warn', // RECOMMENDED: Better discoverability

               // ===== DISABLE ALL JSONC RULES FOR PACKAGE.JSON =====
               // Only eslint-plugin-package-json should handle package.json files
               'jsonc/indent': 'off',
               'jsonc/sort-keys': 'off',
               'jsonc/key-name-casing': 'off',
               'jsonc/quotes': 'off',
               'jsonc/comma-dangle': 'off',
               'jsonc/no-comments': 'off',
               'jsonc/object-curly-spacing': 'off',
               'jsonc/key-spacing': 'off',
               'jsonc/comma-style': 'off',
               'jsonc/array-bracket-newline': 'off',
               'jsonc/array-element-newline': 'off',
               'jsonc/object-curly-newline': 'off',
               'jsonc/object-property-newline': 'off',
               'jsonc/no-dupe-keys': 'off',
               'jsonc/no-sparse-arrays': 'off',
               'jsonc/no-octal-escape': 'off',
               'jsonc/no-useless-escape': 'off',
               'jsonc/no-irregular-whitespace': 'off',
               'jsonc/no-hexadecimal-numeric-literals': 'off',
               'jsonc/no-binary-numeric-literals': 'off',
               'jsonc/no-octal-numeric-literals': 'off',
               'jsonc/no-numeric-separators': 'off',
               'jsonc/no-plus-sign': 'off',
               'jsonc/no-floating-decimal': 'off',
               'jsonc/array-bracket-spacing': 'off',
               'jsonc/quote-props': 'off',
               'jsonc/sort-array-values': 'off',
               'jsonc/no-bigint-literals': 'off',
               'jsonc/no-undefined-value': 'off',
               'jsonc/no-nan': 'off',
               'jsonc/no-infinity': 'off',
               'jsonc/auto': 'off'
               // Note: Only package-json/* rules should apply to package.json files
          }
     },

     // ===== PROMISE PLUGIN =====
     pluginPromise.configs['flat/recommended'],
     {
          rules: {
               // ===== ENTERPRISE PROMISE STANDARDS (Google/Microsoft/Meta) =====

               // UPGRADE: Warnings zu Errors (Zero-Tolerance für Promise Anti-Patterns)
               'promise/no-callback-in-promise': 'error', // War 'warn' - Mixing Callbacks/Promises ist Enterprise Anti-Pattern
               'promise/no-promise-in-callback': 'error', // War 'warn' - Callback-Promise-Mixing verhindert Clean Architecture
               'promise/no-nesting': 'error', // War 'warn' - Nested Promises = Code Smell (use async/await)
               'promise/no-return-in-finally': 'error', // War 'warn' - Finally sollte NIEMALS returnen
               'promise/valid-params': 'error', // War 'warn' - Falsche Promise-Parameter = Runtime Errors

               // NEUE REGELN: Modern JavaScript Best Practices
               'promise/prefer-await-to-then': 'error', // Google/MS Standard: async/await > then/catch
               'promise/prefer-await-to-callbacks': 'error', // Enterprise: Callbacks sind Legacy
               'promise/no-multiple-resolved': 'error', // Verhindert Promise Race Conditions
               'promise/spec-only': 'error', // Nur Standard Promise Methods (keine Bluebird etc.)

               // PRAGMATISCHE AUSNAHMEN
               'promise/avoid-new': 'off', // Manchmal notwendig für Custom Promise Wrapping
               'promise/no-native': 'off' // TypeScript Projekte nutzen immer native Promises
          }
     },

     // ===== PREFER ARROW PLUGIN (MODERN JAVASCRIPT STANDARDS) =====
     {
          plugins: {
               "prefer-arrow-functions": eslintPluginPreferArrow
          },
          rules: {
               // ✅ ==== VERIFIED ====
               // ===== ENTERPRISE ARROW FUNCTION STANDARDS (Google/Airbnb/Meta) =====
               'prefer-arrow-functions/prefer-arrow-functions': ['error', {
                    "allowedNames": [],
                    "allowNamedFunctions": false,
                    "allowObjectProperties": true,
                    "classPropertiesAllowed": false,
                    "disallowPrototype": false,
                    "returnStyle": "unchanged",
                    "singleReturnOnly": false
               }]
          }
     },

     // ===== SONARJS PLUGIN =====
     sonarjs.configs.recommended,
     {
          rules: {
               // ===== ENTERPRISE-CRITICAL COMPLEXITY RULES =====
               // 'sonarjs/cyclomatic-complexity': 'off', // REDUNDANT: Bereits durch ESLint Core 'complexity' abgedeckt
               // 'sonarjs/max-lines-per-function': 'off', // REDUNDANT: Bereits durch ESLint Core abgedeckt

               // ===== CODE MAINTAINABILITY (Google/Microsoft Standards) =====
               // 'sonarjs/max-lines': ['error', { maximum: 400 }], // covered by eslint/max-lines
               'sonarjs/expression-complexity': 'error', // Verhindert überkomplexe Ausdrücke
               'sonarjs/no-duplicate-string': ['error', { threshold: 3 }], // String darf max 2x vorkommen

               // ===== TYPE SAFETY & ARCHITECTURE =====
               'sonarjs/no-implicit-dependencies': 'error', // Prüft implizite Dependencies
               'sonarjs/arguments-usage': 'error', // Verhindert unsichere 'arguments' Nutzung

               // ===== DEFENSIVE PROGRAMMING (Enterprise Best Practice) =====
               'sonarjs/elseif-without-else': 'error', // Erzwingt else-Block für Vollständigkeit
               'sonarjs/bool-param-default': 'error', // Boolean Parameter brauchen Defaults

               // ===== CODE CLARITY & MODERN SYNTAX =====
               'sonarjs/no-collapsible-if': 'error', // Vereinfacht verschachtelte if-Statements
               'sonarjs/prefer-object-literal': 'error', // Moderne Object-Literal Syntax
               'sonarjs/prefer-immediate-return': 'error', // Return direkt statt Variable

               // ===== FUNCTION DESIGN (Clean Code) =====
               'sonarjs/function-name': ['error', {
                    format: '^[a-z][a-zA-Z0-9]*$' // camelCase enforcement
               }],

               // ===== TESTING BEST PRACTICES =====
               'sonarjs/no-identical-functions': 'error', // Identische Funktionen verhindern

               // ===== LOOP & CONTROL FLOW SAFETY =====
               'sonarjs/no-for-in-iterable': 'error', // for...in nicht für Iterables
               'sonarjs/no-nested-switch': 'error', // Keine verschachtelten switch
               'sonarjs/nested-control-flow': ['error', { maximumNestingLevel: 3 }], // Max 3 Ebenen Verschachtelung

               // ===== REGEX SAFETY (Performance & Security) =====
               // ENTERPRISE: regexp Plugin hat spezialisiertere Regex-Prüfungen
               // 'sonarjs/no-empty-character-class': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-empty-character-class
               'sonarjs/single-char-in-character-classes': 'error', // ✅ UNIQUE: SonarJS-spezifische Regel
               // 'sonarjs/no-control-regex': 'error', // ❌ REDUNDANT: Übernommen von regexp/no-control-character

               // ===== VARIABLE & PARAMETER HYGIENE =====
               'sonarjs/no-parameter-reassignment': 'error', // Parameter Reassignment verhindern
               'sonarjs/variable-name': 'error', // Variable naming conventions

               // ===== ASYNC/PROMISE PATTERNS =====
               'sonarjs/no-ignored-return': 'error', // Return values müssen verwendet werden
               'sonarjs/no-invariant-returns': 'error', // Funktionen sollten nicht immer dasselbe returnen

               // ===== REACT SPECIFIC (Falls React verwendet wird) =====
               // Diese sind NICHT redundant mit react-plugin, da sie andere Aspekte prüfen
               'sonarjs/jsx-no-leaked-render': 'error', // Verhindert && mit non-boolean
               'sonarjs/no-hook-setter-in-body': 'error' // useState nicht direkt in render
          }
     },

     // ===== UNICORN PLUGIN =====
     eslintPluginUnicorn.configs.all,

     // ===== NODE PLUGIN =====
     nodePlugin.configs["flat/all"],
     {
          plugins: {
               n: nodePlugin,
          },
          rules: {
               'n/no-missing-import': 'off',
               'n/no-unpublished-import': 'off',
               'n/prefer-node-protocol': 'off', // Already handled by unicorn/prefer-node-protocol
               'n/prefer-global/process': ['error', 'never'], // Enterprise: Force explicit imports
               'n/file-extension-in-import': 'off' // Off because we use the .ts extension in the imports
          }
     },

     // ===== UNUSED IMPORTS PLUGIN =====
     {
          plugins: {
               "unused-imports": unusedImports,
          }
     },

     // ===== IMPORT PLUGIN =====
     importPlugin.flatConfigs.typescript,
     {
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
               // ===== IMPORT ORDER & STYLE (Google/Airbnb Standards) =====
               'import/first': 'error',
               'import/no-duplicates': ['error', {
                    'prefer-inline': true, // TypeScript type imports inline
                    'considerQueryString': true
               }],
               'import/order': ['error', {
                    'groups': [
                         'builtin',  // Node.js built-in modules
                         'external', // npm packages
                         'internal', // @/* aliases
                         'parent',   // ../ imports
                         'sibling',  // ./ imports
                         'index',    // ./index imports
                         'object',   // import log = console.log
                         'type'      // import type { Foo }
                    ],
                    'pathGroups': [
                         {
                              'pattern': '@/**',
                              'group': 'internal',
                              'position': 'before'
                         },
                         {
                              'pattern': '~/**',
                              'group': 'internal',
                              'position': 'before'
                         }
                    ],
                    'pathGroupsExcludedImportTypes': ['type'],
                    'newlines-between': 'always', // Enterprise: Klare Trennung
                    'alphabetize': {
                         'order': 'asc',
                         'orderImportKind': 'asc',
                         'caseInsensitive': true
                    },
                    'warnOnUnassignedImports': true // Warnung bei Side-Effect Imports
               }],

               // ===== RESOLUTION & SECURITY (Critical for Enterprise) =====
               'import/no-unresolved': ['error', {
                    'commonjs': true,
                    'amd': true,
                    'caseSensitive': true, // Linux/Windows Kompatibilität
                    'caseSensitiveStrict': true
               }],
               'import/no-absolute-path': 'error', // Security: Keine absoluten Pfade
               'import/no-webpack-loader-syntax': 'error', // Keine Webpack-spezifische Syntax
               'import/no-self-import': 'error', // Verhindert Selbst-Imports
               'import/no-useless-path-segments': ['error', {
                    'noUselessIndex': true,   // Enterprise Standard: ./core statt ./core/index.ts
                    'commonjs': true
               }],

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
               'import/no-restricted-paths': ['error', {
                    'zones': [
                         // Domain Boundaries (Clean Architecture)
                         {
                              'target': './src/domain',
                              'from': './src/infrastructure',
                              'message': 'Domain should not depend on Infrastructure'
                         },
                         {
                              'target': './src/domain',
                              'from': './src/application',
                              'message': 'Domain should not depend on Application'
                         }
                    ]
               }],

               // ===== PERFORMANCE & TREE-SHAKING =====
               'import/no-cycle': ['error', {
                    'maxDepth': 5, // Tiefere Analyse für komplexe Projekte
                    'ignoreExternal': true,
                    'allowUnsafeDynamicCyclicDependency': false
               }],
               // 'import/no-unused-modules': 'off', // Inkompatibel mit Flat Config - siehe https://github.com/import-js/eslint-plugin-import/issues/3079
               'import/no-deprecated': 'error', // Verhindert Nutzung veralteter APIs
               'import/no-mutable-exports': 'error', // Immutable Exports
               'import/no-commonjs': 'error', // Pure ES Modules (für Tree-shaking)
               'import/no-amd': 'error', // Kein AMD
               'import/no-dynamic-require': 'error', // Kein dynamisches require()

               // ===== EXPORT CONSISTENCY =====
               'import/export': 'error', // Validiert alle Exports
               'import/no-named-as-default': 'error', // Verhindert Konfusion
               'import/no-named-as-default-member': 'error',

               // ===== TYPE IMPORTS (TypeScript Specific) =====
               // ✅ ==== VERIFIED ====
               'import/consistent-type-specifier-style': ['error', 'prefer-top-level'], // import type { Foo } - Enterprise Standard für TypeScript 5.0+

               // ✅ ==== VERIFIED ====
               'import/no-import-module-exports': 'error', // Kein Mix von import/module.exports
               'import/no-empty-named-blocks': 'error', // import {} from 'foo' verhindert

               // ===== FILE EXTENSIONS (Enterprise Barrel Pattern Standard) =====

               // ✅ ==== VERIFIED ====
               // Optimal für Enterprise: Barrel Pattern + direkte .ts Imports
               'import/extensions': ['error', 'ignorePackages', {
                    'js': 'never',       // JavaScript: ./file (ohne .js für Node-Kompatibilität)  
                    'jsx': 'never',      // React JS: ./Component (ohne .jsx)
                    'ts': 'never',       // TypeScript: ./core (Barrel) - Enterprise Standard
                    'tsx': 'never',      // React TS: ./Component (Barrel Pattern)
                    'json': 'always',    // Daten: ./config.json (explizit)
                    'css': 'always',     // Styles: ./styles.css (explizit)
                    'scss': 'always'     // Sass: ./styles.scss (explizit)
               }],

               // ===== MONOREPO & NAMESPACE SUPPORT =====
               'import/no-relative-packages': 'error', // Keine relativen Package-Imports
               //   'import/no-internal-modules': ['error', {
               //       'allow': [
               //           '**/src/**', // Erlaubt interne src imports
               //           '**/*.types', // Erlaubt .types imports
               //           '**/constants/*',
               //           '**/utils/*'
               //       ]
               //   }],

               // ===== NAMING CONVENTIONS =====
               'import/no-named-export': 'off', // Named exports sind erwünscht
               'import/no-namespace': ['error', { // Wildcard imports vermeiden
                    'ignore': ['*.d.ts'] // Außer für Type Definitions
               }],

               // ✅ ==== VERIFIED ====
               'import/prefer-default-export': 'off', // Named exports bevorzugt

               // ✅ ==== VERIFIED ====
               'import/no-anonymous-default-export': ['error', { // Named Defaults
                    'allowArray': false,
                    'allowArrowFunction': false,
                    'allowAnonymousClass': false,
                    'allowAnonymousFunction': false,
                    'allowCallExpression': false,
                    'allowNew': false,
                    'allowObject': false,
                    'allowLiteral': false
               }],

               // ✅ ==== VERIFIED ====
               'import/no-default-export': 'error', // Google/Microsoft Standard: NEVER use default exports

               'import/max-dependencies': ['error', {
                    'max': 15, // Maximale Dependencies pro File
                    'ignoreTypeImports': true
               }],

               // ===== CODE STYLE =====
               'import/newline-after-import': ['error', {
                    'count': 1,
                    'considerComments': true
               }],
               'import/no-unassigned-import': ['error', {
                    'allow': [
                         '**/*.css',
                         '**/*.scss',
                         '**/*.less',
                         'reflect-metadata', // Decorators
                         'core-js/**',
                         '@babel/polyfill'
                    ]
               }],
               // ===== ENTERPRISE EXPORT STRATEGY =====
               // Types/Interfaces: Export at definition site (Enterprise Standard)
               // Values/Functions: Group exports at end when beneficial
               // ✅ ==== VERIFIED ====
               'import/group-exports': 'error',                    // Group value exports together

               // ✅ ==== VERIFIED ====
               'import/exports-last': 'off'
          }
     },

     // ===== @STYLISTIC CONFIGURATION =====
     stylistic.configs.all,
     {
          files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
          plugins: {
               '@stylistic': stylistic
          },
          rules: {
               // ===== SPACING & INDENTATION =====
               '@stylistic/indent': ['error', 4, {
                    'SwitchCase': 1,
                    'VariableDeclarator': 1,
                    'outerIIFEBody': 1,
                    'MemberExpression': 1,
                    'FunctionDeclaration': {
                         'parameters': 1,
                         'body': 1
                    },
                    'FunctionExpression': {
                         'parameters': 1,
                         'body': 1
                    },
                    'CallExpression': {
                         'arguments': 1
                    },
                    'ArrayExpression': 1,
                    'ObjectExpression': 1,
                    'ImportDeclaration': 1,
                    'flatTernaryExpressions': false,
                    'offsetTernaryExpressions': true,
                    'ignoreComments': false
               }],
               '@stylistic/indent-binary-ops': ['error', 4],
               '@stylistic/key-spacing': ['error', {
                    'beforeColon': false,
                    'afterColon': true,
                    'mode': 'strict'
               }],
               '@stylistic/keyword-spacing': ['error', {
                    'before': true,
                    'after': true,
                    'overrides': {
                         'return': { 'after': true },
                         'throw': { 'after': true },
                         'case': { 'after': true }
                    }
               }],
               '@stylistic/space-before-blocks': ['error', 'always'],
               '@stylistic/space-before-function-paren': ['error', {
                    'anonymous': 'never',
                    'named': 'never',
                    'asyncArrow': 'always'
               }],
               '@stylistic/space-in-parens': ['error', 'never'],
               '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
               '@stylistic/space-unary-ops': ['error', {
                    'words': true,
                    'nonwords': false,
                    'overrides': {}
               }],
               '@stylistic/spaced-comment': ['error', 'always', {
                    'line': {
                         'exceptions': ['-', '+'],
                         'markers': ['=', '!', '/']
                    },
                    'block': {
                         'exceptions': ['-', '+'],
                         'markers': ['=', '!', ':', '::'],
                         'balanced': true
                    }
               }],

               // ===== LINE BREAKS & WRAPPING =====
               '@stylistic/max-len': ['error', {
                    'code': 120, // Enterprise Standard: 100 ist der moderne Sweet Spot
                    'tabWidth': 4,
                    'ignoreUrls': true,
                    'ignoreStrings': false,
                    'ignoreTemplateLiterals': false,
                    'ignoreRegExpLiterals': true,
                    'ignoreComments': true,
                    'ignorePattern': '^import\\s.+\\sfrom\\s.+;$' // Allow long import statements
               }],
               '@stylistic/max-statements-per-line': ['error', { 'max': 1 }],
               '@stylistic/newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
               '@stylistic/operator-linebreak': ['error', 'before', {
                    'overrides': {
                         '=': 'none',
                         '+=': 'none',
                         '-=': 'none',
                         '*=': 'none',
                         '/=': 'none',
                         '%=': 'none'
                    }
               }],
               '@stylistic/linebreak-style': ['error', 'unix'],
               '@stylistic/eol-last': ['error', 'always'],
               '@stylistic/no-multiple-empty-lines': ['error', {
                    'max': 1,
                    'maxEOF': 0,
                    'maxBOF': 0
               }],
               '@stylistic/no-trailing-spaces': ['error', {
                    'skipBlankLines': false,
                    'ignoreComments': false
               }],
               '@stylistic/nonblock-statement-body-position': ['error', 'below'],

               // ===== ARRAYS =====
               '@stylistic/array-bracket-newline': ['error', {
                    'multiline': true,
                    'minItems': 3
               }],
               '@stylistic/array-bracket-spacing': ['error', 'never'],
               '@stylistic/array-element-newline': ['error', {
                    'multiline': true,
                    'minItems': 3
               }],

               // ===== OBJECTS =====

               '@stylistic/object-curly-spacing': ['error', 'always'],

               // ✅ ==== VERIFIED ====
               '@stylistic/object-curly-newline': ['error', {
                    'ObjectExpression': {
                         'multiline': true,
                         'minProperties': 2,
                         'consistent': true
                    },
                    'ObjectPattern': {
                         'multiline': true,
                         'minProperties': 2,
                         'consistent': true
                    },
                    'ImportDeclaration': {
                         'multiline': true,
                         'minProperties': 3,
                         'consistent': true
                    },
                    'ExportDeclaration': {
                         'multiline': true,
                         'minProperties': 3,
                         'consistent': true
                    },
                    // ===== ENTERPRISE TYPE SAFETY: TypeScript Return-Type Formatting =====
                    'TSTypeLiteral': {
                         'multiline': true,
                         'minProperties': 1, // STRICT: Schon ab 1 Property neue Zeilen erzwingen
                         'consistent': true
                    },
                    'TSInterfaceBody': {
                         'multiline': true,
                         'minProperties': 1, // CONSISTENT: Gleiche Regeln für Interface Bodies
                         'consistent': true
                    },
                    'TSEnumBody': {
                         'multiline': true,
                         'minProperties': 1, // CONSISTENT: Gleiche Regeln für Enum Bodies
                         'consistent': true
                    }
               }],
               '@stylistic/object-property-newline': ['error', {
                    'allowAllPropertiesOnSameLine': false
               }],
               '@stylistic/quote-props': ['error', 'as-needed', {
                    'keywords': false,
                    'unnecessary': true,
                    'numbers': false
               }],

               // ===== FUNCTIONS =====
               // ✅ ==== VERIFIED ====
               '@stylistic/function-paren-newline': ['error', 'consistent'], // We use custom rules for formatting function definitions


               '@stylistic/function-call-argument-newline': ['error', 'consistent'],
               '@stylistic/function-call-spacing': ['error', 'never'],
               '@stylistic/arrow-parens': ['error', 'as-needed', {
                    'requireForBlockBody': true
               }],

               '@stylistic/arrow-spacing': ['error', {
                    'before': true,
                    'after': true
               }],

               // ✅ ==== VERIFIED ====
               '@stylistic/implicit-arrow-linebreak': ['error', 'below'],

               '@stylistic/wrap-iife': ['error', 'inside', {
                    'functionPrototypeMethods': true
               }],

               // ===== BLOCKS & BRACES =====

               // ✅ ==== VERIFIED ====
               // 1tbs: One True Brace Style (Enterprise Standard)
               // stroustrup: Stroustrup Style (Legacy)
               '@stylistic/brace-style': ['error', '1tbs', {
                    'allowSingleLine': false
               }],
               '@stylistic/block-spacing': ['error', 'always'],
               '@stylistic/padded-blocks': ['error', 'never', {
                    'allowSingleLineBlocks': false
               }],
               '@stylistic/curly-newline': ['error'],

               // ===== PUNCTUATION =====
               '@stylistic/comma-dangle': ['error', {
                    'arrays': 'never',
                    'objects': 'never',
                    'imports': 'never',
                    'exports': 'never',
                    'functions': 'never'
               }],
               '@stylistic/comma-spacing': ['error', {
                    'before': false,
                    'after': true
               }],
               '@stylistic/comma-style': ['error', 'last'],
               '@stylistic/semi': ['error', 'never', {
                    'beforeStatementContinuationChars': 'never'
               }],
               '@stylistic/semi-spacing': ['error', {
                    'before': false,
                    'after': true
               }],
               '@stylistic/semi-style': ['error', 'last'],
               '@stylistic/quotes': ['error', 'single', {
                    'avoidEscape': true,
                    'allowTemplateLiterals': 'never'
               }],
               '@stylistic/template-curly-spacing': ['error', 'never'],
               '@stylistic/template-tag-spacing': ['error', 'never'],

               // ===== MISC FORMATTING =====
               '@stylistic/computed-property-spacing': ['error', 'never'],
               '@stylistic/dot-location': ['error', 'property'],
               '@stylistic/generator-star-spacing': ['error', {
                    'before': true,
                    'after': false
               }],
               '@stylistic/yield-star-spacing': ['error', {
                    'before': false,
                    'after': true
               }],
               '@stylistic/switch-colon-spacing': ['error', {
                    'before': false,
                    'after': true
               }],
               '@stylistic/no-confusing-arrow': ['error', {
                    'allowParens': true
               }],
               '@stylistic/no-extra-parens': ['error', 'all', {
                    'conditionalAssign': false,
                    'returnAssign': false,
                    'nestedBinaryExpressions': false,
                    'ignoreJSX': 'all',
                    'enforceForArrowConditionals': false,
                    'enforceForSequenceExpressions': false,
                    'enforceForNewInMemberExpressions': false,
                    'enforceForFunctionPrototypeMethods': false
               }],
               '@stylistic/no-extra-semi': ['error'],
               '@stylistic/no-floating-decimal': ['error'],
               '@stylistic/no-mixed-operators': ['error', {
                    'groups': [
                         ['%', '**'],
                         ['%', '+'],
                         ['%', '-'],
                         ['%', '*'],
                         ['%', '/'],
                         ['/', '*'],
                         ['&', '|', '<<', '>>', '>>>'],
                         ['==', '!=', '===', '!=='],
                         ['&&', '||']
                    ],
                    'allowSamePrecedence': true
               }],
               '@stylistic/no-mixed-spaces-and-tabs': ['error'],
               '@stylistic/no-multi-spaces': ['error', {
                    'ignoreEOLComments': false,
                    'exceptions': {}
               }],
               '@stylistic/no-tabs': ['error'],
               '@stylistic/no-whitespace-before-property': ['error'],
               '@stylistic/rest-spread-spacing': ['error', 'never'],
               '@stylistic/wrap-regex': ['error'],

               // ===== TYPESCRIPT SPECIFIC =====
               '@stylistic/type-annotation-spacing': ['error', {
                    'before': false,
                    'after': true,
                    'overrides': {
                         'arrow': {
                              'before': true,
                              'after': true
                         }
                    }
               }],
               '@stylistic/type-generic-spacing': ['error'],
               '@stylistic/type-named-tuple-spacing': ['error'],
               '@stylistic/member-delimiter-style': ['error', {
                    'multiline': {
                         'delimiter': 'none',
                         'requireLast': false
                    },
                    'singleline': {
                         'delimiter': 'semi',
                         'requireLast': false
                    }
               }],

               // ===== JSX/REACT SPECIFIC (only essential for future React support) =====
               '@stylistic/jsx-quotes': ['error', 'prefer-double'],
               '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
               '@stylistic/jsx-closing-tag-location': ['error'],
               '@stylistic/jsx-curly-spacing': ['error', {
                    'when': 'never',
                    'children': true
               }],
               '@stylistic/jsx-curly-newline': ['error', {
                    'multiline': 'consistent',
                    'singleline': 'forbid'
               }],
               '@stylistic/jsx-equals-spacing': ['error', 'never'],
               '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
               // '@stylistic/jsx-indent': deprecated - use '@stylistic/indent' instead
               '@stylistic/jsx-indent-props': ['error', 4],
               '@stylistic/jsx-max-props-per-line': ['error', {
                    'maximum': 1,
                    'when': 'multiline'
               }],
               '@stylistic/jsx-one-expression-per-line': ['error', {
                    'allow': 'single-child'
               }],
               '@stylistic/jsx-props-no-multi-spaces': ['error'],
               '@stylistic/jsx-tag-spacing': ['error', {
                    'closingSlash': 'never',
                    'beforeSelfClosing': 'always',
                    'afterOpening': 'never',
                    'beforeClosing': 'never'
               }],
               '@stylistic/jsx-wrap-multilines': ['error', {
                    'declaration': 'parens-new-line',
                    'assignment': 'parens-new-line',
                    'return': 'parens-new-line',
                    'arrow': 'parens-new-line',
                    'condition': 'parens-new-line',
                    'logical': 'parens-new-line',
                    'prop': 'parens-new-line'
               }],
               '@stylistic/jsx-self-closing-comp': ['error', {
                    'component': true,
                    'html': true
               }],
               '@stylistic/jsx-sort-props': ['error', {
                    'callbacksLast': true,
                    'shorthandFirst': true,
                    'multiline': 'last',
                    'ignoreCase': true,
                    'reservedFirst': true
               }],
               '@stylistic/jsx-pascal-case': ['error', {
                    'allowAllCaps': false,
                    'allowNamespace': true
               }],
               '@stylistic/jsx-child-element-spacing': ['error'],
               '@stylistic/jsx-curly-brace-presence': ['error', {
                    'props': 'never',
                    'children': 'never'
               }],
               '@stylistic/jsx-function-call-newline': ['error', 'multiline'],
               // Note: jsx-newline rule removed due to compatibility issues

               // ===== COMMENTS & DOCUMENTATION =====
               '@stylistic/line-comment-position': ['error', {
                    'position': 'above',
                    'ignorePattern': 'eslint|jshint|global',
                    'applyDefaultIgnorePatterns': true
               }],
               '@stylistic/lines-around-comment': ['error', {
                    'beforeBlockComment': true,
                    'afterBlockComment': false,
                    'beforeLineComment': true,
                    'afterLineComment': false,
                    'allowBlockStart': true,
                    'allowBlockEnd': true,
                    'allowObjectStart': true,
                    'allowObjectEnd': true,
                    'allowArrayStart': true,
                    'allowArrayEnd': true,
                    'allowClassStart': true,
                    'allowClassEnd': true,
                    'applyDefaultIgnorePatterns': true
               }],
               '@stylistic/multiline-comment-style': ['error', 'starred-block'],

               // ===== CLASS MEMBERS =====
               '@stylistic/lines-between-class-members': ['error', 'always', {
                    'exceptAfterSingleLine': false,
                    'exceptAfterOverload': true
               }],
               '@stylistic/padding-line-between-statements': ['error',
                    { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
                    { 'blankLine': 'any', 'prev': 'directive', 'next': 'directive' },
                    { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
                    { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] },
                    { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
                    { 'blankLine': 'always', 'prev': '*', 'next': ['if', 'try', 'class', 'export'] },
                    { 'blankLine': 'always', 'prev': ['if', 'try', 'class', 'export'], 'next': '*' },
                    { 'blankLine': 'any', 'prev': ['export'], 'next': ['export'] }
               ],

               // ===== TERNARY =====
               '@stylistic/multiline-ternary': ['error', 'always-multiline'],
               '@stylistic/new-parens': ['error', 'always'],
               '@stylistic/one-var-declaration-per-line': ['error', 'always']
          }
     },

     // ===== FUNCTION DEFINITION =====
     // functionDefinitionPlugin.configs.flat.all,
     {
          plugins: {
               'local-rules': functionDefinitionParenNewlinePlugin,
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
     // reactPlugin.configs.flat['jsx-runtime'],
     {
          settings: {
               react: {
                    version: 'detect',
                    // Enterprise settings for better component detection
                    createClass: 'createReactClass',
                    pragma: 'React',
                    fragment: 'Fragment',
                    // Support for common HOCs and wrappers
                    componentWrapperFunctions: [
                         'observer', // MobX
                         'memo', // React.memo
                         'forwardRef', // React.forwardRef
                         { property: 'styled' }, // styled-components
                         { property: 'connect' } // Redux
                    ],
                    // Form component detection
                    formComponents: [
                         'Form',
                         { name: 'Formik', formAttribute: 'onSubmit' }
                    ],
                    // Link component detection
                    linkComponents: [
                         'Link',
                         { name: 'NavLink', linkAttribute: 'to' },
                         { name: 'RouterLink', linkAttribute: 'to' }
                    ]
               },
               // PropTypes wrapper functions (for teams still using PropTypes)
               propWrapperFunctions: [
                    'forbidExtraProps',
                    { property: 'freeze', object: 'Object' },
                    { property: 'myFavoriteWrapper' }
               ]
          },
          rules: {
               // ===== SECURITY & BUG PREVENTION (CRITICAL) =====
               'react/jsx-no-target-blank': ['error', {
                    enforceDynamicLinks: 'always',
                    warnOnSpreadAttributes: true
               }],
               'react/no-danger-with-children': 'error',
               'react/jsx-no-script-url': 'error',
               'react/no-direct-mutation-state': 'error',
               'react/no-find-dom-node': 'error',
               'react/no-render-return-value': 'error',
               'react/no-string-refs': 'error',
               'react/no-is-mounted': 'error',
               'react/no-deprecated': 'error',
               'react/jsx-key': ['error', {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true
               }],

               // ===== HOOKS BEST PRACTICES (ENTERPRISE STANDARD) =====
               'react-hooks/rules-of-hooks': 'error',
               'react-hooks/exhaustive-deps': ['error', {
                    enableDangerousAutofixThisMayCauseInfiniteLoops: false
               }],
               'react/hook-use-state': ['error', {
                    allowDestructuredState: true
               }],

               // ===== PERFORMANCE OPTIMIZATIONS =====
               'react/no-array-index-key': 'warn', // Warn statt error für Flexibilität
               'react/no-unstable-nested-components': ['error', {
                    allowAsProps: false
               }],
               'react/jsx-no-constructed-context-values': 'error',
               'react/no-unused-state': 'error',
               'react/no-unused-class-component-methods': 'error',
               'react/no-unused-prop-types': ['error', {
                    skipShapeProps: true // Shape props oft nur teilweise genutzt
               }],

               // ===== CODE QUALITY & CONSISTENCY =====
               'react/jsx-pascal-case': 'off', // Abgedeckt durch @stylistic/jsx-pascal-case
               'react/jsx-fragments': ['error', 'syntax'], // Prefer <> over React.Fragment
               'react/self-closing-comp': 'off', // Abgedeckt durch @stylistic/jsx-self-closing-comp
               'react/jsx-boolean-value': ['error', 'never'],
               'react/jsx-curly-brace-presence': 'off', // Abgedeckt durch @stylistic/jsx-curly-brace-presence
               'react/jsx-no-useless-fragment': ['error', {
                    allowExpressions: true
               }],
               'react/jsx-handler-names': ['error', {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                    checkLocalVariables: false, // Zu restriktiv
                    checkInlineFunction: false
               }],

               // ===== MODERN REACT PATTERNS =====
               'react/function-component-definition': ['error', {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function'
               }],
               'react/prefer-stateless-function': 'error',
               'react/prefer-es6-class': ['error', 'always'],
               'react/static-property-placement': ['error', 'static public field'],
               'react/state-in-constructor': ['error', 'never'], // Modern class fields

               // ===== LIFECYCLE & STATE MANAGEMENT =====
               'react/no-access-state-in-setstate': 'error',
               'react/no-did-mount-set-state': 'error',
               'react/no-did-update-set-state': 'error',
               'react/no-will-update-set-state': 'error',
               'react/no-redundant-should-component-update': 'error',
               'react/no-typos': 'error',
               'react/no-this-in-sfc': 'error',
               'react/void-dom-elements-no-children': 'error',
               'react/style-prop-object': 'error',

               // ===== JSX FORMATTING =====
               // WICHTIG: Alle JSX-Formatting-Regeln werden durch @stylistic/* abgedeckt
               // Diese React-spezifischen Formatting-Regeln sind deaktiviert, um Konflikte zu vermeiden
               'react/jsx-closing-bracket-location': 'off', // Abgedeckt durch @stylistic/jsx-closing-bracket-location
               'react/jsx-closing-tag-location': 'off', // Abgedeckt durch @stylistic/jsx-closing-tag-location
               'react/jsx-first-prop-new-line': 'off', // Abgedeckt durch @stylistic/jsx-first-prop-new-line
               'react/jsx-indent': 'off', // Abgedeckt durch @stylistic/indent (JSX wird mit abgedeckt)
               'react/jsx-indent-props': 'off', // Abgedeckt durch @stylistic/jsx-indent-props
               'react/jsx-max-props-per-line': 'off', // Abgedeckt durch @stylistic/jsx-max-props-per-line
               'react/jsx-tag-spacing': 'off', // Abgedeckt durch @stylistic/jsx-tag-spacing
               'react/jsx-wrap-multilines': 'off', // Abgedeckt durch @stylistic/jsx-wrap-multilines
               'react/jsx-curly-spacing': 'off', // Abgedeckt durch @stylistic/jsx-curly-spacing
               'react/jsx-equals-spacing': 'off', // Abgedeckt durch @stylistic/jsx-equals-spacing

               // ===== ZUSÄTZLICHE ENTERPRISE STANDARDS =====
               'react/button-has-type': ['error', {
                    button: true,
                    submit: true,
                    reset: true
               }],
               'react/forward-ref-uses-ref': 'error',
               'react/no-children-prop': 'error',
               'react/jsx-no-comment-textnodes': 'error',
               'react/jsx-no-duplicate-props': ['error', {
                    ignoreCase: true
               }],
               'react/jsx-no-undef': ['error', {
                    allowGlobals: true
               }],
               'react/jsx-uses-react': 'error',
               'react/jsx-uses-vars': 'error',
               'react/no-unescaped-entities': ['error', {
                    forbid: ['>', '"', '\'', '}']
               }],
               'react/jsx-no-leaked-render': ['error', {
                    validStrategies: ['coerce', 'ternary']
               }],

               // ===== DISABLED RULES (ENTERPRISE FLEXIBILITY) =====
               // Diese Regeln sind aus flat.all übernommen, aber für Enterprise zu restriktiv
               'react/destructuring-assignment': 'off', // Zu opinion-based
               'react/jsx-props-no-spreading': 'off', // Spreading oft nützlich
               'react/require-default-props': 'off', // Mit TypeScript redundant
               'react/jsx-sort-props': 'off', // Kein echter Mehrwert
               'react/sort-comp': 'off', // Zu arbiträr, moderne IDEs helfen
               'react/forbid-prop-types': 'off', // Zu restriktiv
               'react/no-multi-comp': 'off', // Utility components oft in gleicher Datei
               'react/jsx-max-depth': 'off', // Zu arbiträr
               'react/jsx-no-literals': 'off', // Zu restriktiv für i18n
               'react/no-set-state': 'off', // setState manchmal notwendig
               'react/jsx-no-bind': 'off', // Mit modernen Engines kein Performance-Problem
               'react/prop-types': 'off', // TypeScript macht PropTypes obsolet
               'react/display-name': 'off', // DevTools zeigen meist richtige Namen
               'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform
               'react/jsx-sort-default-props': 'off', // Deprecated
               'react/sort-default-props': 'off', // Nicht nützlich mit TypeScript
               'react/jsx-one-expression-per-line': 'off', // Zu restriktiv für JSX
               'react/jsx-props-no-multi-spaces': 'off', // Prettier handled das
               'react/jsx-space-before-closing': 'off', // Deprecated
               'react/require-optimization': 'off', // Nicht immer notwendig
               'react/no-adjacent-inline-elements': 'off', // Zu restriktiv
               'react/forbid-component-props': 'off', // Zu restriktiv
               'react/forbid-dom-props': 'off', // Zu restriktiv
               'react/forbid-elements': 'off', // Zu restriktiv
               'react/forbid-foreign-prop-types': 'off', // Edge cases existieren
               'react/jsx-filename-extension': 'off', // .tsx ist Standard
               'react/jsx-newline': 'off', // Zu opinion-based
               'react/jsx-props-no-spread-multi': 'off', // Spread patterns sind oft valid
               'react/no-namespace': 'off', // Namespaces manchmal nötig
               'react/prefer-read-only-props': 'off', // Zu restriktiv
               'react/jsx-child-element-spacing': 'off', // Prettier handled das
               'react/no-arrow-function-lifecycle': 'off', // Moderne Patterns erlauben das
               'react/no-invalid-html-attribute': 'off', // Zu viele false positives
               'react/no-object-type-as-default-prop': 'off', // TypeScript handled das
               'react/sort-prop-types': 'off', // Nicht relevant mit TypeScript
               'react/boolean-prop-naming': 'off', // Zu opinion-based
               'react/default-props-match-prop-types': 'off', // TypeScript redundant
               'react/prefer-exact-props': 'off', // Zu restriktiv
               'react/no-danger': 'warn', // Warn statt error - manchmal notwendig
               'react/iframe-missing-sandbox': 'warn', // Warn für graduelle Adoption
               'react/checked-requires-onchange-or-readonly': 'warn' // Warn für Flexibilität
          }
     },

     // ===== JSX ACCESSIBILITY (A11Y) RULES =====
     // Enterprise-Grade Accessibility Standards
     // Based on WCAG 2.1 AA, Google/Microsoft/Meta Accessibility Guidelines
     a11yPlugin.flatConfigs.strict, // Basiert auf strict config
     {
          settings: {
               'jsx-a11y': {
                    // Polymorphe Komponenten-Unterstützung (Material-UI, Chakra UI, etc.)
                    polymorphicPropName: 'as',

                    // Custom Component Mapping für Enterprise UI Libraries
                    components: {
                         // Form Controls
                         'Input': 'input',
                         'TextInput': 'input',
                         'NumberInput': 'input',
                         'Select': 'select',
                         'Dropdown': 'select',
                         'TextArea': 'textarea',
                         'TextField': 'input',
                         'FormField': 'input',
                         'Checkbox': 'input',
                         'Radio': 'input',
                         'Switch': 'input',
                         'Toggle': 'input',

                         // Buttons
                         'Button': 'button',
                         'IconButton': 'button',
                         'PrimaryButton': 'button',
                         'SecondaryButton': 'button',
                         'SubmitButton': 'button',
                         'ActionButton': 'button',
                         'FloatingActionButton': 'button',
                         'Fab': 'button',

                         // Links
                         'Link': 'a',
                         'NavLink': 'a',
                         'RouterLink': 'a',
                         'ExternalLink': 'a',

                         // Structure
                         'Nav': 'nav',
                         'Navigation': 'nav',
                         'Header': 'header',
                         'Footer': 'footer',
                         'Main': 'main',
                         'Section': 'section',
                         'Article': 'article',
                         'Aside': 'aside',

                         // Lists
                         'List': 'ul',
                         'OrderedList': 'ol',
                         'ListItem': 'li',

                         // Media
                         'Image': 'img',
                         'Picture': 'img',
                         'Video': 'video',
                         'Audio': 'audio',

                         // Tables
                         'Table': 'table',
                         'TableRow': 'tr',
                         'TableCell': 'td',
                         'TableHeader': 'th'
                    },

                    // Attribute Mapping für verschiedene Prop-Namen
                    attributes: {
                         'for': ['htmlFor', 'for'],
                         'id': ['id', 'htmlId']
                    }
               }
          },
          rules: {
               // ===== WCAG 2.1 LEVEL A (MANDATORY) =====
               'jsx-a11y/alt-text': ['error', {
                    elements: ['img', 'object', 'area', 'input[type="image"]'],
                    img: [],
                    object: [],
                    area: [],
                    'input[type="image"]': []
               }],
               'jsx-a11y/anchor-has-content': ['error', {
                    components: ['Link', 'NavLink', 'RouterLink']
               }],
               'jsx-a11y/anchor-is-valid': ['error', {
                    components: ['Link', 'NavLink', 'RouterLink'],
                    specialLink: ['to', 'href'],
                    aspects: ['noHref', 'invalidHref', 'preferButton']
               }],
               'jsx-a11y/aria-props': 'error', // ARIA attributes müssen korrekt sein
               'jsx-a11y/aria-proptypes': 'error', // ARIA prop values müssen valid sein
               'jsx-a11y/aria-role': ['error', {
                    ignoreNonDOM: true,
                    allowedInvalidRoles: [] // Keine invaliden Roles erlaubt
               }],
               'jsx-a11y/aria-unsupported-elements': 'error', // Keine ARIA auf unsupported elements
               'jsx-a11y/heading-has-content': ['error', {
                    components: ['Heading', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
               }],
               'jsx-a11y/html-has-lang': 'error', // html element muss lang attribute haben
               'jsx-a11y/iframe-has-title': 'error', // iframes brauchen title
               'jsx-a11y/img-redundant-alt': ['error', {
                    components: ['Image', 'Picture'],
                    words: ['image', 'photo', 'picture', 'bild', 'foto']
               }],
               'jsx-a11y/no-access-key': 'error', // accessKey conflicts mit Screen Reader shortcuts
               'jsx-a11y/no-distracting-elements': ['error', {
                    elements: ['marquee', 'blink']
               }],
               'jsx-a11y/no-redundant-roles': ['error', {
                    nav: ['navigation'],
                    // Weitere redundante roles werden automatisch erkannt
               }],
               'jsx-a11y/role-has-required-aria-props': 'error', // Roles brauchen required ARIA props
               'jsx-a11y/role-supports-aria-props': 'error', // Nur supported ARIA props für roles
               'jsx-a11y/scope': 'error', // scope nur auf th elements
               'jsx-a11y/tabindex-no-positive': 'error', // Kein tabindex > 0 (stört keyboard navigation)

               // ===== WCAG 2.1 LEVEL AA (ENTERPRISE STANDARD) =====
               'jsx-a11y/autocomplete-valid': ['error', {
                    inputComponents: ['Input', 'TextField', 'TextInput']
               }],
               'jsx-a11y/label-has-associated-control': ['error', {
                    controlComponents: ['Input', 'Select', 'TextArea', 'TextField', 'Checkbox', 'Radio', 'Switch'],
                    assert: 'either', // either nesting or htmlFor
                    depth: 3, // Wie tief nach control component suchen
                    labelComponents: ['Label', 'FormLabel'],
                    labelAttributes: ['label']
               }],
               'jsx-a11y/lang': 'error', // lang attribute muss valid language code sein
               'jsx-a11y/no-aria-hidden-on-focusable': 'error', // Focusable elements nicht mit aria-hidden verstecken

               // ===== INTERACTION ACCESSIBILITY =====
               'jsx-a11y/click-events-have-key-events': 'error', // Click handlers brauchen keyboard support
               'jsx-a11y/interactive-supports-focus': ['error', {
                    tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox']
               }],
               'jsx-a11y/mouse-events-have-key-events': ['error', {
                    hoverInHandlers: ['onMouseOver', 'onMouseEnter', 'onPointerOver', 'onPointerEnter'],
                    hoverOutHandlers: ['onMouseOut', 'onMouseLeave', 'onPointerOut', 'onPointerLeave']
               }],
               'jsx-a11y/no-static-element-interactions': ['error', {
                    handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
                    allowExpressionValues: true
               }],
               'jsx-a11y/no-noninteractive-element-interactions': ['error', {
                    handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
                    alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
                    body: ['onError', 'onLoad'],
                    dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
                    iframe: ['onError', 'onLoad'],
                    img: ['onError', 'onLoad']
               }],

               // ===== FORM ACCESSIBILITY =====
               'jsx-a11y/control-has-associated-label': ['error', {
                    controlComponents: ['Button', 'IconButton'],
                    ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
                    ignoreRoles: ['grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'row', 'tablist', 'toolbar', 'tree', 'treegrid'],
                    depth: 3
               }],

               // ===== SEMANTIC HTML ENFORCEMENT =====
               'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
                    ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
                    ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
                    li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
                    table: ['grid'],
                    td: ['gridcell'],
                    fieldset: ['radiogroup', 'presentation']
               }],
               'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
                    tr: ['none', 'presentation'],
                    canvas: ['img'] // Canvas kann als img behandelt werden
               }],
               'jsx-a11y/prefer-tag-over-role': 'error', // Semantic HTML > ARIA roles

               // ===== MEDIA ACCESSIBILITY =====
               'jsx-a11y/media-has-caption': ['error', {
                    audio: ['Audio'],
                    video: ['Video'],
                    track: ['Track']
               }],

               // ===== FOCUS MANAGEMENT =====
               'jsx-a11y/no-autofocus': ['warn', {
                    ignoreNonDOM: true
               }], // Warn level - manchmal für UX notwendig
               'jsx-a11y/no-noninteractive-tabindex': ['error', {
                    tags: [],
                    roles: ['tabpanel', 'dialog'],
                    allowExpressionValues: true
               }],

               // ===== ARIA BEST PRACTICES =====
               'jsx-a11y/aria-activedescendant-has-tabindex': 'error', // Elements mit aria-activedescendant müssen tabbable sein
               'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
                    canvas: ['img', 'presentation'] // Canvas exceptions
               }],

               // ===== DEPRECATED BUT STILL IN DOCS =====
               // 'jsx-a11y/accessible-emoji': 'off', // Deprecated - modern emoji sind accessible
               // 'jsx-a11y/label-has-for': 'off', // Deprecated - use label-has-associated-control
               // 'jsx-a11y/no-onchange': 'off', // Deprecated - onchange ist jetzt accessible

               // ===== OPTIONAL STRICT RULES (Consider for AAA compliance) =====
               'jsx-a11y/anchor-ambiguous-text': ['warn', {
                    words: ['click here', 'here', 'link', 'a link', 'learn more', 'more', 'read more', 'mehr', 'hier', 'klicken']
               }] // Warn level - manchmal design requirements
          }
     },

     // ===== TYPESCRIPT-ESLINT CONFIGURATIONS =====
     // Include ALL strict TypeScript rules (includes recommended)
     ...tseslint.configs.strictTypeChecked.map(config => ({
          ...config,
          files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] // Only apply to TypeScript files
     })),
     ...tseslint.configs.stylisticTypeChecked.map(config => ({
          ...config,
          files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] // Only apply to TypeScript files
     })),

     // ===== TYPESCRIPT PARSER CONFIG =====
     {
          files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'], // Only apply to TypeScript files
          languageOptions: {
               parser: tseslint.parser,
               parserOptions: {
                    /*
                    ===== PERFORMANCE & CACHING OPTIONS =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#cachelifetime
                    Controls the internal cache expiry lengths. Can be specified as seconds (number) or 'Infinity'.
                    Default: 30 seconds (or infinite for single runs).
                    Performance optimization for long-running processes like editors.
                    */
                    // cacheLifetime: {
                    //     glob: 30 // Cache glob patterns for 30 seconds
                    // },

                    /* 
                    - https://typescript-eslint.io/packages/parser/#disallowautomaticsingleruninference
                    Default: process.env.TSESTREE_SINGLE_RUN or true
                    Disables automatic performance optimization for single runs vs persistent sessions.
                    When false, uses faster immutable Programs for CI/single runs.
                    When true, always uses Watch Programs (slower but needed for editors).
                    Enterprise: Leave default for 10-20% faster CI performance.
                    */
                    // disallowAutomaticSingleRunInference: false,

                    /*
                    ===== ECMA SCRIPT FEATURES =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#ecmafeatures
                    Additional options for raw syntax parsing
                    */
                    // ecmaFeatures: {
                    /* 
                    - https://typescript-eslint.io/packages/parser/#jsx
                    Default: false
                    Enable JSX parsing. Auto-detected for .jsx/.tsx files.
                    Note: .ts files always parse as false, .jsx/.tsx always as true
                    Only affects unknown extensions (.md, .vue) when project is not provided
                    */
                    jsx: true,

                    /* 
                    - https://typescript-eslint.io/packages/parser/#globalreturn
                    Default: false
                    Allow global return statements in codebase (useful for scripts)
                    */
                    // globalReturn: false
                    // },

                    /* 
                    - https://typescript-eslint.io/packages/parser/#ecmaversion
                    Default: 2018
                    ECMAScript version: number (es3, es5, es6, es7...) or year (es2015, es2016...) or 'latest'
                    Used for scope analysis, affects default behavior
                    */
                    // ecmaVersion: 'latest',

                    /*
                    ===== TYPESCRIPT COMPILER OPTIONS =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#emitdecoratormetadata
                    Default: undefined
                    Act as if emitDecoratorMetadata: true in tsconfig.json, but without type-aware linting.
                    Enables decorator metadata without requiring parserOptions.project (faster linting).
                    Enterprise: Use for decorator-heavy codebases without full type checking.
                    */
                    // emitDecoratorMetadata: true,

                    /* 
                    - https://typescript-eslint.io/packages/parser/#experimentaldecorators
                    Default: undefined
                    Act as if experimentalDecorators: true in tsconfig.json, but without type-aware linting.
                    Enables experimental decorators without requiring parserOptions.project (faster linting).
                    Enterprise: Essential for Angular, NestJS, or any decorator-based framework.
                    */
                    // experimentalDecorators: true,

                    /* 
                    - https://typescript-eslint.io/packages/parser/#isolateddeclarations
                    Default: undefined
                    Act as if isolatedDeclarations: true in tsconfig.json, but without type-aware linting.
                    Requires explicit type annotations for exports (faster compilation).
                    Enterprise: Recommended for libraries and monorepos for better build performance.
                    */
                    // isolatedDeclarations: true,

                    /*
                    ===== FILE HANDLING OPTIONS =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#extrafileextensions
                    Default: undefined
                    Additional file extensions to include in TypeScript Program compilation.
                    Default extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.mts', '.cts', '.tsx']
                    Add extensions starting with dot, e.g., ['.vue', '.svelte']
                    Performance Warning: See "Changes to extraFileExtensions with projectService"
                    */
                    // extraFileExtensions: ['.vue', '.svelte'],

                    /*
                    ===== JSDOC PARSING OPTIONS =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#jsdocparsingmode
                    Default: 'all' when project is set, 'none' otherwise
                    Controls JSDoc comment parsing for performance optimization (TypeScript >=5.3)
                    - 'all': Parse all JSDoc comments always
                    - 'none': Never parse JSDoc comments (best performance)
                    - 'type-info': Parse only JSDoc required for type information
                    Enterprise: Use 'none' if not using JSDoc-dependent rules like eslint-plugin-deprecation
                    */
                    // jsDocParsingMode: 'type-info',

                    /*
                    ===== JSX CONFIGURATION =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#jsxfragmentname
                    Default: null
                    JSX fragment identifier (after transpilation). If null, uses member of jsxPragma.
                    Use root identifier only (e.g., 'h' not 'h.Fragment').
                    Auto-detected when parserOptions.project is provided.
                    */
                    // jsxFragmentName: 'Fragment',

                    /* 
                    - https://typescript-eslint.io/packages/parser/#jsxpragma
                    Default: 'React'
                    JSX Elements creation identifier (after transpilation).
                    Set to null for new JSX transform. Use root identifier only (e.g., 'React' not 'React.createElement').
                    Auto-detected when parserOptions.project is provided.
                    Enterprise: Configure for React alternatives (Preact, Solid, etc.)
                    */
                    // jsxPragma: 'React',

                    /*
                    ===== TYPESCRIPT LIBRARY CONFIGURATION =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#lib
                    Default: ['es2018']
                    TypeScript libs available for scope analysis. Ensures global variables are declared.
                    See TypeScript compiler options for valid values.
                    Auto-detected when parserOptions.project is provided.
                    */
                    // lib: ['es2022', 'dom', 'dom.iterable'],

                    /*
                    ===== ADVANCED PROGRAM MANAGEMENT =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#programs
                    Default: undefined
                    Programmatically provided TypeScript Program instances with type information.
                    Overrides any programs computed from parserOptions.project.
                    All linted files must be part of provided program(s).
                    Enterprise: For custom build systems or advanced TypeScript Program management.
                    */
                    // programs: [/* TypeScript Program instances */],

                    /* 
                    - https://typescript-eslint.io/packages/parser/#project
                    Default: undefined
                    DEPRECATED: Use projectService instead for easier configuration and faster linting.
                    Path to TSConfig for type information. Required for type-aware rules.
                    Supports: true (nearest tsconfig), string path, glob pattern, array of paths/globs
                    Performance Warning: Avoid wide globs (**) - prefer single * patterns.
                    */
                    // project: './tsconfig.json',

                    /* 
                    - https://typescript-eslint.io/packages/parser/#projectfolderignorelist
                    Default: ["node_modules"]
                    Folders to ignore from project glob patterns.
                    Useful when using glob patterns but wanting to exclude specific directories.
                    Performance optimization for large monorepos.
                    */
                    // projectFolderIgnoreList: ['**/node_modules/**', '**/dist/**', '**/build/**'],

                    /*
                    ===== PROJECT SERVICE CONFIGURATION (RECOMMENDED) =====
                    */

                    /*
                    - https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/#project-service
                    - https://typescript-eslint.io/packages/parser/#projectservice
                    Default: false
                    RECOMMENDED: Use instead of 'project' for simpler configuration and faster linting.
                    Automatically finds nearest tsconfig.json (like project: true).
                    Benefits: Simpler configs, predictable (matches editor type info), allows JS without allowJs.
                    Can be boolean or ProjectServiceOptions object for advanced configuration.
                    */
                    projectService: true,
                    // projectService: {
                    /* 
                    - https://typescript-eslint.io/packages/parser/#allowdefaultproject
                    Default: [] (none)
                    Globs for files to run with default project despite not being in tsconfig.
                    For config files like eslint.config.js not in sibling tsconfig.json.
                    Performance Warning: Each file incurs non-trivial overhead - use sparingly.
                    Restrictions: No ** globs, files can't be in nearest tsconfig.json
                    */
                    // allowDefaultProject: ['*.js', '*.mjs'],

                    /* 
                    - https://typescript-eslint.io/packages/parser/#defaultproject
                    Default: 'tsconfig.json'
                    TSConfig path for default project instead of TypeScript defaults.
                    Only affects files included by allowDefaultProject.
                    Resolved relative to tsconfigRootDir.
                    */
                    // defaultProject: './tsconfig.eslint.json',

                    /* 
                    - https://typescript-eslint.io/packages/parser/#loadtypescriptplugins
                    Default: false
                    Allow project service to load TypeScript plugins.
                    False by default to prevent persistent watchers that block ESLint exit.
                    Useful for custom rules interacting with TypeScript plugins.
                    Enterprise: Enable conditionally (e.g., only in VS Code)
                    */
                    // loadTypeScriptPlugins: !!process.env.VSCODE_PID,

                    /* 
                    - https://typescript-eslint.io/packages/parser/#maximumdefaultprojectfilematchcount_this_will_slow_down_linting
                    Default: 8
                    Maximum files allowDefaultProject may match.
                    Each match slows linting significantly.
                    Enterprise: File issue explaining need if you must increase this.
                    */
                    // maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 8
                    // },

                    /* 
                    - https://typescript-eslint.io/packages/parser/#tsconfigrootdir
                    The root directory for relative TSConfig paths in project option.
                    Ensures ESLint finds TSConfig when run from different directories.
                    Critical for monorepos and CI/CD pipelines.
                    */
                    tsconfigRootDir: import.meta.dirname,

                    /*
                    ===== VERSION COMPATIBILITY =====
                    */

                    /* 
                    - https://typescript-eslint.io/packages/parser/#warnonunsupportedtypescriptversion
                    Default: true
                    Show warning when using unsupported TypeScript version.
                    Warning format shows supported vs current version.
                    Enterprise: Keep enabled for version compliance monitoring.
                    Set to false to suppress warnings in bleeding-edge environments.
                    */
                    // warnOnUnsupportedTypeScriptVersion: true
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

     // ===== PERFECTIONIST PLUGIN =====
     // Enterprise-Grade Sorting Standards
     // Based on Google/Microsoft/Meta Natural Sorting Preferences
     perfectionist.configs['recommended-natural'], // Natural sorting (human-readable)
     {
          rules: {
               // ===== DEAKTIVIERTE REGELN (BEREITS ABGEDECKT) =====
               // Diese Regeln sind bereits durch andere Plugins mit besserer Konfiguration abgedeckt
               'perfectionist/sort-imports': 'off', // ✅ Abgedeckt durch import/order (komplexere Enterprise-Konfiguration)
               'perfectionist/sort-named-imports': 'off', // ✅ Abgedeckt durch import/order
               'perfectionist/sort-interfaces': 'off', // ✅ Abgedeckt durch typescript-sort-keys/interface
               'perfectionist/sort-jsx-props': 'off', // ✅ Abgedeckt durch @stylistic/jsx-sort-props (bessere JSX-Integration)
               'perfectionist/sort-objects': 'off', // ✅ Abgedeckt durch ESLint Core sort-keys
               'perfectionist/sort-enums': 'off', // ✅ Abgedeckt durch typescript-sort-keys/string-enum

               // ===== ENTERPRISE-AKTIVIERTE REGELN (NOCH NICHT ABGEDECKT) =====

               // ===== TYPESCRIPT TYPE SORTING =====
               'perfectionist/sort-union-types': ['error', {
                    type: 'natural',
                    order: 'asc',
                    groups: [
                         'conditional', // A extends B ? C : D
                         'function', // () => void
                         'import', // import('module')
                         'intersection', // A & B
                         'keyword', // string, number, boolean
                         'literal', // 'literal', 123, true
                         'named', // CustomType, Interface
                         'object', // { key: value }
                         'operator', // keyof, typeof
                         'tuple', // [string, number]
                         'union', // A | B
                         'nullish' // null, undefined
                    ]
               }],
               'perfectionist/sort-intersection-types': ['error', {
                    type: 'natural',
                    order: 'asc',
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
                    ]
               }],
               'perfectionist/sort-object-types': ['error', {
                    type: 'natural',
                    order: 'asc',
                    groups: [
                         'multiline', // Komplexe Properties zuerst
                         'method', // Methods nach Properties (Airbnb Standard)
                         'property' // Einfache Properties zuletzt
                    ]
               }],

               // ===== CLASS & INHERITANCE SORTING =====

               // ✅ ==== VERIFIED ====
               "perfectionist/sort-classes": "off", // we use @typescript-eslint/member-ordering

               'perfectionist/sort-heritage-clauses': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // extends/implements clauses

               // ===== MODERN JAVASCRIPT FEATURES =====
               'perfectionist/sort-sets': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // new Set([...]) values
               'perfectionist/sort-maps': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // new Map([...]) entries
               'perfectionist/sort-array-includes': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // array.includes() arguments

               // ===== VARIABLE & DECLARATION SORTING =====
               'perfectionist/sort-variable-declarations': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // const a, b, c = destructuring

               // ===== CONTROL FLOW SORTING =====
               'perfectionist/sort-switch-case': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // switch case statements (alphabetical für bessere Lesbarkeit)

               // ===== EXPORT/IMPORT MODULE SORTING =====
               'perfectionist/sort-exports': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // Export statements sorting
               'perfectionist/sort-named-exports': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // export { a, b, c }
               'perfectionist/sort-modules': ['error', {
                    type: 'natural',
                    order: 'asc'
               }], // Module member sorting

               // ===== DECORATOR SORTING (ENTERPRISE TYPESCRIPT) =====
               'perfectionist/sort-decorators': ['error', {
                    type: 'natural',
                    order: 'asc'
               }] // @decorator sorting für Enterprise TypeScript Apps
          }
     },

     // ===== TSDOC PLUGIN =====
     {
          files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'], // Only apply to TypeScript files
          plugins: {
               'tsdoc': pluginTsDoc
          },
          rules: {
               'tsdoc/syntax': 'error' // Enterprise: TSDoc compliance ist Pflicht
          }
     },

     // ===== ADDITIONAL TYPESCRIPT RULES =====
     {
          files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'], // Only apply to TypeScript files
          rules: {
               // Additional typescript-eslint rules not included in strict
               '@typescript-eslint/explicit-function-return-type': 'error',
               '@typescript-eslint/explicit-member-accessibility': 'error',

               // ✅ ==== VERIFIED ====
               "@typescript-eslint/member-ordering": ["error", {
                    "default": {
                         // Keep all default memberTypes (sie sind enterprise-optimal!)
                         // ADD: Alphabetical sorting within groups
                         "order": "alphabetically-case-insensitive",

                         // ADD: Optional members preference (Enterprise consistency)
                         "optionalityOrder": "required-first"
                    }
               }],

               '@typescript-eslint/dot-notation': 'off', // Disabled to allow bracket notation for private method testing

               // ✅ ==== VERIFIED ====
               '@typescript-eslint/naming-convention': [
                    'error',
                    // ===== BIG TECH ENTERPRISE STANDARDS (Google, Meta, Microsoft) =====

                    // 🚫 KRITISCH: Verbiete I-Prefix für Interfaces (veraltetes Anti-Pattern)
                    {
                         'selector': 'interface',
                         'format': ['PascalCase'],
                         'custom': {
                              'regex': '^I[A-Z]',
                              'match': false
                         }
                    },

                    // 🚫 KRITISCH: Verbiete E-Prefix für Enums (veraltetes Anti-Pattern)
                    {
                         'selector': 'enum',
                         'format': ['PascalCase'],
                         'custom': {
                              'regex': '^E[A-Z]',
                              'match': false
                         }
                    },

                    // ✅ Type-Like (Interfaces, Classes, Types, Enums) - PascalCase
                    {
                         'selector': 'typeLike',
                         'format': ['PascalCase']
                    },

                    // ✅ Type Parameters (Generics) - T-Prefix (Google/MS Standard)
                    {
                         'selector': 'typeParameter',
                         'format': ['PascalCase'],
                         'prefix': ['T']
                    },

                    // 🚀 MODERN ONLY: # Private Fields (ECMA Standard) - Enterprise Future
                    {
                         'selector': 'classProperty',
                         'modifiers': ['#private'],
                         'format': ['camelCase'],
                         'leadingUnderscore': 'forbid'
                    },

                    // 🚀 MODERN ONLY: # Private Methods (ECMA Standard)
                    {
                         'selector': 'classMethod',
                         'modifiers': ['#private'],
                         'format': ['camelCase'],
                         'leadingUnderscore': 'forbid'
                    },

                    // 🚫 VERBIETE Legacy underscore für private (erzwinge # private fields)
                    {
                         'selector': 'memberLike',
                         'modifiers': ['private'],
                         'format': ['camelCase'],
                         'leadingUnderscore': 'forbid',
                         'custom': {
                              'regex': '^_',
                              'match': false
                         }
                    },

                    // ✅ Protected Members - underscore optional
                    {
                         'selector': 'memberLike',
                         'modifiers': ['protected'],
                         'format': ['camelCase'],
                         'leadingUnderscore': 'allow'
                    },

                    // ✅ Static Readonly Constants - UPPER_CASE (Google Standard)
                    {
                         'selector': 'classProperty',
                         'modifiers': ['static', 'readonly'],
                         'format': ['UPPER_CASE']
                    },

                    // ✅ Global Primitive Constants - UPPER_CASE (Google/Meta Standard)
                    {
                         'selector': 'variable',
                         'modifiers': ['const', 'global'],
                         'types': ['string', 'number', 'boolean'],
                         'format': ['UPPER_CASE']
                    },

                    // ✅ Global Function Constants - camelCase (Enterprise Standard)
                    {
                         'selector': 'variable',
                         'modifiers': ['const', 'global'],
                         'types': ['function'],
                         'format': ['camelCase']
                    },

                    // ✅ Enum Members - PascalCase (Meta/React Standard)
                    {
                         'selector': 'enumMember',
                         'format': ['PascalCase', 'UPPER_CASE']
                    },

                    // ✅ Boolean Variables - Verb Prefixes (Google Best Practice)
                    {
                         'selector': 'variable',
                         'types': ['boolean'],
                         'format': ['PascalCase'],
                         'prefix': ['is', 'has', 'can', 'should', 'will', 'did', 'does', 'was', 'were'],
                         'filter': {
                              // Erlaube auch normale camelCase für destructured oder spezielle Fälle
                              'regex': '^(__|_)',
                              'match': false
                         }
                    },

                    // ✅ Variables - camelCase oder UPPER_CASE
                    {
                         'selector': 'variable',
                         'format': ['camelCase', 'UPPER_CASE'],
                         'leadingUnderscore': 'allow'
                    },

                    // ✅ Functions - camelCase oder PascalCase (für React Components)
                    {
                         'selector': 'function',
                         'format': ['camelCase', 'PascalCase']
                    },

                    // ✅ Parameters - camelCase mit underscore erlaubt
                    {
                         'selector': 'parameter',
                         'format': ['camelCase'],
                         'leadingUnderscore': 'allow'
                    },

                    // ✅ Destructured Variables - flexible Naming (externe APIs)
                    {
                         'selector': 'variable',
                         'modifiers': ['destructured'],
                         'format': null
                    },

                    // ✅ Object/Type Properties - verschiedene Formate für externe Libraries (Zod, etc.)
                    {
                         'selector': ['objectLiteralProperty', 'typeProperty'],
                         'format': ['camelCase', 'snake_case', 'PascalCase'],
                         'leadingUnderscore': 'allow'
                    },

                    // ✅ Properties die Quotes brauchen - keine Format-Checks
                    {
                         'selector': [
                              'classProperty',
                              'objectLiteralProperty',
                              'typeProperty',
                              'classMethod',
                              'objectLiteralMethod',
                              'typeMethod',
                              'accessor',
                              'enumMember'
                         ],
                         'format': null,
                         'modifiers': ['requiresQuotes']
                    },

                    // ✅ Default Fallback - camelCase
                    {
                         'selector': 'default',
                         'format': ['camelCase'],
                         'leadingUnderscore': 'allow',
                         'trailingUnderscore': 'forbid'
                    }
               ],
               '@typescript-eslint/no-explicit-any': 'error',
               '@typescript-eslint/no-non-null-assertion': 'error',
               '@typescript-eslint/no-unnecessary-condition': ['error', {
                    allowConstantLoopConditions: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
               }],
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
               '@typescript-eslint/prefer-literal-enum-member': 'error',

               // ===== ENTERPRISE-GRADE ZUSÄTZLICHE REGELN =====
               // Type Safety Enhancement
               '@typescript-eslint/no-unsafe-type-assertion': 'error', // Verhindert unsichere Type Assertions
               '@typescript-eslint/no-unnecessary-type-conversion': 'error', // Verhindert unnötige Type Conversions
               '@typescript-eslint/consistent-return': 'error', // Erzwingt konsistente Return Types
               '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error', // Verhindert redundante Zuweisungen

               // Import/Export Hygiene (Google/Microsoft Standards)

               // ✅ ==== VERIFIED ====
               '@typescript-eslint/no-import-type-side-effects': 'error', // Performance: Verhindert Side Effects bei Type Imports

               // ✅ ==== VERIFIED ====
               '@typescript-eslint/consistent-type-exports': 'error', // Konsistente Type Exports

               // ✅ ==== VERIFIED ====
               '@typescript-eslint/consistent-type-imports': 'error',  // Enforce type-only imports
               '@typescript-eslint/no-useless-empty-export': 'error', // Verhindert leere Exports

               // Code Quality & Maintainability
               '@typescript-eslint/no-unnecessary-qualifier': 'error', // Entfernt unnötige Namespace Qualifier
               '@typescript-eslint/prefer-destructuring': ['error', { // Erzwingt Destructuring (moderne Syntax)
                    'array': true,
                    'object': true
               }],
               '@typescript-eslint/parameter-properties': ['error', { // Explizite Parameter Properties
                    'prefer': 'parameter-property'
               }],

               // Restricted Types (Security & Type Safety)
               '@typescript-eslint/no-restricted-types': ['error', {
                    'types': {
                         'Object': {
                              'message': 'Use Record<string, unknown> or a specific interface instead',
                              'fixWith': 'Record<string, unknown>'
                         },
                         'Function': {
                              'message': 'Use a specific function type instead',
                              'suggest': ['() => void', '(...args: unknown[]) => unknown']
                         },
                         '{}': {
                              'message': 'Use Record<string, never> for empty object, unknown for any value, or a specific interface',
                              'fixWith': 'Record<string, never>'
                         }
                    }
               }],

               // Method Signature Enforcement
               '@typescript-eslint/method-signature-style': ['error', 'property'], // Konsistente Method Signatures

               // Class Design (Enterprise OOP Standards)
               '@typescript-eslint/class-methods-use-this': ['error', { // Statische Methoden wenn kein "this"
                    'exceptMethods': ['render', 'componentDidMount', 'componentDidUpdate', 'componentWillUnmount'],
                    'enforceForClassFields': true
               }],

               // Async/Promise Best Practices
               '@typescript-eslint/return-await': ['error', 'always'], // Explizites await für besseres Stack Tracing
               '@typescript-eslint/no-misused-promises': ['error', {
                    'checksVoidReturn': {
                         'arguments': true,
                         'attributes': true,
                         'properties': true,
                         'returns': true,
                         'variables': true
                    },
                    'checksConditionals': true,
                    'checksSpreads': true
               }],

               // Enhanced Type Checking für Edge Cases
               '@typescript-eslint/no-confusing-void-expression': ['error', {
                    'ignoreArrowShorthand': false,
                    'ignoreVoidOperator': false
               }],

               // Type Annotation Requirements (für kritische Bereiche)
               '@typescript-eslint/typedef': ['error', {
                    'arrayDestructuring': false,
                    'arrowParameter': false,
                    'memberVariableDeclaration': true, // Klassen-Member müssen typisiert sein
                    'objectDestructuring': false,
                    'parameter': true, // Funktionsparameter müssen typisiert sein
                    'propertyDeclaration': true, // Properties müssen typisiert sein
                    'variableDeclaration': false, // Kann durch Type Inference abgeleitet werden
                    'variableDeclarationIgnoreFunction': true
               }],

               // ===== ENTERPRISE-GRADE NEUE REGELN (VERIFIZIERT) =====
               // Type Safety Enhancement
               '@typescript-eslint/no-redundant-type-constituents': 'error', // Verhindert redundante Union/Intersection Types
               '@typescript-eslint/no-duplicate-type-constituents': 'error', // Keine doppelten Type Constituents
               '@typescript-eslint/no-unnecessary-template-expression': 'error', // Korrekter Name (nicht no-useless-template-literals)
               '@typescript-eslint/prefer-find': 'error', // Array.find() > filter()[0]
               '@typescript-eslint/prefer-includes': 'error', // includes() > indexOf() !== -1

               // TypeScript 5.x Features
               '@typescript-eslint/no-unsafe-declaration-merging': 'error', // TypeScript 5.x Declaration Merging Safety
               '@typescript-eslint/no-unsafe-enum-comparison': 'error' // TypeScript 5.x Enum Comparison Safety
          }
     }
)