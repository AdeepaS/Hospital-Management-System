const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

/* Import auth routes */
const authRoutes = require('./routes/authRoute');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later'
});
app.use(limiter);

// Auth routes
app.use('/api/auth', authRoutes);

// Default / root route (public)
app.get('/', (req, res) => {
  res.send('Hospital Management Backend Running');
});

module.exports = app;