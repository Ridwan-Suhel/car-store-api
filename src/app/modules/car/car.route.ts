import express from 'express';
import { CarControllers } from './car.controller';

const router = express.Router();

// calling controller function here with route
router.post('/cars', CarControllers.createCar);
router.get('/cars', CarControllers.getAllCars);

export const CarRoutes = router;