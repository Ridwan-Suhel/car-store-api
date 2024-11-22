import { Schema, model } from 'mongoose';
import { ICarOrder } from './carOrder.interface';
import { CarModel } from '../car/car.model';
import { CarServices } from '../car/car.service';

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
carOrderSchema.pre('save', async function (next) {
    const id = this.car;
    const result = await CarModel.findById(id);

    if(result){
        const {quantity: dbQuantity, price} = result;

        if(dbQuantity >= this.quantity){
            const payload = {
                price: price,
                quantity: dbQuantity - this.quantity,
                inStock: true,
              }
            
            if(payload.quantity === 0){
                payload.inStock = false
            }
            const result = await CarServices.updateSingleCarIntoDB(id, payload);
            if(result){
                next()
            }else{
                const error = new Error('not_enough_qty_in_DB');
                return next(error);
            }
        }else{
            const error = new Error('not_enough_qty_in_DB');
            return next(error);
        }

    }else{
        const error = new Error('Car not found');
        return next(error); 
    }
})


 export const CarOrderModel = model('carOrder', carOrderSchema);