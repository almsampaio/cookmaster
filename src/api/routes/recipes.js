const routes = require('express').Router();
const recipesController = require('../controllers/recipes');
const auth = require('../middlewares/auth');

routes.get('/:id', recipesController.get);
routes.put('/:id', auth, recipesController.update);
routes.get('/', recipesController.get);
routes.post('/', auth, recipesController.create);

module.exports = routes;