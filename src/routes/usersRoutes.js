const express = require('express');
const { createUser } = require('../models/usersModel');

const router = express.Router();

router.post('/', createUser);

module.exports = router;
