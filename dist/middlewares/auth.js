"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
// Authentication middleware factory
const auth = (roles = []) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ status: false, message: 'Unauthorized: Token missing' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Check role if provided
        if (roles.length > 0 && (!decoded.role || !roles.includes(decoded.role))) {
            res.status(403).json({ status: false, message: 'Forbidden: insufficient role' });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        // console.error('JWT verification failed:', err.message);
        // Provide specific message for expired token
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ status: false, message: 'Token expired' });
        }
        else {
            res.status(401).json({ status: false, message: 'Invalid token' });
        }
    }
};
exports.default = auth;
