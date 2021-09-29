const router = require('express').Router();

const { Users } = require('../controllers');
const { validateUser } = require('../middlewares');

router
  .post('/', validateUser, Users.create);

module.exports = router;