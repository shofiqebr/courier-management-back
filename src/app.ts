// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import cookieParser from "cookie-parser";

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
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRouter from './module/auth/auth.router';
import UserRoutes from './module/user/user.router';
import parcelRouter from './module/parcel/parcel.route';
import { analyticsRoutes } from './module/analytics/analytics.route';
import { reportRoutes } from './module/report/report.route';

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use("/api", UserRoutes);
app.use("/api", authRouter);
app.use("/api", parcelRouter);
app.use("/api", analyticsRoutes);
app.use("/api", reportRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from courier and parcel management");
});

export default app;

