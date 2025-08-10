
# rules

https://eslint.org/docs/latest/rules/consistent-return
- Wir **MÜSSEN** diese Regel auf jeden Fall noch mal genauer prüfen. Wir haben sie deaktiviert für ESLint und für TypeScript ESLint. Aber mal prüfen, was hier der Enterprise Standard eigentlich ist.


--------------

Wir **MÜSSEN** ja auf jeden Fall noch das eigene MPM-Package erstellen mit dem ESLint Plugin Enterprise.


Wir haben aktuell um das ESLint Package JSON Plugin zu aktivieren, die folgenden Sachen hier deaktiviert. Aber wir **MÜSSEN** überlegen, welche wir davon aktivieren, weil das ist ja auch ein JSON und von daher können wir Ordering und so vielleicht aktivieren. Das **WÄRE** gar nicht verkehrt.
```
// ===== ENTERPRISE-GRADE PACKAGE.JSON CONFIGURATION =====
    {
        files: ['**/package.json'],
        rules: {
            // ===== ENTERPRISE SECURITY & COMPLIANCE =====
            'package-json/require-engines': 'error', // MANDATORY: Node.js version constraints for reproducible builds
            'package-json/require-author': 'error', // MANDATORY: Clear ownership and accountability
            'package-json/require-files': 'warn', // RECOMMENDED: Explicit file inclusion for security
            'package-json/no-redundant-files': 'error', // SECURITY: Prevent accidental sensitive data exposure

            // ===== DEPENDENCY MANAGEMENT EXCELLENCE =====
            'package-json/restrict-dependency-ranges': [
                'error',
                [
                // BASE RULE: All dependencies should use tilde (~) for Enterprise-controlled updates
                    {
                        rangeType: 'tilde'
                    },

                    // SECURITY: Pin unstable versions (0.x.x) for production dependencies
                    {
                        forDependencyTypes: ['dependencies'],
                        forVersions: '<1',
                        rangeType: 'pin'
                    },

                    // FLEXIBILITY: Allow any valid range for peer dependencies
                    {
                        forDependencyTypes: ['peerDependencies'],
                        rangeType: [
                            'caret',
                            'tilde',
                            'pin'
                        ] // All acceptable
                    }
                ]
            ],

            // ===== METADATA COMPLETENESS =====
            'package-json/require-keywords': 'warn', // RECOMMENDED: Better discoverability

            /*
             * ===== DISABLE ALL JSONC RULES FOR PACKAGE.JSON =====
             * Only eslint-plugin-package-json should handle package.json files
             */
            'jsonc/indent': 'off',
            'jsonc/sort-keys': 'off',
            'jsonc/key-name-casing': 'off',
            'jsonc/quotes': 'off',
            'jsonc/comma-dangle': 'off',
            'jsonc/no-comments': 'off',
            'jsonc/object-curly-spacing': 'off',
            'jsonc/key-spacing': 'off',
            'jsonc/comma-style': 'off',
            'jsonc/array-bracket-newline': 'off',
            'jsonc/array-element-newline': 'off',
            'jsonc/object-curly-newline': 'off',
            'jsonc/object-property-newline': 'off',
            'jsonc/no-dupe-keys': 'off',
            'jsonc/no-sparse-arrays': 'off',
            'jsonc/no-octal-escape': 'off',
            'jsonc/no-useless-escape': 'off',
            'jsonc/no-irregular-whitespace': 'off',
            'jsonc/no-hexadecimal-numeric-literals': 'off',
            'jsonc/no-binary-numeric-literals': 'off',
            'jsonc/no-octal-numeric-literals': 'off',
            'jsonc/no-numeric-separators': 'off',
            'jsonc/no-plus-sign': 'off',
            'jsonc/no-floating-decimal': 'off',
            'jsonc/array-bracket-spacing': 'off',
            'jsonc/quote-props': 'off',
            'jsonc/sort-array-values': 'off',
            'jsonc/no-bigint-literals': 'off',
            'jsonc/no-undefined-value': 'off',
            'jsonc/no-nan': 'off',
            'jsonc/no-infinity': 'off',
            'jsonc/auto': 'off'

            // Note: Only package-json/* rules should apply to package.json files
        }
    },
```