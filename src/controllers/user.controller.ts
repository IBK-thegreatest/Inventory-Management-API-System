import { deleteUserService, getAllUsersService, getUserService, updateUserService } from "@/services/user.services"
import { Request, Response, NextFunction } from "express"

//GET A USER
export const getUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const user = await getUserService(userId)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//GET ALL USERS
export const getAllUsers = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUsersService()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

//UPDATE USER INFORMATION
export const updateUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const userData = req.body
        const updatedUser = await updateUserService(userId, userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User Information has been Successfully Updated",
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}

//DELETE USER INFORMATION
export const deleteUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        await deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been Successfully Deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}