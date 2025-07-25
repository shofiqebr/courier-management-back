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
exports.analyticsService = void 0;
const parcel_model_1 = require("../parcel/parcel.model");
const user_model_1 = require("../user/user.model");
const getParcelStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [totalParcels, pendingDeliveries, completedDeliveries, cancelledParcels, failedDeliveries, codParcels, totalUsers, deliveryAgents, dailyBookings,] = yield Promise.all([
        parcel_model_1.Parcel.countDocuments(),
        parcel_model_1.Parcel.countDocuments({ status: 'Pending' }),
        parcel_model_1.Parcel.countDocuments({ status: 'Delivered' }),
        parcel_model_1.Parcel.countDocuments({ status: 'Cancelled' }),
        parcel_model_1.Parcel.countDocuments({ status: 'Failed' }),
        parcel_model_1.Parcel.find({ isCOD: true }),
        user_model_1.User.countDocuments(),
        user_model_1.User.countDocuments({ role: 'delivery-agent' }),
        parcel_model_1.Parcel.countDocuments({ createdAt: { $gte: today } }),
    ]);
    const codAmount = codParcels.reduce((sum, parcel) => sum + parcel.amount, 0);
    return {
        totalParcels,
        pendingDeliveries,
        completedDeliveries,
        cancelledParcels,
        failedDeliveries,
        codAmount,
        totalUsers,
        deliveryAgents,
        dailyBookings,
    };
});
exports.analyticsService = {
    getParcelStats,
};
