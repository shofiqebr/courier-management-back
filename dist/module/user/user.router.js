"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const UserRoutes = (0, express_1.Router)();
UserRoutes.get('/user', (0, auth_1.default)(['admin']), user_controller_1.userController.getAllUsers);
UserRoutes.get('/user/:id', (0, auth_1.default)(['admin', 'agent', 'customer']), user_controller_1.userController.getSingleUser);
UserRoutes.patch('/user/:id', (0, auth_1.default)(['admin']), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserSchema), user_controller_1.userController.updateUser);
UserRoutes.delete('/user/:id', (0, auth_1.default)(['admin']), user_controller_1.userController.deleteUser);
UserRoutes.patch('/update-location', (0, auth_1.default)(['agent']), user_controller_1.userController.updateLocation);
exports.default = UserRoutes;
