const express = require("express");
const { pool } = require("../config");

const router = express.Router();

const loginUser = (request, response) => {
  var username = request.body.username;
  var password = request.body.password;

  console.log(username, password);
  if (username && password) {
    pool.query(
      "SELECT * FROM Users WHERE uid = $1 AND pass = $2",
      [username, password],
      (error, results) => {
        console.log(results);
        if (results.rows.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.send("Correct");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
};

router.post("", loginUser);

module.exports = router;
