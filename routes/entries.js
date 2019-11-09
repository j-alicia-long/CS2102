const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getEntries = (req, res) => {
  const e_code = req.params.e_code;

  pool.query(
    'SELECT * FROM ENTRIES WHERE e_title = $1'
    [e_code],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching entries');
      }
      const entries = filterEntries(req.query, results.rows);
      res.status(200).json(entries);
    }
  );
};

const filterEntries = (query, entries) => {
  let result = entries;
  for (key in query) {
    result = result.filter(entry => {
      if (entry[key]) {
        return entry[key] === query[key];
      }
    });
  }
  return result;
};


// route paths
router.get('/entries/:e_code', getEntries);

module.exports = router;
