const mongoose = require("mongoose");
const mongoURI = require("./connectionString");
const moviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 4,
    },
  },
  { timestamps: true }
);
const moviesModel = mongoose.model("movies", moviesSchema);
module.exports = moviesModel;
