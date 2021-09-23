const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', UserController.create);
router.post('/admin', authMiddleware.authLogin, UserController.createAdmin);

module.exports = router;