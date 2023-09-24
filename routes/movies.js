const express = require("express");
const router = express.Router();

const movies = [
  {
    name: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    duration: "2h 22min",
    genre: ["Crime", "Drama"],
    rate: 9.3,
    id: 1,
  },
  {
    name: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    duration: "2h 55min",
    genre: ["Crime", "Drama"],
    rate: 9.2,
    id: 2,
  },
];

router.get("/api/movies", (req, res) => {
  res.send(movies);
});

router.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  res.send(movies[parseInt(id) - 1]);
});

router.post("/api/movies", (req, res) => {
  const movie = req.body;
  movie.id = movies.length + 1;
  movies.push(movie);
  res.send({ success: true });
});

router.put("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.id = id;
  movies[id - 1] = body;
  res.send({ success: true });
});

router.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  movies.splice(id - 1, 1);
  res.send({ success: true });
});

module.exports = router;
