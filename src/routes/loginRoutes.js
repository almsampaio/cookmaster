const express = require('express');

const router = express.Router();

const { loginUser } = require('../controllers/loginControllers');

const { emailRequired, verifyCredentials } = require('../middlewares/loginMiddlewares');
 // reaproveitamento de middlewares de users

router.post('/', emailRequired, verifyCredentials, loginUser);

module.exports = router;