#!/usr/bin/env pwsh
# ──────────────────────────────────────────────────────────────────────────────
# Backup Script — Auto Parts Platform
# Backs up: SQLite database + media files (360° videos, thumbnails)
# Run manually or schedule with Task Scheduler
# Usage: .\backup.ps1
# ──────────────────────────────────────────────────────────────────────────────

$timestamp  = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupDir  = ".\backups\$timestamp"
$apiDir     = ".\apps\api"

New-Item -ItemType Directory -Force $backupDir | Out-Null

# 1. SQLite database
$dbSource = "$apiDir\db.sqlite3"
if (Test-Path $dbSource) {
    Copy-Item $dbSource "$backupDir\db.sqlite3"
    Write-Host "[OK] Database backed up"
} else {
    Write-Host "[SKIP] No database found"
}

# 2. Media files (360° videos + thumbnails)
$mediaSource = "$apiDir\media"
if (Test-Path $mediaSource) {
    Copy-Item $mediaSource "$backupDir\media" -Recurse
    Write-Host "[OK] Media files backed up"
} else {
    Write-Host "[SKIP] No media directory found"
}

# 3. Zip the backup
$zipPath = ".\backups\backup_$timestamp.zip"
Compress-Archive -Path "$backupDir\*" -DestinationPath $zipPath -Force
Remove-Item $backupDir -Recurse -Force

# 4. Keep only last 10 backups
$allBackups = Get-ChildItem ".\backups\*.zip" | Sort-Object LastWriteTime -Descending
if ($allBackups.Count -gt 10) {
    $allBackups | Select-Object -Skip 10 | Remove-Item -Force
    Write-Host "[OK] Old backups pruned (kept last 10)"
}

$size = [Math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host ""
Write-Host "Backup complete: $zipPath ($size MB)"
Write-Host "All backups:"
Get-ChildItem ".\backups\*.zip" | Select-Object Name, @{N='MB';E={[Math]::Round($_.Length/1MB,2)}}
