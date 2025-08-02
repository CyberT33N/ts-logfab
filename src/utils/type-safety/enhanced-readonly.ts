/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 ENHANCED READONLY UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🔒 **ReadonlyDeep with RegExp Support**
 * 
 * Enhanced version of type-fest's ReadonlyDeep that properly handles RegExp objects
 * for strict type safety compliance with ESLint rules.
 * 
 * **Problem:** Standard ReadonlyDeep utilities treat RegExp as regular objects,
 * but ESLint's @typescript-eslint/prefer-readonly-parameter-types requires
 * RegExp to be explicitly wrapped with Readonly<RegExp>.
 * 
 * **Solution:** Custom conditional type that explicitly handles RegExp edge cases
 * while maintaining all other ReadonlyDeep behavior.
 * 
 * @template T - The type to make deeply readonly with RegExp compliance
 * @see https://github.com/ts-essentials/ts-essentials/issues/387
 * 
 * **Usage:**
 * ```typescript
 * interface Config {
 *   patterns: RegExp[]
 *   settings: { name: string }
 * }
 * 
 * function processConfig(config: ReadonlyDeepRegExp<Config>) {
 *   // Fully type-safe and ESLint compliant!
 * }
 * ```
 * 
 * **Future Extensions:**
 * - ReadonlyDeepDate: Handle Date mutability
 * - ReadonlyDeepFunction: Handle Function properties
 * - ReadonlyDeepBuiltins: Handle all built-in mutable objects
 */
export type ReadonlyDeepRegExp<T> = {
    readonly [P in keyof T]: T[P] extends RegExp
        ? Readonly<T[P]>  // Explicit Readonly wrapper for RegExp
        : T[P] extends readonly (infer U)[]
        ? readonly Readonly<U>[]  // Deep readonly for array elements
        : T[P] extends object
        ? ReadonlyDeepRegExp<T[P]>  // Recursive application for nested objects
        : T[P]  // Primitives pass through unchanged
} 