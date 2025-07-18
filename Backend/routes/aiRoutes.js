// routes/aiRoute.js
const express = require('express');
const router = express.Router();
const { handleGenieRequest } = require('../controllers/aiController');

router.post('/', handleGenieRequest);

module.exports = router;