const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const attemptController = require('../controllers/attemptController')

// router.use(authenticateUser);

router.get('/:userId/:quizId', attemptController.verifyAttempt);
router.put('/:attemptId', attemptController.updateProgress);

module.exports = router;