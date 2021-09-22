const express = require('express');

const router = express.Router();

const { getAll, create, loginUser } = require('../controllers/usersController');

router.get('/users', getAll);
router.post('/users', create);
router.post('/login', loginUser);

module.exports = router;
