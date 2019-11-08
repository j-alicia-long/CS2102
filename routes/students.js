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
  const { uid, pass, name, year } = req.body;

  pool.query(
    'CALL add_student ($1, $2, $3, $4)',
    [uid, pass, name, year],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error adding student');
      }
      res.status(201).send(`Student successfully added`);
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

  pool.query('SELECT cid, yearsem FROM Selects WHERE uid = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send(`Error fetching selected courses with student ID: ${id}`);
    }
    res.status(200).json(results.rows);
  });
};

const getAllStudentsInCourse = (req, res) => {
  const c_code = req.params.c_code;
  pool.query('SELECT * FROM Selects WHERE cid = $1', [c_code], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInLecture = (req, res) => {
  const c_code = req.params.c_code;
  pool.query('SELECT * FROM AssignLect WHERE cid = $1', [c_code], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInLab = (req, res) => {
  const c_code = req.params.c_code;
  pool.query('SELECT * FROM AssignLab WHERE cid = $1', [c_code], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInTutorial = (req, res) => {
  const c_code = req.params.c_code;
  pool.query('SELECT * FROM AssignTut WHERE cid = $1', [c_code], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

// route paths
router.get('', getStudents);
router.get('/:id', getStudentById);
router.get('/:id/courses', getStudentsSelectedCourses);
router.post('', addStudent);
router.delete('/:id', deleteStudent);

router.get('/all/:c_code', getAllStudentsInCourse);
router.get('/lecture/:c_code', getStudentsInLecture);
router.get('/lab/:c_code', getStudentsInLab);
router.get('/tutorial/:c_code', getStudentsInTutorial);

module.exports = router;
