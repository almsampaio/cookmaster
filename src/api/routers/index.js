const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');

router.use('/users', rescue(usersRouter));
router.use('/login', rescue(loginRouter));

module.exports = router;
