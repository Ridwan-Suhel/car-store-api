import { Request, Response } from "express";
import CarOrderValidationSchema from "./carOrder.validation";
import { CarOrderServices } from "./carOrder.service";

// create car controller start from here 
const createCarOrder = async(req: Request, res: Response) => {
    try{
        // storing payload order data from request body 
        const carOrder = req.body;

        //validating schema by using zod
        const parseValidateData = CarOrderValidationSchema.parse(carOrder)
        // calling service function 
        const result = await CarOrderServices.createCarOrderIntoDB(parseValidateData)
        // sending success response 
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        // sending error message when not enough quantity in db 
        if(error?.message === 'not_enough_qty_in_DB'){
            res.status(400).json({
                success: false,
                message: "Not have enough item in stock",
                error: true
            });
        }
        else{
            // sending default error
            res.status(500).json({
                success: false,
                message: "Something went  wrong",
                error: error
            });
        }
        
    }
}


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

// exporting all carorder controller from here 
export const CarOrderControllers = {
    createCarOrder,
    getTotalRevenue
} 