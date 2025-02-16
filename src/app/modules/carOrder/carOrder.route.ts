import express from 'express';
import { CarOrderControllers } from './carOrder.controller';
const router = express.Router();


// creating routes related to car order 
router.post('/orders', CarOrderControllers.createCarOrder);
router.get("/orders/verify", CarOrderControllers.verifyPayment);
router.get("/orders", CarOrderControllers.getOrders);
router.put('/orders/:orderId', CarOrderControllers.updateSingleOrder);
router.delete('/orders/:orderId', CarOrderControllers.deleteSingleOrder);

router.get('/orders/revenue', CarOrderControllers.getTotalRevenue);
export const CarOrderRoutes = router