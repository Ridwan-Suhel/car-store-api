"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: zod_1.z.enum(['admin', 'user'], { message: 'Role must be either admin or user' }).optional(),
    isBlocked: zod_1.z.boolean().optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
});
exports.default = UserValidationSchema;
