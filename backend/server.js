const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app    = express();
const PORT   = process.env.PORT || 5000;
const apiRoutes = require('./routes/api');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Campus Bus Tracker API is running', version: '1.0.0' });
});

// All API routes under /api
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`\n🚌 Campus Bus Tracker API running at http://localhost:${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api\n`);
});
