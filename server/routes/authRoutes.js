const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/resetPassword/:token', authController.getResetPassword);
router.post('/resetPassword/:token', authController.resetPassword);

module.exports = router;
