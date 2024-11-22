import { Schema, model } from 'mongoose';
import { ICar } from './car.interface';

const carSchema = new Schema<ICar>(
  {
    brand: { type: String},
    model: { type: String},
    year: {type: Number},
    price: {type: Number, required: true},
    category: {
      type: String,
      enum: ["Sedan", "SUV" , "Truck" , "Coupe" , "Convertible"]
    },
    description: { type: String },
    quantity: { type: Number, required: true},
    inStock: {type: Boolean},
  },
  {
    timestamps: true
  }
);

export const CarModel = model<ICar>('Car', carSchema);


