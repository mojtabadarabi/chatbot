class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(statusCode = 422, message = "", isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;