const router = require('express').Router();
const Users = require('../controllers/users');

router.post('/', Users.generetorToken);

module.exports = router;