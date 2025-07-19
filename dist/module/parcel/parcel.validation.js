"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelValidation = void 0;
const zod_1 = require("zod");
exports.ParcelValidation = {
    createParcelZodSchema: zod_1.z.object({
        body: zod_1.z.object({
            pickupAddress: zod_1.z.string().min(5),
            deliveryAddress: zod_1.z.string().min(5),
            parcelType: zod_1.z.enum(['Small', 'Medium', 'Large', 'Fragile', 'Document']),
            isCOD: zod_1.z.boolean(),
            amount: zod_1.z.number().min(0),
            deliveryCoordinates: zod_1.z.object({
                lat: zod_1.z.number(),
                lng: zod_1.z.number(),
            }).optional(),
            pickupCoordinates: zod_1.z.object({
                lat: zod_1.z.number(),
                lng: zod_1.z.number(),
            }).optional(),
        }),
    }),
    updateStatusSchema: zod_1.z.object({
        body: zod_1.z.object({
            status: zod_1.z.enum(['Picked Up', 'In Transit', 'Delivered', 'Failed']),
        }),
    }),
};
