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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../shared/appError");
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRole) => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract the token from the Authorization header
                const token = req.headers.authorization;
                if (!token) {
                    throw new appError_1.AppError(401, "You are not logged in.");
                }
                // Verify the token
                const secretKey = config_1.default.jwt_access_secret;
                jsonwebtoken_1.default.verify(token, secretKey, function (err, decoded) {
                    if (err) {
                        throw new appError_1.AppError(401, "You are not authorized");
                    }
                    const role = decoded === null || decoded === void 0 ? void 0 : decoded.role;
                    if (requiredRole && !requiredRole.includes(role)) {
                        throw new appError_1.AppError(401, "You are not authorized to access.");
                    }
                    req.user = decoded;
                    next();
                });
                // Proceed to the next 
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    return next(new appError_1.AppError(401, "Invalid or expired token"));
                }
                return next(error);
            }
        });
    };
};
exports.default = auth;
