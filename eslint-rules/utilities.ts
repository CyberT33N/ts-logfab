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
import { z } from 'zod'

// ==== TYPES ====
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * Validates the ESLint rules configuration.
 * @param data - The ESLint rules configuration to validate.
 * @returns The validated ESLint rules configuration.
 */
export const rulesRecordSchema = z.custom<TSESLint.Linter.RulesRecord>(
    (data): data is TSESLint.Linter.RulesRecord => typeof data === 'object' && data !== null,
    { message: 'Invalid ESLint security rules configuration' }
)