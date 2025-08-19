#!/bin/bash

echo "🛑 Stopping E-commerce Platform Services..."
echo ""

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="logs/$service_name.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            kill "$pid" 2>/dev/null
            echo "✅ Stopped $service_name (PID: $pid)"
        else
            echo "⚠️  $service_name was not running"
        fi
        rm -f "$pid_file"
    else
        echo "⚠️  No PID file found for $service_name"
    fi
}

# Stop all services
stop_service "Auth Service"
stop_service "Products Service" 
stop_service "Cart Service"
stop_service "Orders Service"
stop_service "API Gateway"
stop_service "frontend"

# Also kill any remaining npm/node processes
echo ""
echo "🧹 Cleaning up any remaining processes..."
pkill -f "npm start" 2>/dev/null
pkill -f "node src/index.js" 2>/dev/null

echo ""
echo "✅ All services stopped!"
echo "" 