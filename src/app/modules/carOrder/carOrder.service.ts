import { ICarOrder } from "./carOrder.interface"
import { CarOrderModel } from "./carOrder.model"

// creating service function for car order 
const createCarOrderIntoDB = async (carOrder: ICarOrder) => {
    const result = await CarOrderModel.create(carOrder);
    return result
}

// creting total revenue service from here 
const getTotalRevenueFromDB = async () => {
  // calculating car order revenue by the help of aggregation method 
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
    // returning calculated data 
    return totalRevenue
}

// exporting all carorder services 
export const CarOrderServices = {
    createCarOrderIntoDB,
    getTotalRevenueFromDB
}