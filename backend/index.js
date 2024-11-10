import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import cors from "cors";
import path from 'path';
import cookieParser from "cookie-parser";
import { app, server } from "./Socket.IO/server.js";

dotenv.config();

// const app = express();
app.use(cors({
    origin: 'https://connectify-kek4.onrender.com',  // Allow your frontend origin
    credentials: true                 // Allow credentials (cookies, etc.) if needed
}));
const PORT = process.env.PORT || 4005;

try{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
}
catch(error)
{
    console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Deployment code
if(process.env.NODE_ENV === "Production"){
    const dirPath = path.resolve();

    app.use(express.static("./frontend/build"));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(dirPath, "./frontend/build", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});