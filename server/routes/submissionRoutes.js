const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const submissionController = require('../controllers/submissionController')

// router.use(authenticateUser);

router.post('/:attemptId/:questionId', submissionController.createSubmission);

module.exports = router;