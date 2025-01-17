const express = require("express");
const app = express();
const testRoutes = require("./test-route");
const timeRoutes = require("./time-route");
const helloRoutes = require("./hello-route");
const searchRoutes = require("./search-route");
const moviesRoutes = require("./movies-route");
app.use("/test", testRoutes);
app.use("/time", timeRoutes);
app.use("/hello", helloRoutes);
app.use("/search", searchRoutes);
app.use("/movies", moviesRoutes);
module.exports = app;
//step 11 was already done
