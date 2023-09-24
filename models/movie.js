const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  director: String,
  duration: String,
  genre: [String],
  rate: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
