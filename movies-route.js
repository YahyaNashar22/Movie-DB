const express = require("express");
const router = express.Router();
const movies = require("./movies-object");
//start of read routing
router.get("/read", (req, res, next) => {
  res.status(200).json({
    status: "200",
    message: "Welcome to the movie section",
    data: movies,
  });
});
router.get("/read/id/:ID", (req, res, next) => {
  const id = req.params.ID;
  if (id < movies.length) {
    res.status(200).json({
      status: "200",
      message: "This the requested movie",
      data: movies[id - 1],
    });
  } else {
    res.status(404).json({
      status: "404",
      error: "true",
      message: "The movie <ID> does not exist",
      data: movies[id - 1],
    });
  }
});
router.get("/read/by-date", (req, res, next) => {
  let sortedByDate = movies.sort(function (a, b) {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  });
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Date",
    data: sortedByDate,
  });
});
router.get("/read/by-rating", (req, res, next) => {
  let sortedByRating = movies.sort(function (a, b) {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  });
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Rating",
    data: sortedByRating,
  });
});
router.get("/read/by-title", (req, res, next) => {
  let sortedByTitle = movies.sort(function (a, b) {
    let x = a.title.toUpperCase();
    let y = b.title.toUpperCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Title",
    data: sortedByTitle,
  });
});
//end of read routing --- start of create routing
router.post("/create", (req, res, next) => {
  res.status(200).json({
    message: "Add movies",
  });
});
router.post("/create/add", (req, res, next) => {
  const { title, year, rating } = req.query;
  if (!title || !year) {
    res.status(403).json({
      status: "403",
      error: "true",
      message: `You cannot create a movie without providing a title and a year`,
    });
  }
  if (year.length != 4) {
    res.status(403).json({
      status: "403",
      error: "true",
      message: "You cannot create a movie without providing a title and a year",
    });
  } else {
    if (!rating) {
      addedMovie = {
        title,
        year: parseInt(year),
        rating: 4,
      };
      movies.push(addedMovie);
      res.status(200).json({
        message: `added ${title}`,
        data: movies,
      });
    } else {
      addedMovie = {
        title,
        year: parseInt(year),
        rating: parseFloat(rating),
      };
      movies.push(addedMovie);
      res.status(200).json({
        message: `added ${title}`,
        data: movies,
      });
    }
  }
});
//end of create routing --- start of patch routing
router.patch("/update", (req, res, next) => {
  res.status(200).json({
    message: "Edit movies",
  });
});
// end of patch routing --- start of delete routing
router.delete("/delete", (req, res, next) => {
  res.status(200).json({
    message: " Delete movies",
  });
});
router.delete("/delete/:ID", (req, res, next) => {
  const id = req.params.ID;
  if (parseInt(id) < movies.length) {
    let deletedMovie = movies[id - 1];
    movies.splice(id - 1, 1);
    res.status(200).json({
      message: `Deleted ${deletedMovie.title}`,
      data: movies,
    });
  } else {
    res.status(404).json({
      status: "404",
      error: "true",
      message: `The movie <ID> does not exist`,
    });
  }
});
//end of delete routing
module.exports = router;
