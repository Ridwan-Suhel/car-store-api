import { z } from "zod";

const loginValidationSchema = z.object({
    body : z.object({
        email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
        password: z.string({required_error: 'Password is required'})
    })
})

export const AuthValidation = {
    loginValidationSchema   
}