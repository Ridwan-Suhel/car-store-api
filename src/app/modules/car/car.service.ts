import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: ICar) => {
    const result = await CarModel.create(car);
    return result;
}

// const getAllCarsFromDB = async () => {
//     const result = await CarModel.find();
//     return result;
// }

const getAllCarsFromDB = async (searchTerm?: string) => {
    if (searchTerm) {
        // Create a case-insensitive regex for the search term
        const regex = new RegExp(searchTerm, "i");

        // Filter cars by search term across brand, model, and category
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

const getSingleCarFromDB = async (id: string) => {
    const result = await CarModel.findById(id);
    return result
}

interface IUpdatePayload{
    price: number,
    quantity: number
} 
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

const deleteSingleCarFromDB = async (id: string) => {
    const result = await CarModel.findByIdAndDelete(id);
    return result;
}

export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateSingleCarIntoDB,
    deleteSingleCarFromDB
}