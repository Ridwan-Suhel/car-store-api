"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const carOrder_controller_1 = require("./carOrder.controller");
const router = express_1.default.Router();
router.post('/orders', carOrder_controller_1.CarOrderControllers.createCarOrder);
router.get('/orders/revenue', carOrder_controller_1.CarOrderControllers.getTotalRevenue);
exports.CarOrderRoutes = router;