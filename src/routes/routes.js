const router = require('express').Router();

const user = require('./users');
const login = require('./login');
const recipes = require('./recipes');

router.use('/users', user);
router.use('/login', login);
router.use('/recipes', recipes);

module.exports = router;