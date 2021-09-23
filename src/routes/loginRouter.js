const router = require('express').Router();
const loginController = require('../controllers/loginController');

// POST
router.post('/', loginController.login);

module.exports = router;
