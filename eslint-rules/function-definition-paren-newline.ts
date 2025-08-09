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

import type { TSESTree, AST } from '@typescript-eslint/types'
import type { Rule } from 'eslint'

// Structural type for nodes that carry a params array
type NodeWithParameters = TSESTree.Node & {
    params?: TSESTree.Node[]
}

// Minimal interface for the subset of SourceCode we use
interface SourceCodeLike {
    getTokenAfter: (
        nodeOrToken: AST.Token | TSESTree.Node,
        filterOrOptions?: ((token: AST.Token) => boolean) | {
            includeComments?: boolean
        }
    ) => AST.Token | null
    getTokenBefore: (
        nodeOrToken: AST.Token | TSESTree.Node,
        filterOrOptions?: ((token: AST.Token) => boolean) | {
            includeComments?: boolean
        }
    ) => AST.Token | null
}

const _enforceNewlinesForFunctionLike = (
    functionNode: NodeWithParameters | null | undefined,
    sourceCode: SourceCodeLike,
    minParameters: number,
    context: Rule.RuleContext
): void => {
    if (!functionNode || !Array.isArray(functionNode.params)) {
        return
    }

    const { params } = functionNode

    if (params.length < minParameters) {
        return
    }

    const firstParameter = params[0]
    const lastParameter = params.at(-1)

    const {
        openingParen, closingParen
    } = _findWrappingParens(firstParameter, lastParameter, sourceCode)

    if (!openingParen || !closingParen) {
        return
    }

    const {
        tokenAfterOpen, tokenBeforeClose
    } = _getBoundaryTokens(openingParen, closingParen, sourceCode)

    if (!tokenAfterOpen || !tokenBeforeClose) {
        return
    }

    _reportMissingNewlines(functionNode, openingParen, closingParen, tokenAfterOpen, tokenBeforeClose, context)
}

const _findWrappingParens = (
    firstParameter: TSESTree.Node,
    lastParameter: TSESTree.Node,
    sourceCode: SourceCodeLike
): {
    closingParen: AST.Token | null
    openingParen: AST.Token | null
} => {
    const openingParen = sourceCode.getTokenBefore(
        firstParameter,
        token =>
            token.value === '('
    )
    const closingParen = sourceCode.getTokenAfter(
        lastParameter,
        token =>
            token.value === ')'
    )

    return {
        openingParen,
        closingParen
    }
}

const _getBoundaryTokens = (
    openingParen: AST.Token | null,
    closingParen: AST.Token | null,
    sourceCode: SourceCodeLike
): {
    tokenAfterOpen: AST.Token | null
    tokenBeforeClose: AST.Token | null
} => {
    if (!openingParen || !closingParen) {
        return {
            tokenAfterOpen: null,
            tokenBeforeClose: null
        }
    }

    const tokenAfterOpen = sourceCode.getTokenAfter(openingParen, { includeComments: true })
    const tokenBeforeClose = sourceCode.getTokenBefore(closingParen, { includeComments: true })

    return {
        tokenAfterOpen,
        tokenBeforeClose
    }
}

const _reportMissingNewlines = (
    functionNode: NodeWithParameters,
    openingParen: AST.Token,
    closingParen: AST.Token,
    tokenAfterOpen: AST.Token,
    tokenBeforeClose: AST.Token,
    context: Rule.RuleContext
): void => {
    const openAndNextSameLine = openingParen.loc.end.line === tokenAfterOpen.loc.start.line
    const previousAndCloseSameLine = tokenBeforeClose.loc.end.line === closingParen.loc.start.line

    if (openAndNextSameLine) {
        context.report({
            node: functionNode,
            loc: openingParen.loc,
            messageId: 'expectedAfter',
            fix: fixer =>
                fixer.insertTextAfter(openingParen, '\n')
        })
    }

    if (previousAndCloseSameLine) {
        context.report({
            node: functionNode,
            loc: closingParen.loc,
            messageId: 'expectedBefore',
            fix: fixer =>
                fixer.insertTextBefore(closingParen, '\n')
        })
    }
}

export const functionDefinitionParenNewlinePlugin = {
    rules: {
        'function-definition-paren-newline': {
            create(context: Rule.RuleContext) {
                const sourceCode = context.getSourceCode() as unknown as SourceCodeLike
                const rawOption = context.options?.[0]

                let minParameters = 2

                if (typeof rawOption === 'object' && rawOption !== null) {
                    const rawMinParameters: unknown = Reflect.get(rawOption, 'minParams')

                    if (typeof rawMinParameters === 'number') {
                        minParameters = rawMinParameters
                    }
                }

                return {
                    FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    FunctionExpression(node: TSESTree.FunctionExpression) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    MethodDefinition(node: TSESTree.MethodDefinition) {
                        if (node && node.value) {
                            _enforceNewlinesForFunctionLike(node.value as unknown as NodeWithParameters, sourceCode, minParameters, context)
                        }
                    }
                }
            },
            meta: {
                docs: {
                    description:
            'Enforce newlines just inside parentheses for function/method definitions only (not calls), when params >= minParams',
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
    }
}
