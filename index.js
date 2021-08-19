const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 5500;

const authRoute = require("./routes/Auth");
const productRoute = require("./routes/Products");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://103.171.84.244"], //to protect the api, which ip address are allowed to access it
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
  })
);

mongoose.connect(
  process.env.DB_URI_PROD,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Database Connected")
);

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.listen(port, () => console.log(`Server active on port ${port}`));
