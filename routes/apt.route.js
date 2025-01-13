const express = require('express');
const { getApts, getApt, postApt, updateApt, deleteApt } = require('../controler/apt.controler.js');

const router = express.Router();

router.get('/', getApts);
router.get('/:id', getApt);
router.post('/', postApt);
router.put('/:id', updateApt);
router.delete('/:id', deleteApt);

module.exports = router;
