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

// ==== IMPORTS ====
import { arrayRules } from './arrays'
import { blocksAndBracesRules } from './blocks-and-braces'
import { classMembersRules } from './class-members'
import { commentsAndDocsRules } from './comments-and-docs'
import { functionAndArrowRules } from './functions-and-arrows'
import { generalFormattingRules } from './general-formatting'
import { jsxRules } from './jsx'
import { keysAndKeywordsRules } from './keys-and-keywords'
import { lineBreaksAndWrappingRules } from './line-breaks-and-wrapping'
import { miscRules } from './misc'
import { numbersAndOperatorsRules } from './numbers-and-operators'
import { objectRules } from './objects'
import { spacingAndIndentationRules } from './spacing-and-indentation'
import { statementRules } from './statements'
import { stringRules } from './strings'
import { typescriptSpecificRules } from './typescript-specific'

import type { TSESLint } from '@typescript-eslint/utils'

export const rules: TSESLint.Linter.RulesRecord = {
    // Follow original order as closely as possible
    ...arrayRules,
    ...functionAndArrowRules,
    ...blocksAndBracesRules,
    ...generalFormattingRules,
    ...spacingAndIndentationRules,
    ...jsxRules,
    ...keysAndKeywordsRules,
    ...commentsAndDocsRules,
    ...classMembersRules,
    ...lineBreaksAndWrappingRules,
    ...numbersAndOperatorsRules,
    ...stringRules,
    ...objectRules,
    ...statementRules,
    ...typescriptSpecificRules,
    ...miscRules
}
