// server.js
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(router);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});