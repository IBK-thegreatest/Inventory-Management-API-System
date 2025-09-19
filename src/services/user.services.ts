import HttpException from "@/exceptions/HttpException";
import bcrypt from "bcrypt"
import { UserInfo } from "@/interfaces/user.interface";
import { emailValidator, schema } from "@/middlewares/validation.middleware";
import UserModel from "@/models/User";

//GET A USER
export const getUserService = async (userId: string): Promise<UserInfo> => {
    const user = await UserModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not Exist!!!")

    return user
}

//GET ALL USERS
export const getAllUsersService = async (): Promise<UserInfo[]> => {
    const users = await UserModel.find()
    return users
}

//UPDATE EXISTING USER INFORMATION
export const updateUserService = async (userId: string, userData: UserInfo): Promise<UserInfo> => {
    const user = await UserModel.findById(userId)
    if(!user) throw new HttpException(404, "This User Does not Exist!!")

    if (userData.email) {
        if(!emailValidator.validate(userData.email)) throw new HttpException(403, "Invalid Email Address. make sure email address is in the format foo@bar.com")
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { email: userData.email }},
            { new: true }
        )
        return updatedUser
    } else if (userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Invalid password, password must have uppercase letters, lowercase letters no white spaces and at least 2 digits")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword }},
            { new: true }
        )
        return updatedUser
    } else {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        )
        return updatedUser
    }
}

//DELETE AN EXISTING USER
export const deleteUserService = async (userId: string): Promise<void> => {
    const user = await UserModel.findById(userId)
    if(!user) throw new HttpException(404, "This user does not exist")

    await UserModel.findByIdAndDelete(userId)
}