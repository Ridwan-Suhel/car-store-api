"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TransactionSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    transactionStatus: zod_1.z.string().optional(),
    bank_status: zod_1.z.string().optional(),
    sp_code: zod_1.z.string().optional(),
    sp_message: zod_1.z.string().optional(),
    method: zod_1.z.string().optional(),
    date_time: zod_1.z.string().optional(),
});
// validating car order by the help of zod validation 
const CarOrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    user: zod_1.z.string().min(1, { message: "Invalid user id" }),
    car: zod_1.z.string().min(1, { message: "Invalid car id" }),
    quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
    totalPrice: zod_1.z.number().min(0, { message: "Total price must be a positive number" }),
    status: zod_1.z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"]).optional(),
    transaction: TransactionSchema.optional(),
});
exports.default = CarOrderValidationSchema;
