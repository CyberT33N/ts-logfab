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

import { ASTUtils, AST_NODE_TYPES } from '@typescript-eslint/utils'

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

const enforceNewlinesForFunctionLike = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    parametersBag: Readonly<EnforceParameters>
): void => {
    const {
        functionNode,
        sourceCode,
        minParameters,
        context
    } = parametersBag
    const { params: functionParameters } = functionNode

    if (functionParameters.length < minParameters) {
        return
    }

    const [firstParameter] = functionParameters
    const lastParameter = functionParameters[Math.max(0, functionParameters.length - LAST_INDEX_OFFSET)]

    const parens = findWrappingParens({
        firstParameter,
        lastParameter,
        sourceCode
    })

    if (!parens) {
        return
    }

    const boundaries = getBoundaryTokens({
        closingParen: parens.closingParen,
        openingParen: parens.openingParen,
        sourceCode
    })

    if (!boundaries) {
        return
    }

    reportMissingNewlines({
        closingParen: parens.closingParen,
        context,
        functionNode,
        openingParen: parens.openingParen,
        tokenAfterOpen: boundaries.tokenAfterOpen,
        tokenBeforeClose: boundaries.tokenBeforeClose
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

const findWrappingParens = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    findParameters: Readonly<FindParensParameters>
): ParensResult | undefined => {
    const {
        firstParameter,
        lastParameter,
        sourceCode
    } = findParameters

    const openingParen = sourceCode.getTokenBefore(firstParameter, ASTUtils.isOpeningParenToken)
    const closingParen = sourceCode.getTokenAfter(lastParameter, ASTUtils.isClosingParenToken)

    if (!openingParen || !closingParen) {
        return
    }

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

const getBoundaryTokens = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    boundaryParameters: Readonly<GetBoundaryTokensParameters>
): BoundaryTokens | undefined => {
    const {
        openingParen,
        closingParen,
        sourceCode
    } = boundaryParameters

    const tokenAfterOpen = sourceCode.getTokenAfter(openingParen, { includeComments: true })
    const tokenBeforeClose = sourceCode.getTokenBefore(closingParen, { includeComments: true })

    if (!tokenAfterOpen || !tokenBeforeClose) {
        return
    }

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

const reportMissingNewlines = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    reportParameters: Readonly<ReportParameters>
): void => {
    const {
        functionNode,
        openingParen,
        closingParen,
        tokenAfterOpen,
        tokenBeforeClose,
        context
    } = reportParameters
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
    create(context: Readonly<TSESLint.RuleContext<MessageIds, Options>>): TSESLint.RuleListener {
        const { sourceCode, options } = context
        const [option] = options

        const minParameters: number = typeof option?.minParams === 'number' && option.minParams > 0
            ? option.minParams
            : DEFAULT_MIN_PARAMETERS

        return {

            [[
                'ArrowFunctionExpression',
                'FunctionDeclaration',
                'FunctionExpression',
                'MethodDefinition'
            ].join(', ')](
                // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
                node: Readonly<
                    | TSESTree.ArrowFunctionExpression
                    | TSESTree.FunctionDeclaration
                    | TSESTree.FunctionExpression
                    | TSESTree.MethodDefinition
                >
            ): void {
                const functionNode = node.type === AST_NODE_TYPES.MethodDefinition
                    ? (node as Readonly<TSESTree.MethodDefinition>).value
                    : (node as Readonly<
                        | TSESTree.ArrowFunctionExpression
                        | TSESTree.FunctionDeclaration
                        | TSESTree.FunctionExpression
                        >)

                enforceNewlinesForFunctionLike({
                    context,
                    functionNode,
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
