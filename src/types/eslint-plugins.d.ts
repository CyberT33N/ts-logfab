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
type RuleEntry = import('@typescript-eslint/utils').TSESLint.Linter.RuleEntry
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

declare module 'eslint-plugin-sort-keys-fix' {
    interface EslintPluginSortKeysFix {
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginSortKeysFix
    export = plugin
}

declare module 'eslint-plugin-no-secrets' {
    interface EslintPluginNoSecrets {
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginNoSecrets
    export = plugin
}

declare module 'eslint-plugin-sonarjs' {
    import type { TSESLint } from '@typescript-eslint/utils'

    interface EslintPluginSonarjs {
        readonly configs: {
            readonly recommended: TSESLint.FlatConfig.Config
            readonly 'recommended-legacy': {
                readonly rules: RulesRecord
            }
        }
        readonly meta?: {
            readonly name: string
            readonly version: string
        }
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginSonarjs
    export = plugin
}

declare module 'eslint-plugin-unicorn' {
    interface EslintPluginUnicorn {
        readonly configs: {
            readonly all: {
                readonly rules: RulesRecord
            }
        }
    }

    const plugin: EslintPluginUnicorn
    export = plugin
}

declare module 'eslint-plugin-n' {
    interface EslintPluginN {
        readonly configs: {
            readonly 'flat/all': {
                readonly rules: RulesRecord
            }
        }
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginN
    export = plugin

}

declare module 'eslint-plugin-unused-imports' {
    interface EslintPluginUnusedImports {
        readonly configs: {
            readonly recommended: {
                readonly rules: RulesRecord
            }
        }
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginUnusedImports
    export = plugin
}

declare module '@stylistic/eslint-plugin' {
    import type { TSESLint } from '@typescript-eslint/utils'

    interface EslintPluginStylistic {
        readonly configs: {
            readonly all: TSESLint.FlatConfig.Config
        }
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginStylistic
    export = plugin
}
