const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple proxy configurations without complex routing
// Use Docker service names when running in Docker, localhost for development
const authProxy = createProxyMiddleware({
  target: process.env.NODE_ENV === 'production' ? 'http://auth-service:5001' : 'http://localhost:5001',
  changeOrigin: true,
  timeout: 30000,
  proxyTimeout: 30000
});

const productsProxy = createProxyMiddleware({
  target: process.env.NODE_ENV === 'production' ? 'http://products-service:5002' : 'http://localhost:5002',
  changeOrigin: true,
  timeout: 30000,
  proxyTimeout: 30000
});

const cartProxy = createProxyMiddleware({
  target: process.env.NODE_ENV === 'production' ? 'http://cart-service:5003' : 'http://localhost:5003',
  changeOrigin: true,
  timeout: 30000,
  proxyTimeout: 30000
});

const ordersProxy = createProxyMiddleware({
  target: process.env.NODE_ENV === 'production' ? 'http://orders-service:5004' : 'http://localhost:5004',
  changeOrigin: true,
  timeout: 30000,
  proxyTimeout: 30000
});

// Route definitions - No authentication middleware for now
app.use('/api/auth', authProxy);
app.use('/api/products', productsProxy);
app.use('/api/cart', cartProxy);
app.use('/api/orders', ordersProxy);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});