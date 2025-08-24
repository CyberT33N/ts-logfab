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
import { ASTUtils, ESLintUtils } from '@typescript-eslint/utils'

// ==== Types ====
import type { TSESTree, TSESLint } from '@typescript-eslint/utils'

// Constants to avoid magic numbers in calculations and defaults
const DEFAULT_MIN_PARAMETERS = 2
const LAST_INDEX_OFFSET = 1

// Create typed rule factory with docs URL
const createRule = ESLintUtils.RuleCreator(
    name => `https://docs.t33n.software/eslint-rules/${name}`
)

/**
 * Parameters for the enforceNewlinesForFunctionLike function.
 */
interface EnforceParameters {
    /** The context of the rule. */
    readonly context: TSESLint.RuleContext<MessageIds, Options>

    /** The function node to check. */
    readonly functionNode: FunctionLikeWithParameters

    /** The minimum number of parameters. */
    readonly minParameters: number

    /** The source code. */
    readonly sourceCode: TSESLint.SourceCode
}

/**
 * Function-like nodes that have a params array.
 */
type FunctionLikeWithParameters = | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.TSEmptyBodyFunctionExpression

/**
 * Message and options types for the rule.
 */
type MessageIds = 'expectedAfter' | 'expectedBefore'

/**
 * Options for the rule.
 */
type Options = [
  {
      minParams?: number
  }?
]

/**
 * Enforce newlines just inside parentheses for function/method definitions only (not calls),
 * when the number of parameters is greater than or equal to minParams.
 *
 * @param parametersBag - The parameters bag to check.
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
 * Parameters for the findWrappingParens function.
 */
interface FindParensParameters {
    /** The first parameter. */
    readonly firstParameter: TSESTree.Node

    /** The last parameter. */
    readonly lastParameter: TSESTree.Node

    /** The source code. */
    readonly sourceCode: TSESLint.SourceCode
}

/**
 * Result of the findWrappingParens function.
 */
type ParensResult = Readonly<{
    closingParen: TSESTree.Token
    openingParen: TSESTree.Token
}>

/**
 * Find the wrapping parentheses for the function parameters.
 *
 * @param findParameters - The parameters to find the wrapping parentheses for.
 * @returns The wrapping parentheses for the function parameters.
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
 * Boundary tokens for the function parameters.
 */
interface BoundaryTokens {
    /** The token after the opening parenthesis. */
    readonly tokenAfterOpen: TSESTree.Comment | TSESTree.Token

    /** The token before the closing parenthesis. */
    readonly tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}

/**
 * Parameters for the getBoundaryTokens function.
 */
interface GetBoundaryTokensParameters {
    /** The closing parenthesis. */
    readonly closingParen: TSESTree.Token

    /** The opening parenthesis. */
    readonly openingParen: TSESTree.Token

    /** The source code. */
    sourceCode: TSESLint.SourceCode
}

/**
 * Get the boundary tokens for the function parameters.
 *
 * @param boundaryParameters - The parameters to get the boundary tokens for.
 * @returns The boundary tokens for the function parameters.
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
 * Parameters for the reportMissingNewlines function.
 */
interface ReportParameters {
    /** The closing parenthesis. */
    readonly closingParen: TSESTree.Token

    /** The context of the rule. */
    readonly context: TSESLint.RuleContext<MessageIds, Options>

    /** The function node. */
    readonly functionNode: FunctionLikeWithParameters

    /** The opening parenthesis. */
    readonly openingParen: TSESTree.Token

    /** The token after the opening parenthesis. */
    readonly tokenAfterOpen: TSESTree.Comment | TSESTree.Token

    /** The token before the closing parenthesis. */
    tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}

/**
 * Report missing newlines for the function parameters.
 *
 * @param reportParameters - The parameters to report missing newlines for.
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
            /**
             * Fix the opening parenthesis.
             *
             * @param fixer - The fixer to use.
             * @returns The fixer.
             */
            fix: (fixer: Readonly<TSESLint.RuleFixer>) => fixer.insertTextAfter(openingParen, '\n'),
            loc: openingParen.loc,
            messageId: 'expectedAfter',
            node: functionNode
        })
    }

    if (isPreviousAndCloseSameLine) {
        context.report({
            /**
             * Fix the closing parenthesis.
             *
             * @param fixer - The fixer to use.
             * @returns The fixer.
             */
            fix: (fixer: Readonly<TSESLint.RuleFixer>) => fixer.insertTextBefore(closingParen, '\n'),
            loc: closingParen.loc,
            messageId: 'expectedBefore',
            node: functionNode
        })
    }
}

/**
 * The rule to enforce newlines just inside parentheses for function/method definitions only (not calls),
 * when the number of parameters is greater than or equal to minParams.
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
        const { sourceCode, options } = context
        const [option] = options

        const minParameters: number = typeof option?.minParams === 'number' && option.minParams > 0
            ? option.minParams
            : DEFAULT_MIN_PARAMETERS

        return {
            /**
             * The rule listener for ArrowFunctionExpression.
             *
             * @param node - The node to check.
             */
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'ArrowFunctionExpression'(node: Readonly<TSESTree.ArrowFunctionExpression>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            /**
             * The rule listener for FunctionDeclaration.
             *
             * @param node - The node to check.
             */
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'FunctionDeclaration'(node: Readonly<TSESTree.FunctionDeclaration>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            /**
             * The rule listener for FunctionExpression.
             *
             * @param node - The node to check.
             */
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'FunctionExpression'(node: Readonly<TSESTree.FunctionExpression>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node,
                    minParameters,
                    sourceCode
                })
            },

            /**
             * The rule listener for MethodDefinition.
             *
             * @param node - The node to check.
             */
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/naming-convention
            'MethodDefinition'(node: Readonly<TSESTree.MethodDefinition>): void {
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
    },
    name: 'function-definition-paren-newline'
})

export const functionDefinitionParenNewlinePlugin: TSESLint.FlatConfig.Plugin = {
    rules: {
        'function-definition-paren-newline': rule
    }
}
