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
                function enforceNewlinesForFunctionLike(functionNode) {
                    if (!functionNode || !Array.isArray(functionNode.params)) {
                        return
                    }

                    const { params } = functionNode

                    if (params.length < minParameters) {
                        return
                    }

                    const firstParameter = params[0]
                    const lastParameter = params.at(-1)

                    // Find the opening and closing parens that wrap the parameters
                    const openingParen = sourceCode.getTokenBefore(
                        firstParameter, token =>
                            token.value === '('
                    )
                    const closingParen = sourceCode.getTokenAfter(
                        lastParameter, token =>
                            token.value === ')'
                    )

                    if (!openingParen || !closingParen) {
                        return
                    }

                    const tokenAfterOpen = sourceCode.getTokenAfter(
                        openingParen, { includeComments: true }
                    )
                    const tokenBeforeClose = sourceCode.getTokenBefore(
                        closingParen, { includeComments: true }
                    )

                    if (!tokenAfterOpen || !tokenBeforeClose) {
                        return
                    }

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

                return {
                    // Function declarations: function foo(a, b) {}
                    FunctionDeclaration(node) {
                        enforceNewlinesForFunctionLike(node)
                    },

                    // Function expressions: const x = function(a, b) {}
                    FunctionExpression(node) {
                        enforceNewlinesForFunctionLike(node)
                    },

                    // Arrow function expressions: const x = (a, b) => {}
                    ArrowFunctionExpression(node) {
                        enforceNewlinesForFunctionLike(node)
                    },

                    // Class methods: class A { m(a, b) {} }
                    MethodDefinition(node) {
                        if (node && node.value) {
                            enforceNewlinesForFunctionLike(node.value)
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
