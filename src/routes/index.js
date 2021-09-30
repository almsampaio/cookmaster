const router = require('express').Router();
const users = require('./users');
const login = require('./login');
const recipes = require('./recipes');

router.use('/users', users);
router.use('/login', login);
router.use('/recipes', recipes);

module.exports = router;