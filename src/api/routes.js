const express = require('express');
const path = require('path');
const multer = require('multer');

const multerConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, 'uploads'),
    filename(request, file, callback) {
      const { id } = request.params;

      const fileName = `${id}.jpeg`;

      callback(null, fileName);
    },
  }),
};

const upload = multer(multerConfig);

const userController = require('./controllers/userController');
const recipesController = require('./controllers/recipesController');
const { userCreateValidations, loginValidations } = require('./middlewares/userValidations');
const recipesValidation = require('./middlewares/recipesValidations');
const tokenValidation = require('./middlewares/tokenValidations');
const recipeExistsValidation = require('./middlewares/recipeExistsValidations');

const routes = express.Router();

routes.post('/users', userCreateValidations, userController.create);

routes.post('/login', loginValidations, userController.login);

routes.post('/recipes', tokenValidation, recipesValidation, recipesController.create);

routes.get('/recipes', recipesController.index);

routes.get('/recipes/:id', recipeExistsValidation, recipesController.show);

routes.put('/recipes/:id', tokenValidation, recipesController.update);

routes.delete('/recipes/:id', tokenValidation, recipesController.delete);

routes.put('/recipes/:id/image', 
  upload.single('image'), tokenValidation, recipesController.updateImage);

module.exports = routes;