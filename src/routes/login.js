const router = require('express').Router();
const rescue = require('express-rescue');

const login = require('../controllers/login');

router.post('/', rescue(login.create));

module.exports = router;