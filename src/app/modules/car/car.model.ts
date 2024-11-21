import { Schema, model, connect } from 'mongoose';
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    category: ["Sedan", "SUV" , "Truck" , "Coupe" , "Convertible"],
    description: { type: String },
    quantity: { type: Number, required: true},
    inStock: {type: Boolean, required: true}
  });

export const CarModel = model<ICar>('Car', carSchema);


