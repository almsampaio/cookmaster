const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// router.get('/', null);
// router.get('/:id', null);
router.post('/', loginController.loginController);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;