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
exports.CarOrderModel = void 0;
const mongoose_1 = require("mongoose");
const car_model_1 = require("../car/car.model");
const car_service_1 = require("../car/car.service");
const carOrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    car: {
        type: String,
        ref: "Car",
        required: true
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true,
});
// pre save middlewear 
carOrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = this.car;
        const result = yield car_model_1.CarModel.findById(id);
        if (result) {
            const { quantity: dbQuantity, price } = result;
            if (dbQuantity >= this.quantity) {
                const payload = {
                    price: price,
                    quantity: dbQuantity - this.quantity,
                    inStock: true,
                };
                if (payload.quantity === 0) {
                    payload.inStock = false;
                }
                const result = yield car_service_1.CarServices.updateSingleCarIntoDB(id, payload);
                if (result) {
                    next();
                }
                else {
                    const error = new Error('not_enough_qty_in_DB');
                    return next(error);
                }
            }
            else {
                const error = new Error('not_enough_qty_in_DB');
                return next(error);
            }
        }
        else {
            const error = new Error('Car not found');
            return next(error);
        }
    });
});
exports.CarOrderModel = (0, mongoose_1.model)('carOrder', carOrderSchema);
