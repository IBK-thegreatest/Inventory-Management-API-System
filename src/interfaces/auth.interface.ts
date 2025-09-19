import { Request } from "express"
export interface DataStoredInToken {
    id: any
    role: string
}

export interface RequestWithUser extends Request {
    user: any
}