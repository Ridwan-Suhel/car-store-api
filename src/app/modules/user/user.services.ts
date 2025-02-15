import { AppError } from "../../shared/appError";
import { IUser, IUserUpdate } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';

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
    const updatedPayload = { ...payload, isBlocked: true };
  
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
  
    const result = await UserModel.findByIdAndUpdate(id, updatedPayload, { new: true });
  
    if (!result) {
      throw new AppError(404, 'User update failed');
    }
  
    return result;
  };
  
const deleteUserFromDb = async (id: string) => {
    const result = UserModel.findByIdAndDelete(id);
    return result
}

// creating service function for single user
const getSingleUserFromDB = async (id: string) => {
    const result = await UserModel.findById(id);
    return result
}

// update with user password 
const updateSingleUserByPasswordIntoDb = async (id: string, oldPassword: string, newPassword: string) => {
    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
        throw new AppError(404, 'User not found');
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError(403, 'Current password is incorrect');
    }

    // Hash the new password before saving
    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    const hashedPassword = newPassword;

    // Update password
    user.password = hashedPassword;
    await user.save();

    return { message: "Password updated successfully" };
};


export const UserServices = {
    createUserIntoDb,
    getUserFromDb,
    getSingleUserFromDb,
    updateSingleUserIntoDb,
    deleteUserFromDb,
    blockSingleUserIntoDb,
    getSingleUserFromDB,
    updateSingleUserByPasswordIntoDb
}