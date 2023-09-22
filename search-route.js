const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  const search = req.query.s;
  if (search) {
    res.status(200).json({
      status: 200,
      message: "ok",
      data: search,
    });
  } else {
    res.status(500).json({
      error: "true",
      message: "you have to provide a search",
    });
  }
});
module.exports = router;
