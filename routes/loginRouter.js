const { Router } = require('express');
const userController = require('../controllers/userController');
const loginValidation = require('../middlewares/login');

const router = Router();
router.post('/', loginValidation, userController.login);

module.exports = router;