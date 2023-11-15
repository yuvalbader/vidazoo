const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes/index");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(router);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// // Handle invalid routes
// app.use((req, res) => {
//   res.status(404).json({ error: "Not Found" });
// });

// Handle other routes by serving the React app's index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
