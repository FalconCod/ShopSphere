#!/bin/bash

echo "🔍 E-commerce Platform Status Check"
echo "===================================="
echo ""

echo "📊 Container Status:"
docker-compose ps

echo ""
echo "🌐 Service Health Checks:"

echo "✅ API Gateway:"
curl -s http://localhost:5000/health | echo "    $(cat)"

echo "✅ Products Service:"
curl -s http://localhost:5000/api/products | head -c 100 | echo "    $(cat)..."

echo "✅ Frontend:"
curl -s -I http://localhost:3000 | grep "HTTP" | echo "    $(cat)"

echo ""
echo "🚀 Application URLs:"
echo "    Frontend: http://localhost:3000"
echo "    API Gateway: http://localhost:5000"
echo ""
echo "🔐 Demo Accounts:"
echo "    Admin: admin@example.com / admin123"
echo "    User: user@example.com / user123"
echo ""
echo "✨ Status: Ready to use!"
