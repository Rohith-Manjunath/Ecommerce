const express = require("express");
const app = express();
require("dotenv").config({ path: "server/config/config.env" });
const cors = require("cors");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
