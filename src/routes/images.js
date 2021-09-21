const express = require('express');
const GetImageByIdController = require('../controllers/images/GetImageByIdController');

const router = express.Router();

router.get('/:id', GetImageByIdController.handle);

module.exports = router;
