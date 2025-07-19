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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const report_service_1 = require("./report.service");
const exportCSV = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = yield report_service_1.reportService.exportParcelsToCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('parcel-report.csv');
    res.send(csv); // ✅ No need to use sendResponse here since it's a file download
}));
exports.reportController = {
    exportCSV,
};
