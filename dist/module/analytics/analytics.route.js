"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/analytics/stats', (0, auth_1.default)(['admin']), analytics_controller_1.analyticsController.getStats);
exports.analyticsRoutes = router;
