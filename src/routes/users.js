const router = require('express').Router();
const Users = require('../controllers/users');

router.post('/', Users.create);

module.exports = router;