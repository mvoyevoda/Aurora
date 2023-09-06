const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const quizController = require('../controllers/quizController')

router.use(authenticateUser);

router.get('/', quizController.getAllQuizzes);
router.get('/getQuiz/:id', quizController.getQuizQuestions);
router.get('/', quizController.getAllQuizzes);
router.get('/:userId', quizController.getUserQuizzes);


module.exports = router;
