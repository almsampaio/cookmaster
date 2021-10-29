const express = require('express');
const controlers = require('../controllers/UserControlers');

const router = express.Router();

router.post('/users', controlers.createUser);
router.post('/login', controlers.getLogin);

module.exports = router;
