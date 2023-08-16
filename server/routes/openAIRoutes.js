const express = require('express');
const router = express.Router();
const openAIController = require('../controllers/openAIController')
const authenticateUser = require('../middleware/authMiddleware');

router.use(authenticateUser);

router.post('/generate', openAIController.generate);
router.put('/regenerate/:questionId', openAIController.regenerateQuestion);

module.exports = router;