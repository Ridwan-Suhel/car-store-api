"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_route_1 = require("./app/modules/car/car.route");
const carOrder_route_1 = require("./app/modules/carOrder/carOrder.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', car_route_1.CarRoutes);
app.use('/api', carOrder_route_1.CarOrderRoutes);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: "Welcome to car store app. API V.0.1 🔥",
    });
});
exports.default = app;
