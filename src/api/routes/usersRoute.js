const express = require('express');

const router = express.Router();

const { getAll, create } = require('../controllers/usersController');

router.get('/users', getAll);
router.post('/users', create);

module.exports = router;
