const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const quizController = require('../controllers/quizController')

router.use(authenticateUser);

router.get('/:id', quizController.getQuizQuestions);
router.get('/', quizController.getAllQuizzes);


module.exports = router;