// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const storesRoute = require("./routes/stores");
const tagsRoute = require("./routes/tags");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stores", storesRoute);
app.use("/tags", tagsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
