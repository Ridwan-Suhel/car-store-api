import { Schema, model } from 'mongoose';
import { ICarOrder } from './carOrder.interface';
import { CarModel } from '../car/car.model';
import { CarServices } from '../car/car.service';

// creating scheam / model for car order with interface
const carOrderSchema = new Schema<ICarOrder>({
    email: { type: String, required: true },
    car: { 
        type: String,
        ref: "Car",
        required: true 
    },
    quantity: { type: Number, required: true },
    totalPrice : { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// pre save middlewear 
//creating pre middlewear for check the quantity available or not in DB
carOrderSchema.pre('save', async function (next) {
    // checking is cuurent id availeble in my db or not that wanted to order a user
    const id = this.car;
    const result = await CarModel.findById(id);

    if(result){
        const {quantity: dbQuantity, price} = result;

        //creating logic here when id availble (making stock false when car qty 0 in db )
        if(dbQuantity >= this.quantity){
            const payload = {
                price: price,
                quantity: dbQuantity - this.quantity,
                inStock: true,
              }
            
            if(payload.quantity === 0){
                payload.inStock = false
            }
            // updating single car with reducing quantity and making stock false if there is not availble in dn
            const result = await CarServices.updateSingleCarIntoDB(id, payload);
            if(result){
                next()
            }else{
                // throwing error when there is not enough qty in db
                const error = new Error('not_enough_qty_in_DB');
                return next(error);
            }
        }else{
            const error = new Error('not_enough_qty_in_DB');
            return next(error);
        }

    }else{
        // throwing error when car not availeble 
        const error = new Error('Car not found');
        return next(error); 
    }
})


 export const CarOrderModel = model('carOrder', carOrderSchema);