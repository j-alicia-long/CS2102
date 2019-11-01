const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'src/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getUsers = (request, response) => {
  pool.query('SELECT * FROM Users', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addUser = (request, response) => {
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
};

app
  .route('/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening`);
});
