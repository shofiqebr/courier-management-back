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
exports.reportService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const parcel_model_1 = require("../parcel/parcel.model");
const json2csv_1 = require("json2csv");
const exportParcelsToCSV = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find()
        .populate('customer', 'name email')
        .populate('deliveryAgent', 'name email');
    const formatted = parcels.map((p) => {
        var _a, _b, _c;
        return ({
            trackingId: p.trackingId,
            status: p.status,
            customer: ((_a = p.customer) === null || _a === void 0 ? void 0 : _a.name) || 'N/A',
            deliveryAgent: ((_b = p.deliveryAgent) === null || _b === void 0 ? void 0 : _b.name) || 'N/A',
            amount: p.amount,
            isCOD: p.isCOD ? 'COD' : 'Prepaid',
            pickupAddress: p.pickupAddress,
            deliveryAddress: p.deliveryAddress,
            createdAt: (_c = p.createdAt) === null || _c === void 0 ? void 0 : _c.toISOString(),
        });
    });
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(formatted);
    return csv;
});
exports.reportService = {
    exportParcelsToCSV,
};
