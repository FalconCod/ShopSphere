# ShopSphere - E-Commerce Platform

A modern, full-stack e-commerce platform built with microservices architecture using React, Node.js, Express, MongoDB, and Docker. This platform provides a complete online shopping experience with admin management capabilities.

## 🚀 Features

### Customer Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Product Browsing**: Browse electronics catalog with search and filtering
- **Product Details**: Detailed product views with descriptions, pricing, and specifications
- **Shopping Cart**: Add, remove, and modify items in cart
- **Secure Checkout**: Complete purchase flow with address management
- **Order History**: View past orders and order status
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Admin Dashboard**: Protected admin panel for store management
- **Product Management**: Add, edit, and delete products from catalog
- **Order Management**: View and manage customer orders
- **User Management**: Monitor user accounts and activities

### Technical Features
- **Microservices Architecture**: Scalable, independent services
- **API Gateway**: Centralized request routing and management
- **Docker Support**: Containerized deployment for consistency
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Real-time Updates**: Live cart and order status updates

## 🏗️ Architecture

```
Frontend (React) → API Gateway → Microservices → MongoDB
     ↓                ↓              ↓
Port 3000        Port 5000     Ports 5001-5004
```

### Services Overview

| Service          | Port | Description                    | Database    |
|------------------|------|--------------------------------|-------------|
| Frontend         | 3000 | React application              | -           |
| API Gateway      | 5000 | Request routing & authentication| -           |
| Auth Service     | 5001 | User authentication & management| auth-db     |
| Products Service | 5002 | Product catalog management     | products-db |
| Cart Service     | 5003 | Shopping cart operations       | cart-db     |
| Orders Service   | 5004 | Order processing & management  | orders-db   |

## 📁 Project Structure

```
emart/
├── api-gateway/              # API Gateway service
│   ├── src/
│   │   └── index.js         # Gateway routing logic
│   ├── package.json
│   └── Dockerfile
├── services/
│   ├── auth-service/        # Authentication service
│   │   ├── src/
│   │   │   ├── index.js     # Auth endpoints
│   │   │   └── models/User.js
│   │   └── package.json
│   ├── products-service/    # Products management
│   │   ├── src/
│   │   │   ├── index.js     # Product endpoints
│   │   │   ├── models/Product.js
│   │   │   └── seedProducts.js
│   │   └── package.json
│   ├── cart-service/        # Shopping cart service
│   │   ├── src/
│   │   │   ├── index.js     # Cart endpoints
│   │   │   └── models/Cart.js
│   │   └── package.json
│   └── orders-service/      # Order management
│       ├── src/
│       │   ├── index.js     # Order endpoints
│       │   └── models/Order.js
│       └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/         # React context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/           # Application pages
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   ├── OrdersPage.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docker-compose.yml       # Docker orchestration
├── package.json            # Root dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (or MongoDB Atlas account)
- Docker (optional, for containerized deployment)

### Option 1: Quick Start Script (Recommended)
```bash
chmod +x start-emart-quick.sh
./start-emart-quick.sh
```

### Option 2: Docker Compose
```bash
docker-compose up --build
```

### Option 3: Manual Setup

#### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install API Gateway dependencies
cd api-gateway
npm install
cd ..

# Install service dependencies
cd services/auth-service && npm install && cd ../..
cd services/products-service && npm install && cd ../..
cd services/cart-service && npm install && cd ../..
cd services/orders-service && npm install && cd ../..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

#### 2. Environment Setup
Create `.env` files in each service directory with appropriate environment variables:

```env
# Example .env for services
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-jwt-secret-key
PORT=5001
```

#### 3. Start Services
```bash
# Start all services using the development script
chmod +x run-dev.sh
./run-dev.sh
```

**Or start services individually:**

```bash
# Terminal 1 - API Gateway
cd api-gateway && npm start

# Terminal 2 - Auth Service
cd services/auth-service && npm start

# Terminal 3 - Products Service
cd services/products-service && npm start

# Terminal 4 - Cart Service
cd services/cart-service && npm start

# Terminal 5 - Orders Service
cd services/orders-service && npm start

# Terminal 6 - Frontend
cd frontend && npm start
```

## 🌐 Access Points

After starting the services:

- **Frontend Application**: http://localhost:3000
- **API Gateway**: http://localhost:5000
- **Individual Services**: http://localhost:5001-5004

## 🔑 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Products (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart (`/api/cart`)
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `POST /api/cart/:userId/remove` - Remove item from cart
- `POST /api/cart/:userId/update` - Update item quantity

### Orders (`/api/orders`)
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/admin/all` - Get all orders (Admin only)

## 👥 Test Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

### Regular User Account
- **Email**: user@example.com
- **Password**: user123

*Note: These accounts are created automatically when you first register with these credentials.*

## 🛠️ Development Commands

### Check Service Status
```bash
chmod +x check-status.sh
./check-status.sh
```

### Stop All Services
```bash
chmod +x stop-all-services.sh
./stop-all-services.sh
```

### View Logs
```bash
# Docker logs
docker-compose logs [service-name]

# Individual service logs
tail -f logs/[service-name].log
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :5000-5004
   
   # Kill processes if needed
   kill -9 $(lsof -ti:3000)
   ```

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running locally or update connection strings
   - Check network connectivity for MongoDB Atlas

3. **Service Not Starting**
   - Check if all dependencies are installed
   - Verify environment variables are set
   - Check service logs for specific errors

### Environment Variables

Each service requires specific environment variables:

```env
# Auth Service
MONGODB_URI=mongodb://localhost:27017/auth-db
JWT_SECRET=your-secret-key
PORT=5001

# Products Service
MONGODB_URI=mongodb://localhost:27017/products-db
PORT=5002

# Cart Service
MONGODB_URI=mongodb://localhost:27017/cart-db
PORT=5003

# Orders Service
MONGODB_URI=mongodb://localhost:27017/orders-db
PORT=5004
```

## 🧪 Testing

### Manual Testing
1. Register a new user account
2. Browse products and add items to cart
3. Complete checkout process
4. View order history
5. Test admin functionality with admin credentials

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## 🚀 Deployment

### Production Deployment
1. Set up production MongoDB database
2. Configure environment variables for production
3. Build and deploy Docker containers
4. Set up reverse proxy (nginx)
5. Configure SSL certificates

### Docker Production
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core e-commerce functionality
- **v1.1.0** - Enhanced UI and admin dashboard
- **v1.2.0** - Added Docker support and improved architecture

---

**Built with ❤️ using React, Node.js, Express, MongoDB, and Docker**