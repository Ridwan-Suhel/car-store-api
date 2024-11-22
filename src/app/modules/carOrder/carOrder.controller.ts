import { Request, Response } from "express";
import CarOrderValidationSchema from "./carOrder.validation";
import { CarOrderServices } from "./carOrder.service";

const createCarOrder = async(req: Request, res: Response) => {
    try{

        const carOrder = req.body;

        //validating schema by using zod
        const parseValidateData = CarOrderValidationSchema.parse(carOrder)
        // calling service function 
        const result = await CarOrderServices.createCarOrderIntoDB(parseValidateData)
        // sending response 
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        // if(error?.message === 'lower_price'){
        //     res.status(400).json({
        //         success: false,
        //         message: "Price is lower than actual price",
        //         error: true
        //     });
        // }
        if(error?.message === 'not_enough_qty_in_DB'){
            res.status(400).json({
                success: false,
                message: "Not have enough item in stock",
                error: true
            });
        }
        else{
            res.status(500).json({
                success: false,
                message: "Something went  wrong",
                error: error
            });
        }
        
    }
}


const getTotalRevenue = async (req: Request, res: Response) => {
    try{
        const result = await CarOrderServices.getTotalRevenueFromDB();

        // console.log(result)
        res.status(200).json({
            status: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue: result
            }
        });

    }
    catch(err){
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
}

export const CarOrderControllers = {
    createCarOrder,
    getTotalRevenue
} 