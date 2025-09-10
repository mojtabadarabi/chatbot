import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateToken = (userId: string) => {
    //@ts-ignore
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
};

export const verifyToken = (token: string) => {
    //@ts-ignore
    return jwt.verify(token, process.env.JWT_SECRET);
};