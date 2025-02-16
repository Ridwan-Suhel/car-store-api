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
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../config"));
const appError_1 = require("../../shared/appError");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    // checking is user exist 
    const isUserExist = yield user_model_1.UserModel.findOne({ email });
    // console.log('from auth file:', isUserExist);
    if (!isUserExist) {
        throw new appError_1.AppError(404, 'User not found');
    }
    //checking is user blocked
    const isBlocked = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked;
    if (isBlocked) {
        throw new appError_1.AppError(403, 'User is blocked');
    }
    //checking is password matched
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatched) {
        throw new appError_1.AppError(403, 'Password not matched');
    }
    //access granted and sending access token to client
    const jwtPayload = {
        id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: '100d' });
    return {
        token
    };
});
exports.AuthService = {
    LoginUser
};
