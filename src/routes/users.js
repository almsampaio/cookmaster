const router = require('express').Router();

const Users = require('../controllers/users');
const { validateUser } = require('../middlewares');

router
  .get('/', Users.getAll)
  .post('/', validateUser, Users.create);

module.exports = router;