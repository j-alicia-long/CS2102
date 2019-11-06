const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const passport = require("./passport");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: "process.env.SECRET",
    resave: false,
    saveUninitialized: false
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.post(
  "/login",
  function(req, res, next) {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    res.send(req.user);
  }
);

// check authentication
app.get("/auth/verify", (req, res) => {
  console.log("my courses");
  if (req.isAuthenticated()) {
    console.log("authorised");
    res.send(req.user);
  } else {
    console.log("forbidden");
    res.status(404).send(req.user);
  }
});

// app.get("/", (req, res, next) => {
//   console.log("===== user!!======");
//   console.log(req.user);
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });

app.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    console.log("logged out");
    res.send("logging out");
  } else {
    console.log("no user to log out");
    res.send("no user to log out");
  }
});

// Routes
app.use("/users", routes.users);
app.use("/courses", routes.courses);

// Serves the client when deployed in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening`);
});
