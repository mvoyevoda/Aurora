const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const quizController = require('../controllers/quizController')

router.get('/:id', quizController.getQuiz);

module.exports = router;