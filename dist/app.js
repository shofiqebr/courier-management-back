'use strict';
// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import cookieParser from "cookie-parser";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// import authRouter from './module/auth/auth.router';
// import UserRoutes from './module/user/user.router';
// import parcelRouter from './module/parcel/parcel.route';
// import { analyticsRoutes } from './module/analytics/analytics.route';
// import { reportRoutes } from './module/report/report.route';
// const app: Application = express();
// // Allow multiple origins dynamically
// const allowedOrigins = [
//   "http://localhost:3000"
// ];
// app.use(cookieParser());
// app.use(express.json());
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       // Allow requests from allowed origins
//       callback(null, true);
//     } else {
//       // Reject requests from other origins
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies with cross-origin requests
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use("/api", UserRoutes);
// app.use("/api", authRouter);
// app.use("/api", parcelRouter);
// app.use("/api", analyticsRoutes);
// app.use("/api", reportRoutes);
// app.get('/', (req: Request, res: Response) => {
//   res.send("Hello from courier and parcel management");
// });
// export default app;
// app.ts
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const auth_router_1 = __importDefault(require('./module/auth/auth.router'));
const user_router_1 = __importDefault(require('./module/user/user.router'));
const parcel_route_1 = __importDefault(require('./module/parcel/parcel.route'));
const analytics_route_1 = require('./module/analytics/analytics.route');
const report_route_1 = require('./module/report/report.route');
const app = (0, express_1.default)();
const allowedOrigins = ['https://courier-management-pied.vercel.app'];
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(
  (0, cors_1.default)({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', user_router_1.default);
app.use('/api', auth_router_1.default);
app.use('/api', parcel_route_1.default);
app.use('/api', analytics_route_1.analyticsRoutes);
app.use('/api', report_route_1.reportRoutes);
app.get('/', (req, res) => {
  res.send('Hello from courier and parcel management');
});
exports.default = app;
