/* eslint-disable @typescript-eslint/no-explicit-any */
// import { AppError } from "../../shared/appError";
import { ICarOrder } from "./carOrder.interface"
import { CarOrderModel } from "./carOrder.model"
import { orderUtils } from "./order.utils";
// import { orderUtils } from "./order.utils";

// creating service function for car order 
const createCarOrderIntoDB = async (carOrder: ICarOrder) => {
    const result = await CarOrderModel.create(carOrder);
    // return result;

    // Populate user (excluding password) and car details
          const populatedOrder = await result.populate([
            { path: "user", select: "-password" },
            { path: "car" }
          ]);
    
          // payment integration
          const shurjopayPayload = {
            amount: Number(populatedOrder?.totalPrice),
            order_id: populatedOrder?._id,
            currency: "BDT",
            customer_name: (populatedOrder?.user as any).name,
            customer_address: (populatedOrder?.user as any).address ? (populatedOrder?.user as any).address : 'Anonymous',
            customer_email: (populatedOrder?.user as any).email,
            customer_phone: (populatedOrder?.user as any).phone ? (populatedOrder?.user as any).phone : 'Anonymous',
            customer_city: (populatedOrder?.user as any).city ? (populatedOrder?.user as any).city : 'Anonymous',
            client_ip: '',
          };
    
          const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
          console.log(payment)
    
          if (payment?.transactionStatus || payment?.transactionStatus == 'Initiated') {
            await CarOrderModel.updateOne(
                { _id: populatedOrder._id },
                { 
                    $set: { 
                        "transaction.id": payment.sp_order_id,
                        "transaction.transactionStatus": payment.transactionStatus,
                    } 
                }
            );
          }

          const returnData = {
            order: result,
            payment
          }

          return returnData
    
          // console.log('payurl === ', payment.checkout_url);
          // console.log('result === ', result);
          // console.log('payment === ', payment);
          // return payment.checkout_url
}

// verify payment 
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    const updatedData = await CarOrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    ).populate("car");

    const carDetails = updatedData?.car ? updatedData?.car : null;

    return {
      verifiedPayment,
      car_details: carDetails,
    };
    
  }
  else{
    return {
      verifiedPayment: null,
      car_details: null
    }  
  }
};

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

const getOrders = async () => {
  const data = await CarOrderModel.find();
  return data;
};

// exporting all carorder services 
export const CarOrderServices = {
    createCarOrderIntoDB,
    getTotalRevenueFromDB,
    verifyPayment,
    getOrders
}