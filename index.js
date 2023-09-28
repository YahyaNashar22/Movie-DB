const http = require("http");
const app = require("./app");
const port = process.env.POT || 3000;
const server = http.createServer(app);
const mongoose = require("mongoose");
const mongoURI = require("./connectionString");
const database = (module.exports = () => {
  try {
    mongoose.connect(mongoURI);
    console.log("database connected successfully");
  } catch {
    console.log("not connected");
  }
});
database();
server.listen(port, () => console.log(`Server running on port ${port}`));
