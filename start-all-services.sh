#!/bin/bash

echo "🚀 Starting E-commerce Platform Services..."
echo ""

# Function to start a service and check if it's running
start_service() {
    local service_dir=$1
    local service_name=$2
    local port=$3
    
    echo "📦 Starting $service_name..."
    cd "$service_dir"
    nohup npm start > "../logs/$service_name.log" 2>&1 &
    local pid=$!
    echo $pid > "../logs/$service_name.pid"
    cd - > /dev/null
    
    # Wait a moment for service to start
    sleep 3
    
    # Check if service is responding
    for i in {1..10}; do
        if curl -s "http://localhost:$port/health" > /dev/null 2>&1; then
            echo "✅ $service_name is running on port $port"
            return 0
        fi
        echo "⏳ Waiting for $service_name... ($i/10)"
        sleep 2
    done
    
    echo "❌ $service_name failed to start"
    return 1
}

# Create logs directory
mkdir -p logs

echo "🔧 Starting backend services..."

# Start services in order
start_service "services/auth-service" "Auth Service" "5001"
start_service "services/products-service" "Products Service" "5002"
start_service "services/cart-service" "Cart Service" "5003"
start_service "services/orders-service" "Orders Service" "5004"

echo ""
echo "🌐 Starting API Gateway..."
start_service "api-gateway" "API Gateway" "8000"

echo ""
echo "🎨 Starting Frontend..."
cd frontend
nohup npm start > "../logs/frontend.log" 2>&1 &
echo $! > "../logs/frontend.pid"
cd ..

# Wait for frontend to be ready
echo "⏳ Waiting for frontend to compile..."
sleep 15

echo ""
echo "✅ All services started!"
echo ""
echo "🌐 Your application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API Gateway: http://localhost:8000"
echo ""
echo "📊 Service Status:"
curl -s http://localhost:5001/health && echo " ✅ Auth Service"
curl -s http://localhost:5002/health && echo " ✅ Products Service"
curl -s http://localhost:5003/health && echo " ✅ Cart Service"
curl -s http://localhost:5004/health && echo " ✅ Orders Service"
curl -s http://localhost:8000/health && echo " ✅ API Gateway"

echo ""
echo "📝 Logs are available in the 'logs' directory"
echo "🛑 To stop all services, run: ./stop-all-services.sh" 