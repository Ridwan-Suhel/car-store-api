"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
// creating schema model for car and declaring with car interface 
const carSchema = new mongoose_1.Schema({
    name: { type: String },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ["Sedan", "SUV", "Truck", "Hatchback", "Electric SUV", "Coupe", "Convertible"]
    },
    description: { type: String },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
}, {
    timestamps: true
});
// middlewear for finding only available stock datas 
// carSchema.pre('find', function(next) {
//   this.find({inStock: {$ne: false}})
//   next();
// })
// carSchema.pre('findOne', function(next) {
//   this.find({inStock: {$ne: false}})
//   next();
// })
// exporting car model 
exports.CarModel = (0, mongoose_1.model)('Car', carSchema);
