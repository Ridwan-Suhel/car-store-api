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
exports.CarOrderControllers = void 0;
const carOrder_validation_1 = __importDefault(require("./carOrder.validation"));
const carOrder_service_1 = require("./carOrder.service");
const mongoose_1 = __importDefault(require("mongoose"));
// create car controller start from here 
// const createCarOrder = async(req: Request, res: Response) => {
//     try{
//         // storing payload order data from request body 
//         const carOrder = req.body;
//         //validating schema by using zod
//         const parseValidateData = CarOrderValidationSchema.parse(carOrder)
//         // calling service function 
//         const result = await CarOrderServices.createCarOrderIntoDB(parseValidateData)
//         // sending success response 
//         res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             data: result
//         });
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     catch(error: any){
//         // sending error message when not enough quantity in db 
//         if(error?.message === 'not_enough_qty_in_DB'){
//             res.status(400).json({
//                 success: false,
//                 message: "Not have enough item in stock",
//                 error: true
//             });
//         }
//         else{
//             // sending default error
//             res.status(500).json({
//                 success: false,
//                 message: "Something went  wrong",
//                 error: error
//             });
//         }
//     }
// }
const createCarOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting order data from request body
        const carOrder = req.body;
        // Validate request data with Zod
        const parseValidateData = carOrder_validation_1.default.parse(carOrder);
        const carOrderData = Object.assign(Object.assign({}, parseValidateData), { user: new mongoose_1.default.Types.ObjectId(parseValidateData.user), car: new mongoose_1.default.Types.ObjectId(parseValidateData.car) });
        // Save order to DB
        const result = yield carOrder_service_1.CarOrderServices.createCarOrderIntoDB(carOrderData);
        res.status(200).json({
            success: true,
            order_verified: false,
            message: "Order created successfully",
            data: result
        });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "not_enough_qty_in_DB") {
            res.status(400).json({
                success: false,
                message: "Not enough items in stock",
                error: true
            });
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
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield carOrder_service_1.CarOrderServices.verifyPayment(req.query.order_id);
        if (order && order.verifiedPayment && order.verifiedPayment.length > 0 && order.verifiedPayment[0].bank_status === 'Success') {
            res.status(200).json({
                success: true,
                order_verified: true,
                message: "Order verified successfully",
                data: order
            });
        }
        else {
            res.status(200).json({
                success: true,
                order_verified: false,
                message: "Order verification failed or invalid data",
                data: order
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield carOrder_service_1.CarOrderServices.getOrders();
        res.status(200).json({
            success: true,
            message: "Order retrieved successfully",
            data: order
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        });
    }
});
// get all total revenue controller start from here 
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // calling total rveneu service function here 
        const result = yield carOrder_service_1.CarOrderServices.getTotalRevenueFromDB();
        // sending success response to the client 
        res.status(200).json({
            status: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue: result
            }
        });
    }
    catch (err) {
        // sending default error 
        res.status(200).json({
            status: false,
            message: "Something went wrong",
            error: err
        });
    }
});
// delete single order 
const deleteSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking car id from req paramas
        const { orderId } = req.params;
        // calling service function for delete single car
        yield carOrder_service_1.CarOrderServices.deleteSingleOrderFromDB(orderId);
        // sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'Order deleted successfully',
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
// update single order controller start from here 
const updateSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // taking car id from req paramas 
        const { orderId } = req.params;
        // storing payload data from body request 
        const payload = req.body;
        // calling service function update single car 
        const result = yield carOrder_service_1.CarOrderServices.updateSingleOrderIntoDB(orderId, payload);
        //sending success response to the client 
        res.status(200).json({
            status: true,
            message: 'Order updated successfully',
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
// exporting all carorder controller from here 
exports.CarOrderControllers = {
    createCarOrder,
    verifyPayment,
    getTotalRevenue,
    getOrders,
    deleteSingleOrder,
    updateSingleOrder
};
