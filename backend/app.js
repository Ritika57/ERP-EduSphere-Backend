import express from "express";
import {config} from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import {dbConnection} from "./database/dbConnection.js";
import studentRouter from "./router/studentRouter.js";
import teacherRouter from "./router/teacherRouter.js";
import assignmentRouter from "./router/assignmentRouter.js";

import announcementRouter from "./router/announcementRouter.js";
import classRouter from "./router/classRouter.js";
import libraryRouter from "./router/libraryRouter.js";
import eventsRouter from "./router/eventsRouter.js";
import examRouter from "./router/examRouter.js";
import attendanceRouter from "./router/attendanceRouter.js";
import usersRouter from "./router/usersRouter.js"
import adminRegisterRouter from "./router/adminRegisterRouter.js"
import performanceRouter from "./router/performanceRouter.js";
import  { errorHandler } from "./middlewares/errorHandler.js";



const app = express();
config({path: "./config/config.env"});

// Debug environment variables
console.log("🔧 Environment variables:");
console.log("📡 PORT:", process.env.PORT);
console.log("🗄️ MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");
console.log("🌐 FRONTEND_URL:", process.env.FRONTEND_URL);

// Handle preflight requests
app.options('*', cors());

app.use( 
    cors({
        origin: [process.env.FRONTEND_URL, "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
        credentials: true,
        optionsSuccessStatus: 200,
        allowedHeaders: ["Content-Type", "Authorization"]
    }) 
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/assignments", assignmentRouter);

app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/performance", performanceRouter);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/register", adminRegisterRouter);

// Test route to check if server is working
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// 404 handler for unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Error handling middleware should be last
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });

dbConnection()
 
export default app;
