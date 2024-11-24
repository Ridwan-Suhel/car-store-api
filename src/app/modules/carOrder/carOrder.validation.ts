import { z } from "zod";

// validating car order by the help of zod validation 
const CarOrderValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    car: z.string().min(1, {message: "Invalid car id" }),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    totalPrice: z.number().min(0, { message: "Total price must be a positive number" }),
});

export default CarOrderValidationSchema