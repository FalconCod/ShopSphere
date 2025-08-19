#!/bin/bash

echo "🚀 Starting E-commerce Platform..."
echo ""

# Start all services in background
cd services/auth-service && npm start &
sleep 3

cd ../products-service && npm start &
sleep 3

cd ../cart-service && npm start &
sleep 3

cd ../orders-service && npm start &
sleep 3

cd ../../api-gateway && npm start &
sleep 5

cd ../frontend && npm start &

echo ""
echo "✅ All services started!"
echo ""
echo "🌐 Your application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   API Gateway: http://localhost:8000"
echo ""
echo "💡 To stop all services, run: pkill -f 'npm start'"
echo ""

# Keep script running
wait 