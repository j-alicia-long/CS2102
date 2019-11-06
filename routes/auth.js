const express = require("express");
const passport = require("../passport");

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out");
});

// check authentication
router.get("/verify", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authorised");
    res.send(req.user);
  } else {
    console.log("forbidden");
    res.status(404).send(req.user);
  }
});

module.exports = router;
