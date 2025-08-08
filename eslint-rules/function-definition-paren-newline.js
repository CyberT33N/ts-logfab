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

function _enforceNewlinesForFunctionLike(
    functionNode, sourceCode, minParameters, context
) {
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

// Add top-level helpers extracted from create(context)
function _findWrappingParens(
    firstParameter, lastParameter, sourceCode
) {
    const openingParen = sourceCode.getTokenBefore(
        firstParameter, token =>
            token.value === '('
    )
    const closingParen = sourceCode.getTokenAfter(
        lastParameter, token =>
            token.value === ')'
    )

    return {
        openingParen,
        closingParen
    }
}

function _getBoundaryTokens(
    openingParen, closingParen, sourceCode
) {
    const tokenAfterOpen = sourceCode.getTokenAfter(
        openingParen, { includeComments: true }
    )
    const tokenBeforeClose = sourceCode.getTokenBefore(
        closingParen, { includeComments: true }
    )

    return {
        tokenAfterOpen,
        tokenBeforeClose
    }
}

function _reportMissingNewlines(
    functionNode, openingParen, closingParen, tokenAfterOpen, tokenBeforeClose, context
) {
    const openAndNextSameLine = openingParen.loc.end.line === tokenAfterOpen.loc.start.line
    const previousAndCloseSameLine = tokenBeforeClose.loc.end.line === closingParen.loc.start.line

    if (openAndNextSameLine) {
        context.report({
            node: functionNode,
            loc: openingParen.loc,
            messageId: 'expectedAfter',
            fix: fixer =>
                fixer.insertTextAfter(
                    openingParen, '\n'
                )
        })
    }

    if (previousAndCloseSameLine) {
        context.report({
            node: functionNode,
            loc: closingParen.loc,
            messageId: 'expectedBefore',
            fix: fixer =>
                fixer.insertTextBefore(
                    closingParen, '\n'
                )
        })
    }
}

export const functionDefinitionParenNewlinePlugin = {
    rules: {
        'function-definition-paren-newline': {
            create(context) {
                const sourceCode = context.getSourceCode()
                const option = context.options && context.options[0] ? context.options[0] : {}
                const minParameters = typeof option.minParams === 'number' ? option.minParams : 2

                /**
                 * Report missing newlines inside parens for a given function-like node
                 */
                // Replace nested helper with calls to top-level helpers
                return {
                    // Function declarations: function foo(a, b) {}
                    FunctionDeclaration(node) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    // Function expressions: const x = function(a, b) {}
                    FunctionExpression(node) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    // Arrow function expressions: const x = (a, b) => {}
                    ArrowFunctionExpression(node) {
                        _enforceNewlinesForFunctionLike(node, sourceCode, minParameters, context)
                    },

                    // Class methods: class A { m(a, b) {} }
                    MethodDefinition(node) {
                        if (node && node.value) {
                            _enforceNewlinesForFunctionLike(node.value, sourceCode, minParameters, context)
                        }
                    }
                }
            },
            meta: {
                docs: {
                    // eslint-disable-next-line @stylistic/max-len
                    description: 'Enforce newlines just inside parentheses for function/method definitions only (not calls), when params >= minParams',
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
