const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const recipesController = require('../controllers/recipes');
const { authToken } = require('../middlewares/authToken');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer(storage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.addUser);

app.post('/login', userController.login);

app.post('/recipes/:id/image/',
authToken, upload.single('arquivo'),
recipesController.addImageRecipe);

app.delete('/recipes/:id', authToken, recipesController.deleteRecipeId);
app.put('/recipes/:id', authToken, recipesController.updateRecipeId);
app.get('/recipes/:id', recipesController.recipeId);
app.post('/recipes', authToken, recipesController.addRecipe);
app.get('/recipes', recipesController.allRecipes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'page Not Found' });
});

app.use(errorMiddleware);

module.exports = app;
