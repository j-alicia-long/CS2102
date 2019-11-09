const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const { pool } = require("../config");

passport.serializeUser((username, done) => {
  console.log(username);
  done(null, username);
});

passport.deserializeUser((user, done) => {
  findUser(user, done);
});

passport.use(LocalStrategy);

function findUser(user, callback) {
  pool.query("SELECT * FROM Users WHERE uid = $1", [user.uid], (err, data) => {
    if (err) {
      console.error("Cannot find user");
      return callback(null);
    }

    if (data.rows.length == 0) {
      console.error("User does not exists?");
      return callback(null);
    } else if (data.rows.length == 1) {
      return callback(null, {
        username: data.rows[0].uid
      });
    } else {
      console.error("More than one user?");
      return callback(null);
    }
  });
}

module.exports = passport;
