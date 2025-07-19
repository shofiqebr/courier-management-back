"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
exports.userValidation = {
    updateUserSchema: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            role: zod_1.z.enum(['admin', 'agent', 'customer']).optional(),
            password: zod_1.z.string().min(5).optional(),
        }),
    }),
};
