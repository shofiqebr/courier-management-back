"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerBody = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required' }),
    id: zod_1.z.string({ required_error: 'ID is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string(),
    role: zod_1.z.enum(['admin', 'agent', 'customer']).optional(),
});
const loginBody = zod_1.z.object({
    id: zod_1.z.string({ required_error: 'ID is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
});
exports.AuthValidation = {
    registerValidationSchema: zod_1.z.object({ body: registerBody }),
    loginValidationSchema: zod_1.z.object({ body: loginBody }),
};
