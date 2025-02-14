import { USER_ROLE } from "./user.constant"

export interface IUser{
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
    role?: 'admin' | 'user',
    isBlocked?: boolean
}

export interface IUserUpdate {
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
}

export type TUserRole = keyof typeof USER_ROLE