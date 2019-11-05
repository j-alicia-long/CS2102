const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const routes = require("./routes");
const withAuth = require("./middleware");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Routes
app.use("/auth", routes.auth);
app.use("/users", routes.users);
app.use("/courses", routes.courses);

app.get("/secret", withAuth, (req, res) => {
  res.send("The password is potato");
});

app.get("/checkToken", withAuth, (req, res) => {
  res.sendStatus(200);
});

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
