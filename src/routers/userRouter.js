const { Router } = require('express');
const { validateJWT } = require('../auth/authMiddleware');

const router = Router();

const userController = require('../controllers/userController');

router.post('/', userController.addUser);

router.post('/admin', validateJWT, userController.addAdmin);

module.exports = router;