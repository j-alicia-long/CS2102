const express = require("express");
const jwt = require("jsonwebtoken");

const { pool } = require("../config");

const router = express.Router();
const secret = "secret";

const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  console.log(req.body);

  pool.query(
    "SELECT * FROM Users WHERE uid = $1 AND pass = $2",
    [username, password],
    (error, results) => {
      const isUserValid = results.rows.length > 0 ? true : false;
      if (error) {
        console.log(error);
        res.status(500).send("Internal error");
      } else if (!isUserValid) {
        res.status(401).send("Incorrect username or password");
      } else {
        const payload = { username };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h"
        });
        res
          .cookie("token", token, { httpOnly: true })
          .status(200)
          .send("Login successful");
      }
      res.end();
    }
  );
};

router.post("", authenticateUser);

module.exports = router;
