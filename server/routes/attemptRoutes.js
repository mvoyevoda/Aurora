const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const attemptController = require('../controllers/attemptController')

router.use(authenticateUser);

router.get('/:attemptId/progress', attemptController.getProgress);
router.patch('/:attemptId', attemptController.updateProgress);
router.post('/:userId/:quizId', attemptController.createAttempt);

module.exports = router;