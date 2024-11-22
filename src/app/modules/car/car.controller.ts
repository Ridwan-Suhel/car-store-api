import { Request, Response } from "express";
import { CarServices } from "./car.service";

const createCar = async (req: Request, res: Response) => {
    try{
        const car = req.body;
        // calling service function 
        const result = await CarServices.createCarIntoDB(car)
        // sending response 
        res.status(200).json({
            success: true,
            message: "Car created successfully",
            data: result
        });
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

const getAllCars = async (req: Request, res: Response) => {
    try{
        const result = await CarServices.getAllCarsFromDB();

        res.status(200).json({
            status: true,
            message: "Cars retrieved successfully",
            data: result
        });

    }
    catch(err){
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }
}

const deleteSingleCar = async (req: Request, res: Response) => {
    try{
        const {carId} = req.params; 
        const result = await CarServices.deleteSingleCarFromDB(carId);

        res.status(200).json({
            status: true,
            message: "Car deleted successfully",
            data: {}
        });

    }
    catch(err){
        console.log(err)
    }
}

export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar
}