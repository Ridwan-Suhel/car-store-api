import { USER_ROLE } from "./user.constant"

export interface IUser{
    name: string,
    email: string,
    password: string,
    role?: 'admin' | 'user',
}

export interface IUserUpdate {
    name: string,
    email: string,
    password: string,
}

export type TUserRole = keyof typeof USER_ROLE