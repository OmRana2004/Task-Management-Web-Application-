import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import router from "./routes/pageRoutes.js"

dotenv.config();


const app = express()

const PORT = process.env.PORT || 3000;

connectDB();

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://task-management-web-application-livid.vercel.app",
];

app.use(
    cors({
        origin : ALLOWED_ORIGINS,
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});