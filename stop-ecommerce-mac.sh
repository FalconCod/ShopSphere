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
