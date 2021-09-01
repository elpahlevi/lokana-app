const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 5500;
const { NODE_ENV, DB_URI_PROD, DB_URI_DEV } = process.env;

const authRoute = require("./routes/Auth");
const productRoute = require("./routes/Products");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://lokana.tech"], //to protect the api, which ip address are allowed to access it
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

if (NODE_ENV === "test") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect(
  NODE_ENV === "production" ? DB_URI_PROD : DB_URI_DEV,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Database connected")
);

app.listen(port, () => console.log(`Server active on port ${port}`));
