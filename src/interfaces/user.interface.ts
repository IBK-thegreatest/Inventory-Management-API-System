export interface Register {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
}

export interface Login {
    email: string
    password: string
}

export interface UserInfo extends Register {
    _id?: any
}

export interface User extends Register {
    id: any
    accessToken: string
}