const router = require('express').Router();

const { Users } = require('../controllers');
const { validateUserAccess } = require('../middlewares');

router
  .post('/', validateUserAccess, Users.login);

module.exports = router;