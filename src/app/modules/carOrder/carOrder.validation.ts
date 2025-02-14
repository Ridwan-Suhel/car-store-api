import { z } from "zod";

const TransactionSchema = z.object({
    id: z.string().optional(),
    transactionStatus: z.string().optional(),
    bank_status: z.string().optional(), 
    sp_code: z.string().optional(), 
    sp_message: z.string().optional(), 
    method: z.string().optional(), 
    date_time: z.string().optional(), 
  });

// validating car order by the help of zod validation 
const CarOrderValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    user: z.string().min(1, {message: "Invalid user id" }),
    car: z.string().min(1, {message: "Invalid car id" }),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    totalPrice: z.number().min(0, { message: "Total price must be a positive number" }),
    status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"]).optional(),
    transaction: TransactionSchema.optional(),
});

export default CarOrderValidationSchema