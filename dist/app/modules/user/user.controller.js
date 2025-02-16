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
exports.UserController = void 0;
const user_validation_1 = __importDefault(require("./user.validation"));
const user_services_1 = require("./user.services");
const appError_1 = require("../../shared/appError");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        //validating schema by using zod
        const parseValidateData = user_validation_1.default.parse(payload);
        const result = yield user_services_1.UserServices.createUserIntoDb(parseValidateData);
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : "Validation error",
                statusCode: 400,
                error: {
                    details: error.issues[0]
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        else if (error.code === 11000) {
            const errorFormat = {
                success: false,
                message: `Duplicate ${Object.keys(error.keyValue)[0]}: ${Object.values(error.keyValue)[0]} found`,
                statusCode: 400,
                error: {
                    details: error.errorResponse
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        else {
            res.status(400).json(error);
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserServices.getUserFromDb();
        res.status(200).json({
            status: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
const BlockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = req.body;
        const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
        yield user_services_1.UserServices.blockSingleUserIntoDb(userId, payload);
        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            statusCode: 200,
        });
    }
    catch (error) {
        let errorResponse = {
            success: false,
            message: 'Something went wrong',
            statusCode: 500,
            error: {},
        };
        if (error.issues) {
            const { message } = error.issues[0];
            errorResponse = {
                success: false,
                message: message || 'Validation error',
                statusCode: 400,
                error: { details: error.issues[0] },
            };
        }
        else if (error instanceof appError_1.AppError) {
            errorResponse = {
                success: false,
                message: error.message,
                statusCode: error.statusCode,
                error: { statusCode: error.statusCode },
            };
        }
        res.status(errorResponse.statusCode).json(errorResponse);
    }
});
// get single user controller start from here
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking params from req  
        const { userId } = req.params;
        // calling service function for singlecar 
        const result = yield user_services_1.UserServices.getSingleUserFromDB(userId);
        // sending success response to client 
        res.status(200).json({
            status: true,
            message: 'User retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        // sending default error 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking car id from req paramas 
        const { userId } = req.params;
        // storing payload data from body request 
        const payload = req.body;
        // calling service function update single car 
        const result = yield user_services_1.UserServices.updateSingleUserIntoDb(userId, payload);
        //sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (err) {
        // sending error response to the client 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// update single user by password 
const updateSingleUserByPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { oldPassword, newPassword } = req.body;
        // Call service function to update password
        const result = yield user_services_1.UserServices.updateSingleUserByPasswordIntoDb(userId, oldPassword, newPassword);
        // Send success response
        res.status(200).json({
            status: true,
            message: result.message,
        });
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || 'Something went wrong',
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    BlockUser,
    getSingleUser,
    updateSingleUser,
    updateSingleUserByPassword
};
