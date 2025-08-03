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
// https://github.com/eslint-stylistic/eslint-stylistic
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
// https://github.com/sindresorhus/eslint-plugin-unicorn
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
// https://github.com/eslint-community/eslint-plugin-n
import nodePlugin from 'eslint-plugin-n'
// https://www.npmjs.com/package/eslint-plugin-security
import pluginSecurity from 'eslint-plugin-security'
// https://www.npmjs.com/package/eslint-plugin-sonarjs
import sonarjs from 'eslint-plugin-sonarjs'
// https://www.npmjs.com/package/eslint-plugin-promise
import pluginPromise from 'eslint-plugin-promise'
// https://tsdoc.org/pages/packages/eslint-plugin-tsdoc/
import pluginTsDoc from 'eslint-plugin-tsdoc'
// https://www.npmjs.com/package/eslint-plugin-unused-imports
import unusedImports from "eslint-plugin-unused-imports"
// https://www.npmjs.com/package/eslint-plugin-no-secrets
import noSecrets from "eslint-plugin-no-secrets"
// https://www.npmjs.com/package/eslint-plugin-jsonc
import eslintPluginJsonc from 'eslint-plugin-jsonc'
// https://www.npmjs.com/package/eslint-plugin-prefer-arrow
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow'
// https://www.npmjs.com/package/eslint-plugin-package-json
import packageJson from 'eslint-plugin-package-json'

// ⚠️ INCOMPATIBLE WITH ESLINT 9 - DO NOT USE
// eslint-plugin-xss uses deprecated APIs (getComments) removed in ESLint 9
// Last updated: 2019 - NOT MAINTAINED
// Alternative: Use eslint-plugin-security for XSS prevention
// https://www.npmjs.com/package/eslint-plugin-xss
// import eslintPluginXss from 'eslint-plugin-xss'

export default tseslint.config(
     {
          // Global ignores for other directories, but not for eslint.config.mjs itself regarding naming conventions
          ignores: ['eslint.config.mjs', 'coverage/**']
     },

     // ===== ESLINT CORE =====
     eslint.configs.all,
     {
          rules: {
               // Migrated to @stylistic - now commented out
               // 'arrow-parens': ['error', 'as-needed'],
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
               // 'no-duplicate-imports': 'error', // Handled by import/no-duplicates plugin rule
               // 'no-return-await': 'error', // Handled by @typescript-eslint/return-await
               'no-template-curly-in-string': 'error',
               'require-atomic-updates': 'error',
               'accessor-pairs': 'error',
               'array-callback-return': 'error',
               'block-scoped-var': 'error',
               // 'camelcase': ['error', { properties: 'never' }], // Handled by @typescript-eslint/naming-convention
               'complexity': ['error', 15], // Enterprise standard: Google/Microsoft use 10-15
               // 'consistent-return': 'error', // Handled by @typescript-eslint/consistent-return
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
               // 'no-throw-literal': 'error', // Handled by @typescript-eslint/no-throw-literal
               'no-useless-catch': 'error', // Prevents redundant catch blocks

               // Code Quality & Maintainability
               'no-sequences': ['error', { // Prevents comma operator abuse
                    allowInParentheses: false
               }],
               'no-unused-expressions': ['error', { // Prevents side-effect free code
                    allowShortCircuit: false,
                    allowTernary: false,
                    allowTaggedTemplates: false,
                    enforceForJSX: true
               }],
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
                    }
               ],

               // Function Design
               'max-params': ['error', { max: 4 }], // Limit function parameters
               'max-depth': ['error', { max: 4 }], // Limit nesting depth
               'max-nested-callbacks': ['error', { max: 3 }], // Limit callback nesting
               'max-statements': ['error', 15], // Limit function complexity
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
               // 'prefer-destructuring': ['error', {...}], // Handled by @typescript-eslint/prefer-destructuring
               // 'prefer-template': 'error', // Handled by unicorn/prefer-template-literal which is more powerful
               'prefer-object-spread': 'error', // Object spread over Object.assign
               'prefer-exponentiation-operator': 'error', // ** over Math.pow
               'no-useless-return': 'error' // No redundant returns
          }
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
                         'AWS Secret Key': '[0-9a-zA-Z/+=]{40}',
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
                         'Bitbucket Token': '[a-zA-Z0-9]{20,}',
                         
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
                         'Basic Auth': 'Basic [A-Za-z0-9+/]{4,}={0,2}',
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
               "prefer-arrow": eslintPluginPreferArrow
          },
          rules: {
               // ===== ENTERPRISE ARROW FUNCTION STANDARDS (Google/Airbnb/Meta) =====
               'prefer-arrow/prefer-arrow-functions': ['error', {
                    disallowPrototype: true, // Enterprise: No prototype modifications (security & maintainability)
                    singleReturnOnly: false, // Enterprise: Allow complex arrow functions (real-world code)
                    classPropertiesAllowed: true, // Enterprise: Support modern class field syntax (ES2022+)
                    allowStandaloneDeclarations: false // Enterprise: Consistency - use arrow functions everywhere
               }]
               // Note: This enforces modern JavaScript patterns:
               // - Lexical 'this' binding prevents common bugs
               // - Consistent function style across codebase
               // - Better TypeScript type inference with arrow functions
               // - Aligns with React Hooks and modern framework patterns
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
               'sonarjs/max-lines': ['error', { maximum: 400 }], // Enterprise: Maximale Dateigröße
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
               // Viele Regex-Regeln sind TypeScript-aware und ergänzen unicorn/regexp
               'sonarjs/no-empty-character-class': 'error', // Leere Character Classes verhindern
               'sonarjs/single-char-in-character-classes': 'error', // [a] -> a
               'sonarjs/no-control-regex': 'error', // Keine Control Characters in Regex

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
          rules: {
               'n/no-missing-import': 'off',
               'n/no-unpublished-import': 'off',
               'n/prefer-node-protocol': 'off', // Already handled by unicorn/prefer-node-protocol
               'n/prefer-global/process': ['error', 'never'] // Enterprise: Force explicit imports
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
                    'noUselessIndex': true,
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
               'import/no-default-export': 'off', // Diese Regel hat keine exceptions Option - deaktiviert für Flexibilität

               // ===== TYPE IMPORTS (TypeScript Specific) =====
               'import/consistent-type-specifier-style': ['error', 'prefer-inline'], // import { type Foo }
               'import/no-import-module-exports': 'error', // Kein Mix von import/module.exports
               'import/no-empty-named-blocks': 'error', // import {} from 'foo' verhindert
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

               // ===== FILE EXTENSIONS (TypeScript/React Ready) =====
               'import/extensions': ['error', 'always', {
                    'ts': 'always',
                    'tsx': 'always',
                    'js': 'never',
                    'jsx': 'never',
                    'json': 'always',
                    'css': 'always',
                    'scss': 'always'
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
               'import/prefer-default-export': 'off', // Named exports bevorzugt
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
               'import/group-exports': 'error', // Gruppierte Exports am Ende
               'import/exports-last': 'error' // Alle Exports am Ende der Datei
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
               '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
               '@stylistic/function-call-argument-newline': ['error', 'consistent'],
               '@stylistic/function-call-spacing': ['error', 'never'],
               '@stylistic/arrow-parens': ['error', 'as-needed', {
                    'requireForBlockBody': true
               }],
               '@stylistic/arrow-spacing': ['error', {
                    'before': true,
                    'after': true
               }],
               '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
               '@stylistic/wrap-iife': ['error', 'inside', {
                    'functionPrototypeMethods': true
               }],

               // ===== BLOCKS & BRACES =====
               '@stylistic/brace-style': ['error', 'stroustrup', {
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
                    // extraFileExtensions: ['.json'], // Removed: JSON files should be handled by jsonc-eslint-parser
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
               '@typescript-eslint/no-import-type-side-effects': 'error', // Performance: Verhindert Side Effects bei Type Imports
               '@typescript-eslint/consistent-type-exports': 'error', // Konsistente Type Exports
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
               }]
          }
     }
)