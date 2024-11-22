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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOrderServices = void 0;
const carOrder_model_1 = require("./carOrder.model");
const createCarOrderIntoDB = (carOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carOrder_model_1.CarOrderModel.create(carOrder);
    return result;
});
const getTotalRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const result = await CarOrderModel.find();
    const result = yield carOrder_model_1.CarOrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    const totalRevenue = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    return totalRevenue;
});
exports.CarOrderServices = {
    createCarOrderIntoDB,
    getTotalRevenueFromDB
};
