const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");
const corsOptions = {
  origin: ["https://ecommerce20.netlify.app", "http://localhost:5173"],
  credentials: true,
};
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const productRoute = require("./router/productRoute");
const userRoute = require("./router/userRoute");
const error = require("./middlewares/error");
const OrderRoute = require("./router/orderRoute");
const PaymentRoute = require("./router/PaymentRoute");

dotenv.config({ path: "server/config/config.env" });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// File upload middleware
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(fileUpload());
app.set("trust proxy", 1);
app.use(cookie());
app.use(cors(corsOptions));
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", OrderRoute);
app.use("/api", PaymentRoute);
app.use(error);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database connection
dbConnection(productRoute);

// Start the server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (promise, e, reason) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  console.log(`Shutting down server due to unhandledRejection`);
  console.log(`${e.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (e) => {
  console.log(`Error : ${e.message}`);
  console.log(`Shutting down server due to uncaughtException`);
  server.close(() => {
    process.exit(1);
  });
});
