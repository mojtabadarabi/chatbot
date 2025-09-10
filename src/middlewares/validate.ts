import { NextFunction, Request, Response } from "express";
import { Schema, ValidationErrorItem } from "joi";
import ApiResponse from "../utils/ApiResponse";

const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction): any => {
    const { value, error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if (error) {
        return new ApiResponse({ statusCode: 422, message: 'Request body is wrong', errors: error.details.map((details: ValidationErrorItem) => details.message) }).send(res)
    }

    Object.assign(req, value);
    return next();
};

export default validate