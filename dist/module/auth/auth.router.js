"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const authRouter = (0, express_1.Router)();
authRouter.post('/auth/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registerValidationSchema), auth_controller_1.authController.register);
authRouter.post('/auth/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.authController.login);
exports.default = authRouter;
