# E-commerce Platform Startup Script for Windows PowerShell

Write-Host "🚀 Starting E-commerce Platform..." -ForegroundColor Green
Write-Host ""

# Function to install dependencies
function Install-Dependencies {
    param($ServicePath, $ServiceName)
    
    Write-Host "📦 Installing dependencies for $ServiceName..." -ForegroundColor Yellow
    Set-Location $ServicePath
    npm install
    Set-Location $PSScriptRoot
}

# Install dependencies for all services
Install-Dependencies "api-gateway" "API Gateway"
Install-Dependencies "services\auth-service" "Auth Service"
Install-Dependencies "services\products-service" "Products Service"
Install-Dependencies "services\cart-service" "Cart Service"
Install-Dependencies "services\orders-service" "Orders Service"
Install-Dependencies "frontend" "Frontend"

Write-Host "✅ All dependencies installed!" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Starting services..." -ForegroundColor Cyan

# Start all services in separate windows
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\services\auth-service'; npm start" -WindowStyle Normal
Start-Sleep 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\services\products-service'; npm start" -WindowStyle Normal
Start-Sleep 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\services\cart-service'; npm start" -WindowStyle Normal
Start-Sleep 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\services\orders-service'; npm start" -WindowStyle Normal
Start-Sleep 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\api-gateway'; npm start" -WindowStyle Normal
Start-Sleep 5

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "🌐 Services are starting up..." -ForegroundColor Green
Write-Host "📱 Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔗 API Gateway will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Each service will open in a separate PowerShell window." -ForegroundColor Yellow
Write-Host "💡 Wait for all services to start before accessing the frontend." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to continue"