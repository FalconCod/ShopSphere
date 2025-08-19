# E-commerce Platform - macOS Setup Guide

## 🚀 Quick Start for macOS

This guide will help you set up and run the E-commerce Platform on macOS.

### Prerequisites

- **Node.js** (v16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (already configured with your credentials)

### 🎯 One-Command Setup

Run this single command to install dependencies and start all services:

```bash
./start-ecommerce-mac.sh
```

This script will:
- ✅ Check Node.js and npm installation
- 📦 Install dependencies for all services
- 🚀 Start all microservices in the background
- 🌐 Launch the React frontend
- 📊 Display service URLs

### 🔧 Manual Setup (Alternative)

If you prefer to set up manually:

1. **Install dependencies for all services:**
   ```bash
   ./run-dev.sh
   ```

2. **Start services individually:**
   ```bash
   # Terminal 1 - Auth Service
   cd services/auth-service && npm start
   
   # Terminal 2 - Products Service
   cd services/products-service && npm start
   
   # Terminal 3 - Cart Service
   cd services/cart-service && npm start
   
   # Terminal 4 - Orders Service
   cd services/orders-service && npm start
   
   # Terminal 5 - API Gateway
   cd api-gateway && npm start
   
   # Terminal 6 - Frontend
   cd frontend && npm start
   ```

### 🌐 Service URLs

Once running, access these URLs:

- **Frontend (React App):** http://localhost:3000
- **API Gateway:** http://localhost:8000
- **Auth Service:** http://localhost:5001
- **Products Service:** http://localhost:5002
- **Cart Service:** http://localhost:5003
- **Orders Service:** http://localhost:5004

### 🛑 Stopping Services

To stop all services:

```bash
./stop-ecommerce-mac.sh
```

Or manually:
```bash
pkill -f "npm start"
```

### 🧪 Testing the Setup

Run the test script to verify everything is working:

```bash
./test-setup.sh
```

This will:
- ✅ Test MongoDB connection
- ✅ Verify all services are running
- ✅ Check API Gateway routing
- ✅ Confirm frontend accessibility

### 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │
│   (React)       │◄──►│   (Port 8000)   │
│   Port 3000     │    └─────────────────┘
└─────────────────┘              │
                                 ▼
                    ┌─────────────────────────────┐
                    │      Microservices         │
                    ├─────────────────────────────┤
                    │ Auth Service    │ Port 5001 │
                    │ Products Service│ Port 5002 │
                    │ Cart Service    │ Port 5003 │
                    │ Orders Service  │ Port 5004 │
                    └─────────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────┐
                    │      MongoDB Atlas         │
                    │   (Cloud Database)         │
                    └─────────────────────────────┘
```

### 🔐 Database Configuration

The application is configured to use MongoDB Atlas with these databases:
- `auth-db` - User authentication data
- `products-db` - Product catalog
- `cart-db` - Shopping cart data
- `orders-db` - Order management

Connection string: `mongodb+srv://pranaycursor:pranay@cluster0.8ir3qb9.mongodb.net/`

### 🚀 Features

- **User Authentication** - Register/Login with JWT tokens
- **Product Management** - Browse and manage products
- **Shopping Cart** - Add/remove items, update quantities
- **Order Processing** - Place orders with COD and online payment options
- **Admin Dashboard** - Manage products and orders (admin users)

### 🔧 Development Notes

#### Port Configuration
- API Gateway uses port 8000 (changed from 5000 to avoid macOS Control Center conflict)
- All services use localhost URLs in development mode
- Docker Compose still available for containerized deployment

#### Environment Variables
Services will use environment variables if available, otherwise fall back to defaults:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)

### 🐳 Docker Alternative

For containerized deployment:

```bash
docker-compose up --build
```

This will:
- Build all service images
- Start services in containers
- Use Docker networking
- Frontend available at http://localhost:3000

### 📝 Sample Users

The application seeds with sample products. You can register new users or create admin users by registering with role "admin".

### 🔍 Troubleshooting

**Port 5000 in use:**
- macOS Control Center uses port 5000
- API Gateway now uses port 8000
- Update any hardcoded references if needed

**MongoDB Connection Issues:**
- Check internet connection
- Verify credentials in connection string
- Ensure MongoDB Atlas cluster is running

**Service Won't Start:**
- Check if port is already in use: `lsof -i :PORT_NUMBER`
- Verify Node.js and npm are installed
- Check service logs for specific errors

**Frontend Build Issues:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check for port conflicts

### 📧 Support

If you encounter issues:
1. Run `./test-setup.sh` to diagnose problems
2. Check service health endpoints
3. Review console logs for errors
4. Ensure all dependencies are installed

### 🎉 Success!

If all services show green checkmarks in the test script, your E-commerce Platform is ready to use!

Navigate to http://localhost:3000 to start shopping! 🛒 