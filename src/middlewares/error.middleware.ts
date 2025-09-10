import { NextFunction, Response } from 'express';
import ApiError from '../utils/ApiError';

/**
 * Error handling middleware for Express
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Default error response
    let error = { ...err };
    error.message = err.message;

    // Log the error for development
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Handle specific error types
    switch (true) {
        // Mongoose bad ObjectId
        case err.name === 'CastError':
            error = new ApiError(400, `Resource not found with id of ${err.value}`);
            break;

        // Mongoose duplicate key
        case err.code === 11000:
            const field = Object.keys(err.keyValue)[0];
            error = new ApiError(400, `${field} already exists`);
            break;

        // Mongoose validation error
        case err.name === 'ValidationError':
            //@ts-ignore
            const messages = Object.values(err.errors).map(val => val.message);
            error = new ApiError(400, messages.join(', '));
            break;

        // JWT errors
        case err.name === 'JsonWebTokenError':
            error = new ApiError(401, 'Invalid token');
            break;

        case err.name === 'TokenExpiredError':
            error = new ApiError(401, 'Token expired');
            break;

        // Custom API errors
        case err instanceof ApiError:
            // Already handled, pass through
            break;

        // Default to 500 server error
        default:
            error = new ApiError(500, 'Server Error');
            break;
    }

    // Send error response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorMiddleware;