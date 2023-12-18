const express = require("express");
const path = require('path');
const app = express();

var publicDir = path.join(__dirname, 'public');
app.use("/public/", express.static(publicDir));

var nodeModulesDir = path.join(__dirname, 'node_modules');
app.use('/node_modules/', express.static(nodeModulesDir)); 

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html"); // Add a forward slash before "index.html"
});

app.get("/mainPage", function (req, res) {
  res.sendFile(__dirname + "/mainPage.html"); // Add a forward slash before "mainPage.html"
});

app.listen(3000, function () {
  console.log("Server is running on localhost:3000"); // Correct the log message format
});
