const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const { authMiddleware } = require('./auth/authMiddleware');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', userController.createUser);
app.post('/login', userController.userLogin);

// Recipes
app.post('/recipes', authMiddleware, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeByID);
app.put('/recipes/:id', authMiddleware, recipesController.updateRecipe);
app.delete('/recipes/:id', authMiddleware, recipesController.deleteRecipe);

module.exports = app;
