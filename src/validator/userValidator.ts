import Joi from 'joi';
import { passwordValidator } from '../validator/customValidator';

const authHeadersSchema = Joi.object({
    'content-type': Joi.string()
        .valid('application/json')
        .required()
        .messages({
            'any.only': 'Content-Type must be application/json',
            'string.empty': 'Content-Type header is required'
        }),
    'user-agent': Joi.string().required(),
    'x-request-id': Joi.string().uuid().optional(),
    'authorization': Joi.string().uuid().optional()
}).unknown(true)

const userValidation = {
    register: Joi.object({
        email: Joi.string().required().email().messages({
            'string.empty': 'email is required',
            'string.email': 'enter valid email'
        }),
        password: Joi.string().required().custom(passwordValidator).messages({
            'string.empty': 'password is required',
            'string.min': 'password must upper 6 chars',
            'any.required': 'password is required'
        }),
    }),
    login: Joi.object({
        email: Joi.string().required().email().messages({
            'string.empty': 'email is required',
            'string.email': 'enter valid email'
        }),
        password: Joi.string().required().custom(passwordValidator).messages({
            'string.empty': 'password is required',
            'string.min': 'password must upper 6 chars',
            'any.required': 'password is required'
        }),
    }),
    user: authHeadersSchema
};

export default userValidation