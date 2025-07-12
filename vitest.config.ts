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

// ==== Imports ====
import dotenv from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, type ViteUserConfig } from 'vitest/config'

// 🔄 Load the test environment variables from .env.test and override defaults
dotenv.config({ path: '.env.test', override: true })

const cfg: ViteUserConfig = defineConfig({
    /**
    * List of plugins to be used in the configuration.
    */
    plugins: [tsconfigPaths()], // 🔌 Add tsconfig paths plugin

    /**
    * Configuration options for tests.
    */
    test: {
    // ✅ Sauberes Mocking, um Nebeneffekte zu vermeiden

        /*
    > Setzt **alle Aufrufe (calls)** zurück – nicht die Implementierung.

    🧠 Wenn **nicht gesetzt**, musst du manuell `mockClear` aufrufen:

    ```ts
    afterEach(() => {
      vi.clearAllMocks(); // = alle mockFn.mock.calls = []
    });
    ```

    Oder gezielt:

    ```ts
    afterEach(() => {
      myMockFn.mockClear();
    });
    ```
    */
        clearMocks: true,

        /*
    > Behalte die ursprüngliche Implementierung von Mocks (z.B. `vi.spyOn`), selbst nach dem Testlauf.

    🧠 Wenn `restoreMocks: true` **nicht gesetzt ist**, du willst aber manuell *restore*-n:

    ```ts
    afterEach(() => {
      vi.restoreAllMocks(); // setzt originale Implementierung zurück
    });
    ```

    Oder gezielt:

    ```ts
    afterEach(() => {
      someSpy.mockRestore();
    });
    ```
    */
        restoreMocks: false,

        /*
    > Setzt Implementierung + Aufrufe zurück.

    🧠 Wenn du es **trotzdem tun willst**, aber nicht global gesetzt hast:

    ```ts
    afterEach(() => {
      vi.resetAllMocks(); // calls + implementation reset
    });
    ```

    Oder individuell:

    ```ts
    afterEach(() => {
      someMockFn.mockReset();
    });
    ```
    */
        mockReset: false,

        /*
    > Setzt **alle gestubbten Umgebungsvariablen** automatisch nach jedem Test zurück.  
    Hilfreich, wenn du `vi.stubEnv('FOO', 'bar')` o.Ä. nutzt – spart dir `vi.unstubEnv(...)` Aufräumaktionen.

    ## 🧼 Wenn **nicht** gesetzt – manuell aufräumen:


    ```ts
    afterEach(() => {
      vi.unstubEnv('MY_ENV_VAR');
      vi.unstubEnv('ANOTHER_ENV_VAR');
    });
    ```

    ### 🔁 Variante 2: Komplett aufräumen

    ```ts
    afterEach(() => {
      vi.unstubAllEnvs(); // entfernt alle gestubbten ENV-Overrides
    });
    ```
    */
        unstubEnvs: true,

        /*
    > Entfernt gestubbte globale Objekte, z.B. `globalThis.fetch = vi.fn()`.

    🧠 Wenn nicht global gesetzt – selbst aufräumen:

    ```ts
    afterEach(() => {
      vi.unstubAllGlobals(); // Global-Stubs wie fetch, window.alert etc.
    });
    ```

    Oder gezielt:

    ```ts
    afterEach(() => {
      vi.unstubGlobal('fetch');
    });
    ```
    */
        unstubGlobals: true,

        /**
      * Indicates whether to watch files for changes.
      * @type {boolean}
      */
        watch: false,

        /**
      * Path to the setup file that runs before each test.
      * Initialisiert die Electron-Mocks und andere gemeinsame Testfunktionalitäten.
      * @type {string}
      */
        //setupFiles: ['test/utils/setup-electron-mock.ts'],

        /**
      * Path to the global setup file that runs before all tests.
      * Handles basic test infrastructure like environment variables.
      * @type {string}
      */
        globalSetup: ['test/pretest-base.ts'],

        /**
      * The timeout for each test hook.
      * @type {number}
      */
        testTimeout: 300000,
        hookTimeout: 300000,

        /**
      * The environment in which the tests will run.
      * @type {string}
      */
        environment: 'node', // 🌐 Test environment set to Node.js

        /**
      * Disables the console intercept.
      * @type {boolean}
      */
        disableConsoleIntercept: true,

        /**
      * Configuration for type checking.
      */
        typecheck: {
            enabled: true
        },

        /**
      * Configuration for coverage reporting.
      */
        coverage: {
            /**
        * Specifies whether coverage is enabled.
        * @type {boolean}
        */
            enabled: true,
            /**
        * Specifies the coverage provider to use.
        * @type {string}
        */
            provider: 'v8',
            /**
        * Specifies the directories to include for coverage.
        * @type {Array<string>}
        */
            include: ['src/'],

            /**
        * Specifies the files or directories to exclude from coverage.
        * @type {Array<string>}
        */
            exclude: ['dist/', 'out/', 'log/', '.cursor/'],

            /**
        * Specifies the coverage reporters to use.
        * @type {Array<string>}
        */
            reporter: ['text', 'json', 'html']
        },

        /**
      * Project configurations to manage different test types.
      * Replaces the deprecated workspace configuration.
      * @type {Array<string>}
      */
        projects: [
            './vitest.unit.config.ts',
            './vitest.integration.config.ts',
            './vitest.regression.config.ts'
        ]
    }
})

/**
 * Represents the configuration for the Vitest test runner.
 */
export default cfg