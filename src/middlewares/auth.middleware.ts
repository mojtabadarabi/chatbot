import { NextFunction, Request, Response } from "express";
import TokenRepository from "../repository/tokenRepository";

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];

    // Extract the token (format: "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authorization token is required'
        });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async(err: any, user: any) => {
        if (err) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Invalid or expired token'
            });
        }

        const tokenRepository = new TokenRepository()

        const foundedTokenInRepository = await tokenRepository.findOne({ userId: user.userId })

        if (!foundedTokenInRepository) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Authorization token is not exist'
            });
        }


        // Attach the user to the request object
        //@ts-ignore
        req.user = user;
        next();
    });
};

export default authenticateToken