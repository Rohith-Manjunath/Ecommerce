const express = require("express");
const app = express();
require("dotenv").config({ path: "server/config/config.env" });
const cors = require("cors");
const dbConnection = require("./config/db");
const PORT = process.env.PORT;
const productRoute = require("./router/productRoute");
const error = require("./middlewares/error");

app.use(express.json());
app.use("/api", productRoute);
app.use(cors());
app.use(error);
dbConnection(productRoute);
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
