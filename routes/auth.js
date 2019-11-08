const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("../passport");
const router = express.Router();

const secret = "secret"; // TODO: put in env

router.post("/login", passport.authenticate("local"), (req, res) => {
  // user is valid
  const user = req.user;
  const payload = req.user;
  console.log("payload: ", payload);
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h"
  });
  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .send({ token: token });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out");
});

// check authentication
router.get("/verify", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authorised");
    res.send({ user: req.user });
  } else {
    console.log("forbidden");
    console.log(req.user);
    res.status(404).send({ user: req.user });
  }
});

module.exports = router;
