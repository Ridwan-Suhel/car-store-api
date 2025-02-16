"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const car_route_1 = require("./app/modules/car/car.route");
const carOrder_route_1 = require("./app/modules/carOrder/carOrder.route");
const user_route_1 = require("./app/modules/user/user.route");
const auth_routes_1 = require("./app/modules/Auth/auth.routes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'https://carnest-ashy.vercel.app' }));
//routes related to auths
app.use('/api/v1', user_route_1.UserRoutes);
app.use('/api/v1', auth_routes_1.AuthRoutes);
// routes related to car 
app.use('/api/v1', car_route_1.CarRoutes);
app.use('/api/v1', carOrder_route_1.CarOrderRoutes);
// root routes for for Car store app api
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: "Welcome to car store app. API V.0.1 🔥",
    });
});
// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            statusCode,
        },
    });
    next();
});
// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
