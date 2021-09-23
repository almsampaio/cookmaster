const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const recipesRouter = require('./recipesRouter');

router.use('/users', rescue(usersRouter));
router.use('/login', rescue(loginRouter));
router.use('/recipes', rescue(recipesRouter));

module.exports = router;
