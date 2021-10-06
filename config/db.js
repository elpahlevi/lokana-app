import mongoose from "mongoose";

const { connect } = mongoose;
const { NODE_ENV, DB_URI_DEV, DB_URI_PROD } = process.env;

export default function databaseConnection() {
  connect(NODE_ENV === "production" ? DB_URI_PROD : DB_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => console.log(`${NODE_ENV} Database connected`))
    .catch(() => console.log("Database disconnected"));
}
