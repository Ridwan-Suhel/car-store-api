"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"]
    },
    description: { type: String },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean },
}, {
    timestamps: true
});
// middlewear for finding only available stock datas 
carSchema.pre('find', function (next) {
    this.find({ inStock: { $ne: false } });
    next();
});
carSchema.pre('findOne', function (next) {
    this.find({ inStock: { $ne: false } });
    next();
});
exports.CarModel = (0, mongoose_1.model)('Car', carSchema);
