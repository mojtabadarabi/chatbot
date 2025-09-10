import { Response } from "express";

class ApiResponse {
    statusCode: any;
    data: any;
    message: string;
    success: boolean;
    errors: string[];

    constructor({ statusCode = 422, data = {}, errors = [], message = 'Failure' }: { statusCode: number, data?: any, errors?: string[], message: string }) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.errors = errors
    }

    send(res: Response) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data,
            errors: this.errors
        });
    }
}

export default ApiResponse;