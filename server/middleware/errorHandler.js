const {
    ValidationError,
    DuplicateError,
    DBError,
    ForbiddenError,
    NotFoundError
} = require('./errors');

const validationErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            message: err.message
        });
    }
    next(err);
};

const duplicateErrorHandler = (err, req, res, next) => {
    if (err instanceof DuplicateError) {
        return res.status(409).json({
            message: 'Duplicate entry found in the database.'
        });
    }
    next(err);
};

const dbErrorHandler = (err, req, res, next) => {
    if (err instanceof DBError) {
        return res.status(500).json({
            message: 'Database error occurred. Please try again later.'
        });
    }
    next(err);
};

const forbiddenErrorHandler = (err, req, res, next) => {
    if (err instanceof ForbiddenError) {
        return res.status(403).json({
            message: 'You are not authorized to access this resource.'
        });
    }
    next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            message: 'The requested resource was not found.'
        });
    }
    next(err);
};

module.exports = {
    validationErrorHandler,
    duplicateErrorHandler,
    dbErrorHandler,
    forbiddenErrorHandler,
    notFoundErrorHandler
};