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

export const modernSyntaxAndPreferencesRules: TSESLint.Linter.RulesRecord = {
    '@typescript-eslint/await-thenable': 'error',

    /*
     * Performance: Verhindert Side Effects bei Type Imports
     * ✅ ==== VERIFIED ====
     */
    '@typescript-eslint/consistent-type-exports': 'error',

    // Konsistente Type Exports
    /*
     * ✅ ==== VERIFIED ====
     * ✅ Erzwingt Konsistenz in TypeScript und steuert den Auto-Fixer.
     *    prefer: 'type-imports'          → immer `import type` statt Wert-Import für Typen.
     *    fixStyle: 'separate-type-imports' → separater Top-Level-Block für Typen (kein Inline-Mixing).
     */
    '@typescript-eslint/consistent-type-imports': [
        'error',
        {
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports'
        }
    ],

    /*
     * Verhindert redundante Zuweisungen
     * Import/Export Hygiene (Google/Microsoft Standards)
     * ✅ ==== VERIFIED ====
     */
    '@typescript-eslint/no-import-type-side-effects': 'error',

    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    '@typescript-eslint/prefer-optional-chain': 'error',

    '@typescript-eslint/prefer-readonly': 'error',

    // ✅ ==== VERIFIED ====
    '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
            /*
             * [ALLOWLIST – Framework-Grenzen]
             * Externe Handler-Typen, die realistisch NICHT tief readonly modellierbar sind.
             * Beispiel: router.get('/x', (req: Request, res: Response) => ...) → wird nicht beanstandet.
             * WICHTIG: Beide Pakete aufnehmen (Re-Exports via express-serve-static-core). Keine Readonly<>-Wrapper um req/res nutzen.
             */

            allow: [
                {
                    from: 'file',
                    name: 'Socket'
                },
                {
                    from: 'package',
                    name: [
                        'Request',
                        'Response',
                        'NextFunction'
                    ],
                    package: 'express-serve-static-core'
                },
                {
                    from: 'package',
                    name: [
                        'Request',
                        'Response',
                        'NextFunction'
                    ],
                    package: 'express'
                },
                {
                    from: 'package',
                    name: ['Router'],
                    package: 'express'
                }
            ],

            /*
             * [MAXIMALE STRENGE] – Parameter-Properties in Klassen prüfen
             * True ⇒ auch Konstruktor-Parameter-Properties müssen readonly sein.
             * Beispiel (beanstandet): class A { constructor(private p: string[]) {} }
             * Beispiel (korrekt):   class A { constructor(private readonly p: readonly string[]) {} }
             */
            checkParameterProperties: true,

            // [MAXIMALE STRENGE] – Keine Ausnahmen für inferierte Parametertypen
            // False ⇒ auch Parameter OHNE explizite Annotation werden geprüft (keine „stillen“ Ausnahmen durch Inferenz).
            // Beispiel (wird geprüft): const h: RequestHandler = (req, res) => { /* ... */ }
            // Hinweis: Für Express-Handler mit expliziten Typen greift die Allowlist oben.
            ignoreInferredTypes: false,

            /*
             * [MAXIMALE STRENGE] – Methoden NICHT als readonly behandeln
             * False ⇒ Methoden gelten formal als veränderliche Properties; erhöht Strenge und kann mehr Treffer erzeugen.
             * Beispiel:
             *   Type T = { readonly x: number; method(): string }
             *   - treatMethodsAsReadonly: false ⇒ T wird NICHT als voll readonly gewertet (strenger)
             *   - treatMethodsAsReadonly: true  ⇒ T wird als readonly gewertet (weniger streng)
             */
            treatMethodsAsReadonly: false
        }
    ]
} satisfies TSESLint.Linter.RulesRecord
