const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const recipesController = require('../controllers/recipes');
const errors = require('../middlewares/errors');
const authenticate = require('../middlewares/authenticate');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.route('/users')
  .post(usersController.registerUser);

app.route('/login')
  .post(loginController.login);

app.route('/recipes')
  .post(authenticate, recipesController.createRecipe)
  .get(recipesController.getRecipes);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

app.route('/recipes/:id/image')
  .put(authenticate, upload.single('image'), recipesController.insertImage);

app.route('/recipes/:id')
  .get(recipesController.getRecipeById)
  .put(authenticate, recipesController.editRecipeById)
  .delete(authenticate, recipesController.deleteRecipeById);

app.use(errors);

module.exports = app;
