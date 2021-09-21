const express = require('express');

const router = express.Router();

const { getAll } = require('../controllers/usersController');

router.get('/users', getAll);

module.exports = router;
