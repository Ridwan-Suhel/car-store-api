import { z } from "zod";

const UserValidationSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['admin', 'user'], { message: 'Role must be either admin or user' }).optional(),
    isBlocked: z.boolean().optional()
})

export default UserValidationSchema;