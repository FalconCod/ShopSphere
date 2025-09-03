#!/bin/bash

# Quick startup script for ElectroMart on macOS
echo "🚀 Starting ElectroMart E-commerce Platform..."
echo ""

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to start a service in background
start_service() {
    local dir=$1
    local name=$2
    local port=$3
    
    echo -e "${BLUE}📦 Starting $name on port $port...${NC}"
    cd "$dir"
    nohup npm start > /dev/null 2>&1 &
    echo $! >> ../service_pids.txt
    cd - > /dev/null
    sleep 2
}

# Create PID file
echo "" > service_pids.txt

echo -e "${YELLOW}🔧 Starting backend services...${NC}"

# Start all services
start_service "services/auth-service" "Auth Service" "5001"
start_service "services/products-service" "Products Service" "5002" 
start_service "services/cart-service" "Cart Service" "5003"
start_service "services/orders-service" "Orders Service" "5004"
start_service "api-gateway" "API Gateway" "8000"

echo -e "${YELLOW}🎨 Starting frontend...${NC}"
cd frontend
nohup npm start > /dev/null 2>&1 &
echo $! >> ../service_pids.txt
cd ..

echo ""
echo -e "${GREEN}✅ All services starting up...${NC}"
echo ""
echo -e "${BLUE}🌐 Your application will be available at:${NC}"
echo -e "${GREEN}   Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}   API Gateway: http://localhost:8000${NC}"
echo ""
echo "⏳ Please wait 30-60 seconds for all services to fully start..."
echo ""
echo -e "${YELLOW}💡 To stop all services, run: ./stop-emart.sh${NC}"
echo ""

# Create stop script
cat > stop-emart.sh << 'EOF'
#!/bin/bash

echo "🛑 Stopping ElectroMart services..."

if [ -f "service_pids.txt" ]; then
    while IFS= read -r pid; do
        if [ ! -z "$pid" ] && ps -p "$pid" > /dev/null 2>&1; then
            kill "$pid" 2>/dev/null
            echo "Stopped process $pid"
        fi
    done < service_pids.txt
    rm service_pids.txt
    echo "✅ All services stopped!"
else
    echo "No PID file found. Trying alternative method..."
    pkill -f "npm start"
    echo "✅ Services stopped!"
fi
EOF

chmod +x stop-emart.sh

echo -e "${GREEN}🎉 ElectroMart is starting up! Check the URLs above in 30-60 seconds.${NC}"
