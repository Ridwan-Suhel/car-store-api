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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarOrderServices = void 0;
const carOrder_model_1 = require("./carOrder.model");
const order_utils_1 = require("./order.utils");
// import { orderUtils } from "./order.utils";
// creating service function for car order 
const createCarOrderIntoDB = (carOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carOrder_model_1.CarOrderModel.create(carOrder);
    // return result;
    // Populate user (excluding password) and car details
    const populatedOrder = yield result.populate([
        { path: "user", select: "-password" },
        { path: "car" }
    ]);
    // payment integration
    const shurjopayPayload = {
        amount: Number(populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.totalPrice),
        order_id: populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder._id,
        currency: "BDT",
        customer_name: (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).name,
        customer_address: (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).address ? (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).address : 'Anonymous',
        customer_email: (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).email,
        customer_phone: (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).phone ? (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).phone : 'Anonymous',
        customer_city: (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).city ? (populatedOrder === null || populatedOrder === void 0 ? void 0 : populatedOrder.user).city : 'Anonymous',
        client_ip: '',
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    // console.log(payment)
    if ((payment === null || payment === void 0 ? void 0 : payment.transactionStatus) || (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) == 'Initiated') {
        yield carOrder_model_1.CarOrderModel.updateOne({ _id: populatedOrder._id }, {
            $set: {
                "transaction.id": payment.sp_order_id,
                "transaction.transactionStatus": payment.transactionStatus,
            }
        });
    }
    const returnData = {
        order: result,
        payment
    };
    return returnData;
    // console.log('payurl === ', payment.checkout_url);
    // console.log('result === ', result);
    // console.log('payment === ', payment);
    // return payment.checkout_url
});
// verify payment 
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        const updatedData = yield carOrder_model_1.CarOrderModel.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status == "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status == "Cancel"
                        ? "Cancelled"
                        : "",
        }).populate("car");
        const carDetails = (updatedData === null || updatedData === void 0 ? void 0 : updatedData.car) ? updatedData === null || updatedData === void 0 ? void 0 : updatedData.car : null;
        return {
            verifiedPayment,
            car_details: carDetails,
        };
    }
    else {
        return {
            verifiedPayment: null,
            car_details: null
        };
    }
});
// creting total revenue service from here 
const getTotalRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // calculating car order revenue by the help of aggregation method 
    const result = yield carOrder_model_1.CarOrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    const totalRevenue = ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
    // returning calculated data 
    return totalRevenue;
});
// const getOrders = async () => {
//   const data = await CarOrderModel.find();
//   return data;
// };
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield carOrder_model_1.CarOrderModel.find()
        .populate('user')
        .populate('car');
    return data;
});
// creating delete order service function 
const deleteSingleOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carOrder_model_1.CarOrderModel.findByIdAndDelete(id);
    return result;
});
// creating service function for update single order 
const updateSingleOrderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // const carOrderData = {
    //         ...parseValidateData,
    //         user: new mongoose.Types.ObjectId(parseValidateData.user),
    //         car: new mongoose.Types.ObjectId(parseValidateData.car),
    //     };
    const result = yield carOrder_model_1.CarOrderModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    // console.log(result)
    return result;
});
// exporting all carorder services 
exports.CarOrderServices = {
    createCarOrderIntoDB,
    getTotalRevenueFromDB,
    verifyPayment,
    getOrders,
    deleteSingleOrderFromDB,
    updateSingleOrderIntoDB
};
