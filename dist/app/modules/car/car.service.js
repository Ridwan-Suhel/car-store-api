"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const car_model_1 = require("./car.model");
const createCarIntoDB = (car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.create(car);
    return result;
});
// const getAllCarsFromDB = async () => {
//     const result = await CarModel.find();
//     return result;
// }
const getAllCarsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) {
        // Create a case-insensitive regex for the search term
        const regex = new RegExp(searchTerm, "i");
        // Filter cars by search term across brand, model, and category
        return yield car_model_1.CarModel.find({
            $or: [
                { brand: regex },
                { model: regex },
                { category: regex },
            ],
        });
    }
    // If no search term is provided, return all cars
    return yield car_model_1.CarModel.find();
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findById(id);
    return result;
});
const updateSingleCarIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const deleteSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndDelete(id);
    return result;
});
exports.CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateSingleCarIntoDB,
    deleteSingleCarFromDB
};
