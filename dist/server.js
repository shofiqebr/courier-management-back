"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
// import app from './app';
// import config from './app/config';
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
exports.io = void 0;
// import mongoose from 'mongoose';
// async function main() {
//   try {
//     await mongoose.connect(config.database_url as string);
//     app.listen(config.port, () => {
//       console.log(`Example app listening on port ${config.port}`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
// main();
// server.ts or index.ts
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const server = http_1.default.createServer(app_1.default);
// 🔌 Attach Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST", "PATCH"],
        credentials: true,
    },
});
exports.io = io;
io.on('connection', (socket) => {
    // console.log('Socket connected:', socket.id);
    socket.on('joinRoom', (parcelId) => {
        socket.join(parcelId);
        // console.log(`Joined parcel room: ${parcelId}`);
    });
    socket.on('disconnect', () => {
        // console.log('Socket disconnected:', socket.id);
    });
});
// ✅ Start Mongo and Express
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            const PORT = process.env.PORT || 5000;
            server.listen(PORT, () => {
                console.log(`🚀 Server listening on port ${PORT}`);
            });
        }
        catch (err) {
            // console.error(err);
        }
    });
}
main();
