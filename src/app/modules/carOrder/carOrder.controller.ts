/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import CarOrderValidationSchema from "./carOrder.validation";
import { CarOrderServices } from "./carOrder.service";
import mongoose from "mongoose";

// create car controller start from here 
// const createCarOrder = async(req: Request, res: Response) => {
//     try{
//         // storing payload order data from request body 
//         const carOrder = req.body;

//         //validating schema by using zod
//         const parseValidateData = CarOrderValidationSchema.parse(carOrder)
//         // calling service function 
//         const result = await CarOrderServices.createCarOrderIntoDB(parseValidateData)
//         // sending success response 
//         res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             data: result
//         });
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     catch(error: any){
//         // sending error message when not enough quantity in db 
//         if(error?.message === 'not_enough_qty_in_DB'){
//             res.status(400).json({
//                 success: false,
//                 message: "Not have enough item in stock",
//                 error: true
//             });
//         }
//         else{
//             // sending default error
//             res.status(500).json({
//                 success: false,
//                 message: "Something went  wrong",
//                 error: error
//             });
//         }
        
//     }
// }

const createCarOrder = async (req: Request, res: Response) => {
    try {
      // Extracting order data from request body
      const carOrder = req.body;
  
      // Validate request data with Zod
      const parseValidateData = CarOrderValidationSchema.parse(carOrder);
  
      const carOrderData = {
        ...parseValidateData,
        user: new mongoose.Types.ObjectId(parseValidateData.user),
        car: new mongoose.Types.ObjectId(parseValidateData.car),
    };
      // Save order to DB
      const result = await CarOrderServices.createCarOrderIntoDB(carOrderData);

      res.status(200).json({
        success: true,
        order_verified: false,
        message: "Order created successfully",
        data: result
      });
      
    } catch (error: any) {
      if (error?.message === "not_enough_qty_in_DB") {
        res.status(400).json({
          success: false,
          message: "Not enough items in stock",
          error: true
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error
        });
      }
    }
  };

  
const verifyPayment = async (req: Request, res: Response) => {
  try{
    const order = await CarOrderServices.verifyPayment(req.query.order_id as string);

    if(order && order.verifiedPayment && order.verifiedPayment.length > 0 && order.verifiedPayment[0].bank_status === 'Success'){
      res.status(200).json({
        success: true,
        order_verified: true,
        message: "Order verified successfully",
        data: order
      });
    } else {
      res.status(200).json({
        success: true,
        order_verified: false,
        message: "Order verification failed or invalid data",
        data: order
      });
    }
    
    
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try{
    const order = await CarOrderServices.getOrders();


    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order
    });
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error
    });
  }
};

// get all total revenue controller start from here 
const getTotalRevenue = async (req: Request, res: Response) => {
    try{
        // calling total rveneu service function here 
        const result = await CarOrderServices.getTotalRevenueFromDB();

        // sending success response to the client 
        res.status(200).json({
            status: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue: result
            }
        });

    }
    catch(err){
        // sending default error 
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
}

// delete single order 
const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    // taking car id from req paramas
    const { orderId } = req.params;
    // calling service function for delete single car
    await CarOrderServices.deleteSingleOrderFromDB(orderId);

    // sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'Order deleted successfully',
      data: {},
    });
  } catch (err) {
    // sending default err 
    res.status(200).json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// update single order controller start from here 
const updateSingleOrder = async (req: Request, res: Response) => {
  try {
    // taking car id from req paramas 
    const { orderId } = req.params;
    // storing payload data from body request 
    const payload = req.body;
    // calling service function update single car 
    const result = await CarOrderServices.updateSingleOrderIntoDB(orderId, payload);

    //sending success response to the client 
    res.status(200).json({
      status: true,
      message: 'Order updated successfully',
      data: result,
    });
  } catch (err) {
    // sending error response to the client 
    res.status(200).json({
      status: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// exporting all carorder controller from here 
export const CarOrderControllers = {
    createCarOrder,
    verifyPayment,
    getTotalRevenue,
    getOrders,
    deleteSingleOrder,
    updateSingleOrder
} 