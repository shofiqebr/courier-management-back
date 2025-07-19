"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const report_controller_1 = require("./report.controller");
const router = express_1.default.Router();
router.get('/export', (0, auth_1.default)(['admin']), report_controller_1.reportController.exportCSV);
exports.reportRoutes = router;
