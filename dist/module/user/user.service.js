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
exports.userService = void 0;
const user_model_1 = require("./user.model");
const getAllUsers = (filters_1, ...args_1) => __awaiter(void 0, [filters_1, ...args_1], void 0, function* (filters, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc') {
    const skip = (page - 1) * limit;
    const { searchTerm, role } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { id: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
            ],
        });
    }
    if (role) {
        andConditions.push({ role });
    }
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const users = yield user_model_1.User.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .select('-password');
    const total = yield user_model_1.User.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: users,
    };
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select('-password');
    return user;
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true }).select('-password');
    return updatedUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findByIdAndDelete(userId);
});
const updateLocation = (userId, lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user || user.role !== 'agent') {
        throw new Error('Only delivery agents can update location');
    }
    user.location = { lat, lng };
    yield user.save();
    return user.location;
});
exports.userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updateLocation
};
