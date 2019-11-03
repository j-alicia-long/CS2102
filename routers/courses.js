const express = require('express');
const { pool } = require('../config');

const router = express.Router();

router.get('', (req, res) => {
  pool.query('SELECT * FROM Courses', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = router;
