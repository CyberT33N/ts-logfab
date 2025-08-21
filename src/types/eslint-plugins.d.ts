/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ENTERPRISE TYPE-ASSERTIONS für ESLint Plugins ohne TypeScript-Definitionen
 * - Packages: eslint-plugin-promise, eslint-plugin-react-perf, eslint-plugin-security,
 * eslint-plugin-typescript-sort-keys, eslint-plugin-jsx-a11y,
 * - Scope: Nur die tatsächlich verwendeten Oberflächen werden typisiert (configs / rules)
 * - Rationale: Behebt "Could not find a declaration file" ohne any-Casts
 * ═══════════════════════════════════════════════════════════════════════════════
 */

type LooseRuleDefinition = import('@typescript-eslint/utils').TSESLint.LooseRuleDefinition
type RulesRecord = import('@typescript-eslint/utils').TSESLint.Linter.RulesRecord

declare module '@eslint/js' {
    export const configs: {
        readonly all: {
            readonly rules: RulesRecord
        }
        readonly recommended: {
            readonly rules: RulesRecord
        }
    }
}

declare module 'eslint-plugin-promise' {
    interface EslintPluginPromise {
        readonly configs: {
            readonly 'flat/recommended': {
                readonly rules: RulesRecord
            }
        }
    }

    const plugin: EslintPluginPromise
    export = plugin
}

declare module 'eslint-plugin-react-perf' {
    interface EslintPluginReactPerf {
        readonly configs: {
            readonly flat: {
                readonly all: {
                    readonly rules: RulesRecord
                }
            }
        }
    }

    const plugin: EslintPluginReactPerf
    export = plugin
}

declare module 'eslint-plugin-security' {
    interface EslintPluginSecurity {
        readonly configs: {
            readonly recommended: {
                readonly rules: RulesRecord
            }
        }
    }

    const plugin: EslintPluginSecurity
    export = plugin
}

declare module 'eslint-plugin-typescript-sort-keys' {
    interface EslintPluginTypescriptSortKeys {
        readonly rules?: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginTypescriptSortKeys
    export = plugin
}

declare module 'eslint-plugin-jsx-a11y' {
    interface EslintPluginJsxA11y {
        readonly flatConfigs: {
            readonly strict: {
                readonly rules: Record<string, LooseRuleDefinition>
            }
        }
        readonly rules: RulesRecord
    }

    const plugin: EslintPluginJsxA11y
    export = plugin
}

declare module 'eslint-plugin-sort-keys-fix' {
    interface EslintPluginSortKeysFix {
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginSortKeysFix
    export = plugin
}

declare module 'eslint-plugin-no-secrets' {
    interface EslintPluginNoSecrets {
        readonly rules: RulesRecord
    }

    const plugin: EslintPluginNoSecrets
    export = plugin
}
