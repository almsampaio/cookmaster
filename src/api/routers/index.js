const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const usersRouter = require('./usersRouter');

router.use('/users', rescue(usersRouter));

module.exports = router;
