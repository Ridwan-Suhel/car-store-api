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
exports.CarOrderControllers = void 0;
const carOrder_validation_1 = __importDefault(require("./carOrder.validation"));
const carOrder_service_1 = require("./carOrder.service");
const createCarOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carOrder = req.body;
        //validating schema by using zod
        const parseValidateData = carOrder_validation_1.default.parse(carOrder);
        // calling service function 
        const result = yield carOrder_service_1.CarOrderServices.createCarOrderIntoDB(parseValidateData);
        // sending response 
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error) {
        // if(error?.message === 'lower_price'){
        //     res.status(400).json({
        //         success: false,
        //         message: "Price is lower than actual price",
        //         error: true
        //     });
        // }
        if ((error === null || error === void 0 ? void 0 : error.message) === 'not_enough_qty_in_DB') {
            res.status(400).json({
                success: false,
                message: "Not have enough item in stock",
                error: true
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went  wrong",
                error: error
            });
        }
    }
});
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield carOrder_service_1.CarOrderServices.getTotalRevenueFromDB();
        // console.log(result)
        res.status(200).json({
            status: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue: result
            }
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
exports.CarOrderControllers = {
    createCarOrder,
    getTotalRevenue
};
