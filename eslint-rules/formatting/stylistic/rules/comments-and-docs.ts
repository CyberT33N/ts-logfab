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
import type { TSESLint } from '@typescript-eslint/utils'

export const commentsAndDocsRules: TSESLint.Linter.RulesRecord = {
    '@stylistic/line-comment-position': [
        'error',
        {
            applyDefaultIgnorePatterns: true,
            ignorePattern: 'eslint|jshint|global',
            position: 'above'
        }
    ],

    '@stylistic/linebreak-style': [
        'error',
        'unix'
    ],

    '@stylistic/lines-around-comment': [
        'error',
        {
            afterBlockComment: false,
            afterHashbangComment: true,
            afterLineComment: false,
            allowArrayEnd: true,

            allowArrayStart: true,
            allowBlockEnd: true,
            allowBlockStart: true,
            allowClassEnd: true,
            allowClassStart: true,
            allowEnumEnd: true,
            allowEnumStart: true,
            allowInterfaceEnd: true,

            // TypeScript structures
            allowInterfaceStart: true,

            allowModuleEnd: true,

            allowModuleStart: true,

            allowObjectEnd: true,

            allowObjectStart: true,
            allowTypeEnd: true,
            allowTypeStart: true,
            applyDefaultIgnorePatterns: true,

            beforeBlockComment: true,
            beforeLineComment: true,
            ignorePattern: String.raw`^(?:region|endregion|#region|#endregion)\b`
        }
    ],

    '@stylistic/multiline-comment-style': [
        'error',
        'starred-block'
    ],

    '@stylistic/spaced-comment': [
        'error',
        'always',
        {
            block: {
                balanced: true,
                exceptions: ['-', '+'],
                markers: ['=', '!', ':', '::']
            },
            line: {
                exceptions: ['-', '+'],
                markers: ['=', '!', '/']
            }
        }
    ]
}
