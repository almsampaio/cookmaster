const routes = require('express').Router();
const multer = require('multer');
const recipesController = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const upload = multer({ dest: 'uploads' });

routes.put('/:id/image', auth, upload.single('image'), recipesController.update);
routes.get('/:id', recipesController.get);
routes.put('/:id', auth, recipesController.update);
routes.delete('/:id', auth, recipesController.delete);
routes.get('/', recipesController.get);
routes.post('/', auth, recipesController.create);

module.exports = routes;