@echo off
echo 🚀 Starting E-commerce Platform Services...
echo.

echo 📋 Installing dependencies...
echo.

echo Installing API Gateway dependencies...
cd api-gateway
call npm install
cd ..

echo Installing Auth Service dependencies...
cd services\auth-service
call npm install
cd ..\..

echo Installing Products Service dependencies...
cd services\products-service
call npm install
cd ..\..

echo Installing Cart Service dependencies...
cd services\cart-service
call npm install
cd ..\..

echo Installing Orders Service dependencies...
cd services\orders-service
call npm install
cd ..\..

echo Installing Frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ✅ Dependencies installed!
echo.
echo 🎯 Starting all services...
echo.

start "Auth Service" cmd /k "cd services\auth-service && npm start"
timeout /t 3 /nobreak >nul

start "Products Service" cmd /k "cd services\products-service && npm start"
timeout /t 3 /nobreak >nul

start "Cart Service" cmd /k "cd services\cart-service && npm start"
timeout /t 3 /nobreak >nul

start "Orders Service" cmd /k "cd services\orders-service && npm start"
timeout /t 3 /nobreak >nul

start "API Gateway" cmd /k "cd api-gateway && npm start"
timeout /t 5 /nobreak >nul

start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo 🌐 Services are starting...
echo 📱 Frontend will be available at: http://localhost:3000
echo 🔗 API Gateway will be available at: http://localhost:5000
echo.
echo Press any key to exit...
pause >nul
