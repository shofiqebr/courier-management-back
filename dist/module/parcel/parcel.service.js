"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.parcelService = void 0;
const parcel_model_1 = require("./parcel.model");
const uuid_1 = require("uuid");
const mongoose_1 = __importStar(require("mongoose"));
const createParcel = (data, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = (0, uuid_1.v4)().slice(0, 8).toUpperCase(); // Generate tracking ID
    const parcel = yield parcel_model_1.Parcel.create(Object.assign(Object.assign({}, data), { customer: customerId, trackingId }));
    return parcel;
});
const getAllParcels = () => __awaiter(void 0, void 0, void 0, function* () {
    return parcel_model_1.Parcel.find().populate('customer').populate('deliveryAgent');
});
const getParcelsByCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(customerId)) {
        throw new Error('Invalid customer ID');
    }
    return parcel_model_1.Parcel.find({ customer: new mongoose_1.default.Types.ObjectId(customerId) }).populate('deliveryAgent');
});
const getParcelById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return parcel_model_1.Parcel.findById(id).populate('customer').populate('deliveryAgent');
});
const updateParcelStatus = (parcelId, deliveryAgentId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel)
        throw new Error('Parcel not found');
    if (!parcel.deliveryAgent || parcel.deliveryAgent.toString() !== deliveryAgentId) {
        throw new Error('You are not assigned to this parcel');
    }
    parcel.status = newStatus;
    // Optionally push to status history
    parcel.statusHistory = parcel.statusHistory || [];
    parcel.statusHistory.push({ status: newStatus, updatedAt: new Date() });
    yield parcel.save();
    return parcel;
});
const assignAgentToParcel = (parcelId, agentId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel)
        throw new Error('Parcel not found');
    parcel.deliveryAgent = new mongoose_1.Types.ObjectId(agentId); // 
    parcel.status = 'Assigned';
    yield parcel.save();
    return parcel;
});
exports.parcelService = {
    createParcel,
    getAllParcels,
    getParcelsByCustomer,
    getParcelById,
    updateParcelStatus,
    assignAgentToParcel
};
