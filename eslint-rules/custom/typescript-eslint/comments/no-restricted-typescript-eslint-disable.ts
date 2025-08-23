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

// ==== Imports ====
import { isUndefined } from '@sindresorhus/is'
import { ESLintUtils } from '@typescript-eslint/utils'

// ==== Types ====
import type { TSESTree, TSESLint } from '@typescript-eslint/utils'

// Create typed rule factory with docs URL
const createRule = ESLintUtils.RuleCreator(
    name => `https://docs.t33n.software/eslint-rules/${name}`
)

// ===== Types =====
interface CheckDisableParameters {
    readonly allowList: ReadonlySet<string>
    readonly comment: TSESTree.Comment
    readonly context: TSESLint.RuleContext<MessageIds, Options>
}

type MessageIds = 'restrictedDisable'

type Options = [
    {
        // List of fully qualified @typescript-eslint/* rule names that are allowed to be disabled
        allow?: readonly string[]
    }?
]

// ===== Helpers =====
const TYPESCRIPT_ESLINT_PREFIX = '@typescript-eslint/' as const

/**
 * @param ruleName - The name of the rule to check
 * @returns True if the rule is a TypeScript ESLint rule, false otherwise
 */
const isTypescriptEslintRule = (ruleName: string): boolean => ruleName.startsWith(TYPESCRIPT_ESLINT_PREFIX)

/**
 * Extracts the names of disabled rules from a comment
 * @param rawComment - The raw comment to extract the disabled rule names from
 * @returns An array of disabled rule names
 */
const extractDisabledRuleNames = (rawComment: string): readonly string[] => {
    // Normalize to simplify parsing across line/block comments
    const comment = rawComment.trim()
    const directiveIndex = comment.indexOf('eslint-disable')

    if (directiveIndex === -1) {
        return []
    }

    let remainder = comment.slice(directiveIndex + 'eslint-disable'.length)

    const suffix = [
        '-next-line',
        '-line'
    ].find(element => remainder.startsWith(element))

    if (!isUndefined(suffix)) {
        remainder = remainder.slice(suffix.length)
    }

    remainder = remainder.trim()

    // If no specific rules are listed, this disables everything → handled by other rules
    if (remainder.length === 0) {
        return []
    }

    // Remove trailing comment markers or annotations that sometimes appear
    const cleaned = remainder
        .replace(/[*\-/]+$/u, '')
        .trim()

    // Split by comma and whitespace, keep non-empty
    return cleaned
        .split(',')
        .flatMap(part => part.split(/\s+/u))
        .map(segment => segment.trim())
        .filter(Boolean)
}

const checkDisableComment = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    parameters: Readonly<CheckDisableParameters>
): void => {
    const {
        comment, context, allowList
    } = parameters

    const disabledRules = extractDisabledRuleNames(comment.value)

    if (disabledRules.length === 0) {
        return
    }

    for (const ruleName of disabledRules) {
        const isTsRule = isTypescriptEslintRule(ruleName)
        const isAllowed = allowList.has(ruleName)

        if (isTsRule && !isAllowed) {
            context.report({
                loc: comment.loc,
                messageId: 'restrictedDisable'
            })
        }
    }
}

// ===== Rule =====
const rule = createRule<Options, MessageIds>({
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    create(context: Readonly<TSESLint.RuleContext<MessageIds, Options>>): TSESLint.RuleListener {
        const [option] = context.options
        const allow = new Set(option?.allow ?? [])

        return {
            // Run once per file at the end to ensure all comments are available
            'Program:exit'(): void {
                const { sourceCode } = context
                const allComments = sourceCode.getAllComments()

                for (const comment of allComments) {
                    checkDisableComment({
                        allowList: allow,
                        comment,
                        context
                    })
                }
            }
        }
    },
    defaultOptions: [
        {
            allow: []
        }
    ],
    meta: {
        docs: {
            description: 'Restrict eslint-disable(-line|-next-line) for @typescript-eslint/* rules with an allowlist'
        },
        messages: {
            restrictedDisable: 'Disabling @typescript-eslint/* rules via eslint-disable is restricted.'
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allow: {
                        items: { type: 'string' },
                        type: 'array'
                    }
                },
                type: 'object'
            }
        ],
        type: 'problem'
    },
    name: 'no-restricted-typescript-eslint-disable'
})

export const noRestrictedTypescriptEslintDisableRule: TSESLint.RuleModule<MessageIds, Options> = rule
