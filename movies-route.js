const express = require("express");
const router = express.Router();
const movies = require("./movies-object");
const moviesModel = require("./movies-database");
const app = require("./app");
//start of read routing
router.get("/read", async (req, res, next) => {
  try {
    res.status(200).json({
      status: "200",
      message: "Welcome to the movie section",
      data: await moviesModel.find({}),
    });
  } catch {
    res.status(404).json({
      message: "Database could not be fetched",
    });
  }
});
router.get("/read/id/:ID", async (req, res, next) => {
  const id = req.params.ID;
  if (id)
    res.status(200).json({
      status: "200",
      message: "This the requested movie",
      data: await moviesModel.findOne({ _id: id }),
    });
  else {
    res.status(404).json({
      status: "404",
      error: "true",
      message: "The movie <ID> does not exist",
    });
  }
});
router.get("/read/by-date", async (req, res, next) => {
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Date",
    data: await moviesModel.find().sort({ year: "asc" }),
  });
});
router.get("/read/by-rating", async (req, res, next) => {
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Rating",
    data: await moviesModel.find().sort({ rating: "desc" }),
  });
});
router.get("/read/by-title", async (req, res, next) => {
  res.status(200).json({
    status: "200",
    message: "Movies Sorted By Title",
    data: await moviesModel.find().sort({ title: "asc" }),
  });
});
//end of read routing --- start of create routing
router.post("/create", (req, res, next) => {
  res.status(200).json({
    message: "Add movies",
  });
});
router.post("/create/add", async (req, res, next) => {
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
      await moviesModel.insertOne(addedMovie);
      res.status(200).json({
        message: `added ${title}`,
        data: moviesModel.find({}),
      });
    } else {
      addedMovie = {
        title,
        year: parseInt(year),
        rating: parseFloat(rating),
      };
      await moviesModel.insertOne(addedMovie);
      res.status(200).json({
        message: `added ${title}`,
        data: moviesModel.find({}),
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
router.patch("/update/:ID", (req, res, next) => {
  const id = req.params.ID;
  const { title } = req.query;
  movies[id - 1].title = title;
  res.status(200).json({
    message: `Edited movie ${id} title to ${title}`,
    data: movies,
  });
});
router.patch("/update/:ID", (req, res, next) => {
  const id = req.params.ID;
  const { title, rating, year } = req.query;
  if (!title && year && rating) {
    movies[id - 1].title = movies[id - 1].title;
    movies[id - 1].rating = parseFloat(rating);
    movies[id - 1].year = parseInt(year);
    res.status(200).json({
      message: `Edited movie ${id} rating to ${rating}\n Edited movie ${id} year to ${year}`,
      data: movies,
    });
  } else if (!rating && year && title) {
    movies[id - 1].rating = movies[id - 1].rating;
    movies[id - 1].title = title;
    movies[id - 1].year = parseInt(year);
    res.status(200).json({
      message: `Edited movie ${id} title to ${title}\n Edited movie ${id} year to ${year}`,
      data: movies,
    });
  } else if (!year && rating && title) {
    movies[id - 1].year = movies[id - 1].year;
    movies[id - 1].title = title;
    movies[id - 1].rating = parseFloat(rating);
    res.status(200).json({
      message: `Edited movie ${id} title to ${title}\n Edited movie ${id} rating to ${rating}`,
      data: movies,
    });
  } else if (!title && !rating) {
    movies[id - 1].year = parseInt(year);
    movies[id - 1].title = movies[id - 1].title;
    movies[id - 1].rating = movies[id - 1].rating;
    res.status(200).json({
      message: `Edited movie ${id} year to ${year}`,
      data: movies,
    });
  } else if (!title && !year) {
    movies[id - 1].year = movies[id - 1].year;
    movies[id - 1].title = movies[id - 1].title;
    movies[id - 1].rating = parseFloat(rating);
    res.status(200).json({
      message: `Edited movie ${id} rating to ${rating}`,
      data: movies,
    });
  } else if (!year && !rating) {
    movies[id - 1].year = movies[id - 1].year;
    movies[id - 1].title = title;
    movies[id - 1].rating = movies[id - 1].rating;
    res.status(200).json({
      message: `Edited movie ${id} title to ${title}`,
      data: movies,
    });
  } else {
    movies[id - 1].title = title;
    movies[id - 1].rating = parseFloat(rating);
    movies[id - 1].year = parseInt(year);
    res.status(200).json({
      message: `Edited movie ${id} title to ${title}\n Edited movie ${id} rating to ${rating}\n Edited movie ${id} year to ${year}`,
      data: movies,
    });
  }
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
      message: `The mov does not exist`,
    });
  }
});
//end of delete routing
module.exports = router;
