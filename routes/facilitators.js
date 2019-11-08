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

module.exports = router;
