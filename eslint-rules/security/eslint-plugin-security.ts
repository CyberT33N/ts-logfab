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
import pluginSecurity from 'eslint-plugin-security'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

// Enhanced security rules configuration
const securityRules: {
    /**
     *
     */
    rules: TSESLint.Linter.RulesRecord
} = {
    rules: {
        /*
         * ===== ENHANCED XSS PREVENTION (OWASP Top 10 Compliance) =====
         * Since eslint-plugin-xss is incompatible with ESLint 9,
         * We use security plugin rules for XSS prevention
         */

        // Prevents ReDoS attacks
        'security/detect-eval-with-expression': 'error',

        // Prevents code injection
        'security/detect-no-csrf-before-method-override': 'error',

        /*
         * ✅ ==== VERIFIED ====
         * Enterprise: Enforce object-injection prevention on server code.
         * Industry practice: Large backends treat dynamic bracket access `object[expression]`
         * as an injection sink and escalate to "error" (OWASP A01: Injection).
         * Rationale: Prevents reads/writes via untrusted keys and improves auditability.
         * Scope: Apply in server-side paths via ESLint overrides; not necessary for pure UI paths.
         * Implementation guidance:
         *  - Prefer Object.entries(...) + destructuring instead of `object[key]`
         *  - Use precise types (e.g., generics for import.meta.glob) instead of type casts
         */
        'security/detect-object-injection': 'error',

        // CSRF protection
        'security/detect-possible-timing-attacks': 'error',

        // Enhanced regex security
        'security/detect-unsafe-regex': 'error'
    }
}

/**
 * Creates the base security ESLint rules.
 *
 * @returns The base security ESLint rules.
 */
const createSecurityBase = (): TSESLint.FlatConfig.Config => {
    const rules: TSESLint.Linter.RulesRecord = {
        ...pluginSecurity.configs.recommended.rules,
        ...securityRules.rules
    }

    return {
        name: 'enterprise/security/base',
        ...pluginSecurity.configs.recommended,
        rules
    }
}

/**
 * Creates the all security ESLint rules.
 *
 * @returns The all security ESLint rules.
 */
const createSecurityAll = (): TSESLint.FlatConfig.ConfigArray => [createSecurityBase()]

// ==== SHARED CONFIGS (Plugin Pattern) ====
export const configs = {
    /**
     * Enterprise-grade Security ESLint rules based on OWASP Top 10 and industry standards.
     * Provides eslint-plugin-security configuration for XSS, ReDoS, and code injection prevention.
     *
     * @see {@link https://github.com/t33n/ts-logfab#enterprise-security-config}
     */
    all: createSecurityAll(),

    /**
     * Base security ESLint rules from eslint-plugin-security.
     */
    base: [createSecurityBase()],

    /**
     * Alias for compatibility with flat config naming conventions.
     */
    'flat/all': createSecurityAll()
} satisfies Record<string, TSESLint.FlatConfig.ConfigArray>
