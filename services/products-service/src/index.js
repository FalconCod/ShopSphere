const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pranaycursor:pranay@cluster0.8ir3qb9.mongodb.net/products-db?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'ECOMMERCEGROUP';

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new product (Admin only)
app.post('/api/products', verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product (Admin only)
app.put('/api/products/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, imageUrl },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete product (Admin only)
app.delete('/api/products/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product stock (for order processing)
app.put('/api/products/:id/stock', async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Decrease stock by the ordered quantity
    const newStock = Math.max(0, product.stock - quantity);
    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { stock: newStock },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Product stock updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Products service is running' });
});

// Seed some initial products
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const sampleProducts = [
        {
          name: "iPhone 15 Pro",
          description: "Latest Apple iPhone with A17 Pro chip and titanium design",
          price: 999,
          category: "Smartphones",
          stock: 50,
          imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop"
        },
        {
          name: "Samsung Galaxy S24",
          description: "Flagship Android phone with AI features",
          price: 799,
          category: "Smartphones",
          stock: 30,
          imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
        },
        {
          name: "MacBook Air M2",
          description: "Powerful laptop with Apple M2 chip",
          price: 1199,
          category: "Laptops",
          stock: 25,
          imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop"
        },
        {
          name: "Dell XPS 13",
          description: "Premium Windows laptop with Intel processor",
          price: 999,
          category: "Laptops",
          stock: 20,
          imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop"
        },
        {
          name: "AirPods Pro",
          description: "Wireless earbuds with active noise cancellation",
          price: 249,
          category: "Audio",
          stock: 100,
          imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop"
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('Sample products seeded');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
  seedProducts();
});
