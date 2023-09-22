const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "hello",
  });
});
router.get("/:ID", (req, res, next) => {
  const id = req.params.ID;
  res.status(200).json({
    message: `Hello ${id}`,
  });
});
module.exports = router;
