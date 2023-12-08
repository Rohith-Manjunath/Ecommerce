const express = require("express");
const app = express();
require("dotenv").config({ path: "server/config/config.env" });
const cors = require("cors");
const dbConnection = require("./config/db");
const PORT = process.env.PORT;
const productRoute = require("./router/productRoute");
const userRoute = require("./router/userRoute");
const error = require("./middlewares/error");
const cookie = require("cookie-parser");

process.on("uncaughtException", (e) => {
  console.log(`Error : ${e}`);
  console.log(`Shutting down server due to uncaughtException`);
  server.close(() => {
    process.exit(1);
  });
});

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use(error);
dbConnection(productRoute);
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (e) => {
  console.log(`Shutting down server due to unhandledRejection`);
  console.log(`${e.message}`);
  server.close(() => {
    process.exit(1);
  });
});
