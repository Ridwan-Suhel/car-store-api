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
// creating scheam / model for car order with interface
const carOrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true,
});
// pre save middlewear 
//creating pre middlewear for check the quantity available or not in DB
carOrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // checking is cuurent id availeble in my db or not that wanted to order a user
        const id = this.car.toString();
        const result = yield car_model_1.CarModel.findById(id);
        if (result) {
            const { quantity: dbQuantity, price } = result;
            //creating logic here when id availble (making stock false when car qty 0 in db )
            if (dbQuantity >= this.quantity) {
                const payload = {
                    price: price,
                    quantity: dbQuantity - this.quantity,
                    inStock: true,
                };
                if (payload.quantity === 0) {
                    payload.inStock = false;
                }
                // updating single car with reducing quantity and making stock false if there is not availble in dn
                const result = yield car_service_1.CarServices.updateSingleCarIntoDB(id, payload);
                if (result) {
                    next();
                }
                else {
                    // throwing error when there is not enough qty in db
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
            // throwing error when car not availeble 
            const error = new Error('Car not found');
            return next(error);
        }
    });
});
exports.CarOrderModel = (0, mongoose_1.model)('carOrder', carOrderSchema);
