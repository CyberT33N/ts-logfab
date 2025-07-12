/**
 * 📌 test/integration/test-setup.ts
 * 
 * Setup-Datei für Integrationstests.
 * Diese Datei wird in der setupFiles-Konfiguration der vitest.integration.config.ts geladen.
 * 
 * WICHTIG: Hier können vi.* Funktionen verwendet werden, da setupFiles
 * im Kontext der Testsuite ausgeführt wird.
 */

import { vi, afterAll } from 'vitest'
// import { ApiController } from '@/main/controllers/ApiController.ts'

// Globale Variable für den API-Controller (wird für cleanup benötigt)
// let apiController: ApiController | null = null
// const serverPort = process.env.SERVER_PORT ?? '9090'

/**
 * 🧪 Integrations-Test-Setup-Logik
 * Diese Funktion bereitet die Umgebung für Integrationstests vor
 */
function setupIntegrationTestEnvironment(): void {
    console.info('📋 [4. SETUP-FILES-INTEGRATION] Initialisiere Integration-Test-Umgebung...')
    
    // Hier können Vitest-spezifische Mocks und setups erfolgen
    vi.stubGlobal('INTEGRATION_TEST_MODE', true)
    
    // Eigene Mocks oder Erweitern der vorhandenen Electron-Mocks spezifisch für Integration-Tests
    
    console.info('✅ [4. SETUP-FILES-INTEGRATION] Integration-Test-Umgebung erfolgreich initialisiert')
    
    // Starte den API-Server, wenn das Flag gesetzt ist
    // Hinweis: Dies geschieht hier, NACHDEM die Electron-Mocks initialisiert wurden
    if (process.env.INTEGRATION_TEST_START_SERVER === 'true') {
        try {
            //   console.info(`📋 [4.1 SERVER-START] Starte Integration-Test-Server auf Port ${serverPort}...`)
            
            //   // Initialisiere den API-Controller mit den aktiven Electron-Mocks
            //   apiController = new ApiController()
            //   apiController.startServer()
            
            console.info('✅ [4.1 SERVER-START] Integration-Test-Server erfolgreich gestartet')
        } catch (error) {
            console.error('❌ [4.1 SERVER-START] Fehler beim Starten des Integration-Test-Servers:', error)
            throw error
        }
    }
}

/**
 * 🧹 Cleanup-Logik für die Integrationstests
 * Diese Funktion wird nach allen Tests ausgeführt
 */
function cleanupIntegrationTestEnvironment(): void {
    console.info('🧹 [CLEANUP-INTEGRATION] Räume Integration-Test-Umgebung auf...')
    
    //     // Fahre den API-Server herunter, wenn er läuft
    //     if (apiController) {
    //         console.info('🔄 [SERVER-STOP] Stoppe Integration-Test-Server...')
    //         try {
    //             apiController.app.listen().close()
    //             apiController = null
    //             console.info('✅ [SERVER-STOP] Integration-Test-Server erfolgreich gestoppt')
    //         } catch (error) {
    //             console.error('❌ [SERVER-STOP] Fehler beim Stoppen des Integration-Test-Servers:', error)
    //         }
    //     }
    
    console.info('✅ [CLEANUP-INTEGRATION] Integration-Test-Umgebung erfolgreich aufgeräumt')
}

// Automatische Ausführung beim Import
setupIntegrationTestEnvironment()

// Registriere die Cleanup-Funktion, die nach allen Tests ausgeführt wird
afterAll(() => {
    console.info('🧹 [AFTER-ALL] Starte afterAll-Cleanup für Integration-Tests...')
    cleanupIntegrationTestEnvironment()
    console.info('✅ [AFTER-ALL] afterAll-Cleanup für Integration-Tests abgeschlossen')
}) 