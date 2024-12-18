import express from 'express';
import { CarOrderControllers } from './carOrder.controller';
const router = express.Router();


// creating routes related to car order 
router.post('/orders', CarOrderControllers.createCarOrder);
router.get('/orders/revenue', CarOrderControllers.getTotalRevenue);
export const CarOrderRoutes = router