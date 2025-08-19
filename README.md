# E-commerce Platform with Microservices

This project is a full-stack e-commerce electronics marketplace built with a microservices architecture using React, Node.js, MongoDB, and Docker.

## Features

* Microservices for Products, Cart, Users, and Orders.
* Secure authentication using JSON Web Tokens (JWT).
* Admin dashboard for product management.
* Containerized services using Docker for scalability and isolation.

## Prerequisites

* Docker
* Docker Compose

## How to Run

1.  Ensure Docker is running on your machine.
2.  Open your terminal in the project root directory.
3.  Make the run script executable:
    ```bash
    chmod +x run-app.sh
    ```
4.  Execute the script to start the application:
    ```bash
    ./run-app.sh
    ```
5.  Once all services are running:
    * The **website** will be available at `http://localhost:3000`.
    * The **API Gateway** will be available at `http://localhost:5000`.

## Services

| Service          | Port (Container) | URL via Gateway            |
| ---------------- | ---------------- | -------------------------- |
| Frontend         | 80               | `http://localhost:3000`    |
| API Gateway      | 5000             | `http://localhost:5000`    |
| Auth Service     | 5001             | `/api/auth`                |
| Products Service | 5002             | `/api/products`            |
| Cart Service     | 5003             | `/api/cart`                |
| Orders Service   | 5004             | `/api/orders`              |

## Customer-Facing Features

### User Accounts
Customers can register for a new account or log in to an existing one. The system uses secure JWT authentication.

### Browse Products
Users can view all available electronics on a dedicated products page.

### Product Details
They can click on any product to see a detailed view with its description, price, and category.

### Shopping Cart
Customers can add items to their shopping cart, view the cart's contents, and adjust the quantity of items or remove them.

### Secure Checkout
A full checkout process allows users to enter their shipping address and complete the purchase using the integrated Razorpay payment gateway.

### Order History
Logged-in users can view a history of their past orders.

## Admin-Specific Features

### Admin Dashboard
A special, protected dashboard is available only to users with an "admin" role.

### Product Management
From the dashboard, an admin can:
- Add new products to the store.
- Edit the details of existing products.
- Delete products from the store.

## Technical & Architectural Features

### Microservices Architecture
The entire backend is broken down into independent services for authentication, products, cart, and orders, which makes the system scalable and easier to maintain.

### Containerization
The entire application (all backend services and the frontend) is containerized with Docker, allowing it to run consistently in any environment.

### API Gateway
A single, managed entry point handles all incoming requests and routes them to the correct service, which enhances security and simplifies the frontend logic.

## Demo Credentials

For testing purposes, you can use these demo accounts:

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**Regular User Account:**
- Email: user@example.com
- Password: user123

*Note: These accounts will be automatically created when you first register with these credentials.*

## Architecture Overview

```
Frontend (React) → API Gateway → Microservices → MongoDB
     ↓                ↓              ↓
Port 3000        Port 5000     Ports 5001-5004
```

### API Endpoints

#### Authentication Service (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

#### Products Service (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

#### Cart Service (`/api/cart`)
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `POST /api/cart/:userId/remove` - Remove item from cart
- `POST /api/cart/:userId/update` - Update item quantity

#### Orders Service (`/api/orders`)
- `POST /api/orders/create` - Create new order
- `POST /api/orders/verify-payment` - Verify Razorpay payment
- `GET /api/orders/:userId` - Get user's orders

## Development

### Project Structure
```
/ecommerce-platform
├── api-gateway/          # API Gateway service
├── services/
│   ├── auth-service/     # Authentication service
│   ├── products-service/ # Products management service
│   ├── cart-service/     # Shopping cart service
│   └── orders-service/   # Orders and payments service
├── frontend/             # React frontend application
├── docker-compose.yml    # Docker orchestration
├── run-app.sh           # Startup script
└── README.md            # This file
```

### Environment Variables

The application uses the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `RAZORPAY_KEY_ID`: Razorpay API key (for payments)
- `RAZORPAY_KEY_SECRET`: Razorpay API secret

### Database

Each microservice uses its own MongoDB database:
- `auth-db`: User authentication data
- `products-db`: Product catalog
- `cart-db`: Shopping cart data
- `orders-db`: Order and payment information

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 5000-5004 are not in use
2. **Docker memory**: Ensure Docker has sufficient memory allocated
3. **MongoDB connection**: Check if the MongoDB URI is accessible

### Logs

To view logs for a specific service:
```bash
docker-compose logs [service-name]
```

Example:
```bash
docker-compose logs frontend
docker-compose logs auth-service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the changes
5. Submit a pull request

## License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Note**: This is a demonstration project. For production use, please ensure to:
- Use secure environment variables
- Implement proper error handling
- Add comprehensive testing
- Set up monitoring and logging
- Configure proper security headers
- Use production-ready database configurations
# E-Commerce-webapp
