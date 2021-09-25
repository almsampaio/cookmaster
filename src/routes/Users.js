const express = require('express');
const { validateUser } = require('../middlewares/validations');
const Users = require('../controllers/Users');

const router = express.Router();

router.post('/', validateUser, Users.create);

module.exports = router;