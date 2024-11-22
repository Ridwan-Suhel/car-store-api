"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const router = express_1.default.Router();
// calling controller function here with route
router.post('/cars', car_controller_1.CarControllers.createCar);
router.get('/cars', car_controller_1.CarControllers.getAllCars);
router.get('/cars/:carId', car_controller_1.CarControllers.getSingleCar);
router.put('/cars/:carId', car_controller_1.CarControllers.updateSingleCar);
router.delete('/cars/:carId', car_controller_1.CarControllers.deleteSingleCar);
exports.CarRoutes = router;
