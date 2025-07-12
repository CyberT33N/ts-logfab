// ==== DEPENDENCIES ====
import {
    defineConfig, mergeConfig,
    type ViteUserConfig
} from 'vitest/config'

// 🔌 Import the base Vitest configuration
import baseConfig from './vitest.config.ts'

// 📋 Define the unit test configuration
const cfg: ViteUserConfig = defineConfig({
    test: {
    /**
      * Name of the test configuration for workspace selection.
      * @type {string}
      */
        name: 'unit',
        /**
        * Specifies the test files to include.
        * @type {Array<string>}
        */
        include: ['test/unit/**/*.test.ts'],
        /**
        * Specifies the setup files to use for unit tests.
        * Der Electron-Mock wird bereits in der Basiskonfiguration geladen.
        * @type {Array<string>}
        */
        setupFiles: ['test/unit/test-setup.ts'],
        /**
        * Type checking configuration for unit tests.
        * @type {Object}
        */
        typecheck: {
            /**
        * Specifies the files to include for type checking.
        * @type {Array<string>}
        */
            include: ['test/unit/**/*.test-d.ts']
        },
        /**
        * Specifies the coverage configuration.
        * @type {Object}
        */
        coverage: {
            /**
            * Specifies the coverage provider to use.
            * @type {string}
            */
            provider: 'v8',
            /**
            * Specifies the files or directories to exclude from coverage.
            * @type {Array<string>}
            */
            exclude: ['src/main/controllers/']
        }
    }
})

/**
 * 🛠️ Merges the existing Vitest configuration with additional custom
 * configurations defined below.
 */
const mergedCfg = mergeConfig(baseConfig, defineConfig(cfg))
console.info('mergedCfg - unit config', mergedCfg)
export default mergedCfg