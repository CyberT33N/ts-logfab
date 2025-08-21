/* eslint-disable no-secrets/no-pattern-match */
/* eslint-disable no-secrets/no-secrets */
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
import noSecrets from 'eslint-plugin-no-secrets'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// No-secrets plugin rules configuration
const noSecretsRules: {
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== PATTERN MATCHING FOR STRUCTURED SECRETS =====
         */
        'no-secrets/no-pattern-match': [
            'error',
            {
                patterns: {
                    'Connection String': /(?:mongodb|mysql|postgres|redis):\/\/[^:]+:[^@]+@[^/]+/u,
                    'Hardcoded API Key': /api[-_]?key\s*[:=]\s*["'][^"']+["']/iu,

                    /*
                     * Enterprise patterns for configuration files
                     */
                    'Hardcoded Password': /password\s*[:=]\s*["'][^"']+["']/iu,
                    'Hardcoded Secret': /secret\s*[:=]\s*["'][^"']+["']/iu,
                    'Hardcoded Token': /token\s*[:=]\s*["'][^"']+["']/iu,
                    'Private Key Content': /-{5}BEGIN\s+(?:RSA\s+PRIVATE|PRIVATE)\s+KEY-{5}/u
                }
            }
        ],

        /*
         * ===== ENTERPRISE SECRET DETECTION (Google/Microsoft/Meta Standards) =====
         */
        'no-secrets/no-secrets': [
            'error',
            {
                additionalDelimiters: [
                    '.',
                    '-',
                    '_',
                    '(?=[A-Z][a-z])'
                ],

                /*
                 * Enterprise: Case-sensitive entropy calculation
                 */
                additionalRegexes: {
                    /*
                     * ===== CLOUD PROVIDER SECRETS =====
                     */
                    'AWS Access Key': 'AKIA[0-9A-Z]{16}',
                    'AWS AppSync': 'da2-[a-z0-9]{26}',
                    'AWS MWS Key': String.raw`amzn\.mws\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
                    'Ansible Vault': String.raw`\$ANSIBLE_VAULT;[0-9.]+;AES256`,

                    /*
                     * ===== ENTERPRISE SPECIFIC =====
                     */
                    'Artifactory Token': 'AKC[a-zA-Z0-9]{10,}',
                    'Azure Storage Key': '[a-zA-Z0-9+/]{86}==',
                    'Bearer Token': String.raw`Bearer [A-Za-z0-9\-_]+`,
                    'Discord Token': String.raw`[MN][a-zA-Z\d]{23}\.[a-zA-Z\d-_]{6}\.[a-zA-Z\d-_]{27}`,
                    'Discord Webhook': String.raw`https://discord\.com/api/webhooks/[0-9]+/[a-zA-Z0-9\-_]+`,
                    'Docker Hub Token': String.raw`dckr_pat_[a-zA-Z0-9\-_]+`,
                    'GCP API Key': String.raw`AIza[0-9A-Za-z\-_]{35}`,
                    'GCP OAuth': String.raw`[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com`,
                    'GitHub App Token': 'ghs_[0-9a-zA-Z]{36}',
                    'GitHub Personal Token': 'ghp_[0-9a-zA-Z]{36}',

                    /*
                     * ===== VERSION CONTROL TOKENS =====
                     */
                    'GitHub Token': '(gh[oprs]_[0-9a-zA-Z]{36})',
                    'GitLab Token': String.raw`glpat-[0-9a-zA-Z\-_]{20}`,

                    /*
                     * ===== AUTHENTICATION PATTERNS =====
                     */
                    'JWT Token': String.raw`ey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*`,
                    'Kubernetes Secret': String.raw`kubectl create secret [^\n]+`,
                    'MailChimp API Key': '[0-9a-f]{32}-us[0-9]{1,2}',

                    /*
                     * ===== DATABASE CREDENTIALS =====
                     */
                    'MongoDB Connection': String.raw`mongodb(\+srv)?://[^\s]+`,
                    'MySQL Connection': String.raw`mysql://[^\s]+`,

                    /*
                     * ===== API KEYS & SECRETS =====
                     */
                    'NPM Token': 'npm_[a-zA-Z0-9]{36}',
                    'PayPal/Braintree Token': String.raw`access_token\$production\$[0-9a-z]{16}\$[0-9a-f]{32}`,
                    'PostgreSQL Connection': String.raw`postgres(ql)?://[^\s]+`,
                    'Private Key': '-----BEGIN (RSA |EC |DSA |OPENSSH |)?(PRIVATE|ENCRYPTED) KEY-----',
                    'PyPI Token': String.raw`pypi-[a-zA-Z0-9\-_]+`,
                    'Redis Connection': String.raw`redis://[^\s]+`,
                    'SendGrid API Key': String.raw`SG\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+`,

                    /*
                     * ===== COMMUNICATION PLATFORMS =====
                     */
                    'Slack Token': '(xox[baprs]-[0-9a-zA-Z-]+)',
                    'Slack Webhook': String.raw`https://hooks\.slack\.com/services/T[a-zA-Z0-9_]+/B[a-zA-Z0-9_]+/[a-zA-Z0-9_]+`,
                    'Square Token': String.raw`(sq0atp|sq0csp)-[0-9A-Za-z\-_]+`,
                    'Stripe API Key': '(sk|pk)_(test|live)_[0-9a-zA-Z]{24}',
                    'Teams Webhook': String.raw`https://[a-z0-9]+\.webhook\.office\.com/webhookb2/[a-z0-9\-]+@[a-z0-9\-]+/IncomingWebhook/[a-z0-9]+/[a-z0-9\-]+`,
                    'Terraform Variable': String.raw`TF_VAR_[a-zA-Z_]+=[^\s]+`,
                    'Twilio API Key': 'SK[0-9a-fA-F]{32}',
                    'Vault Token': String.raw`s\.[a-zA-Z0-9]{24}`
                },

                /*
                 * Enterprise: Check ALL strings including imports
                 */
                ignoreCase: false,
                ignoreContent: [
                    /*
                     * Common false positives in enterprise codebases
                     */
                    '^[A-Z][A-Z0-9_]*$',
                    '^[a-f0-9]{32}$',
                    '^[a-f0-9]{40}$',
                    '^[a-f0-9]{64}$'
                ],

                /*
                 * Enterprise: Stricter entropy threshold (Google standard)
                 */
                ignoreModules: false,
                tolerance: 3
            }
        ]
    }
}

/**
 * Creates the no-secrets plugin configuration.
 * @returns The no-secrets plugin configuration.
 */
const createNoSecretsConfig = (): TSESLint.FlatConfig.Config => {
    return {
        name: 'enterprise/security/no-secrets',
        plugins: {
            'no-secrets': noSecrets
        },
        rules: noSecretsRules.rules
    }
}

/**
 * Creates the all security ESLint rules.
 * @returns The all security ESLint rules.
 */
const createSecurityAll = (): TSESLint.FlatConfig.ConfigArray => [createNoSecretsConfig()]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Security ESLint rules based on OWASP Top 10 and industry standards.
     * Combines eslint-plugin-security with no-secrets for comprehensive security coverage.
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-security-config}
     */
    all: createSecurityAll(),

    /**
     * Base security ESLint rules from eslint-plugin-security.
     */
    'flat/all': createSecurityAll(),

    /**
     * No-secrets plugin configuration for enterprise secret detection.
     */
    'no-secrets': createNoSecretsConfig()
} satisfies Record<string, TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray>
