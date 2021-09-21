const router = require('express').Router();
const usersController = require('../controllers/usersController');

// POST
router.post('/', usersController.register);

// GET

// PUT

// DELETE

module.exports = router;
