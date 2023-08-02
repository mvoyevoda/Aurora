const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

router.delete('/:id', userController.deleteUser);

router.use(authenticateUser);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
