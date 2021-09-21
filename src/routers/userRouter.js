const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// router.get('/', null);
// router.get('/:id', null);
router.post('/', userController.createUser);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;