const { pool } = require("../config");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username" // not necessary, DEFAULT
  },
  function(username, password, done) {
    pool.query(
      "SELECT * FROM Users WHERE uid = $1 AND pass = $2",
      [username, password],
      (error, results) => {
        const isUserValid = results.rows.length > 0 ? true : false;
        if (error) {
          return done(err);
        }
        if (!isUserValid) {
          return done(null, false, {
            message: "Incorrect username or password"
          });
        }
        return done(null, username);
      }
    );
  }
);

module.exports = strategy;
