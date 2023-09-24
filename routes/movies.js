const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Movie = require("../models/movie");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedToken;
  return next();
};

router.use(verifyJWT);

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
  console.log("Inside post api call");
  console.log(req.user);
  if (req.user && req.user.role === "ADMIN") {
    const movie = req.body;
    const dbMovie = await Movie.create(movie);
    return res.send({ movie: dbMovie });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
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
