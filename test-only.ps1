# Finde rekursiv alle Dateien im 'test'-Verzeichnis, die 'test.only', 'it.only' oder 'describe.only' enthalten.
$onlyFiles = Get-ChildItem -Path ./test -Recurse | Where-Object { !$_.PSIsContainer } | Select-String -Pattern 'test\.only|it\.only|describe\.only' -List | ForEach-Object { $_.Path }

# Prüfe, ob Dateien mit '.only' gefunden wurden.
if ($onlyFiles.Count -gt 0) {
    Write-Host "⚠️ Found .only tests in:"
    # Gib die gefundenen Dateien aus (optional, aber hilfreich für die Fehlersuche).
    $onlyFiles | ForEach-Object { Write-Host "- $_" }
    Write-Host "🚀 Running vitest only on these files..."
    # Führe vitest NUR für die gefundenen Dateien aus.
    # PowerShell übergibt die Array-Elemente als separate Argumente an npx.
    npx vitest $onlyFiles --typecheck --coverage --watch=false --disable-console-intercept --testTimeout=300000
} 