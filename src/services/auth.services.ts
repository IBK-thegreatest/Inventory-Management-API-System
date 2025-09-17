import HttpException from "@/exceptions/HttpException";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Login, Register, User } from "@/interfaces/user.interface";
import UserModel from "@/models/User";
import { emailValidator, schema } from "@/middlewares/validation.middleware";
import { DataStoredInToken } from "@/interfaces/auth.interface";

//REGISTER FOR THE SERVICE
export const registerService = async (userData: Register): Promise<Register> => {
    const ifAlreadyExistsUser = await UserModel.findOne({ email: userData.email })
    if (ifAlreadyExistsUser) throw new HttpException(409, "This User Already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    const data: Register = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    }
    
    switch (true) {
        case userData.firstName=="":
            throw new HttpException(403, "Invalid first name input, first name can't be empty")
            break;
        case userData.lastName=="":
            throw new HttpException(403, "Invalid last name input, last name can't be empty")
            break;
        case !emailValidator.validate(userData.email):
            throw new HttpException(403, "Invalid Email Address, email address has to be in the format foo@bar.com")
            break;
        case !schema.validate(userData.password):
            throw new HttpException(403, "Invalid Password, Password must contain an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
            break;
        default:
            const newUser = new UserModel(data)
            const saveUser = await newUser.save();
            return saveUser
            break;
    }
}

//LOGIN INTO THE SERVICE
export const loginService = async (userData: Login): Promise<User> => {
    const user = await UserModel.findOne({ email: userData.email })
    if (!user) throw new HttpException(404, "This User does not Exist")

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(403, "Username and Password don't match")

    const dataStoredInToken: DataStoredInToken = {
        id: user._id,
        role: user.role
    }

    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, { expiresIn: "24h" })
    const loginData: User = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        accessToken: accessToken
    }
    return loginData
}