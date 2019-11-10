const express = require("express");
const { pool } = require("../config");

const router = express.Router();

// route handlers
const getForums = (req, res) => {
  pool.query("SELECT * FROM Forums", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send("Error fetching forum");
    }
    const forums = filterForums(req.query, results.rows);
    res.status(200).json(forums);
  });
};

const filterForums = (query, forums) => {
  let result = forums;
  for (key in query) {
    result = result.filter(forum => {
      if (forum[key]) {
        return forum[key] === query[key];
      }
    });
  }
  return result;
};

const getForumbyTitle = (req, res) => {
  const f_title = req.params.id;

  pool.query(
    "SELECT * FROM Forum WHERE f_title = $1",
    [f_title],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send(`Error fetching course with ID: ${id}`);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getForumbyCourse = (req, res) => {
  const cid = req.params.id;

  console.log("cid: ", cid);

  pool.query("SELECT * FROM Forums WHERE cid = $1", [cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400);
    }
    res.status(200).json(results.rows);
  });
};

const getEntriesInForum = (req, res) => {
  // const cid = req.params.id;

  // console.log("cid: ", cid);

  pool.query("SELECT * FROM Entries", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400);
    }
    res.status(200).json(results.rows);
  });
};

// route paths
router.get("/", getForums);
router.get("/:id", getForumbyCourse);
router.get("/:id/entries", getEntriesInForum);

module.exports = router;
