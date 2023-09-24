const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const movie = req.body;
  const dbMovie = await Movie.create(movie);
  res.send({ movie: dbMovie });
});

// router.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const body = req.body;
//   body.id = id;
//   movies[id - 1] = body;
//   res.send({ success: true });
// });

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   movies.splice(id - 1, 1);
//   res.send({ success: true });
// });

module.exports = router;
