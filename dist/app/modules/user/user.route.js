"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_constant_1 = require("./user.constant");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const router = express_1.default.Router();
// calling controller function here with route
router.post('/auth/register', user_controller_1.UserController.createUser);
router.get('/auth/users', user_controller_1.UserController.getAllUsers);
router.get('/auth/user/:userId', user_controller_1.UserController.getSingleUser);
router.put('/auth/:userId', user_controller_1.UserController.updateSingleUser);
router.put('/auth/password/:userId', user_controller_1.UserController.updateSingleUserByPassword);
router.patch('/admin/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.BlockUser);
exports.UserRoutes = router;
