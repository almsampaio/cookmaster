const router = require('express').Router();
const loginValidation = require('../middlewares/login');

router.post('/', loginValidation.loginValidation, loginValidation.tokenValidation);

module.exports = router;