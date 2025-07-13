# Phase 4: Öffentliche API und Exporte aktualisieren

*   **Ziel:** Bereinigung der öffentlichen API durch Entfernen der Legacy-Funktionen und Sicherstellung, dass nur die neue, "Enhanced" API exportiert wird.
*   **Erwartetes Ergebnis:** `src/logger/index.ts` exportiert keine Legacy-Funktionen mehr. Die alten Funktionen sind aus `src/logger/decorator-logging.ts` entfernt.
*   **Status:** `[ ] Ausstehend`

## Details/Aktionen

### 4.1. Legacy-Funktionen entfernen

*   **Ziel:** Die alten, nicht mehr verwendeten Logging-Funktionen physisch aus dem Code entfernen.
*   **Aktion:**
    1.  Öffne `src/logger/decorator-logging.ts`.
    2.  Lösche den gesamten `BACKWARD COMPATIBILITY FUNCTIONS`-Block, inklusive:
        *   `createDecoratorPrefix`
        *   `logMethodStart`
        *   `logMethodSuccess`
        *   `logMethodError`
        *   `logMethodDebug`
    3.  **Wichtiger Hinweis:** Die Funktion `createDecoratorLoggingConfig` und `getDefaultDecoratorConfig` sollten **beibehalten** werden, da sie für die Konfiguration der neuen Enhanced-Funktionen nützlich sind.

### 4.2. Exporte in `src/logger/index.ts` bereinigen

*   **Ziel:** Die Haupt-Exportdatei des Loggers aktualisieren, sodass sie nur noch die relevanten neuen Funktionen und Typen exportiert.
*   **Aktion:**
    1.  Öffne `src/logger/index.ts`.
    2.  Entferne den Export-Block für die Legacy-Funktionen.

    **WICHTIGER HINWEIS FÜR DEN AUSFÜHRENDEN AI-AGENTEN:** Der folgende Code ist ein **PROTOTYP/VORSCHLAG**. Bitte prüfe ihn **KRITISCH**... (restlicher Hinweis)
    ```typescript
    // src/logger/index.ts - VORHER
    export {
        createDecoratorPrefix, // ZU ENTFERNEN
        logMethodStart,      // ZU ENTFERNEN
        logMethodSuccess,    // ZU ENTFERNEN
        logMethodError,      // ZU ENTFERNEN
        logMethodDebug       // ZU ENTFERNEN
    } from './decorator-logging.ts'
    
    // src/logger/index.ts - NACHHER
    // Dieser Block wird entfernt.
    // Stattdessen sollten die neuen Enhanced-Funktionen und Typen exportiert werden.
    export {
        logEnhancedMethodStart,
        logEnhancedMethodSuccess,
        logEnhancedMethodError,
        logEnhancedMethodDebug,
        createDecoratorLoggingConfig,
        getDefaultDecoratorConfig,
        type IEnhancedLogContext,
        type IDecoratorLoggingConfig
    } from './decorator-logging.ts'
    ```

## Akzeptanzkriterien/Tests

*   Das Projekt kompiliert ohne Fehler nach dem Entfernen der Funktionen und Exporte.
*   Ein `grep` nach den alten Funktionsnamen im Projekt liefert keine Ergebnisse mehr (außer in der Git-Historie).
*   Die öffentliche API des Loggers ist sauber und enthält keine veralteten Funktionen. 