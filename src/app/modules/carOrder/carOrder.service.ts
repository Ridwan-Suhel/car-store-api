import { ICarOrder } from "./carOrder.interface"
import { CarOrderModel } from "./carOrder.model"

const createCarOrderIntoDB = async (carOrder: ICarOrder) => {
    const result = await CarOrderModel.create(carOrder);
    return result
}

const getTotalRevenueFromDB = async () => {
    // const result = await CarOrderModel.find();
    const result = await CarOrderModel.aggregate([
        {
          $group: {
            _id: null, 
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
          },
        },
      ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    return totalRevenue
}


export const CarOrderServices = {
    createCarOrderIntoDB,
    getTotalRevenueFromDB
}