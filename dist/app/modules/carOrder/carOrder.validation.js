"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CarOrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    car: zod_1.z.string().min(1, { message: "Invalid car id" }),
    quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
    totalPrice: zod_1.z.number().min(0, { message: "Total price must be a positive number" }),
});
exports.default = CarOrderValidationSchema;
