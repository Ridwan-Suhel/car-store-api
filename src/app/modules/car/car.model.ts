import { Schema, model } from 'mongoose';
import { ICar } from './car.interface';

// creating schema model for car and declaring with car interface 
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


// middlewear for finding only available stock datas 
carSchema.pre('find', function(next) {
  this.find({inStock: {$ne: false}})
  next();
})
carSchema.pre('findOne', function(next) {
  this.find({inStock: {$ne: false}})
  next();
})

// exporting car model 
export const CarModel = model<ICar>('Car', carSchema);


