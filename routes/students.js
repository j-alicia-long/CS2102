const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getStudents = (req, res) => {
  pool.query('SELECT * FROM Students', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching students');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const filterStudents = (query, students) => {
  let result = students;
  for (key in query) {
    result = result.filter(student => {
      if (student[key]) {
        return student[key] === query[key];
      }
    });
  }
  return result;
};

const getStudentById = (req, res) => {
  const id = req.params.id;

  pool.query('SELECT * FROM Students WHERE uid = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send(`Error fetching student with ID: ${id}`);
    }
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { uid, pass, name, faculty } = req.body;

  pool.query(
    'INSERT INTO Students (uid, pass, name, faculty) VALUES ($1, $2, $3, $4)',
    [uid, pass, name, faculty],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error adding student');
      }
      res.status(201).send(`Student successfully added`);
    }
  );
};

const updateStudent = (req, res) => {
  const { pass, name, faculty } = req.body;
  const id = req.params.id;

  pool.query(
    'UPDATE Students SET pass = $1, name = $2, faculty = $3 WHERE uid = $4',
    [pass, name, faculty, id],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error updating student');
      }
      res.status(201).send(`Student successfully updated`);
    }
  );
};

const deleteStudent = (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM Students WHERE uid = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error deleting student');
    }
    res.status(200).send(`Student successfully deleted`);
  });
};

const getStudentsSelectedCourses = (req, res) => {
  const id = req.params.id;

  pool.query(
    'SELECT cid, yearsem FROM Selects WHERE uid = $1',
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send(`Error fetching selected courses with student ID: ${id}`);
      }
      res.status(200).json(results.rows);
    }
  );
};


// route paths
router.get('', getStudents);
router.get('/:id', getStudentById);
router.get('/:id/courses', getStudentsSelectedCourses);
router.post('', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
