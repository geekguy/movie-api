require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

const moviesRouter = require("./routes/movies");
const userRouter = require("./routes/user");

console.log({ PORT });
const app = express();

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
app.use("/api/movies", moviesRouter);
app.use("/api/users", userRouter);
