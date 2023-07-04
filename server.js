const express = require("express");
const path = require("path");
const fs = require("fs");
// ?? checks if the value before is null or undefined
const routes = require("./routes");
const uuid = require("./helpers/uuid");
const { readAndAppend, writeToFile, deleteNote } = require("./helpers/fsUtils");
const PORT = process.env.PORT ?? 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data to access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Application is running @ http://localhost:${PORT}`);
});
