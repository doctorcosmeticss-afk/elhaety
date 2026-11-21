const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongodb');

const authRoutes = require('./api/auth');
const productsRoutes = require('./api/products');
const ordersRoutes = require('./api/orders');
const requestsRoutes = require('./api/requests');
const uploadRoutes = require('./api/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (قبل ما نربط الـ routes)
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for Base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'ELHAWTY Admin Server is running!' });
});

// Start server و تصل بـ MongoDB
const startServer = async () => {
  try {
    // اتصال بـ MongoDB
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();