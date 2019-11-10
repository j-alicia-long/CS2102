const express = require('express');
const { pool } = require('../config');

const router = express.Router();

// route handlers
const getProf = (req, res) => {
  const c_code = req.params.c_code;

  pool.query(
    'WITH X AS ( SELECT * FROM ManagesGroup M WHERE M.gid IN (SELECT gid FROM HasGroup WHERE cid = $1)) SELECT U.name, P.uid, gid FROM Users U, Professors P, X  WHERE P.uid = X.uid AND P.uid = U.uid',
    [c_code],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching professors');
      }
      const facilitators = filterFacilitators(req.query, results.rows);
      res.status(200).json(facilitators);
    }
  );
};

// route handlers
const getTA = (req, res) => {
  const c_code = req.params.c_code;

  pool.query(
    'WITH X AS ( SELECT * FROM ManagesGroup M WHERE M.gid IN (SELECT gid FROM HasGroup WHERE cid = $1)) SELECT U.name, TAs.uid, gid FROM Users U, TAs, X  WHERE TAs.uid = X.uid AND TAs.uid = U.uid',
    [c_code],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error fetching TAs');
      }
      const facilitators = filterFacilitators(req.query, results.rows);
      res.status(200).json(facilitators);
    }
  );
};

const checkIfFacilOfCourse = (req, res) => {
  const cid = req.params.cid;
  const uid = req.params.uid;
  pool.query(
    'SELECT uid FROM ManagesGroup mg, HasGroup hg WHERE uid = $1 AND hg.cid = $2 AND hg.gid = mg.gid',
    [uid, cid],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error checking if user is a Facilitator of course');
      }
      const facilitators = filterFacilitators(req.query, results.rows);
      res.status(200).json(facilitators);
    }
  );
};

const checkIfFacil = (req, res) => {
  const uid = req.params.uid;
  pool.query(
    'SELECT * FROM Professors WHERE uid = $1 UNION SELECT * FROM TAs WHERE uid = $1',
    [uid],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(400).send('Error checking if user is a Facilitator of course');
      }
      const facilitators = filterFacilitators(req.query, results.rows);
      res.status(200).json(facilitators);
    }
  );
};

const checkIfProfOfCourse = (req, res) => {
  const uid = req.params.uid;
  const cid = req.params.cid;
  pool.query('SELECT * FROM Courses WHERE uid = $1 AND cid = $2', [uid, cid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).send('Error checking if user is a professor');
    }
    const facilitators = filterFacilitators(req.query, results.rows);
    res.status(200).json(facilitators);
  });
};

const filterFacilitators = (query, facilitators) => {
  let result = facilitators;
  for (key in query) {
    result = result.filter(facilitator => {
      if (facilitator[key]) {
        return facilitator[key] === query[key];
      }
    });
  }
  return result;
};

// route paths
router.get('/ta/:c_code', getTA);
router.get('/prof/:c_code', getProf);
router.get('/checkIfFacilOfCourse/:uid/:cid', checkIfFacilOfCourse);
router.get('/checkIfFacil/:uid', checkIfFacil);
router.get('/checkIfProfOfCourse/:uid/:cid', checkIfProfOfCourse);

module.exports = router;
