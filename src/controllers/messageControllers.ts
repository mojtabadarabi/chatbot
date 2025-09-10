import { Request, Response } from 'express';
import ChatRepository from '../repository/ChatRepository';
import MessageRepository from '../repository/messageRepository';
import Groq from '../services/groq';
import ApiResponse from '../utils/ApiResponse';

export const sendMessage = (async (req: Request, res: Response): Promise<any> => {
    const { message, chatId } = req.body
    //@ts-ignore
    const { userId } = req.user

    const messageRepository = new MessageRepository()

    const createdMessage = await messageRepository.create({
        author: userId,
        content: message
    })

    const responseMessage = await Groq({ message })

    const createdResponseMessage = await messageRepository.create({
        content: responseMessage
    })

    const chatRepository = new ChatRepository()

    let chat

    if (!chatId) {
        chat = await chatRepository.create({
            title: message,
            messages: [
                createdMessage._id,
                createdResponseMessage._id
            ],
            creator: userId
        })
    }
    else {
        chat = await chatRepository.addToMessagesById(chatId, [
            createdMessage._id,
            createdResponseMessage._id
        ])
    }


    return new ApiResponse({ statusCode: 201, errors: [], data: { chat, message: createdMessage, response: createdResponseMessage }, message: 'Register successfully ' }).send(res)
});
