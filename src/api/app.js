const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');

const usersController = require('./controller/users');
const loginController = require('./controller/login');
const recipesController = require('./controller/recipes');
const errors = require('./middlewares/issue');
const authenticate = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.route('/users/admin')
  .post(authenticate, usersController.registerAdmin);

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

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

app.route('/recipes/:id/image')
  .put(upload.single('image'), authenticate, recipesController.insertImage);

app.route('/recipes/:id')
  .get(recipesController.getRecipeById)
  .put(authenticate, recipesController.editRecipeById)
  .delete(authenticate, recipesController.deleteRecipeById);

app.use(errors);

module.exports = app;