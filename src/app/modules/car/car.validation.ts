import { z } from "zod";

// validating car model with zod validatior  
const CarValidationSchema = z.object({
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    year: z.number()
    .lte(new Date().getFullYear(), {
      message: `Year cannot exceed ${new Date().getFullYear()}`,
    }),
    price: z.number()
    .min(0, {message: 'Price must be a positive number'}),
    category: z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
        message: "Category must be one of Sedan, SUV, Truck, Coupe, Convertible",
      }),
    description: z.string()
    .max(500, { message: "Description must be 500 characters or fewer" }),
    quantity: z.number()
    .int({ message: "Quantity must be an integer" }) 
    .min(0, { message: "Quantity must be at least 0" }),
    inStock: z.boolean(),
});

export default CarValidationSchema