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

type EnforceParameters = Readonly<{
    context: TSESLint.RuleContext<MessageIds, Options>
    functionNode: FunctionLikeWithParameters
    minParameters: number
    sourceCode: TSESLint.SourceCode
}>

// Function-like nodes that have a params array
type FunctionLikeWithParameters = | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression
    | TSESTree.TSEmptyBodyFunctionExpression

// Message and options types for the rule
type MessageIds = 'expectedAfter' | 'expectedBefore'

type Options = [
  {
      minParams?: number
  }?
]

const enforceNewlinesForFunctionLike = ({
    functionNode, sourceCode, minParameters, context
}: EnforceParameters): void => {
    const { params: functionParameters } = functionNode

    if (functionParameters.length < minParameters) {
        return
    }

    const [firstParameter] = functionParameters
    const lastParameter = functionParameters[Math.max(0, functionParameters.length - LAST_INDEX_OFFSET)]

    const {
        closingParen, openingParen
    } = findWrappingParens({
        firstParameter,
        lastParameter,
        sourceCode
    })

    const {
        tokenAfterOpen, tokenBeforeClose
    } = getBoundaryTokens({
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

type FindParensParameters = Readonly<{
    firstParameter: TSESTree.Node
    lastParameter: TSESTree.Node
    sourceCode: TSESLint.SourceCode
}>

type ParensResult = Readonly<{
    closingParen: TSESTree.Token
    openingParen: TSESTree.Token
}>

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

type BoundaryTokens = Readonly<{
    tokenAfterOpen: TSESTree.Comment | TSESTree.Token
    tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}>

type GetBoundaryTokensParameters = Readonly<{
    closingParen: TSESTree.Token
    openingParen: TSESTree.Token
    sourceCode: TSESLint.SourceCode
}>

const getBoundaryTokens = ({
    openingParen, closingParen, sourceCode
}: GetBoundaryTokensParameters): BoundaryTokens => {
    const tokenAfterOpen = ESLintUtils.nullThrows(
        sourceCode.getTokenAfter(openingParen, { includeComments: true }),
        'Missing token or comment after opening parenthesis.'
    ) as TSESTree.Comment | TSESTree.Token

    const tokenBeforeClose = ESLintUtils.nullThrows(
        sourceCode.getTokenBefore(closingParen, { includeComments: true }),
        'Missing token or comment before closing parenthesis.'
    ) as TSESTree.Comment | TSESTree.Token

    return {
        tokenAfterOpen,
        tokenBeforeClose
    }
}

type ReportParameters = Readonly<{
    closingParen: TSESTree.Token
    context: TSESLint.RuleContext<MessageIds, Options>
    functionNode: FunctionLikeWithParameters
    openingParen: TSESTree.Token
    tokenAfterOpen: TSESTree.Comment | TSESTree.Token
    tokenBeforeClose: TSESTree.Comment | TSESTree.Token
}>

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
    create(context: TSESLint.RuleContext<MessageIds, Options>): TSESLint.RuleListener {
        const {
            sourceCode, options
        } = context
        const [option] = options

        const minParameters: number = typeof option?.minParams === 'number' && option.minParams > 0
            ? option.minParams
            : DEFAULT_MIN_PARAMETERS

        return {
            'ArrowFunctionExpression'(node: Readonly<TSESTree.ArrowFunctionExpression>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node as TSESTree.ArrowFunctionExpression,
                    minParameters,
                    sourceCode
                })
            },

            'FunctionDeclaration'(node: Readonly<TSESTree.FunctionDeclaration>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node as TSESTree.FunctionDeclaration,
                    minParameters,
                    sourceCode
                })
            },

            'FunctionExpression'(node: Readonly<TSESTree.FunctionExpression>): void {
                enforceNewlinesForFunctionLike({
                    context,
                    functionNode: node as TSESTree.FunctionExpression,
                    minParameters,
                    sourceCode
                })
            },

            'MethodDefinition'(node: Readonly<TSESTree.MethodDefinition>): void {
                const { value } = node

                if (
                    value.type === 'FunctionExpression'
                    || value.type === 'TSEmptyBodyFunctionExpression'
                ) {
                    enforceNewlinesForFunctionLike({
                        context,
                        functionNode: value,
                        minParameters,
                        sourceCode
                    })
                }
            }
        }
    },
    meta: {
        docs: {
            description:
        'Enforce newlines just inside parentheses for function/method definitions only (not calls), '
        + 'when the number of parameters is greater than or equal to minParams',
            recommended: false
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
