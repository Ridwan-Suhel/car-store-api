"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const appError_1 = require("../../shared/appError");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.create(user);
    return result;
});
const getUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.find();
});
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(id);
    return result;
});
const updateSingleUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const blockSingleUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPayload = Object.assign(Object.assign({}, payload), { isBlocked: true });
    const user = yield user_model_1.UserModel.findById(id);
    if (!user) {
        throw new appError_1.AppError(404, 'User not found');
    }
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, updatedPayload, { new: true });
    if (!result) {
        throw new appError_1.AppError(404, 'User update failed');
    }
    return result;
});
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.findByIdAndDelete(id);
    return result;
});
// creating service function for single user
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(id);
    return result;
});
// update with user password 
const updateSingleUserByPasswordIntoDb = (id, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user by ID
    const user = yield user_model_1.UserModel.findById(id);
    if (!user) {
        throw new appError_1.AppError(404, 'User not found');
    }
    // Check if the old password is correct
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new appError_1.AppError(403, 'Current password is incorrect');
    }
    // Hash the new password before saving
    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    const hashedPassword = newPassword;
    // Update password
    user.password = hashedPassword;
    yield user.save();
    return { message: "Password updated successfully" };
});
exports.UserServices = {
    createUserIntoDb,
    getUserFromDb,
    getSingleUserFromDb,
    updateSingleUserIntoDb,
    deleteUserFromDb,
    blockSingleUserIntoDb,
    getSingleUserFromDB,
    updateSingleUserByPasswordIntoDb
};
