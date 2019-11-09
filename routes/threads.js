const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getThreads = (req, res) => {
  const t_code = req.params.t_code;

  pool.query(
    'SELECT * FROM THREADS WHERE t_title = $1'
    [t_code],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching threads');
      }
      const threads = filterThreads(req.query, results.rows);
      res.status(200).json(threads);
    }
  );
};

const filterThreads = (query, threads) => {
  let result = threads;
  for (key in query) {
    result = result.filter(thread => {
      if (thread[key]) {
        return thread[key] === query[key];
      }
    });
  }
  return result;
};

// route paths
router.get('/threads/:t_code', getThreads);
//router.get('/prof/:c_code', getProf);

module.exports = router;
