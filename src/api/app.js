const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');
const { validateToken } = require('../auth/validateToken');
const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.createUser);

app.post('/login', userController.login);

app.route('/recipes')
  .post(validateToken, recipesController.newRecipe)
  .get(recipesController.getRecipes);

  app.route('/recipes/:id')
  .get(recipesController.getRecipe)
  .put(validateToken, recipesController.editRecipe)
  .delete(validateToken, recipesController.deleteRecipe);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },

  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
  
const upload = multer({ storage });

app
  .put('/recipes/:id/image',
    validateToken, upload.single('image'), recipesController.insertImage);

module.exports = app;
