# Phase 2: Refactoring des Haupt-Dekorators

*   **Ziel:** Umschreiben der `@log`-Funktion in `src/decorators/index.ts`, um die neuen `logEnhanced...`-Funktionen zu verwenden.
*   **Erwartetes Ergebnis:** Die `@log`-Funktion ist intern vollständig auf die neue Enhanced-API umgestellt und verarbeitet die bestehende Konfiguration korrekt.
*   **Status:** `[ ] Ausstehend`

## Details/Aktionen

### 2.1. Konfigurations-Adapter erstellen

*   **Ziel:** Eine interne Helper-Funktion erstellen, die die bestehende `ILogDecoratorConfig` in die neue `IDecoratorLoggingConfig` für die Enhanced-Funktionen umwandelt.
*   **Aktion:**
    1.  Erstelle in `src/decorators/index.ts` eine neue Funktion `convertToEnhancedConfig(config: ILogDecoratorConfig): IDecoratorLoggingConfig`.
    2.  Diese Funktion mappt die Felder:
        *   `enableCorrelation` -> `correlationContext.enabled`
        *   `enableSemanticDetection` -> `semanticContext.enabled`
        *   `enableAnomalyDetection` -> `anomalyDetection.enabled`
        *   `enablePerformanceTracking` -> `includePerformance`
        *   `useHybridLogger` -> bleibt (oder wird Teil einer globalen Konfiguration)
        *   `logLevel` -> bleibt

    **WICHTIGER HINWEIS FÜR DEN AUSFÜHRENDEN AI-AGENTEN:** Der folgende Code ist ein **PROTOTYP/VORSCHLAG**. Bitte prüfe ihn **KRITISCH** anhand des aktuellen Projektkontexts, der neuesten Dateiversionen und der spezifischen Anforderungen. Verifiziere und adaptiere ihn bei Bedarf, bevor du ihn verwendest. Konsultiere ggf. aktuelle Dokumentationen oder Dateiinhalte mittels Projekt-Tools (`read_file`, `web_search` etc.).
    ```typescript
    // In src/decorators/index.ts
    import { 
        type IDecoratorLoggingConfig as IEnhancedConfig, 
        getDefaultDecoratorConfig as getEnhancedDefault 
    } from '@/logger/decorator-logging.ts';

    function convertToEnhancedConfig(config: ILogDecoratorConfig): IEnhancedConfig {
        const defaults = getEnhancedDefault();
        return {
            enableCorrelation: config.correlationContext?.enabled ?? defaults.enableCorrelation,
            enableSemanticDetection: config.semanticContext?.enabled ?? defaults.enableSemanticDetection,
            enableAnomalyDetection: config.anomalyDetection?.enabled ?? defaults.enableAnomalyDetection,
            enablePerformanceTracking: config.includePerformance ?? defaults.enablePerformanceTracking,
            useHybridLogger: true, // Assuming this is always true for the new implementation
            logLevel: config.level ?? defaults.logLevel,
        };
    }
    ```

### 2.2. `@log`-Dekorator umschreiben

*   **Ziel:** Die Kernlogik des `@log`-Dekorators ersetzen.
*   **Aktion:**
    1.  Innerhalb der `enhancedMethod`-Funktion im `@log`-Dekorator:
    2.  Entferne die Aufrufe von `createLoggingContext` und `createDecoratorPrefix`.
    3.  Entferne die Aufrufe der alten `logMethodStart`, `logMethodSuccess` und `logMethodError`.
    4.  Rufe stattdessen die neuen `logEnhanced...`-Funktionen auf.

    **WICHTIGER HINWEIS FÜR DEN AUSFÜHRENDEN AI-AGENTEN:** Der folgende Code ist ein **PROTOTYP/VORSCHLAG**. Bitte prüfe ihn **KRITISCH**... (restlicher Hinweis)
    ```typescript
    // In src/decorators/index.ts, innerhalb von export function log(...) { ... }
    
    // ...
    const enhancedMethod = async function(this: object, ...args: readonly unknown[]): Promise<unknown> {
        const className = this.constructor.name;
        const methodName = String(propertyKey);
        
        // 1. Konfiguration konvertieren
        const enhancedConfig = convertToEnhancedConfig(finalConfig);

        // 2. Enhanced-Logging starten
        const startResult = logEnhancedMethodStart(
            className, 
            methodName, 
            args, 
            enhancedConfig
        );

        try {
            const result = await originalMethod.apply(this, args as unknown[]);
            
            // 3. Erfolg loggen
            logEnhancedMethodSuccess(
                startResult,
                extractResultMetadata(result), // Helfer-Funktion bleibt nützlich
                enhancedConfig
            );
            
            return result;
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error(String(error));
            
            // 4. Fehler loggen
            logEnhancedMethodError(startResult, errorObj, enhancedConfig);
            
            throw errorObj;
        }
    };
    // ...
    ```

### 2.3. Spezialisierte Dekorator-Varianten anpassen

*   **Ziel:** `logDebug`, `logPerformance`, etc. an die neue Implementierung anpassen.
*   **Aktion:** Die Konfigurationen, die an die `@log`-Funktion übergeben werden, müssen ggf. angepasst werden, um die neuen `ILogDecoratorConfig`-Strukturen (`correlationContext`, `semanticContext`, etc.) zu verwenden. Dies ist jedoch minimal, da die `convertToEnhancedConfig`-Funktion die meiste Arbeit erledigt. Eine Überprüfung ist dennoch notwendig.
    *   Beispiel `logDebug`: Stellt sicher, dass `logLevel: 'debug'` korrekt an `convertToEnhancedConfig` weitergegeben wird.

## Akzeptanzkriterien/Tests

*   Alle bestehenden Tests für den `@log`-Dekorator müssen weiterhin erfolgreich sein.
*   Neue Tests sollten hinzugefügt werden, um die korrekte Weitergabe von Korrelations- und Semantik-Informationen zu überprüfen.
*   Die Konsolenausgabe muss das neue "Enhanced"-Format verwenden. 