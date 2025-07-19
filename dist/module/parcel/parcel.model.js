"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcelSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryAgent: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelType: {
        type: String,
        enum: ['Small', 'Medium', 'Large', 'Fragile', 'Document'],
        required: true,
    },
    isCOD: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Assigned', 'Picked Up', 'In Transit', 'Delivered', 'Failed'],
        default: 'Pending',
    },
    trackingId: { type: String, required: true, unique: true },
    pickupCoordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
    deliveryCoordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
}, {
    timestamps: true,
});
exports.Parcel = (0, mongoose_1.model)('Parcel', parcelSchema);
