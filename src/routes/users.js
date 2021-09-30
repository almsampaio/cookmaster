const router = require('express').Router();
const controlUsers = require('../controller/users');
const validation = require('../middlewares/users');

router.post('/', validation.userValidation, controlUsers.controlCreate);

module.exports = router;