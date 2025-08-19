#!/bin/bash

echo "🧪 Testing E-commerce Platform Setup..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to test service health
test_service() {
    local service_name=$1
    local port=$2
    local endpoint=${3:-"health"}
    
    echo -e "${CYAN}Testing $service_name on port $port...${NC}"
    
    # Wait for service to be ready
    for i in {1..30}; do
        if curl -s "http://localhost:$port/$endpoint" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is running and healthy${NC}"
            return 0
        fi
        echo -e "${YELLOW}⏳ Waiting for $service_name... (attempt $i/30)${NC}"
        sleep 2
    done
    
    echo -e "${RED}❌ $service_name failed to start or is not healthy${NC}"
    return 1
}

# Function to test MongoDB connection
test_mongodb() {
    echo -e "${CYAN}Testing MongoDB connection...${NC}"
    
    # Try to connect to MongoDB using Node.js
    cat > test_mongo.js << 'EOF'
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://pranaycursor:pranay@cluster0.8ir3qb9.mongodb.net/test-db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Timeout after 10 seconds
setTimeout(() => {
  console.error('❌ MongoDB connection timeout');
  process.exit(1);
}, 10000);
EOF

    cd services/auth-service
    if node ../../test_mongo.js; then
        echo -e "${GREEN}✅ MongoDB connection is working${NC}"
        cd ../..
        rm test_mongo.js
        return 0
    else
        echo -e "${RED}❌ MongoDB connection failed${NC}"
        cd ../..
        rm test_mongo.js
        return 1
    fi
}

# Check if Node.js and npm are available
echo -e "${CYAN}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) is installed${NC}"
echo -e "${GREEN}✅ npm $(npm --version) is installed${NC}"
echo ""

# Test MongoDB connection first
test_mongodb
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ MongoDB test failed. Please check your connection string and credentials.${NC}"
    exit 1
fi
echo ""

# Test all services
echo -e "${YELLOW}Testing all services...${NC}"
echo ""

test_service "Auth Service" "5001"
test_service "Products Service" "5002"
test_service "Cart Service" "5003"
test_service "Orders Service" "5004"
test_service "API Gateway" "8000"

# Test frontend
echo -e "${CYAN}Testing Frontend on port 3000...${NC}"
for i in {1..30}; do
    if curl -s "http://localhost:3000" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend is running${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Frontend failed to start${NC}"
    else
        echo -e "${YELLOW}⏳ Waiting for Frontend... (attempt $i/30)${NC}"
        sleep 2
    fi
done

echo ""
echo -e "${GREEN}🎉 Setup test completed!${NC}"
echo ""
echo -e "${CYAN}📱 Frontend: http://localhost:3000${NC}"
echo -e "${CYAN}🔗 API Gateway: http://localhost:8000${NC}"
echo -e "${CYAN}🔐 Auth Service: http://localhost:5001/health${NC}"
echo -e "${CYAN}📦 Products Service: http://localhost:5002/health${NC}"
echo -e "${CYAN}🛒 Cart Service: http://localhost:5003/health${NC}"
echo -e "${CYAN}📋 Orders Service: http://localhost:5004/health${NC}" 