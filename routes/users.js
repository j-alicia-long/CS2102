const express = require("express");
const { pool } = require("../config");

const router = express.Router();

// route handlers
const getUsers = (req, res) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send("Error fetching users");
    }
    const users = filterUsers(req.query, results.rows);
    res.status(200).json(users);
  });
};

const filterUsers = (query, users) => {
  let result = users;
  for (key in query) {
    result = result.filter(user => {
      if (user[key]) {
        return user[key] === query[key];
      }
    });
  }
  return result;
};

const getUserById = (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM Users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send(`Error fetching user with ID: ${id}`);
    }
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const { uid, pass, name, faculty } = req.body;

  pool.query(
    "INSERT INTO Users (uid, pass, name, faculty) VALUES ($1, $2, $3, $4)",
    [uid, pass, name, faculty],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send("Error adding user");
      }
      res.status(201).send(`User successfully added`);
    }
  );
};

const updateUser = (req, res) => {
  console.log(req.body);
  const { pass, name, faculty } = req.body;
  const id = req.params.id;

  pool.query(
    "UPDATE Users SET pass = $1, name = $2, faculty = $3 WHERE uid = $4",
    [pass, name, faculty, id],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send("Error updating user");
      }
      res.status(201).send(`User successfully updated`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM Users WHERE uid = $1", [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send("Error deleting user");
    }
    res.status(200).send(`User successfully deleted`);
  });
};

// route paths
router.get("", getUsers);
router.get("/:id", getUserById);
router.post("", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
