import { ErrorCode } from "../../config";

export class CustomError extends Error {
    code: ErrorCode;

    constructor(message: string, code: ErrorCode) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        
        if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }
}