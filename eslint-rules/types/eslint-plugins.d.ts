/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 ENTERPRISE TYPE-ASSERTIONS für ESLint Plugins ohne TypeScript-Definitionen
 * - Packages: eslint-plugin-promise, eslint-plugin-react-perf, eslint-plugin-security,
 * eslint-plugin-typescript-sort-keys, eslint-plugin-jsx-a11y,
 * - Scope: Nur die tatsächlich verwendeten Oberflächen werden typisiert (configs / rules)
 * - Rationale: Behebt "Could not find a declaration file" ohne any-Casts
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/TSESLint.ts
 */
type LooseRuleDefinition = import('@typescript-eslint/utils').TSESLint.LooseRuleDefinition

/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/Linter.ts
 */
type RuleEntry = import('@typescript-eslint/utils').TSESLint.Linter.RuleEntry

/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/Linter.ts
 */
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
    /**
     * @see https://github.com/eslint/eslint-plugin-promise/blob/main/src/index.ts
     */
    interface EslintPluginPromise {
        /**
         * @see https://github.com/eslint/eslint-plugin-promise/blob/main/src/index.ts
         */
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
    /**
     * @see https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-perf/src/index.ts
     */
    interface EslintPluginReactPerf {
        /**
         * @see https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-perf/src/index.ts
         */
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
    /**
     * @see https://github.com/eslint/eslint-plugin-security/blob/main/src/index.ts
     */
    interface EslintPluginSecurity {
        /**
         * @see https://github.com/eslint/eslint-plugin-security/blob/main/src/index.ts
         */
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
    /**
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/index.ts
     */
    interface EslintPluginTypescriptSortKeys {
        /**
         * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/index.ts
         */
        readonly rules?: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginTypescriptSortKeys
    export = plugin
}

declare module 'eslint-plugin-sort-keys-fix' {
    /**
     * @see https://github.com/lydell/eslint-plugin-sort-keys-fix/blob/main/src/index.ts
     */
    interface EslintPluginSortKeysFix {
        /**
         * @see https://github.com/lydell/eslint-plugin-sort-keys-fix/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginSortKeysFix
    export = plugin
}

declare module 'eslint-plugin-no-secrets' {
    /**
     * @see https://github.com/nickdeis/eslint-plugin-no-secrets/blob/main/src/index.ts
     */
    interface EslintPluginNoSecrets {
        /**
         * @see https://github.com/nickdeis/eslint-plugin-no-secrets/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginNoSecrets
    export = plugin
}

declare module 'eslint-plugin-sonarjs' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/main/src/index.ts
     */
    interface EslintPluginSonarjs {
        /**
         * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/main/src/index.ts
         */
        readonly configs: {
            readonly recommended: TSESLint.FlatConfig.Config
            readonly 'recommended-legacy': {
                readonly rules: RulesRecord
            }
        }

        /**
         * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginSonarjs
    export = plugin
}

declare module 'eslint-plugin-unicorn' {
    /**
     * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/src/index.ts
     */
    interface EslintPluginUnicorn {
        /**
         * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/src/index.ts
         */
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
    /**
     * @see https://github.com/eslint/eslint-plugin-n/blob/main/src/index.ts
     */
    interface EslintPluginN {
        /**
         * @see https://github.com/eslint/eslint-plugin-n/blob/main/src/index.ts
         */
        readonly configs: {
            readonly 'flat/all': {
                readonly rules: RulesRecord
            }
        }

        /**
         * @see https://github.com/eslint/eslint-plugin-n/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginN
    export = plugin

}

declare module 'eslint-plugin-unused-imports' {
    /**
     * @see https://github.com/sweepline/eslint-plugin-unused-imports/blob/main/src/index.ts
     */
    interface EslintPluginUnusedImports {
        /**
         * @see https://github.com/sweepline/eslint-plugin-unused-imports/blob/main/src/index.ts
         */
        readonly configs: {
            readonly recommended: {
                readonly rules: RulesRecord
            }
        }

        /**
         * @see https://github.com/sweepline/eslint-plugin-unused-imports/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginUnusedImports
    export = plugin
}declare module '@stylistic/eslint-plugin' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/stylistic/eslint-plugin/blob/main/src/index.ts
     */
    interface EslintPluginStylistic {
        /**
         * @see https://github.com/stylistic/eslint-plugin/blob/main/src/index.ts
         */
        readonly configs: {
            readonly all: TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/stylistic/eslint-plugin/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginStylistic
    export = plugin
}

declare module 'eslint-plugin-jsx-a11y' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.ts
     */
    interface EslintPluginJsxA11y {
        /**
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.ts
         */
        readonly flatConfigs: {
            readonly recommended: TSESLint.FlatConfig.Config
            readonly strict: TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginJsxA11y
    export = plugin
}

declare module '@eslint-community/eslint-plugin-eslint-comments' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/main/src/index.ts
     */
    interface EslintPluginEslintComments {
        /**
         * @see https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/main/src/index.ts
         */
        readonly configs: {
            readonly recommended: TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/eslint-community/eslint-plugin-eslint-comments/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginEslintComments
    export = plugin
}

declare module 'eslint-plugin-jsdoc' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/src/index.ts
     */
    interface EslintPluginJsdoc {
        /**
         * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/src/index.ts
         */
        readonly configs: {
            readonly 'flat/recommended-typescript-error': TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginJsdoc
    export = plugin
}

declare module 'eslint-plugin-import' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/src/index.ts
     */
    interface EslintPluginImport {
        /**
         * @see https://github.com/import-js/eslint-plugin-import/blob/main/src/index.ts
         */
        readonly flatConfigs: {
            readonly typescript: TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/import-js/eslint-plugin-import/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginImport
    export = plugin
}

declare module 'eslint-plugin-perfectionist' {
    import type { TSESLint } from '@typescript-eslint/utils'

    /**
     * @see https://github.com/perfectionist/eslint-plugin-perfectionist/blob/main/src/index.ts
     */
    interface EslintPluginPerfectionist {
        /**
         * @see https://github.com/perfectionist/eslint-plugin-perfectionist/blob/main/src/index.ts
         */
        readonly configs: {
            readonly 'recommended-natural': TSESLint.FlatConfig.Config
        }

        /**
         * @see https://github.com/perfectionist/eslint-plugin-perfectionist/blob/main/src/index.ts
         */
        readonly rules: Record<string, LooseRuleDefinition>
    }

    const plugin: EslintPluginPerfectionist
    export = plugin
}
