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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarControllers = void 0;
const car_service_1 = require("./car.service");
const car_validation_1 = __importDefault(require("./car.validation"));
// create car controller start from here
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extracting request from body 
        const car = req.body;
        //validating schema by using zod
        const parseValidateData = car_validation_1.default.parse(car);
        // calling service function
        const result = yield car_service_1.CarServices.createCarIntoDB(parseValidateData);
        // sending success response to client with car data
        res.status(200).json({
            success: true,
            message: 'Car created successfully',
            data: result,
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error) {
        const { price } = req.body;
        // destructuring and storing the errors
        const { code, path, message, minimum } = error.issues[0];
        // formating error if the error for pricing issues. specially price when negative
        if (code === 'too_small' && path[0] === 'price') {
            const errorFormat = {
                message: 'Validation failed',
                success: false,
                error: {
                    name: 'ValidationError',
                    errors: {
                        price: {
                            message: message,
                            name: 'ValidatorError',
                            properties: {
                                message: message,
                                type: 'min',
                                min: minimum,
                            },
                            kind: 'min',
                            path: path[0],
                            value: price,
                        },
                    },
                },
                // stack: "Error: Something went wrong\n    at app.js:23:13\n    at..."
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            //sending error response to client 
            res.status(400).json(errorFormat);
        }
        else {
            // sending default error response from here
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error,
            });
        }
    }
});
// get all cars and search term controller start from here
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // geting search term from query (expected: category/model/brand)
        const { searchTerm, category, availability, minPrice, maxPrice, model, brand } = req.query;
        // console.log("searchTerm:", searchTerm);
        // console.log(availability)
        const result = yield car_service_1.CarServices.getAllCarsFromDB({
            searchTerm: searchTerm || "",
            category,
            availability,
            minPrice,
            maxPrice,
            model,
            brand
        });
        // sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'Cars retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        // sending default error 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// get single car controller start from here
const getSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking params from req  
        const { carId } = req.params;
        // calling service function for singlecar 
        const result = yield car_service_1.CarServices.getSingleCarFromDB(carId);
        // sending success response to client 
        res.status(200).json({
            status: true,
            message: 'Car retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        // sending default error 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// update single car controller start from here 
const updateSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking car id from req paramas 
        const { carId } = req.params;
        // storing payload data from body request 
        const payload = req.body;
        // calling service function update single car 
        const result = yield car_service_1.CarServices.updateSingleCarIntoDB(carId, payload);
        //sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'Car updated successfully',
            data: result,
        });
    }
    catch (err) {
        // sending error response to the client 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// deleing car controller start from here 
const deleteSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking car id from req paramas
        const { carId } = req.params;
        // calling service function for delete single car
        yield car_service_1.CarServices.deleteSingleCarFromDB(carId);
        // sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'Car deleted successfully',
            data: {},
        });
    }
    catch (err) {
        // sending default err 
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// exporting all car controllers  
exports.CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar,
};
