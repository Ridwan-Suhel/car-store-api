"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CarValidationSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, { message: "Brand is required" }),
    model: zod_1.z.string().min(1, { message: "Model is required" }),
    year: zod_1.z.number()
        .lte(new Date().getFullYear(), {
        message: `Year cannot exceed ${new Date().getFullYear()}`,
    }),
    price: zod_1.z.number()
        .min(0, { message: 'Price must be a positive number' }),
    category: zod_1.z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
        message: "Category must be one of Sedan, SUV, Truck, Coupe, Convertible",
    }),
    description: zod_1.z.string()
        .max(500, { message: "Description must be 500 characters or fewer" }),
    quantity: zod_1.z.number()
        .int({ message: "Quantity must be an integer" })
        .min(0, { message: "Quantity must be at least 0" }),
    inStock: zod_1.z.boolean(),
});
exports.default = CarValidationSchema;
