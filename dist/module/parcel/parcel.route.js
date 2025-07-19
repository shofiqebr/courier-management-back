"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parcel_controller_1 = require("./parcel.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const parcel_validation_1 = require("./parcel.validation");
const parcelRouter = (0, express_1.Router)();
parcelRouter.post('/parcel', (0, auth_1.default)(['customer']), (0, validateRequest_1.default)(parcel_validation_1.ParcelValidation.createParcelZodSchema), parcel_controller_1.parcelController.createParcel);
parcelRouter.get('/parcel/my-bookings', (0, auth_1.default)(['customer']), parcel_controller_1.parcelController.getMyParcels);
parcelRouter.get('/parcel/:id', (0, auth_1.default)(['admin', 'customer', 'delivery']), parcel_controller_1.parcelController.getSingleParcel);
parcelRouter.get('/parcel', (0, auth_1.default)(['admin']), parcel_controller_1.parcelController.getAllParcels);
parcelRouter.patch('/parcel/:id/status', (0, auth_1.default)(['delivery']), (0, validateRequest_1.default)(parcel_validation_1.ParcelValidation.updateStatusSchema), parcel_controller_1.parcelController.updateStatus);
parcelRouter.post('/assign-agent', (0, auth_1.default)(['admin']), parcel_controller_1.parcelController.assignAgent);
exports.default = parcelRouter;
