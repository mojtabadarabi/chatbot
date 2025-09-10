import Joi from 'joi';

const messageValidator = {
    sendMessage: Joi.object({
        message: Joi.string().required().messages({
            'string': 'message is required',
        }),
    })
};

export default messageValidator