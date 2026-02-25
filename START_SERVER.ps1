# Quick script to start the dev server
# Run this: .\START_SERVER.ps1

# Add Node.js to PATH for this session
$env:Path += ";C:\Program Files\nodejs"

# Verify Node.js is available
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Start the dev server
Write-Host "`nStarting dev server..." -ForegroundColor Yellow
Write-Host "Visit http://localhost:3000 when ready`n" -ForegroundColor Cyan

npm run dev
