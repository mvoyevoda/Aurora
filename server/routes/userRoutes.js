const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

router.delete('/:id', userController.deleteUser);

router.use(authenticateUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/quizzes', userController.getAllQuizzesByUser); // get all quizzes by user 

router.get('/:id/attempts', userController.getAttemptsByUser);  // for all attempts of a user
router.get('/:id/attempts/:quizId', userController.getAttemptsByUser);  // for attempts of a user for a specific quiz


module.exports = router;
