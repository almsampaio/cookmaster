const express = require('express');

const router = express.Router();

const {
  addUser,
} = require('../controllers/users');

router.post('/', addUser);

module.exports = router;
