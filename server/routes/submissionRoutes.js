const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const submissionController = require('../controllers/submissionController')

router.use(authenticateUser);

router.get('/:attemptId', submissionController.getSubmissionsForAttempt);
router.get('/:attemptId/:questionId', submissionController.getSubmission);
router.post('/:attemptId/:questionId', submissionController.createSubmission);
router.patch('/:attemptId/:questionId', submissionController.updateSubmission);

module.exports = router;