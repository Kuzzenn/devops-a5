// backend/server.js
// This file starts an Express HTTP server and connects to MongoDB
 
require('dotenv').config(); // Load variables from .env file
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const studentRoutes = require('./routes/students');
 
const app  = express();
const PORT = process.env.PORT || 5000;
 
// --- Middleware ---
// cors()          → allow requests from any origin (frontend at localhost:3000)
// express.json()  → parse incoming JSON request bodies
app.use(cors());
app.use(express.json());
 
// --- Routes ---
app.use('/api/students', studentRoutes);
 
// Health check: a simple endpoint to verify the server is alive
// GitHub Actions can hit this to confirm deployment succeeded
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});
 
// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/students';
 
// Only connect to MongoDB if not running tests
// (tests use supertest which doesn't need a real DB connection for /health)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected:', MONGO_URI))
    .catch(err => console.error('❌ MongoDB connection error:', err));
}
 
// Only start listening if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
 
module.exports = app; // Export for supertest to use in tests
