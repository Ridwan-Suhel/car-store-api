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
// creating service function here 
const createCarIntoDB = (car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.create(car);
    return result;
});
// creating service function for all cars and search term 
// const getAllCarsFromDB = async (searchTerm?: string) => {
//     if (searchTerm) {
//         console.log(searchTerm)
//         // Creating a case-insensitive regex for the search term
//         const regex = new RegExp(searchTerm, "i");
//         // Filter and return cars by search term  (expecting: brand, model, and category)
//         return await CarModel.find({
//             $or: [
//                 { brand: regex },
//                 { model: regex },
//                 { category: regex },
//             ],
//         });
//     }
//     // If no search term is provided, return all cars
//     return await CarModel.find();
// }
const getAllCarsFromDB = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("queryParams:", queryParams);
    if (queryParams) {
        const { searchTerm, category, availability, minPrice, maxPrice, model, brand } = queryParams;
        const filter = {};
        // If a search term exists, apply regex filtering
        // console.log(searchTerm)
        if (searchTerm) {
            const regex = new RegExp(searchTerm, "i");
            filter.$or = [{ brand: regex }, { model: regex }, { category: regex }];
        }
        // Apply other filters
        if (category && category !== "null") {
            filter.category = category;
        }
        if (model && model !== "null") {
            filter.model = model;
        }
        if (brand && brand !== "null") {
            filter.brand = brand;
        }
        if (availability === "In Stock") {
            filter.inStock = true;
        }
        else if (availability === "Out of Stock") {
            filter.inStock = false;
        }
        if (minPrice || maxPrice) {
            const min = minPrice ? Number(minPrice) : 0;
            const max = maxPrice ? Number(maxPrice) : 0;
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }
        // console.log('Filter=:', filter);
        const cars = yield car_model_1.CarModel.find(filter);
        return cars;
    }
    else {
        // console.log('am i calling')
        const cars = yield car_model_1.CarModel.find();
        return cars;
    }
});
// creating service function for single car
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findById(id);
    return result;
});
// creating service function for update single car 
const updateSingleCarIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
// creating delete car service function 
const deleteSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.CarModel.findByIdAndDelete(id);
    return result;
});
// exporting all services here 
exports.CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateSingleCarIntoDB,
    deleteSingleCarFromDB
};
