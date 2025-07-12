
/**
 * 📌 pretestAll.ts
 * 
 * Integrations-Test Setup-Datei.
 * Diese Datei wird als globalSetup in vitest.integration.config.ts eingetragen.
 * 
 * WICHTIG: Hier dürfen KEINE vi.* Funktionen verwendet werden, da globalSetup
 * in einem separaten Kontext ausgeführt wird.
 */

// ⚠️ WICHTIG: KEINE direkten Imports von Electron-abhängigen Modulen hier,
// da die Electron-Mocks erst in setupFiles (nach globalSetup) initialisiert werden!

// Umgebungsvariablen werden automatisch von vitest.config.ts geladen

/**
 * ⚠️ Hinweis: Die Electron-Mocks werden durch setupFiles geladen
 * Da in globalSetup keine vi.mock() verfügbar ist, werden die Mocks
 * über die setupFiles-Konfiguration in vitest.integration.config.ts eingebunden.
 * 
 * Der ApiController wird erst in den Tests selbst initialisiert, da er
 * Electron-Abhängigkeiten hat. Dort sind die Mocks dann bereits aktiv.
 */

/**
 * 🔧 Sets up the integration test environment
 * @returns {void} A promise that resolves when the test environment is set up.
 */
export function setup(): void {
    console.info('📋 [2. PRETEST-INTEGRATION] Starte Integration-Test-Setup...')
    
    // Speichere Marker für die Test-Setup-Datei, dass sie den Server starten soll
    process.env.INTEGRATION_TEST_START_SERVER = 'true'
    process.env.SERVER_PORT = process.env.SERVER_PORT ?? '9090'
    
    console.info(
        '✅ [2. PRETEST-INTEGRATION] Integration-Test-Setup abgeschlossen - ' +
        `Server wird im Test-Kontext auf Port ${process.env.SERVER_PORT} gestartet`
    )
}

/**
 * 🔒 Cleans up the integration test environment
 * @returns {void} A promise that resolves when the test environment is cleaned up.
 */
export function teardown(): void {
    console.info('🧹 [TEARDOWN - INTEGRATION] Starte Integration-Test-Cleanup...')
    
    // API-Server wird in test-setup.ts heruntergefahren, da er auch dort gestartet wurde
    // Dies stellt sicher, dass sowohl Server-Start als auch -Stop im selben Kontext (mit Mocks) stattfinden
    
    console.info('✅ [TEARDOWN - INTEGRATION] Integration-Test-Cleanup abgeschlossen')
}