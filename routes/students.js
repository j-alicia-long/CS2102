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

  pool.query('CALL add_student ($1, $2, $3, $4)', [uid, pass, name, year], error => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error adding student');
    }
    res.status(201).send(`Student successfully added`);
  });
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
    'SELECT * FROM Courses WHERE cid IN (SELECT cid FROM Selects WHERE uid = $1)',
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

const getAllStudentsInCourse = (req, res) => {
  const cid = req.params.cid;
  pool.query('SELECT * FROM Selects WHERE cid = $1 ', [cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInLecture = (req, res) => {
  const cid = req.params.cid;
  pool.query('SELECT * FROM AssignLect WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInLab = (req, res) => {
  const cid = req.params.cid;
  pool.query('SELECT * FROM AssignLab WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getStudentsInTutorial = (req, res) => {
  const cid = req.params.cid;
  pool.query('SELECT * FROM AssignTut WHERE cid = $1', [cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error fetching all students in course');
    }
    const students = filterStudents(req.query, results.rows);
    res.status(200).json(students);
  });
};

const getAllStudentsInfoInCourse = (req, res) => {
  const cid = req.params.cid;

  pool.query(
    'SELECT DISTINCT LECT.uid AS uid, LECT.gid AS lect_gid, LAB.gid AS lab_gid, TUT.gid AS tut_gid from AssignLect LECT, AssignLab LAB, AssignTut TUT WHERE (LECT.uid = LAB.uid AND LECT.uid = TUT.uid) AND (LECT.cid = $1 AND TUT.cid = $1 AND LAB.cid = $1)',
    [cid],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching all students in course');
      }
      const students = filterStudents(req.query, results.rows);
      res.status(200).json(students);
    }
  );
};

const checkConflict = (req, res) => {
  const cid = req.params.cid;
  const uid = req.params.uid;
  pool.query(
    `WITH CTE1 AS (
      select hg.cid, hg.gid, lect.day, lect.starttime, lect.endtime, hg.l_type 
      from HasGroup hg, Lectures lect WHERE hg.gid = lect.gid AND hg.cid = $1
      UNION
      select hg.cid, hg.gid, tut.day, tut.starttime, tut.endtime, hg.l_type 
      from HasGroup hg, Tutorials tut WHERE hg.gid = tut.gid AND hg.cid = $1
      UNION
      select hg.cid, hg.gid, lab.day, lab.starttime, lab.endtime, hg.l_type 
      from HasGroup hg, Labs lab WHERE hg.gid = lab.gid AND hg.cid = $1
    ),
    
    CTE2 AS (
      SELECT alect.uid, alect.gid, alect.cid, alect.l_type, lect.day, lect.starttime, lect.endtime, lect.venue 
      FROM assignlect alect, lectures lect 
      WHERE alect.gid = lect.gid and alect.uid = $2
      UNION
      SELECT atut.uid, atut.gid, atut.cid, atut.l_type, tut.day, tut.starttime, tut.endtime, tut.venue 
      FROM assigntut atut, tutorials tut 
      WHERE atut.gid = tut.gid and atut.uid = $2
      UNION
      SELECT alab.uid, alab.gid, alab.cid, alab.l_type, lab.day, lab.starttime, lab.endtime, lab.venue 
      FROM assignlab alab, labs lab 
      WHERE alab.gid = lab.gid and alab.uid = $2
    ) 
    SELECT 
      X.gid AS curr_gid,
      X.day AS day,
      X.starttime AS startime,
      X.endtime AS endtime,
       Y.gid AS list_gid,
       Y.uid AS uid
    FROM CTE1 X 
    INNER JOIN CTE2 Y 
    ON X.day = Y.day AND 
        (X.starttime = Y.starttime OR
        (X.starttime > Y.starttime AND X.starttime < Y.endtime) OR
        (X.endtime > Y.starttime AND X.endtime < Y.endtime))
    AND (X.cid <> Y.cid OR (X.cid = Y.cid AND X.l_type <> Y.l_type));`,
    [cid, uid],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching all students in course');
      }
      const students = filterStudents(req.query, results.rows);
      res.status(200).json(students);
    }
  );
};

const getStudentsWithoutLessons = (req, res) => {
  const cid = req.params.cid;

  pool.query(
    `SELECT S.uid FROM SELECTS S WHERE S.cid = $1 
    EXCEPT
    (SELECT DISTINCT uid FROM AssignLect WHERE cid = $1
    UNION
    SELECT DISTINCT uid FROM AssignTut WHERE cid = $1
    UNION
    SELECT DISTINCT uid FROM AssignLab WHERE cid = $1)`,
    [cid],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching all students without lessons in course');
      }
      const students = filterStudents(req.query, results.rows);
      res.status(200).json(students);
    }
  );
};

// route paths
router.get('', getStudents);
router.get('/:id', getStudentById);
router.get('/:id/courses', getStudentsSelectedCourses);
router.post('', addStudent);
router.delete('/:id', deleteStudent);

router.get('/all/:cid', getAllStudentsInCourse);
router.get('/lecture/:cid', getStudentsInLecture);
router.get('/lab/:cid', getStudentsInLab);
router.get('/tutorial/:cid', getStudentsInTutorial);
router.get('/all_info/:cid', getAllStudentsInfoInCourse);
router.get('/checkConflict/:uid/:cid', checkConflict);
router.get('/all_noLessons/:cid', getStudentsWithoutLessons);

module.exports = router;
