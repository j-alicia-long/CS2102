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
  const { cid, yearsem, uid } = req.body;

  pool.query(
    'INSERT INTO Courses (cid, yearsem, uid) VALUES ($1, $2, $3)',
    [cid, yearsem, uid],
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

// route paths
router.get('', getCourses);
router.get('/:id', getCourseById);
router.post('', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
