import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

// creating service function here 
const createCarIntoDB = async (car: ICar) => {
    const result = await CarModel.create(car);
    return result;
}

// creating service function for all cars and search term 
const getAllCarsFromDB = async (searchTerm?: string) => {
    if (searchTerm) {
        // Creating a case-insensitive regex for the search term
        const regex = new RegExp(searchTerm, "i");

        // Filter and return cars by search term  (expecting: brand, model, and category)
        return await CarModel.find({
            $or: [
                { brand: regex },
                { model: regex },
                { category: regex },
            ],
        });
    }

    // If no search term is provided, return all cars
    return await CarModel.find();
}

// creating service function for single car
const getSingleCarFromDB = async (id: string) => {
    const result = await CarModel.findById(id);
    return result
}

// creting interface for update payload 
interface IUpdatePayload{
    price: number,
    quantity: number
} 

// creating service function for update single car 
const updateSingleCarIntoDB = async (id: string, payload: IUpdatePayload) => {
    const result = await CarModel.findByIdAndUpdate(
        id,
        payload,
        {
            new: true
        }
    );
    return result;
}

// creating delete car service function 
const deleteSingleCarFromDB = async (id: string) => {
    const result = await CarModel.findByIdAndDelete(id);
    return result;
}

// exporting all services here 
export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateSingleCarIntoDB,
    deleteSingleCarFromDB
}