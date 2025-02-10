import config from "../../config";
import { AppError } from "../../shared/appError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LoginUser = async (payload: TLoginUser) => {
    const email = payload.email;
    // checking is user exist 
    const isUserExist = await UserModel.findOne({email});
    // console.log('from auth file:', isUserExist);
    if(!isUserExist){
        throw new AppError(404, 'User not found');
    }

    //checking is user blocked
    // const isBlocked = isUserExist?.isBlocked;
    // if(isBlocked){
    //     throw new AppError(403, 'User is blocked');
    // }

    //checking is password matched
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExist?.password);
    if(!isPasswordMatched){
        throw new AppError(403, 'Password not matched');
    }

    //access granted and sending access token to client
    const jwtPayload = {
        id: isUserExist?._id,
        email: isUserExist?.email,
        role: isUserExist?.role
    }
    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '100d' });

    return {
        token
    }
}

export const AuthService = {
    LoginUser
}