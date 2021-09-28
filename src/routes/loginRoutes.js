const bodyParser = require('body-parser');
const express = require('express');

const loginController = require('../controllers/loginController');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', loginController.login);

module.exports = router;
