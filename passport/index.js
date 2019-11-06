const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const { pool } = require("../config");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((username, done) => {
  console.log("*** serializeUser called, user: ");
  console.log(username);
  console.log("---------");
  done(null, username);
});

// user object attaches to the request as req.user
passport.deserializeUser((username, done) => {
  console.log("DeserializeUser called");
  findUser(username, done);

  //   User.findOne({ _id: id }, "username", (err, user) => {
  //     console.log("*** Deserialize user, user:");
  //     console.log(user);
  //     console.log("--------------");
  //     done(null, user);
  //   });
});

passport.use(LocalStrategy);

function findUser(username, callback) {
  pool.query("SELECT * FROM Users WHERE uid = $1", [username], (err, data) => {
    if (err) {
      console.error("Cannot find user");
      return callback(null);
    }

    if (data.rows.length == 0) {
      console.error("User does not exists?");
      return callback(null);
    } else if (data.rows.length == 1) {
      console.log("USER FOUND", username);
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
