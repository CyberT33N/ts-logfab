# Phase 3: Refactoring der Beispiel-Services

*   **Ziel:** Anpassung aller Beispiel-Services in `examples/`, um die Änderungen am `@log`-Dekorator zu reflektieren und die neuen Konfigurationsmöglichkeiten zu demonstrieren.
*   **Erwartetes Ergebnis:** Alle Beispielanwendungen sind lauffähig, nutzen die neue Dekorator-Implementierung und zeigen Best Practices für die Konfiguration.
*   **Status:** `[ ] Ausstehend`

## Details/Aktionen

### 3.1. Analyse der `examples/`

*   **Ziel:** Identifizieren, welche Beispiel-Services direkt von der Migration betroffen sind.
*   **Aktion:**
    1.  Überprüfe alle Dateien in `examples/`, insbesondere die `*-service.ts` Dateien.
    2.  Identifiziere alle Stellen, an denen `@log` oder seine Varianten (`@logDebug`, etc.) mit spezifischen Konfigurationen verwendet werden.
*   **Betroffene Hauptdateien:**
    *   `examples/core/base-service.ts`
    *   `examples/enterprise-configuration/complete-decorator-configuration.ts`
    *   `examples/enterprise-configuration/advanced-monitoring-alerting.ts`
    *   `examples/alternative-implementation/enhanced-decorator-service.ts` (obwohl es eine alternative Implementierung testet, sollte es auf Konsistenz geprüft werden).

### 3.2. Anpassung von `examples/core/base-service.ts`

*   **Ziel:** Den primären Beispiel-Service auf die neue API umstellen.
*   **Aktion:**
    1.  Öffne `examples/core/base-service.ts`.
    2.  Passe die Konfigurationen in den `@log`-Aufrufen an. Da die meiste Komplexität in der `convertToEnhancedConfig`-Funktion gekapselt ist, sind hier möglicherweise nur minimale Änderungen erforderlich.
    3.  **Fokus:** Überprüfe `@log({ customContext: ... })`. Stelle sicher, dass `customContext` weiterhin korrekt als `metadata` im Log erscheint.
    4.  Führe `app-main-decorators.ts` aus, um die Änderungen zu validieren. Die Ausgabe sollte jetzt das neue, "Enhanced"-Tabellenformat zeigen.

### 3.3. Anpassung der Enterprise-Konfigurationen

*   **Ziel:** Die fortgeschrittenen Konfigurationsbeispiele aktualisieren.
*   **Aktion:**
    1.  Öffne `examples/enterprise-configuration/complete-decorator-configuration.ts`.
    2.  Überprüfe die Factory-Funktionen (`getBasicConfig`, `getCorrelationContextConfig`, etc.). Die hier zurückgegebenen `ILogDecoratorConfig`-Objekte werden von der neuen Implementierung korrekt verarbeitet.
    3.  **Demonstration:** Füge ein neues Beispiel hinzu, das explizit die neuen Konfigurationsmöglichkeiten zeigt, z.B. durch direktes Setzen von `correlationContext`.
    4.  Führe `app-enterprise-config.ts` aus, um die Validierung durchzuführen.

### 3.4. Überprüfung der alternativen Implementierung

*   **Ziel:** Sicherstellen, dass die alternative Implementierung in `enhanced-decorator.ts` nicht beeinträchtigt wird und weiterhin als Vergleich dienen kann.
*   **Aktion:**
    1.  Überprüfe `examples/alternative-implementation/enhanced-decorator-service.ts`.
    2.  Da diese Datei explizit die Dekorator-Funktionen aus `src/logger/enhanced-decorator.ts` importiert, sollte sie von den Änderungen in `src/decorators/index.ts` unberührt bleiben.
    3.  Führe `app-enhanced-decorators.ts` aus, um sicherzustellen, dass die alternative Implementierung weiterhin wie erwartet funktioniert.

## Akzeptanzkriterien/Tests

*   Alle Beispiel-Apps (`app-*.ts`) lassen sich ohne Fehler ausführen.
*   Die Konsolenausgabe der Beispiele, die den Standard-Dekorator verwenden, zeigt das neue Tabellenformat der Enhanced-Funktionen.
*   Die Funktionalität der Beispiele bleibt unverändert (z.B. erfolgreiche API-Aufrufe, korrekte Berechnungen). 