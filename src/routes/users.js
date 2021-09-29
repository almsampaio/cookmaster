const router = require('express').Router();
const rescue = require('express-rescue');
const user = require('../controllers/user');

router.post('/', rescue(user.create));

module.exports = router;