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

import { ASTUtils, ESLintUtils } from '@typescript-eslint/utils'

import type { TSESTree, TSESLint } from '@typescript-eslint/utils'

// Constants to avoid magic numbers in calculations and defaults
const DEFAULT_MIN_PARAMETERS = 2
const LAST_INDEX_OFFSET = 1

interface EnforceParameters {
    readonly context: TSESLint.RuleContext<MessageIds, Options>
    readonly functionNode: FunctionLikeWithParameters
    readonly minParameters: number
    readonly sourceCode: TSESLint.SourceCode
}

/**
 * Function-like nodes that have a params array
 */
type FunctionLikeWithParameters = | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.TSEmptyBodyFunctionExpression

/**
 * Message and options types for the rule
 */
type MessageIds = 'expectedAfter' | 'expectedBefore'

/**
 * Options for the rule
 */
type Options = [
  {
      minParams?: number
  }?
]

/**
 * Enforce newlines just inside parentheses for function/method definitions only (not calls),
 * when the number of parameters is greater than or equal to minParams
 *
 * @param functionNode - The function node to check
 * @param sourceCode - The source code to check
 * @param minParameters - The minimum number of parameters
 * @param context - The context of the rule
 *
 * @returns void
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const enforceNewlinesForFunctionLike = ({
    functionNode, sourceCode, minParameters, context
}: EnforceParameters): void => {
    const { params: functionParameters } = functionNode

    if (functionParameters.length < minParameters) {
        return
    }

    const [firstParameter] = functionParameters
    const lastParameter = functionParameters[Math.max(0, functionParameters.length - LAST_INDEX_OFFSET)]

    const { closingParen, openingParen } = findWrappingParens({
        firstParameter,
        lastParameter,
        sourceCode
    })

    const { tokenAfterOpen, tokenBeforeClose } = getBoundaryTokens({
        closingParen,
        openingParen,
        sourceCode
    })

    reportMissingNewlines({
        closingParen,
        context,
        functionNode,
        openingParen,
        tokenAfterOpen,
        tokenBeforeClose
    })
}

/**
 * Parameters for the findWrappingParens function
 */
interface FindParensParameters {
    readonly firstParameter: TSESTree.Node
    readonly lastParameter: TSESTree.Node
    readonly sourceCode: TSESLint.SourceCode
}

/**
 * Result of the findWrappingParens function
 */
type ParensResult = Readonly<{
    closingParen: TSESTree.Token
    openingParen: TSESTree.Token
}>

/**
 * Find the wrapping parentheses for the function parameters
 *
 * @param firstParameter - The first parameter of the function
 * @param lastParameter - The last parameter of the function
 * @param sourceCode - The source code to check
 *
 * @returns The wrapping parentheses for the function parameters
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const findWrappingParens = ({
    firstParameter, lastParameter, sourceCode
}: FindParensParameters): ParensResult => {
    const openingParen = ESLintUtils.nullThrows(
        sourceCode.getTokenBefore(firstParameter, ASTUtils.isOpeningParenToken),
        ESLintUtils.NullThrowsReasons.MissingToken('opening parenthesis', 'function parameters')
    )

    const closingParen = ESLintUtils.nullThrows(
        sourceCode.getTokenAfter(lastParameter, ASTUtils.isClosingParenToken),
        ESLintUtils.NullThrowsReasons.MissingToken('closing parenthesis', 'function parameters')
    )

    return {
        closingParen,
        openingParen
    }
}

/**
 * Boundary tokens for the function parameters
 */
interface BoundaryTokens {
    readonly tokenAfterOpen: TSESTree.Comment | TSESTree.Token
    readonly tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}

/**
 * Parameters for the getBoundaryTokens function
 */
interface GetBoundaryTokensParameters {
    closingParen: TSESTree.Token
    openingParen: TSESTree.Token
    sourceCode: TSESLint.SourceCode
}

/**
 * Get the boundary tokens for the function parameters
 *
 * @param openingParen - The opening parenthesis of the function parameters
 * @param closingParen - The closing parenthesis of the function parameters
 * @param sourceCode - The source code to check
 *
 * @returns The boundary tokens for the function parameters
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const getBoundaryTokens = ({
    openingParen, closingParen, sourceCode
}: GetBoundaryTokensParameters): BoundaryTokens => {
    const tokenAfterOpen = ESLintUtils.nullThrows(
        sourceCode.getTokenAfter(openingParen, { includeComments: true }),
        'Missing token or comment after opening parenthesis.'
    )

    const tokenBeforeClose = ESLintUtils.nullThrows(
        sourceCode.getTokenBefore(closingParen, { includeComments: true }),
        'Missing token or comment before closing parenthesis.'
    )

    return {
        tokenAfterOpen,
        tokenBeforeClose
    }
}

/**
 * Parameters for the reportMissingNewlines function
 */
interface ReportParameters {
    closingParen: TSESTree.Token
    context: TSESLint.RuleContext<MessageIds, Options>
    functionNode: FunctionLikeWithParameters
    openingParen: TSESTree.Token
    tokenAfterOpen: TSESTree.Comment | TSESTree.Token
    tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}

/**
 * Report missing newlines for the function parameters
 *
 * @param functionNode - The function node to check
 * @param openingParen - The opening parenthesis of the function parameters
 * @param closingParen - The closing parenthesis of the function parameters
 *
 * @returns void
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const reportMissingNewlines = ({
    functionNode, openingParen, closingParen, tokenAfterOpen, tokenBeforeClose, context
}: ReportParameters): void => {
    const isOpenAndNextSameLine = openingParen.loc.end.line === tokenAfterOpen.loc.start.line
    const isPreviousAndCloseSameLine = tokenBeforeClose.loc.end.line === closingParen.loc.start.line

    if (isOpenAndNextSameLine) {
        context.report({
            fix: (fixer: Readonly<TSESLint.RuleFixer>) =>
                fixer.insertTextAfter(openingParen, '\n'),
            loc: openingParen.loc,
            messageId: 'expectedAfter',
            node: functionNode
        })
    }

    if (isPreviousAndCloseSameLine) {
        context.report({
            fix: (fixer: Readonly<TSESLint.RuleFixer>) =>
                fixer.insertTextBefore(closingParen, '\n'),
            loc: closingParen.loc,
            messageId: 'expectedBefore',
            node: functionNode
        })
    }
}

const rule: TSESLint.RuleModule<MessageIds, Options> = {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    create(context: TSESLint.RuleContext<MessageIds, Options>): TSESLint.RuleListener {
        const { sourceCode, options } = context
        const [option] = options

        const minParameters: number = typeof option?.minParams === 'number' && option.minParams > 0
            ? option.minParams
            : DEFAULT_MIN_PARAMETERS

        return {
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'ArrowFunctionExpression'(node: TSESTree.ArrowFunctionExpression): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'FunctionDeclaration'(node: TSESTree.FunctionDeclaration): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'FunctionExpression'(node: TSESTree.FunctionExpression): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'MethodDefinition'(node: TSESTree.MethodDefinition): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node.value,
                    minParameters,
                    sourceCode
                })
            }
        }
    },
    defaultOptions: [
        {
            minParams: DEFAULT_MIN_PARAMETERS
        }
    ],
    meta: {
        docs: {
            description:
                // eslint-disable-next-line @stylistic/max-len
                'Enforce newlines just inside parentheses for function/method definitions only (not calls), when the number of parameters is greater than or equal to minParams'
        },
        fixable: 'whitespace',
        messages: {
            expectedAfter: "Expected newline after '(' in function definition",
            expectedBefore: "Expected newline before ')' in function definition"
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    minParams: {
                        minimum: 1,
                        type: 'integer'
                    }
                },
                type: 'object'
            }
        ],
        type: 'layout'
    }
}

export const functionDefinitionParenNewlinePlugin: TSESLint.FlatConfig.Plugin = {
    rules: {
        'function-definition-paren-newline': rule
    }
}
