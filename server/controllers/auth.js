const bcrypt = require('bcryptjs');
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
} = require('../errors');
const {
    validationErrorHandler,
    duplicateErrorHandler,
    dbErrorHandler,
    forbiddenErrorHandler,
    notFoundErrorHandler
} = require('../middlewares/errorHandlers');

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

            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const user = await User.create({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });

            req.session.userId = user.userId;

            res.status(201).json(user);
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
                    req.session.userId = user.userId;
                    return res.status(200).json(user);
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