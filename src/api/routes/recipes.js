const routes = require('express').Router();
const recipesController = require('../controllers/recipes');
const auth = require('../middlewares/auth');

routes.post('/', auth, recipesController.create);

module.exports = routes;