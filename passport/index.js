const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const { pool } = require("../config");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((username, done) => {
  console.log(username);
  done(null, username);
});

// user object attaches to the request as req.user
passport.deserializeUser((user, done) => {
  findUser(user, done);
});

passport.use(LocalStrategy);

function findUser(user, callback) {
  console.log("username?", user);
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
        username: data.rows[0].uid,
        passwordHash: data.rows[0].pass
      });
    } else {
      console.error("More than one user?");
      return callback(null);
    }
  });
}

module.exports = passport;
