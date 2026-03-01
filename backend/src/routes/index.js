const express = require('express');

const router = express.Router();

// Example base route for testing
router.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

module.exports = router;
