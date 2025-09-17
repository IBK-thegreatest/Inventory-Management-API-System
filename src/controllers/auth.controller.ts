import { loginService, registerService } from "@/services/auth.services"
import { Request, Response, NextFunction } from "express"

//REGISTER A USER
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const registerData = await registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User has been Successfully Registered",
            data: registerData
        })
    } catch (error) {
        next(error)
    }
}

//LOGIN AS AN EXISTING USER
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const loginData = await loginService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User is logged In",
            data: loginData
        })
    } catch (error) {
        next(error)
    }
}