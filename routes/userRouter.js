const { Router } = require('express');
const userController = require('../controllers/userController');
const checkUser = require('../middlewares/user');

const router = Router();
// https://www.youtube.com/watch?v=KwrJSwWhIDI&ab_channel=PedroTech usando o YUP . mais verboso que o Joi, infelizmente
router.post('/', checkUser, userController.createNewUser);

module.exports = router;