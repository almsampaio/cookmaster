const { Router } = require('express');
const userController = require('../controllers/userController');
const commonUser = require('../middlewares/user');
const userSchema = require('../validations/schemas');

const router = Router();
// https://www.youtube.com/watch?v=KwrJSwWhIDI&ab_channel=PedroTech usando o YUP . mais verboso que o Joi, infelizmente
router.post('/', commonUser(userSchema), userController.createNewUser);

module.exports = router;