const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose.connect(process.env.URI).then((data) => {
      console.log(
        "Database connected successfully to host",
        data.connection.host
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = dbConnection;
