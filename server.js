require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;

console.log({ PORT });
const app = express();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const logger = (req, res, next) => {
  console.log(`Request received at ${new Date()} on path ${req.url}`);
  next();
};

app.use(logger);
app.use(express.json());

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  res.send(movies[parseInt(id) - 1]);
});

app.post("/api/movies", (req, res) => {
  const movie = req.body;
  movie.id = movies.length + 1;
  movies.push(movie);
  res.send({ success: true });
});

app.put("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.id = id;
  movies[id - 1] = body;
  res.send({ success: true });
});

app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  movies.splice(id - 1, 1);
  res.send({ success: true });
});
