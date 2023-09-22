const express = require("express");
const app = express();
const testRoutes = require("./test-route");
const timeRoutes = require("./time-route");
app.use("/test", testRoutes);
app.use("/time", timeRoutes);

module.exports = app;
