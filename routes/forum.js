const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getForum = (req, res) => {
  const f_code = req.params.f_code;

  pool.query(
    'SELECT * FROM FORUM WHERE f_title = $1'
    [f_code],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching forum');
      }
      //const forum = filterForums(req.query, results.rows);
      res.status(200).json(forum);
    }
  );
};

const filterForums= (query, forums) => {
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


// route paths
router.get('/forum/:f_code', getForum);

module.exports = router;
