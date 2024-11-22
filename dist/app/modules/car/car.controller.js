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
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = req.body;
        //validating schema by using zod
        const parseValidateData = car_validation_1.default.parse(car);
        // calling service function 
        const result = yield car_service_1.CarServices.createCarIntoDB(parseValidateData);
        // sending response 
        res.status(200).json({
            success: true,
            message: "Car created successfully",
            data: result
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error) {
        const { code, path, message, minimum } = error.issues[0];
        console.log(error === null || error === void 0 ? void 0 : error.issues[0]);
        console.log(error.stack);
        const { price } = req.body;
        if (code === 'too_small' && path[0] === 'price') {
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
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error
            });
        }
    }
});
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
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield car_service_1.CarServices.getAllCarsFromDB(searchTerm);
        res.status(200).json({
            status: true,
            message: "Cars retrieved successfully",
            data: result
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
const getSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield car_service_1.CarServices.getSingleCarFromDB(carId);
        res.status(200).json({
            status: true,
            message: "Car retrieved successfully",
            data: result
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
const updateSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const payload = req.body;
        const result = yield car_service_1.CarServices.updateSingleCarIntoDB(carId, payload);
        res.status(200).json({
            status: true,
            message: "Car updated successfully",
            data: result
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
const deleteSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        yield car_service_1.CarServices.deleteSingleCarFromDB(carId);
        res.status(200).json({
            status: true,
            message: "Car deleted successfully",
            data: {}
        });
    }
    catch (err) {
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
exports.CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar
};
