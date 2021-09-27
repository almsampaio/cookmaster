const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

router.use(bodyParser.json());

const userController = require('../controllers/userController');

router.post('/', userController.create);

module.exports = router;