const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { pool } = require('./config');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
