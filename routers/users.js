const express = require('express');
const { pool } = require('../config');

const router = express.Router();

router.get('', (req, res) => {
  pool.query('SELECT * FROM Users', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

router.post('', (req, res) => {
  const { uid, pass, name, faculty } = request.body;

  pool.query(
    'INSERT INTO Users (uid, pass, name, faculty) VALUES ($1, $2, $3, $4)',
    [uid, pass, name, faculty],
    error => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: 'success', message: 'User added.' });
    }
  );
});

module.exports = router;
