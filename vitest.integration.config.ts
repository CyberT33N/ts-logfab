/*
▄▄▄·▄▄▄  ▪   ▌ ▐· ▄▄▄· ·▄▄▄▄  ▄▄▄ . ▐ ▄ ▄▄▄▄▄
▐█ ▄█▀▄ █·██ ▪█·█▌▐█ ▀█ ██▪ ██ ▀▄.▀·•█▌▐█•██  
██▀·▐▀▀▄ ▐█·▐█▐█•▄█▀▀█ ▐█· ▐█▌▐▀▀▪▄▐█▐▐▌ ▐█.▪
▐█▪·•▐█•█▌▐█▌ ███ ▐█ ▪▐▌██. ██ ▐█▄▄▌██▐█▌ ▐█▌·
.▀   .▀  ▀▀▀▀. ▀   ▀  ▀ ▀▀▀▀▀•  ▀▀▀ ▀▀ █▪ ▀▀▀
* © privadent GmbH. All rights reserved.  
* Unauthorized copying, distribution, or modification of this software is strictly prohibited.  
*/

// ==== DEPENDENCIES ====
import {
    defineConfig, mergeConfig,
    type ViteUserConfig
} from 'vitest/config'

// 🔌 Import the base Vitest configuration
import baseConfig from './vitest.config.ts'

// 📋 Define the integration test configuration
const cfg: ViteUserConfig = defineConfig({
    test: {
        /**
          * Name of the test configuration for workspace selection.
          * @type {string}
          */
        name: 'integration',
        /**  
           * Specifies the test files to include.
           * @type {Array<string>}
           */
        include: ['test/integration/**/*rest.test.ts'],
        /**    
           * Specifies the global setup file to use for integration tests.
           * Die Basis-Setup-Datei (pretest-base.ts) wird bereits in der Basis-Konfiguration geladen.
           * Diese Datei setzt nur die Integration-spezifischen Parameter.
           * @type {string}
           */
        globalSetup: ['test/integration/pretestAll.ts'],
        /**
           * Specifies the setup files to run before each test file.
           * Diese Dateien werden NACH globalSetup ausgeführt und können
           * Vitest-Funktionalitäten wie vi.mock() verwenden.
           * @type {Array<string>}
           */
        setupFiles: [
            // Integration-spezifisches Setup (falls notwendig)
            'test/integration/test-setup.ts'
        ],
        /**
           * Type checking configuration for integration tests.
           * @type {Object}
           */
        typecheck: {
            /**
              * Specifies the files to include for type checking.
              * @type {Array<string>}
              */
            include: ['test/integration/**/*rest.test-d.ts']
        }
    }
})

/**
 * 🛠️ Merges the existing Vitest configuration with additional custom
 * configurations defined below.
 */
const mergedCfg: ViteUserConfig = mergeConfig(baseConfig, defineConfig(cfg))
console.info('mergedCfg - integration config', mergedCfg)
export default mergedCfg