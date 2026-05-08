# ============================================================
#  deploy-media.ps1  —  Upload large media files to Hostinger VPS
#  Run once after initial VPS setup, and again only when videos change.
#
#  Prerequisites (Windows):
#    - OpenSSH installed  (Settings > Apps > Optional Features > OpenSSH Client)
#    - OR PuTTY pscp.exe on PATH
#
#  Usage:
#    .\deploy-media.ps1 -Host "YOUR_VPS_IP" -User "root" -AppPath "/var/www/transmission"
# ============================================================

param(
    [Parameter(Mandatory)][string]$VpsHost,   # e.g. "123.456.78.90"
    [Parameter(Mandatory)][string]$User,      # e.g. "root"
    [string]$AppPath = "/var/www/transmission" # deployment root on VPS
)

$ErrorActionPreference = "Stop"
$local = $PSScriptRoot   # repo root

Write-Host "`n==> Transmission Media Deploy to $User@$VpsHost" -ForegroundColor Cyan
Write-Host "    Local root : $local"
Write-Host "    Remote root: $AppPath`n"

# ── Helper: SCP upload ────────────────────────────────────────────────────────
function Upload($localFile, $remoteDest) {
    if (-not (Test-Path $localFile)) {
        Write-Warning "  SKIP (not found): $localFile"
        return
    }
    $sizeMB = [math]::Round((Get-Item $localFile).Length / 1MB, 1)
    Write-Host "  Uploading ($($sizeMB) MB): $(Split-Path $localFile -Leaf)" -ForegroundColor Yellow

    # Create remote directory first
    ssh "$User@$VpsHost" "mkdir -p $remoteDest"

    # SCP the file
    scp -C "$localFile" "$User@${VpsHost}:$remoteDest/"
    Write-Host "  Done: $remoteDest/$(Split-Path $localFile -Leaf)" -ForegroundColor Green
}

# ── 1. Next.js public videos (served by Nginx as static assets) ──────────────
Write-Host "[1/2] Uploading Next.js public videos..." -ForegroundColor Cyan

Upload "$local\apps\web\public\videos\engine.mp4"              "$AppPath/apps/web/public/videos"
Upload "$local\apps\web\public\videos\gearbox.mp4"             "$AppPath/apps/web/public/videos"
Upload "$local\apps\web\public\videos\360\mercedes-benz-car.mp4"   "$AppPath/apps/web/public/videos/360"
Upload "$local\apps\web\public\videos\360\transmission-part.mp4"   "$AppPath/apps/web/public/videos/360"

# ── 2. Django media uploads (served by Nginx /media/ route) ──────────────────
Write-Host "`n[2/2] Uploading Django media files..." -ForegroundColor Cyan

Upload "$local\apps\api\media\360\parts\transmission-360.mp4"           "$AppPath/apps/api/media/360/parts"
Upload "$local\apps\api\media\360\parts\transmission-part.mp4"           "$AppPath/apps/api/media/360/parts"
Upload "$local\apps\api\media\360\vehicles\mercedes-benz-amg-gt-coupe.mp4"  "$AppPath/apps/api/media/360/vehicles"

# ── Done ─────────────────────────────────────────────────────────────────────
Write-Host "`n✅  All media files uploaded successfully!" -ForegroundColor Green
Write-Host "    Videos are served by Nginx — no app restart needed.`n"
