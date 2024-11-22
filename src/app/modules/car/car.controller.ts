import { Request, Response } from "express";
import { CarServices } from "./car.service";
import CarValidationSchema  from "./car.validation";



const createCar = async (req: Request, res: Response) => {
    try{

        const car = req.body;

        //validating schema by using zod
        const parseValidateData = CarValidationSchema.parse(car)
        // calling service function 
        const result = await CarServices.createCarIntoDB(parseValidateData)
        // sending response 
        res.status(200).json({
            success: true,
            message: "Car created successfully",
            data: result
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        const {code, path, message, minimum} = error.issues[0];
        console.log(error?.issues[0]);
        console.log((error as Error).stack)
        const {price} = req.body;
        if(code === 'too_small' && path[0] === 'price'){
            const errorFormat = {
                message: "Validation failed",
                success: false,
                error: {
                  name: "ValidationError",
                  errors: {
                    price: {
                      message: message,
                      name: "ValidatorError",
                      properties: {
                        message: message,
                        type: "min",
                        min: minimum,
                      },
                      kind: "min",
                      path: path[0],
                      value: price
                    }
                  }
                },
                // stack: "Error: Something went wrong\n    at app.js:23:13\n    at..."
                stack: `Error: Something went wrong \n ${(error as Error).stack}`,
              };

            res.status(400).json(errorFormat);
        }else{
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error
            });
        }
    }
}

// const getAllCars = async (req: Request, res: Response) => {
//     try{
//         const result = await CarServices.getAllCarsFromDB();

//         res.status(200).json({
//             status: true,
//             message: "Cars retrieved successfully",
//             data: result
//         });

//     }
//     catch(err){
//         res.status(200).json({
//             status: false,
//             message: "Something went wrong",
//             error: err
//         });
//     }
// }
const getAllCars = async (req: Request, res: Response) => {
    try{
        const { searchTerm } = req.query;
        const result = await CarServices.getAllCarsFromDB(searchTerm as string);

        res.status(200).json({
            status: true,
            message: "Cars retrieved successfully",
            data: result
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

const getSingleCar = async (req: Request, res: Response) => {
    try{
        const {carId} = req.params; 
        const result = await CarServices.getSingleCarFromDB(carId);

        res.status(200).json({
            status: true,
            message: "Car retrieved successfully",
            data: result
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
const updateSingleCar = async (req: Request, res: Response) => {
    try{
        const {carId} = req.params; 
        const payload = req.body; 
        const result = await CarServices.updateSingleCarIntoDB(carId, payload);

        res.status(200).json({
            status: true,
            message: "Car updated successfully",
            data: result
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

const deleteSingleCar = async (req: Request, res: Response) => {
    try{
        const {carId} = req.params; 
        await CarServices.deleteSingleCarFromDB(carId);

        res.status(200).json({
            status: true,
            message: "Car deleted successfully",
            data: {}
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

export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar
}