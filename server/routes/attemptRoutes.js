const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const attemptController = require('../controllers/attemptController')

router.use(authenticateUser);

router.get('/', attemptController.getAllAttempts);
router.get('/:attemptId/progress', attemptController.getProgress);
router.patch('/:attemptId', attemptController.updateAttemptProgress);
router.get('/:userId/:quizId', attemptController.getAttempt);
router.post('/:userId/:quizId', attemptController.createAttempt);
router.get('/:userId/:quizId', attemptController.getAttempt);
router.patch('/:attemptId/score', attemptController.updateScore);

module.exports = router;