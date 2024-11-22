import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: ICar) => {
    const result = await CarModel.create(car);
    return result;
}

const getAllCarsFromDB = async () => {
    const result = await CarModel.find();
    return result;
}

const getSingleCarFromDB = async (id: string) => {
    const result = await CarModel.findById(id);
    return result
}

const updateSingleCarIntoDB = async (id: string, payload: ICar) => {
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