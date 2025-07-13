# Projektplan: Migration zu Enhanced Decorator Logging

## Phase 1: Analyse und Setup
- [x] ~~**1.1. Detaillierte Analyse der Legacy-Implementierung** ([Details](./.plan/1-analysis-and-setup.md))~~
- [x] ~~**1.2. Definition der Migrationsstrategie** ([Details](./.plan/1-analysis-and-setup.md))~~

## Phase 2: Refactoring des Haupt-Dekorators
- [x] **2.1. Konfigurations-Adapter für Abwärtskompatibilität erstellen** ([Details](./.plan/2-refactor-main-decorator.md))
- [x] **2.2. Kernlogik des `@log`-Dekorators auf Enhanced-Funktionen umstellen** ([Details](./.plan/2-refactor-main-decorator.md))
- [x] **2.3. Spezialisierte Dekorator-Varianten (`@logDebug`, etc.) anpassen** ([Details](./.plan/2-refactor-main-decorator.md))

## Phase 3: Anpassung der Beispielanwendungen
- [ ] **3.1. Refactoring der `BaseService` und zugehöriger Beispiele** ([Details](./.plan/3-refactor-example-services.md))
- [ ] **3.2. Anpassung der `EnterpriseConfigurationService`** ([Details](./.plan/3-refactor-example-services.md))
- [ ] **3.3. Sicherstellen, dass alle Beispiele (`app-*.ts`) lauffähig sind** ([Details](./.plan/3-refactor-example-services.md))

## Phase 4: API-Bereinigung
- [ ] **4.1. Legacy-Funktionen aus `decorator-logging.ts` entfernen** ([Details](./.plan/4-update-public-api.md))
- [ ] **4.2. Exporte in `src/logger/index.ts` bereinigen** ([Details](./.plan/4-update-public-api.md))

## Phase 5: Testing und Validierung
- [ ] **5.1. Bestehende Unit- und Integrationstests anpassen** ([Details](./.plan/5-testing-and-validation.md))
- [ ] **5.2. Neue Tests für Correlation und Semantic Context erstellen** ([Details](./.plan/5-testing-and-validation.md))
- [ ] **5.3. Manuelle Validierung der Konsolenausgabe aller Beispiele** ([Details](./.plan/5-testing-and-validation.md))

## Phase 6: Finale Arbeiten
- [ ] **6.1. Code-Cleanup und Entfernen von ungenutzten Hilfsfunktionen** ([Details](./.plan/6-cleanup.md))
- [ ] **6.2. Projektdokumentation (`README.md`, JSDoc) aktualisieren** ([Details](./.plan/6-cleanup.md))
- [ ] **6.3. `CHANGELOG.md` mit Breaking-Change-Hinweis versehen** ([Details](./.plan/6-cleanup.md))
