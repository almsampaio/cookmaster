const express = require('express');

const router = express.Router();

const { loginUser } = require('../controllers/loginControllers');

const { verifyToken } = require('../middlewares/loginMiddlewares');

router.post('/', verifyToken, loginUser);

module.exports = router;