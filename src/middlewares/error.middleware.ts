import HttpException from "@/exceptions/HttpException"
import { Request, Response, NextFunction } from "express"

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction): Response<any> => {
    const errorStatus = err.status
    const errorMessage = err.message || "Something Went Wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
}