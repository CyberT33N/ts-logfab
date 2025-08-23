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

/** The parameters for checking a disable comment. */
interface CheckDisableParameters {
    /** The list of allowed rule names. */
    readonly allowList: ReadonlySet<string>

    /** The comment to check. */
    readonly comment: TSESTree.Comment

    /** The context of the rule. */
    readonly context: TSESLint.RuleContext<MessageIds, Options>
}

/** The message ids for the rule. */
type MessageIds = 'restrictedDisable'

/** The options for the rule. */
type Options = [
    {
        // List of fully qualified rule names that are allowed to be disabled (e.g., "max-lines", "react/jsx-no-bind", "@typescript-eslint/no-explicit-any")
        allow?: readonly string[]
    }?
]

// ===== Helpers =====
/**
 * Extracts the names of disabled rules from a comment.
 *
 * @param rawComment - The raw comment to extract the disabled rule names from.
 * @returns An array of disabled rule names.
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

    /*
     * Remove trailing comment markers or annotations that sometimes appear
     * and strip inline explanations after " -- " (ESLint convention for explanations)
     */
    const cleaned = remainder
        .replace(/\s--\s.*$/su, '')
        .replace(/[*\-/]{1,64}$/u, '')
        .trim()

    if (cleaned.length === 0) {
        return []
    }

    // Split by comma and whitespace, keep non-empty, and drop stray tokens like "--"
    return cleaned
        .split(',')
        .flatMap(part => part.split(/\s+/u))
        .map(segment => segment.trim())
        .filter(token => token.length > 0 && token !== '--')
}

/**
 * Check if a comment is a disable comment.
 *
 * @param parameters - The parameters to check.
 */
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
        const isAllowed = allowList.has(ruleName)

        if (!isAllowed) {
            context.report({
                loc: comment.loc,
                messageId: 'restrictedDisable'
            })
        }
    }
}

/**
 * The rule to check for restricted disable comments.
 *
 * @param context - The context of the rule.
 * @returns The rule listener.
 */
const rule = createRule<Options, MessageIds>({
    /**
     * The rule listener.
     *
     * @param context - The context of the rule.
     * @returns The rule listener.
     */
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
            description: 'Restrict eslint-disable(-line|-next-line) for any rules with an allowlist'
        },
        messages: {
            restrictedDisable: 'Disabling rules via eslint-disable is restricted.'
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
