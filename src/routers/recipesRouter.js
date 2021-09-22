const express = require('express');
const rescue = require('express-rescue');
const controllers = require('../controllers');
const auth = require('../middlewares/auth');

const recipesRouter = express.Router();

recipesRouter.post('/', auth, rescue(controllers.recipesRegister));

module.exports = recipesRouter;