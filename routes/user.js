const express = require("express");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = bcrpyt.hashSync(user.password, 10);
  const dbUser = await User.create(user);
  res.send(dbUser);
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const dbUser = await User.findOne({ email: user.email });
  console.log(dbUser);
  const isPasswordSame = await bcrpyt.compare(user.password, dbUser.password);
  if (isPasswordSame) {
    const token = jwt.sign(
      { email: dbUser.email, role: dbUser.role },
      process.env.JWT_SECRET
    );
    res.send({ token });
  } else {
    res.status(401).send({ success: false, message: "Wrong password" });
  }
  res.send({ success: true, isPasswordSame });
});

module.exports = router;
