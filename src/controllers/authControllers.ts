import { Request, Response } from 'express';
import { generateToken, verifyToken } from '../configs/jwt';
import ChatRepository from '../repository/ChatRepository';
import TokenRepository from '../repository/tokenRepository';
import UserRepository from '../repository/userRepository';
import ApiResponse from '../utils/ApiResponse';

export const login = (async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body

    const userRepository = new UserRepository()

    const foundedUserByEmail = await userRepository.findOne({ email })


    if (!foundedUserByEmail) {
        return new ApiResponse({ statusCode: 422, message: 'user is not exist', errors: ['user is not exist'] }).send(res)
    }

    if (!await foundedUserByEmail.comparePassword(password)) {
        return new ApiResponse({ statusCode: 422, message: 'user or password is wrong', errors: ['user or password is wrong'] }).send(res)
    }

    const generatedToken = generateToken(foundedUserByEmail._id)

    const tokenRepository = new TokenRepository()

    tokenRepository.create({
        userId: foundedUserByEmail._id,
        token: generatedToken
    })

    return new ApiResponse({ statusCode: 201, errors: [], data: { user: foundedUserByEmail, token: generatedToken }, message: 'Register successfully ' }).send(res)
});

export const register = (async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body

    const userRepository = new UserRepository()

    const foundedUserByEmail = await userRepository.findOne({ email })

    if (foundedUserByEmail) {
        return new ApiResponse({ statusCode: 422, message: 'user is exist already', errors: ['user is exist already'] }).send(res)
    }

    userRepository.create({ email, password })

    return new ApiResponse({ statusCode: 201, errors: [], data: { user: email }, message: 'Register successfully ' }).send(res)
});

export const logout = async (req: Request, res: Response): Promise<any> => {
    //@ts-ignore
    const { userId } = verifyToken(req.headers.authorization?.replace('Bearer ', ''))
    const userRepository = new UserRepository()
    const foundedUserById = await (userRepository.findById(userId))

    if (foundedUserById) {
        const tokenRepository = new TokenRepository()
        console.log(foundedUserById);

        await tokenRepository.deleteOne({ userId: foundedUserById._id })
    }

    return new ApiResponse({
        statusCode: 200, errors: [], data: null, message: 'Logout successfully '
    }).send(res)
}
export const user = async (req: Request, res: Response): Promise<any> => {
    try {
        //@ts-ignore
        const { userId } = verifyToken(req.headers.authorization?.replace('Bearer ', ''))
        const userRepository = new UserRepository()
        const foundedUserById = await (userRepository.findById(userId))

        const foundedUserChats = await new ChatRepository().find({ creator: userId }).sort({ createdAt: -1 }).populate({
            path: 'messages',
            select: 'content author createdAt', // Only include these fields
            options: { sort: { createdAt: 1 } } // Sort messages by newest first
        })

        return new ApiResponse({
            statusCode: 201, errors: [], data: {
                user: foundedUserById,
                chats: foundedUserChats
            }, message: 'Register successfully '
        }).send(res)

    } catch (error) {
        console.log(error);
        console.log('error');

        //@ts-ignore
        if (error.message == 'jwt expired') {
            return new ApiResponse({ statusCode: 401, message: 'token is expired', errors: ['token is expired'] }).send(res)
        }
        //@ts-ignore
        return new ApiResponse({ statusCode: 500, message: error.message, errors: [error.message] }).send(res)

    }
}