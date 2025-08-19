#!/bin/bash

echo "🚀 Starting E-commerce Platform in Development Mode..."
echo "📋 Installing dependencies for all services..."

# Install dependencies for all services
echo "Installing API Gateway dependencies..."
cd api-gateway && npm install && cd ..

echo "Installing Auth Service dependencies..."
cd services/auth-service && npm install && cd ../..

echo "Installing Products Service dependencies..."
cd services/products-service && npm install && cd ../..

echo "Installing Cart Service dependencies..."
cd services/cart-service && npm install && cd ../..

echo "Installing Orders Service dependencies..."
cd services/orders-service && npm install && cd ../..

echo "Installing Frontend dependencies..."
cd frontend && npm install && cd ..

echo "✅ All dependencies installed!"
echo ""
echo "🎯 To start the services manually on macOS:"
echo "1. Start Auth Service: cd services/auth-service && npm start"
echo "2. Start Products Service: cd services/products-service && npm start"
echo "3. Start Cart Service: cd services/cart-service && npm start"
echo "4. Start Orders Service: cd services/orders-service && npm start"
echo "5. Start API Gateway: cd api-gateway && npm start"
echo "6. Start Frontend: cd frontend && npm start"
echo ""
echo "💡 Or use './start-ecommerce-mac.sh' for automated startup on macOS"
echo "💡 Or use 'docker-compose up --build' for Docker deployment"
