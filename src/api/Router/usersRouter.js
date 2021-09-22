const { Router } = require('express');

const router = Router();

const {
  addUsers,
} = require('../Controllers/usersController');

router.post('/', addUsers);

module.exports = router;