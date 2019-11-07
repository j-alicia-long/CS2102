const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getCourses = (req, res) => {
  pool.query('SELECT * FROM Courses', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching courses');
    }
    const Courses = filterCourses(req.query, results.rows);
    res.status(200).json(Courses);
  });
};

const filterCourses = (query, Courses) => {
  let result = Courses;
  for (key in query) {
    result = result.filter(course => {
      if (course[key]) {
        return course[key] === query[key];
      }
    });
  }
  return result;
};

const getCourseById = (req, res) => {
  const id = req.params.id;

  pool.query('SELECT * FROM Courses WHERE cid = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send(`Error fetching course with ID: ${id}`);
    }
    res.status(200).json(results.rows);
  });
};

const addCourse = (req, res) => {
  const { cid, yearsem, name, uid } = req.body;

  pool.query(
    'INSERT INTO Courses (cid, yearsem, name, uid) VALUES ($1, $2, $3, $4)',
    [cid, yearsem, name, uid],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error adding course');
      }
      res.status(201).send(`Course successfully added`);
    }
  );
};

const updateCourse = (req, res) => {
  const { yearsem, uid } = req.body;
  const id = req.params.id;

  pool.query(
    'UPDATE Courses SET yearsem = $1, uid = $2 WHERE cid = $3',
    [yearsem, uid, id],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error updating course');
      }
      res.status(201).send(`Course successfully updated`);
    }
  );
};

const deleteCourse = (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM Courses WHERE cid = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error deleting course');
    }
    res.status(200).send(`Course successfully deleted`);
  });
};

const getStudentsInCourse = (req, res) => {
  const id = req.params.id;
  const { yearsem } = req.body;
  //sd
  pool.query(
    'SELECT uid FROM Selects WHERE cid = $1 AND yearsem = $2',
    [id, yearsem],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send(`Error fetching selected courses with user ID: ${id}`);
      }
      res.status(200).json(results.rows);
    }
  );
};

const addStudentToCourse = (req, res) => {
  const cid = req.params.id;
  const { uid, yearsem } = req.body;

  pool.query('INSERT INTO Selects VALUES ($1, $2, $3)', [uid, cid, yearsem], error => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error adding student to course');
    }
    res.status(201).send(`Student successfully added to course`);
  });
};

const deleteStudentFromCourse = (req, res) => {
  const cid = req.params.id;
  const { uid, yearsem } = req.body;

  pool.query(
    'DELETE FROM Selects WHERE uid = $1, cid = $2, yearsem = $3',
    [uid, cid, yearsem],
    error => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error deleting student from course');
      }
      res.status(201).send(`Student successfully deleted from course`);
    }
  );
};

// route paths
router.get('', getCourses);
router.get('/:id', getCourseById);
router.get('/:id/students', getStudentsInCourse);
router.post('', addCourse);
router.post('/:id/students', addStudentToCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.delete('/:id/students', deleteStudentFromCourse);

module.exports = router;
