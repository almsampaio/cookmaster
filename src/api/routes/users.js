const router = require('express').Router();
const controlUsers = require('../../controller/users');
const validation = require('../../middlewares/users');
const validateTWD = require('../auth/validateJWT');

router.post('/', validation.userValidation, controlUsers.controlCreate);
router.post('/admin', validateTWD, validation.adminValidation, 
validation.userValidation, controlUsers.controlAdminCreate);

module.exports = router;