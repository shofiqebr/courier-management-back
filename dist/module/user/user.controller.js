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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_codes_1 = require("http-status-codes");
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, role, page = '1', limit = '10', sortBy, sortOrder } = req.query;
    const filters = {
        searchTerm: searchTerm,
        role: role,
    };
    const result = yield user_service_1.userService.getAllUsers(filters, Number(page), Number(limit), sortBy, sortOrder || 'asc');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Users fetched successfully',
        data: result.data,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_service_1.userService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'User fetched successfully',
        data: user,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const updatedUser = yield user_service_1.userService.updateUser(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'User updated successfully',
        data: updatedUser,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield user_service_1.userService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'User deleted successfully',
        data: undefined
    });
}));
const updateLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { lat, lng } = req.body;
    const agentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!agentId || typeof lat !== 'number' || typeof lng !== 'number') {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: false,
            message: 'Latitude and Longitude are required',
        });
        return;
    }
    const updatedLocation = yield user_service_1.userService.updateLocation(agentId, lat, lng);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Location updated successfully',
        data: updatedLocation,
    });
}));
exports.userController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updateLocation
};
