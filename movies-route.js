const express = require("express");
const router = express.Router();
const movies = require("./movies-object");
router.get("/read", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the movie section",
    data: movies,
  });
});
router.post("/create", (req, res, next) => {
  res.status(200).json({
    message: "Add movies",
  });
});
router.patch("/update", (req, res, next) => {
  res.status(200).json({
    message: "Edit movies",
  });
});
router.delete("/delete", (req, res, next) => {
  res.status(200).json({
    message: " Delete movies",
  });
});
module.exports = router;
