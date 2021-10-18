const express = require('express');
const { loginUser } = require('../controllers/loginControllers');

const router = express.Router();

router.post('/', loginUser);

module.exports = router;
