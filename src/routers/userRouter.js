const { Router } = require('express');

const router = Router();

const userController = require('../controllers/userController');

router.post('/', userController.addUser);

module.exports = router;