const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.URI)
    .then((data) => {
      console.log(
        "Database connected successfully to host",
        data.connection.host
      );
    })
    .catch((e) => {
      console.error("Error connecting to the database", e.message);
    });
};

module.exports = dbConnection;
