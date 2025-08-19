#!/bin/bash

# E-commerce Platform Startup Script for macOS
echo "🚀 Starting E-commerce Platform on macOS..."
echo ""

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to install dependencies
install_dependencies() {
    local service_path=$1
    local service_name=$2
    
    echo -e "${YELLOW}📦 Installing dependencies for $service_name...${NC}"
    cd "$service_path"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $service_name dependencies installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install $service_name dependencies${NC}"
        exit 1
    fi
    cd - > /dev/null
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${CYAN}Node.js version: $(node --version)${NC}"
echo -e "${CYAN}npm version: $(npm --version)${NC}"
echo ""

# Install dependencies for all services
echo -e "${YELLOW}📋 Installing dependencies for all services...${NC}"
echo ""

install_dependencies "api-gateway" "API Gateway"
install_dependencies "services/auth-service" "Auth Service"
install_dependencies "services/products-service" "Products Service"
install_dependencies "services/cart-service" "Cart Service"
install_dependencies "services/orders-service" "Orders Service"
install_dependencies "frontend" "Frontend"

echo ""
echo -e "${GREEN}✅ All dependencies installed successfully!${NC}"
echo ""

# Function to start service in background
start_service() {
    local service_path=$1
    local service_name=$2
    local port=$3
    
    echo -e "${CYAN}🎯 Starting $service_name on port $port...${NC}"
    cd "$service_path"
    npm start &
    local pid=$!
    echo "$pid" >> ../pids.txt
    cd - > /dev/null
    sleep 3
}

# Create/clear PID file for tracking processes
echo "" > pids.txt

echo -e "${CYAN}🎯 Starting all services...${NC}"
echo ""

# Start services in order
start_service "services/auth-service" "Auth Service" "5001"
start_service "services/products-service" "Products Service" "5002"
start_service "services/cart-service" "Cart Service" "5003"
start_service "services/orders-service" "Orders Service" "5004"
start_service "api-gateway" "API Gateway" "8000"

echo -e "${CYAN}🎯 Starting Frontend...${NC}"
cd frontend
npm start &
echo $! >> ../pids.txt
cd - > /dev/null

echo ""
echo -e "${GREEN}🌐 Services are starting up...${NC}"
echo -e "${CYAN}📱 Frontend will be available at: http://localhost:3000${NC}"
echo -e "${CYAN}🔗 API Gateway will be available at: http://localhost:8000${NC}"
echo ""
echo -e "${YELLOW}💡 All services are running in the background.${NC}"
echo -e "${YELLOW}💡 Wait for all services to start before accessing the frontend.${NC}"
echo -e "${YELLOW}💡 Use './stop-ecommerce-mac.sh' to stop all services.${NC}"
echo ""
echo -e "${GREEN}🎉 E-commerce platform started successfully!${NC}"
echo ""

# Create stop script
cat > stop-ecommerce-mac.sh << 'EOF'
#!/bin/bash

echo "🛑 Stopping E-commerce Platform..."

if [ -f "pids.txt" ]; then
    while IFS= read -r pid; do
        if [ ! -z "$pid" ] && ps -p "$pid" > /dev/null 2>&1; then
            kill "$pid" 2>/dev/null
            echo "Stopped process $pid"
        fi
    done < pids.txt
    rm pids.txt
else
    echo "No PID file found. Trying to kill processes by name..."
    pkill -f "npm start"
    pkill -f "node.*auth-service"
    pkill -f "node.*products-service"
    pkill -f "node.*cart-service"
    pkill -f "node.*orders-service"
    pkill -f "node.*api-gateway"
fi

echo "✅ All services stopped!"
EOF

chmod +x stop-ecommerce-mac.sh

echo "Press Ctrl+C to stop monitoring, or run './stop-ecommerce-mac.sh' to stop all services."

# Keep script running to monitor
while true; do
    sleep 10
done 