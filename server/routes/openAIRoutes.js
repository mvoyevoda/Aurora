const express = require('express');
const router = express.Router();
const openAI = require('../controllers/openAI')
const authenticateUser = require('../middleware/authMiddleware');

router.post('/generate', openAI.generate);

module.exports = router;