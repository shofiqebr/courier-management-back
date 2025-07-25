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
exports.parcelController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const parcel_service_1 = require("./parcel.service");
const http_status_codes_1 = require("http-status-codes");
const createParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!customerId) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            status: false,
            message: 'Unauthorized: Customer ID missing from token',
        });
        return; // exit the function here
    }
    const result = yield parcel_service_1.parcelService.createParcel(req.body, customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        status: true,
        message: 'Parcel created successfully',
        data: result,
    });
}));
const getAllParcels = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.parcelService.getAllParcels();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'All parcels retrieved',
        data: result,
    });
}));
const getMyParcels = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield parcel_service_1.parcelService.getParcelsByCustomer(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Customer bookings fetched',
        data: result,
    });
}));
const getSingleParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield parcel_service_1.parcelService.getParcelById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Parcel fetched successfully',
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.id;
    const agentId = req.user._id;
    const { status } = req.body;
    if (!agentId) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            status: false,
            message: 'Unauthorized: Delivery agent ID missing from token',
        });
        return;
    }
    const result = yield parcel_service_1.parcelService.updateParcelStatus(parcelId, agentId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Parcel status updated successfully',
        data: result,
    });
}));
const assignAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId, agentId } = req.body;
    if (!parcelId || !agentId) {
        res.status(400).json({
            status: false,
            message: 'parcelId and agentId are required',
        });
        return;
    }
    const result = yield parcel_service_1.parcelService.assignAgentToParcel(parcelId, agentId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        status: true,
        message: 'Agent assigned to parcel successfully',
        data: result,
    });
}));
exports.parcelController = {
    createParcel,
    getAllParcels,
    getMyParcels,
    getSingleParcel,
    updateStatus,
    assignAgent
};
