const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {
    body,
    validationResult
} = require('express-validator');
const {
    User
} = require('../models');
const {
    ValidationError,
    DuplicateError,
    DBError,
    ForbiddenError,
    NotFoundError
} = require('../middleware/errors');
const {
    validationErrorHandler,
    duplicateErrorHandler,
    dbErrorHandler,
    forbiddenErrorHandler,
    notFoundErrorHandler
} = require('../middleware/errorHandlers');

exports.signup = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({
        min: 5
    }).withMessage('Password must be at least 5 chars long'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError('Validation error');
            }

            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { userName: req.body.userName },
                        { email: req.body.email }
                    ]
                }
            });

            if (existingUser) {
                throw new DuplicateError('Username or email already in use');
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = await User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });

            req.session.userId = user.id;

            res.status(201).json({
                message: 'Signup was successful!',
                user: {
                    userName: user.userName,
                    email:user.email
                }
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                validationErrorHandler(error, req, res);
            } else if (error instanceof DuplicateError) {
                duplicateErrorHandler(error, req, res);
            } else if (error instanceof DBError) {
                dbErrorHandler(error, req, res);
            } else {
                res.status(500).json({
                    error: 'Failed to register user.'
                });
            }
        }
    }
];

exports.login = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationError('Validation error');
            }

            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                const auth = await bcrypt.compare(req.body.password, user.password);

                if (auth) {
                    req.session.userId = user.id;
                    return res.status(200).json({
                        message: 'Login was successful!'
                    });
                } else {
                    throw new ForbiddenError('Incorrect password');
                }
            } else {
                throw new NotFoundError('Email not registered');
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                validationErrorHandler(error, req, res);
            } else if (error instanceof ForbiddenError) {
                forbiddenErrorHandler(error, req, res);
            } else if (error instanceof NotFoundError) {
                notFoundErrorHandler(error, req, res);
            } else {
                res.status(500).json({
                    error: 'Failed to login.'
                });
            }
        }
    }
];

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({
                error: 'Failed to logout.'
            });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({
            message: 'Logout successful'
        });
    });
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(404).json({ message: 'No account with that email address exists.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
            Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: 
            http://${process.env.EMAIL_DOMAIN}/resetPassword/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                res.status(200).json({ message: 'Email sent: ' + info.response });
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error processing request' });
    }
};

exports.getResetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { [Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        res.status(200).json({
            message: 'Token is valid.',
            token: req.params.token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error processing request' });
    }
};

exports.resetPassword = async (req, res) => {
    const { password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: req.params.token
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and reset fields
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        // Destroy user session 
        req.session.destroy();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};