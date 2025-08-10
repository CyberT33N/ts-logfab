/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ENTERPRISE TYPE-ASSERTIONS für ESLint Plugins ohne TypeScript-Definitionen
 * - Packages: eslint-plugin-promise, eslint-plugin-react-perf, eslint-plugin-security,
 */
//             eslint-plugin-typescript-sort-keys
/*
 * - Scope: Nur die tatsächlich verwendeten Oberflächen werden typisiert (configs / rules)
 * - Rationale: Behebt "Could not find a declaration file" ohne any-Casts
 * ═══════════════════════════════════════════════════════════════════════════════
 */

type Rules = Readonly<import('eslint').Linter.RulesRecord>

declare module 'eslint-plugin-promise' {
    interface EslintPluginPromise {
        readonly configs: {
            readonly 'flat/recommended': {
                readonly rules: Rules
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
                    readonly rules: Rules
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
                readonly rules: Rules
            }
        }
    }
    const plugin: EslintPluginSecurity
    export = plugin
}

declare module 'eslint-plugin-typescript-sort-keys' {
    interface EslintPluginTypescriptSortKeys {
        readonly rules?: Readonly<Record<string, unknown>>
    }
    const plugin: EslintPluginTypescriptSortKeys
    export = plugin
}

declare module 'eslint-plugin-jsx-a11y' {
    interface EslintPluginJsxA11y {
        readonly rules: Rules
    }
    const plugin: EslintPluginJsxA11y
    export = plugin
}
