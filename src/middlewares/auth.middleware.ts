import HttpException from "@/exceptions/HttpException"
import { RequestWithUser } from "@/interfaces/auth.interface"
import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

//VERIFY TOKEN
export const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, payLoad) => {
                if(err) throw new HttpException(403, "Your Token is Invalid")
                req.user = payLoad
                next();
            }
        )
    } else {
        res.status(401).json({
            success: false,
            status: 401,
            message: "You are not Authorized to do this!!!"
        })
    }
}

//VERIFY A USER'S IDENTITY
export const verifyUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.userId) {
            console.log(req.user.id, req.params.userId)
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this!!!"
            })
        }
    })
}

//VERIFY IF USER IS AN ADMIN
export const verifyAdmin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.role === "admin") {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this!!!"
            })
        }
    })
}

//VERIFY IF USER IS A MANAGER
export const verifyManager = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.role === "manager") {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this!!!"
            })
        }
    })
}

//VERIFY IF USER IS A SUPPLIER
export const verifySupplier = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.role === "supplier") {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this!!!"
            })
        }
    })
}