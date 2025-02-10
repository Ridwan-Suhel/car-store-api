import { AppError } from "../../shared/appError";
import { IUser, IUserUpdate } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDb = async (user: IUser) => {
    const result = UserModel.create(user);
    return result;
}

const getUserFromDb = async () => {
    return await UserModel.find();
}

const getSingleUserFromDb = async (id: string) => {
    const result = await UserModel.findById(id);
    return result
}

const updateSingleUserIntoDb = async (id: string, payload: IUserUpdate) => {
    const result = UserModel.findByIdAndUpdate(id, payload, {
        new : true
    });
    return result
}

const blockSingleUserIntoDb = async (id: string, payload: IUserUpdate) => {
    const updatedPaylod = {
        ...payload,
        isBlocked: true
    }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const result = await UserModel.findByIdAndUpdate(id, updatedPaylod, {
        new: true,
    });

    if (!result) {
        throw new AppError(404, "User not found");
    }

    return result;
}

const deleteUserFromDb = async (id: string) => {
    const result = UserModel.findByIdAndDelete(id);
    return result
}

export const UserServices = {
    createUserIntoDb,
    getUserFromDb,
    getSingleUserFromDb,
    updateSingleUserIntoDb,
    deleteUserFromDb,
    blockSingleUserIntoDb
}