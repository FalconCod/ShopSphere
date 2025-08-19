const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pranaycursor:pranay@cluster0.8ir3qb9.mongodb.net/orders-db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET'
});

// Products service URL
const PRODUCTS_SERVICE_URL = process.env.NODE_ENV === 'production' ? 'http://products-service:5002' : 'http://localhost:5002';

// Function to update product stock
async function updateProductStock(items) {
  try {
    for (const item of items) {
      await axios.put(`${PRODUCTS_SERVICE_URL}/api/products/${item.productId}/stock`, {
        quantity: item.quantity
      });
    }
  } catch (error) {
    console.error('Error updating product stock:', error.message);
    // Note: We don't throw here to avoid breaking the order flow
    // In production, you might want to implement a retry mechanism or queue
  }
}

// Create COD order
app.post('/api/orders/create-cod', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    // Create order in database with COD payment
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending', // COD orders are pending until delivery
      paymentMethod: paymentMethod || 'COD',
      orderStatus: 'confirmed'
    });
    
    await order.save();
    
    // Update product stock
    await updateProductStock(items);
    
    res.status(201).json({
      message: 'COD Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Error creating COD order:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again.' });
  }
});

// Create order and Razorpay order (for online payments)
app.post('/api/orders/create', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;
    
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });
    
    // Create order in database
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'pending',
      paymentMethod: 'ONLINE',
      razorpayOrderId: razorpayOrder.id
    });
    
    await order.save();
    
    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify payment
app.post('/api/orders/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET')
      .update(body.toString())
      .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      // Update order status
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          paymentStatus: 'completed',
          razorpayPaymentId: razorpay_payment_id
        },
        { new: true }
      );
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json({
        message: 'Payment verified successfully',
        order
      });
    } else {
      // Update order status to failed
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: 'failed' }
      );
      
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all orders (Admin only)
app.get('/api/orders/admin/all', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update order status (Admin only)
app.put('/api/orders/admin/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    
    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get orders for a user
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single order
app.get('/api/orders/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Orders service is running' });
});

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
