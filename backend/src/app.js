const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

/* Import all routes */
const routes = require('./routes/index');

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

// Mount all API routes
app.use('/api', routes);

// Default / root route (public)
app.get('/', (req, res) => {
  res.send('Hospital Management Backend Running');
});

module.exports = app;