import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

// calling controller function here with route
router.post('/cars', CarControllers.createCar);
router.get('/cars', CarControllers.getAllCars);
router.get('/cars/:carId', CarControllers.getSingleCar);
router.put('/cars/:carId', CarControllers.updateSingleCar);
router.delete('/cars/:carId', CarControllers.deleteSingleCar);

export const CarRoutes = router;