const { Router } = require('express');

const router = Router();

const {
  addUsers,
} = require('../Controllers/usersControllers');

router.post('/', addUsers);

module.exports = router;