const express = require("express");
const router = express.Router();
let dateObj = new Date();
let hours = dateObj.getHours();
let minutes = dateObj.getMinutes();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: `${hours} : ${minutes}`,
  });
});
module.exports = router;
