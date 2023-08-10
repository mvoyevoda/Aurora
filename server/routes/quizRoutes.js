const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const quizController = require('../controllers/quizController')

router.use(authenticateUser);

router.get('/', quizController.getAllQuizzes);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizQuestions);


module.exports = router;