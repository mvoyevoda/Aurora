class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}

class DBError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DBError';
    }
}

module.exports = {
    ValidationError,
    DuplicateError,
    DBError
}