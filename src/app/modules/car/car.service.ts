/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICar } from "./car.interface";
import { CarModel } from "./car.model";

// creating service function here 
const createCarIntoDB = async (car: ICar) => {
    const result = await CarModel.create(car);
    return result;
}

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

const getAllCarsFromDB = async (queryParams: any) => { 
    // console.log("queryParams:", queryParams);
  
    if (queryParams) {
      const { searchTerm, category, availability, minPrice, maxPrice, model, brand } = queryParams;
  
      const filter: any = {};
  
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
      } else if (availability === "Out of Stock") {
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
      const cars = await CarModel.find(filter);
      return cars;
    } else {
        // console.log('am i calling')
      const cars = await CarModel.find();
      return cars;
    }
  };
  


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