import express from "express";
import "dotenv/config";
import databaseConnection from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRouter from "./routes/auth/index.js";
import userRouter from "./routes/user/index.js";
import productRouter from "./routes/products/index.js";

// Configuration
const { NODE_ENV, ORIGIN } = process.env;
const app = express();
const port = 5500;
databaseConnection();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
  }),
);

// API Route
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

if (NODE_ENV === "test") {
  app.use(express.static(path.resolve() + "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve() + "/client/build/index.html");
  });
}

// Server listen
app.listen(port, () => console.log(`Server running on port ${port}`));
