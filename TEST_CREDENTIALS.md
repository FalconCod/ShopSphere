# 🔐 Test User Credentials

## Ready-to-Use Test Accounts

### 👤 Regular User Account
- **Email:** `user@example.com`
- **Password:** `user123`
- **Role:** User
- **Features:** Can browse products, add to cart, place orders

### 👑 Admin Account  
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** Admin
- **Features:** All user features + admin dashboard, manage products, manage orders

### 🧪 Additional Test Account
- **Email:** `test@example.com`
- **Password:** `password123`
- **Role:** User
- **Features:** Can browse products, add to cart, place orders

## 🌐 How to Test

1. **Open your browser:** http://localhost:3000
2. **Click "Login"** in the top navigation
3. **Use any of the credentials above**
4. **Explore the features:**
   - Browse products (sample products already loaded)
   - Add items to cart
   - Place orders
   - For admin: Access admin dashboard

## 📊 Sample Data Available

- ✅ **5 Sample Products** loaded (iPhone, Samsung Galaxy, MacBook Air, Dell XPS, AirPods Pro)
- ✅ **3 Test Users** created (1 admin, 2 regular users)
- ✅ **All databases** connected to MongoDB Atlas
- ✅ **All services** running and healthy

## 🛒 Test Shopping Flow

1. **Login** with any user account
2. **Browse Products** - view the 5 sample products
3. **Add to Cart** - click "Add to Cart" on any product
4. **View Cart** - click the cart icon in navigation
5. **Checkout** - place an order (COD or online payment)
6. **View Orders** - check your order history

## 👑 Test Admin Features

1. **Login** with admin credentials
2. **Access Admin Dashboard** - should see admin menu
3. **Manage Products** - add, edit, delete products
4. **Manage Orders** - view all customer orders
5. **Update Order Status** - change order statuses

## 🔧 Troubleshooting

If login doesn't work:
1. Make sure all services are running
2. Check the browser console for errors
3. Try refreshing the page
4. Verify the backend is responding: `curl http://localhost:5001/health`

## 📱 Application URLs

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8000
- **Auth Service:** http://localhost:5001
- **Products Service:** http://localhost:5002
- **Cart Service:** http://localhost:5003
- **Orders Service:** http://localhost:5004 